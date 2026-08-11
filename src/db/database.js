import { app } from 'electron'
import path from 'node:path'
import { is } from '@electron-toolkit/utils'
import { evaluateColumn } from './helpers'
const Database = require('better-sqlite3')

const options = {}

class CharacterDb {
  constructor() {
    const dbName = is.dev ? 'name-tracker-dev.sqlite' : 'name-tracker.sqlite'
    const storagePath = path.join(app.getPath('userData'), dbName)
    this.db = new Database(storagePath, options)
    this.db.pragma('journal_mode = WAL')
    this.setup()
  }
  setup() {
    const setupCharactersSql = `CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        desc TEXT,
        dead BOOLEAN DEFAULT 0,
        age INTEGER,
        gender TEXT,
        location TEXT,
        occupation TEXT,
        species TEXT,
        pinned BOOLEAN DEFAULT 0,
        image BLOB
        )`
    console.log('Configuring database...')
    this.db.exec(setupCharactersSql)

    const setupTagsSql = `CREATE TABLE IF NOT EXISTS tags (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
        tag_name TEXT NOT NULL)`

    const setupCharacterTagsSql = `CREATE TABLE IF NOT EXISTS tag_map (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     character_id INTEGER NOT NULL,
     tag_id INTEGER NOT NULL)`

    console.log('setting up tagging...')
    this.db.exec(setupTagsSql)
    this.db.exec(setupCharacterTagsSql)

    // support legacy v0.0.1 to v0.3.0 installations
    console.log('Performing legacy support checks...')
    try {
      const setupPinnedSql = `ALTER TABLE characters ADD COLUMN pinned BOOLEAN DEFAULT 0`
      this.db.exec(setupPinnedSql)
    } catch (error) {
      console.log('Pinned column already exists, skipping...')
    }

    try {
      const setupImageSql = `ALTER TABLE characters ADD COLUMN image BLOB`
      this.db.exec(setupImageSql)
    } catch (error) {
      console.log('Image column already exists, skipping...')
    }

    console.log('migrating to 0.6 worlds system...')
    try {
      const createWorldstableSql = `CREATE TABLE IF NOT EXISTS worlds (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       description TEXT,
       last_accessed INTEGER)`
      this.db.exec(createWorldstableSql)
    } catch (error) {
      console.error(error)
    }

    try {
      const addWorldsToCharactersSql = `ALTER TABLE characters ADD COLUMN world_id INTEGER`
      this.db.exec(addWorldsToCharactersSql)
    } catch (error) {
      if (error && error.code == 'SQLITE_ERROR') {
        console.log('World_id column already exists on characters, skipping...')
      } else {
        console.error(error)
      }
    }

    try {
      const addWorldsToTagsSql = `ALTER TABLE tags ADD COLUMN world_id INTEGER`
      this.db.exec(addWorldsToTagsSql)
    } catch (error) {
      if (error && error.code == 'SQLITE_ERROR') {
        console.log('World_id column already exists on tags, skipping...')
      } else {
        console.error(error)
      }
    }

    // check if there are any existing worlds
    let hasWorlds = false

    // const tempDeleteWorldsTable = `DROP TABLE IF EXISTS worlds`
    // this.db.exec(tempDeleteWorldsTable)

    try {
      const checkWorldsQuery = this.db.prepare(`SELECT * FROM worlds`)
      const existingWorlds = checkWorldsQuery.all()
      if (existingWorlds.length > 0) {
        console.log('Found existing worlds, skipping further migrations...')
        hasWorlds = true
      }
    } catch (error) {
      if (error && error.code) {
        console.error(error)
      }
    }

    if (!hasWorlds) {
      // create a default world
      try {
        console.log('Creating default world...')
        const createWorldSql = `INSERT INTO worlds (id, name, description) VALUES (?, ?, ?)`
        const stmt = this.db.prepare(createWorldSql)
        const response = stmt.run(
          0,
          'My World',
          'This is the default world created when this app is first run. Edit the name and description in the settings menu to make it yours!'
        )
      } catch (error) {
        console.error(error)
      }

      // backfill all existing characters with world ID
      try {
        console.log('Migrating characters table...')
        const addWorldIdSql = `UPDATE characters SET world_id = 0`
        this.db.exec(addWorldIdSql)
      } catch (error) {
        console.error(error)
      }

      // do the same for tags
      try {
        console.log('Migrating tags table...')
        const addWorldIdSql = `UPDATE tags SET world_id = 0`
        this.db.exec(addWorldIdSql)
      } catch (error) {
        console.error(error)
      }
    }

    console.log('Database setup complete')
  }

  // OTHER FUNCTIONS
  // CHARACTER QUERIES ---
  createChar(character, worldId) {
    const insertQuery = `INSERT INTO characters (name, desc, dead, age, gender, location, occupation, species, world_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const stmt = this.db.prepare(insertQuery)
    const response = stmt.run(
      character.name,
      character.desc,
      character.dead,
      character.age,
      character.gender,
      character.location,
      character.occupation,
      character.species,
      worldId
    )
    if (response.changes == 1) {
      console.log(`Character with ID ${response.lastInsertRowid} created`)
      return {
        id: response.lastInsertRowid,
        success: true
      }
    } else {
      return {
        success: false,
        message: 'An error occurred when creating the character'
      }
    }
  }

  deleteChar(id) {
    const deleteQuery = `DELETE FROM characters WHERE id = ?`
    const stmt = this.db.prepare(deleteQuery)
    const response = stmt.run(id)
    if (response.changes == 1) {
      console.log(`Character with ID ${id} deleted`)
      return {
        id: id,
        success: true
      }
    } else {
      console.log(`An error occurred when deleting character with ID ${id}`)
      return {
        id: id,
        success: false
      }
    }
  }

  deleteAllChars(worldId) {
    const deleteAllQuery = `DELETE FROM characters WHERE world_id = ?`
    const stmt = this.db.prepare(deleteAllQuery)
    const response = stmt.run(worldId)

    if (response.changes > 0) {
      console.log('Deleted ' + response.changes + ' characters')
      return {
        count: response.changes,
        success: true
      }
    } else {
      console.log(
        'Attempted to delete all characters. Either database is empty or something went wrong'
      )

      return {
        count: 0,
        success: false
      }
    }
  }

  getCount(worldId) {
    const countQuery = 'SELECT COUNT(*) as COUNT FROM characters WHERE world_id=?'
    const stmt = this.db.prepare(countQuery)
    const response = stmt.all(worldId)
    return response[0].COUNT
  }

  readAllChars(worldId) {
    const selectAllQuery = `SELECT id, name, species, gender, occupation, dead, location, desc FROM characters WHERE world_id = ? ORDER BY name DESC`
    const stmt = this.db.prepare(selectAllQuery)
    const response = stmt.all(worldId)
    return response
  }

  readOneChar(id) {
    const selectQuery = `SELECT id, name, species, age, gender, occupation, dead, location, desc, pinned FROM characters WHERE id = ?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.get(id)
    return response
  }

  readPinned(worldId) {
    const selectQuery = `SELECT id, name, dead FROM characters WHERE pinned=1 AND world_id=? ORDER BY name DESC`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(worldId)
    return response
  }

  readList(list) {
    const ids = list.map((c) => c.id)
    const placeholders = ids.map(() => '?').join(',')
    const selectQuery = `SELECT id, name, species, gender, occupation, dead, location, desc FROM characters WHERE id IN (${placeholders});`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(ids)
    return response
  }

  loadImage(id) {
    const selectQuery = `SELECT image FROM characters WHERE id=?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.get(id)
    return response
  }

  togglePinChar(id, unpin) {
    const newValue = unpin == true ? 0 : 1
    const updateQuery = `UPDATE characters SET pinned=? WHERE id=?`
    const stmt = this.db.prepare(updateQuery)
    const response = stmt.run(newValue, id)
    return response
  }

  updateChar(character) {
    const updateQuery = `UPDATE characters SET name=?, desc=?, dead=?, age=?, gender=?, location=?, occupation=?, species=? WHERE id=? RETURNING *`
    const stmt = this.db.prepare(updateQuery)
    const response = stmt.run(
      character.name,
      character.desc,
      character.dead,
      character.age,
      character.gender,
      character.location,
      character.occupation,
      character.species,
      character.id
    )
    if (response.changes == 1) {
      console.log(`Character with ID ${character.id} updated`)
      return {
        success: true
      }
    } else {
      console.log(`An error occurred when updating character with ID ${character.id}`)
      return {
        success: false
      }
    }
  }

  updateImage(id, imageData) {
    const updateQuery = `UPDATE characters SET image=? WHERE id=? RETURNING *`
    const stmt = this.db.prepare(updateQuery)
    const response = stmt.run(imageData, id)
    if (response.changes == 1) {
      console.log(`Image uploaded to character ${id}`)
      return {
        success: true
      }
    } else {
      console.log(`Error when uploading image`)
      return {
        success: false
      }
    }
  }

  removeImage(id) {
    const removeQuery = `UPDATE characters SET image=? WHERE id=?`
    const stmt = this.db.prepare(removeQuery)
    const response = stmt.run(null, id)
    if (response.changes == 1) {
      console.log(`Image deleted from character ${id}`)
      return {
        success: true
      }
    } else {
      console.log(`Error when deleting image`)
      return {
        success: false
      }
    }
  }

  searchChars(query, column, reverse, worldId) {
    const direction = reverse ? 'DESC' : 'ASC'
    const protectedColumn = evaluateColumn(column)
    const selectQuery = `SELECT id, name, species, gender, occupation, dead, location, desc FROM characters WHERE name LIKE ? AND world_id = ? ORDER BY ${protectedColumn} ${direction}`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(`%${query}%`, worldId)
    console.log(
      `Found ${response.length} characters matching query: ${query} ordered by ${protectedColumn} ${direction}`
    )
    return response
  }

  // deepSearchChars(query) {
  //   const selectQuery = `SELECT id, name, species, gender, occupation, dead, location, desc FROM characters WHERE name LIKE ? OR desc LIKE ? OR location LIKE ? OR occupation LIKE ? OR species LIKE ?`
  //   const stmt = this.db.prepare(selectQuery)
  //   const response = stmt.all(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`)
  //   console.log(`Found ${response.length} characters matching deep query: ${query}`)
  //   return response
  // }

  // TAG QUERIES ---
  createTag(tagName, worldId) {
    const insertQuery = `INSERT INTO tags (tag_name, world_id) VALUES (?, ?) RETURNING *`
    const stmt = this.db.prepare(insertQuery)
    const response = stmt.run(tagName, worldId)
    if (response.changes === 1) {
      return { success: true, newId: response.lastInsertRowid }
    } else return { success: false }
  }

  getTags(worldId) {
    const selectQuery = `SELECT * FROM tags WHERE world_id = ? ORDER BY tag_name`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(worldId)
    return response
  }

  updateTag(tag) {
    const updateQuery = `UPDATE tags SET tag_name=? WHERE id=?`
    const stmt = this.db.prepare(updateQuery)
    const response = stmt.run(tag.tag_name, tag.id)
    return response
  }

  deleteTag(id) {
    const deleteQuery = `DELETE FROM tags WHERE id=?`
    const stmt = this.db.prepare(deleteQuery)
    const response = stmt.run(id)

    // if successful, also delete the tag from the tag map
    if (response.changes === 1) {
      const deleteTagFromMapQuery = `DELETE FROM tag_map WHERE tag_id=?`
      const stmt2 = this.db.prepare(deleteTagFromMapQuery)
      const response2 = stmt2.run(id)
      return { success: true }
    } else {
      return { success: false }
    }
  }

  updateCharacterTags(characterId, tagIds) {
    let deletedCount = 0
    let addedCount = 0
    let errors = false

    const transaction = this.db.transaction(() => {
      // remove all tags for this character first
      const deleteQuery = `DELETE FROM tag_map WHERE character_id=?`
      const deleteStmt = this.db.prepare(deleteQuery)
      const deleteResponse = deleteStmt.run(characterId)
      deletedCount = deleteResponse.changes

      // then add each desired tag
      const insertQuery = `INSERT INTO tag_map (character_id, tag_id) VALUES (?,?)`
      const insertStmt = this.db.prepare(insertQuery)

      tagIds.forEach((tagId) => {
          insertStmt.run(characterId, tagId)
          addedCount++
        })
      })

    try {
      transaction()
    } catch (error) {
      console.error(`Failed to add tag ${tagIds} for character ${characterId}:`, err.message)
      errors = true
    }

    return {
      success: !errors,
      deleted: deletedCount,
      added: addedCount
    }
  }

  getCharacterTags(characterId) {
    const selectQuery = `SELECT * FROM tag_map JOIN tags ON tag_map.tag_id=tags.id WHERE character_id=?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(characterId)
    return response
  }

  searchCharactersByTag(tagName, column, reverse) {
    const direction = reverse ? 'DESC' : 'ASC'
    const protectedColumn = evaluateColumn(column)
    const selectQuery = `SELECT c.id, c.name, c.species, c.gender, c.occupation, c.dead, c.location, c.desc FROM characters c JOIN tag_map tm ON c.id = tm.character_id JOIN tags t ON tm.tag_id = t.id WHERE t.tag_name = ? ORDER BY ${protectedColumn} ${direction}`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(tagName)
    console.log(`Found ${response.length} characters with tag #${tagName}`)
    return response
  }

  getTagSuggestions(query, worldId) {
    const selectQuery = `SELECT * FROM tags WHERE tag_name LIKE ? AND world_id = ?`
    const stmt = this.db.prepare(selectQuery, worldId)
    const response = stmt.all('%' + query + '%', worldId)
    return response
  }

  // WORLD QUERIES ---
  getWorlds() {
    const selectQuery = `SELECT * FROM worlds`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all()
    return response
  }

  getWorld(id) {
    const selectQuery = `SELECT * FROM worlds WHERE id = ?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.get(id)
    return response
  }

  createWorld(world) {
    const insertQuery = `INSERT INTO worlds (name, description) VALUES (?, ?)`
    const stmt = this.db.prepare(insertQuery)
    const response = stmt.run(world.name, world.description)
    if (response.changes === 1) {
      return { success: true, newId: response.lastInsertRowid }
    } else return { success: false }
  }

  updateWorld(id, world) {
    const insertQuery = `UPDATE worlds SET name=?, description=?, last_accessed=? WHERE id=?`
    const timestamp = new Date().valueOf()
    const stmt = this.db.prepare(insertQuery)
    const response = stmt.run(world.name, world.description, timestamp, id)
    if (response.changes == 1) {
      console.log(`World ${id} updated successfully`)
      return {
        success: true
      }
    } else {
      console.log(`Error when updating world`)
      console.log(response)
      return {
        success: false
      }
    }
  }

  accessWorld(id) {
    const insertQuery = `UPDATE worlds SET last_accessed=? WHERE id=?`
    const timestamp = new Date().valueOf()
    const stmt = this.db.prepare(insertQuery)
    const response = stmt.run(timestamp, id)
    if (response.changes == 1) {
      return {
        success: true
      }
    } else {
      console.log(`Error when updating world access timestamp world`)
      console.log(response)
      return {
        success: false
      }
    }
  }

  deleteWorld(id) {
    // check if this is the only world first
    const selectQuery = `SELECT * FROM worlds`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all()

    if (response.length < 2) {
      return { success: false }
    }

    const transaction = this.db.transaction((worldId) => {
      // setup required queries
      const deleteStmt = this.db.prepare(`DELETE FROM worlds WHERE id=?`)
      const deleteCharactersStmt = this.db.prepare(`DELETE FROM characters WHERE world_id=?`)
      const deleteTagMapStmt = this.db.prepare(
        `DELETE FROM tag_map WHERE tag_id IN (SELECT id FROM tags WHERE world_id=?)`
      )
      const deleteTagsStmt = this.db.prepare(`DELETE FROM tags WHERE world_id=?`)

      // run queries in order, make sure dependent tables are wiped first
      deleteTagMapStmt.run(worldId)
      deleteTagsStmt.run(worldId)
      deleteCharactersStmt.run(worldId)
      deleteStmt.run(worldId)
    })

    try {
      transaction(id)
      console.log('World deleted successfully')
      return { success: true }
    } catch (error) {
      console.log('World deletion failed, cancelling transaction.')
      console.error(error)
      return { success: false }
    }
  }

  close() {
    this.db.close()
    console.log('Database closed')
  }
}

export default CharacterDb

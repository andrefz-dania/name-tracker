import { app } from 'electron'
import path from 'node:path'
const Database = require('better-sqlite3')

const options = {}

class CharacterDb {
  constructor() {
    const storagePath = path.join(app.getPath('userData'), 'name-tracker.sqlite')
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
        name TEXT NOT NULL)`

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

    console.log('Database setup complete')
  }
  // CHARACTER QUERIES ---
  createChar(character) {
    const insertQuery = `INSERT INTO characters (name, desc, dead, age, gender, location, occupation, species) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    const stmt = this.db.prepare(insertQuery)
    const response = stmt.run(
      character.name,
      character.desc,
      character.dead,
      character.age,
      character.gender,
      character.location,
      character.occupation,
      character.species
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

  deleteAllChars() {
    const deleteAllQuery = `DELETE FROM characters`
    const stmt = this.db.prepare(deleteAllQuery)
    const response = stmt.run()

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

  getCount() {
    const countQuery = 'SELECT COUNT(*) as COUNT FROM characters'
    const stmt = this.db.prepare(countQuery)
    const response = stmt.all()
    return response[0].COUNT
  }

  readAllChars() {
    const selectAllQuery = `SELECT id, name, species, gender, occupation, dead, location, desc FROM characters ORDER BY name DESC`
    const stmt = this.db.prepare(selectAllQuery)
    const response = stmt.all()
    return response
  }

  readOneChar(id) {
    const selectQuery = `SELECT id, name, species, age, gender, occupation, dead, location, desc, pinned FROM characters WHERE id = ?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.get(id)
    return response
  }

  readPinned() {
    const selectQuery = `SELECT id, name, dead FROM characters WHERE pinned=1 ORDER BY name DESC`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all()
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

  searchChars(query, column, reverse) {
    const direction = reverse ? 'DESC' : 'ASC'
    function evaluateColumn(column) {
      if (
        column == 'species' ||
        column == 'gender' ||
        column == 'location' ||
        column == 'occupation'
      ) {
        return column
      } else if (column == 'status') {
        return 'dead'
      } else {
        return 'name'
      }
    }
    const protectedColumn = evaluateColumn(column)
    const selectQuery = `SELECT * FROM characters WHERE name LIKE ? ORDER BY ${protectedColumn} ${direction}`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(`%${query}%`)
    console.log(
      `Found ${response.length} characters matching query: ${query} ordered by ${protectedColumn} ${direction}`
    )
    return response
  }

  deepSearchChars(query) {
    const selectQuery = `SELECT * FROM characters WHERE name LIKE ? OR desc LIKE ? OR location LIKE ? OR occupation LIKE ? OR species LIKE ?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`)
    console.log(`Found ${response.length} characters matching deep query: ${query}`)
    return response
  }

  // TAG QUERIES ---
  createTag(tagName) {
    const insertQuery = `INSERT INTO tags (name) VALUES (?)`
    const stmt = this.db.prepare(insertQuery)
    const response = stmt.run(tagName)
    console.log(response)
    if (response.changes === 1) {
      return { success: true }
    } else return { success: false }
  }

  getTags() {
    const selectQuery = `SELECT * FROM tags`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all()
    console.log(response)
    return response
  }

  updateTag(tag) {
    const updateQuery = `UPDATE tags SET name=? WHERE id=?`
    const stmt = this.db.prepare(updateQuery)
    const response = stmt.run(tag.name, tag.id)
    console.log(response)
    return response
  }

  deleteTag(id) {
    const deleteQuery = `DELETE FROM tags WHERE id=?`
    const stmt = this.db.prepare(deleteQuery)
    const response = stmt.run(id)
    console.log(response)

    // if successful, also delete the tag from the tag map
    if (response.changes === 1) {
      const deleteTagFromMapQuery = `DELETE FROM tag_map WHERE tag_id=?`
      const stmt2 = this.db.prepare(deleteTagFromMapQuery)
      const response2 = stmt2.run(id)
      console.log(response)
      return response2.changes === 1 ? { success: true } : { success: false }
    } else {
      return { success: false }
    }
  }

  addTagToCharacter(characterId, tagId) {
    const insertQuery = `INSERT INTO tag_map (character_id, tag_id) VALUES (?, ?)`
    const stmt = this.db.prepare(insertQuery)
    const response = stmt.run(characterId, tagId)
    console.log(response)
    return response
  }

  removetagFromCharacter(characterId, tagId) {
    const deleteQuery = `DELETE FROM tag_map WHERE character_id=? AND tag_id=?`
    const stmt = this.db.prepare(deleteQuery)
    const response = stmt.run(characterId, tagId)
    console.log(response)
    return response
  }

  getCharacterTags(characterId) {
    const selectQuery = `SELECT * FROM tag_map JOIN tags ON tag_map.tag_id=tags.id WHERE character_id=?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(characterId)
    console.log(response)
    return response
  }

  searchCharactersByTag(tagName) {
    const selectQuery = `SELECT * FROM tag_map JOIN characters ON tag_map.character_id=characters.id WHERE tag_map.tag_id=(SELECT id FROM tags WHERE name=?)`
    const stmt = this.db.prepare(selectQuery)
    const tags = stmt.all(tagName)
    console.log(response)
    return response
  }

  tagSuggestions(query) {
    const selectQuery = `SELECT * FROM tags WHERE name LIKE ?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all('%' + query + '%')
    console.log(response)
    return response
  }

  close() {
    this.db.close()
    console.log('Database closed')
  }
}

export default CharacterDb

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
        species TEXT
        )`

    this.db.exec(setupCharactersSql)
    console.log('Database setup complete')
  }

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
    console.log(`Character with ID ${response.lastInsertRowid} created`
    )
    return {
      id: response.lastInsertRowid,
      success: response.success
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

  readAllChars() {
    const selectAllQuery = `SELECT * FROM characters ORDER BY name DESC`
    const stmt = this.db.prepare(selectAllQuery)
    const response = stmt.all()
    return response
  }

  readOneChar(id) {
    const selectQuery = `SELECT * FROM characters WHERE id = ?`;
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.get(id)
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
    );
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

  searchChars(query, column, reverse) {
    const direction = reverse ? 'DESC' : 'ASC'
    function  evaluateColumn(column) {
      if (column == 'species' || column == 'gender' || column == 'location' || column == 'occupation') {
        return column
      } else if (column == 'status') {
        return 'dead'
      } else {
        return 'name'
      }
    }
    const protectedColumn = evaluateColumn(column);
    const selectQuery = `SELECT * FROM characters WHERE name LIKE ? ORDER BY ${protectedColumn} ${direction}`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(`%${query}%`)
    console.log(`Found ${response.length} characters matching query: ${query} ordered by ${protectedColumn} ${direction}`)
    return response
  }

  deepSearchChars(query) {
    const selectQuery = `SELECT * FROM characters WHERE name LIKE ? OR desc LIKE ? OR location LIKE ? OR occupation LIKE ? OR species LIKE ?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`)
    console.log(`Found ${response.length} characters matching deep query: ${query}`)
    return response
  }

  close() {
    this.db.close()
    console.log('Database closed')
  }
}

export default CharacterDb


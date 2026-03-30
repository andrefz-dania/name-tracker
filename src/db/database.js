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
    console.log(response)
    return {
      id: response.lastInsertRowid,
      success: response.success
    }
  }

  deleteChar(id) {
    const deleteQuery = `DELETE FROM characters WHERE id = ?`
    const stmt = this.db.prepare(deleteQuery)
    const response = stmt.run(id)
    console.log(response)
    if (response.changes == 1) {
      return {
        id: id,
        success: true
      }
    } else {
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
    console.log(response)
    return response
  }

  readOneChar(id) {
    const selectQuery = `SELECT * FROM characters WHERE id = ?`;
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.get(id)
    console.log(response)
    return response
  }

  updateChar(id, character) {
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
    );

    // TO DO: HANDLE RETURNING PROPERLY
    console.log(response)
     if (response.changes == 1) {
      return {
        id: id,
        success: true
      }
    } else {
      return {
        id: id,
        success: false
      }
    }

  }

  searchChars(query) {
    const selectQuery = `SELECT * FROM characters WHERE name LIKE ?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(`%${query}%`)
    console.log(response)
    return response
  }

  deepSearchChars(query) {
    const selectQuery = `SELECT * FROM characters WHERE name LIKE ? OR desc LIKE ? OR location LIKE ? OR occupation LIKE ? OR species LIKE ?`
    const stmt = this.db.prepare(selectQuery)
    const response = stmt.all(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`)
    console.log(response)
    return response
  }

  close() {
    this.db.close()
    console.log('Database closed')
  }
}

export default CharacterDb

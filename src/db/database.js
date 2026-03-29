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
        shortDesc TEXT,
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

  createChar(name, shortDesc, desc, dead, age, gender, location, occupation, species) {
    const insertQuery = `INSERT INTO characters (name, shortDesc, desc, dead, age, gender, location, occupation, species) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const stmt = this.db.prepare(insertQuery)
    const response = stmt.run(
      name,
      shortDesc,
      desc,
      dead,
      age,
      gender,
      location,
      occupation,
      species
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
    return {
      id: response.lastInsertRowid,
      success: response.success
    }
  }

  readAllChars() {
    const selectAllQuery = `SELECT * FROM characters ORDER BY name DESC`
    const stmt = this.db.prepare(selectAllQuery)
    const results = stmt.all()
    console.log(results)
    return results
  }
}

export default CharacterDb

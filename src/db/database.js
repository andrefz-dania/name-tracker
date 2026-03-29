import {app} from 'electron';
import path from 'node:path';
const Database = require('better-sqlite3');

const options = {}

class CharacterDb {
    constructor() {
        const storagePath = path.join(app.getPath('userData'), 'name-tracker.sqlite');
        this.db = new Database(storagePath, options);
        this.db.pragma('journal_mode = WAL');
        this.setup();
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

        this.db.exec(setupCharactersSql);
        console.log('Database setup complete')
    }

}

export default CharacterDb;
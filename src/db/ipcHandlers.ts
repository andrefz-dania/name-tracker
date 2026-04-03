import { dialog, ipcMain } from 'electron'
import * as fs from 'fs';
import { CharacterType, RecentChar } from '../types/types';

export default function setupHandlers(db) {
  ipcMain.handle('createChar', (_, character: CharacterType) => {
    return db.createChar(character)
  })

  ipcMain.handle('deleteChar', (_, id: number) => {
    return db.deleteChar(id)
  })

  ipcMain.handle('deleteAllChars', () => {
    return db.deleteAllChars()
  })

  ipcMain.handle('getCount', ()=>{
    return db.getCount()
  })

  ipcMain.handle('readAllChars', () => {
    return db.readAllChars()
  })

  ipcMain.handle('readOneChar', (_, id: number) => {
    return db.readOneChar(id)
  })

  ipcMain.handle('readList', (_, list: RecentChar[]) => {
    return db.readList(list)
  })

  ipcMain.handle('readPinned', () => {
    return db.readPinned()
  })

  ipcMain.handle('togglePinChar', (_, id: number, unpin: boolean) => {
    return db.togglePinChar(id, unpin)
  })

  ipcMain.handle('updateChar', (_, character: CharacterType) => {
    return db.updateChar(character)
  })

  ipcMain.handle('searchChars', (_, searchQuery: string, column: string, reverse: boolean) => {
    return db.searchChars(searchQuery, column, reverse)
  })

  ipcMain.handle('deepSearchChars', (_, searchQuery: string) => {
    return db.searchChars(searchQuery)
  })

  ipcMain.handle('exportCharacters', async () => {
    console.log('Exporting characters to file...')

    const characters = await db.readAllChars();

    // remove ID and Pinned fields, and account for valueless fields
    const data = characters.map(c => ({
        name: c.name,
        desc: c.desc || '',
        dead: c.dead,
        age: c.age || null,
        gender: c.gender || '',
        location: c.location || '',
        occupation: c.occupation || '',
        species: c.species || '',
    }))
    const json = JSON.stringify(data);


    // Show save dialog with filters
    const result = await dialog.showSaveDialog({
      title: 'Export Data',
      defaultPath: 'export.json',
      filters: [{ name: 'JSON', extensions: ['json'] }]
    })

    if (result.canceled || !result.filePath) {
      return { success: false, message: 'User cancelled export' }
    }

        try {
        // Write file
        fs.writeFileSync(result.filePath, json);
        return { success: true, path: result.filePath };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
  })

  ipcMain.handle('importCharacters', async () => {
    const file = await dialog.showOpenDialog({
      title: 'Import Data',
      filters: [{ name: 'JSON', extensions: ['json'] }]
    })

    if (file.canceled || !file.filePaths) {
        return { success: false, message: 'User cancelled import' }
    }

    try {
        const fileData = fs.readFileSync(file.filePaths[0])
        const data = JSON.parse(fileData.toString())
        const characters: CharacterType[] = data.map(c => ({
            name: c.name || 'Unnamed Character',
            desc: c.desc || '',
            dead: c.dead || 0,
            age: c.age || null,
            gender: c.gender || '',
            location: c.location || '',
            occupation: c.occupation || '',
            species: c.species || ''
            }));

            characters.forEach(c => {
                db.createChar(c);
            });
            return {success: true, count: characters.length};


    } catch (error) {
        console.error(error);
        return { success: false };
    }

    })
}

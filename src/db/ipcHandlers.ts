import { ipcMain } from "electron";

export default function setupHandlers(db) {
    ipcMain.handle('createChar', (_, character: CharacterData) => {
        return db.createChar(character);
    });

    ipcMain.handle('deleteChar', (_, id: number) => {
        return db.deleteChar(id);
    });

    ipcMain.handle('readAllChars', () => {
        return db.readAllChars();
    });

    ipcMain.handle('searchChars', (_, searchQuery: string) => {
        return db.searchChars(searchQuery);
    });

    ipcMain.handle('deepSearchChars', (_, searchQuery: string) => {
        return db.searchChars(searchQuery);
    });
}
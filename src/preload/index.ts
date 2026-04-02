import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  createChar: (character: CharacterData) => ipcRenderer.invoke('createChar', character),

  deleteChar: (id: number) => ipcRenderer.invoke('deleteChar', id),

  deleteAllChars: () => ipcRenderer.invoke('deleteAllChars'),

  readAllChars: () => ipcRenderer.invoke('readAllChars'),

  readOneChar: (id: number) => ipcRenderer.invoke('readOneChar', id),

  readPinned: () => ipcRenderer.invoke('readPinned'),

  togglePinChar: (id: number, unpin:boolean) => ipcRenderer.invoke('togglePinChar', id, unpin),

  searchChars: (term: string, column: string, reverse:boolean) => ipcRenderer.invoke('searchChars', term, column, reverse),

  updateChar: (character: CharacterData) => ipcRenderer.invoke('updateChar', character),

  exportCharacters: () => ipcRenderer.invoke('exportCharacters'),

  importCharacters: () => ipcRenderer.invoke('importCharacters')

}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

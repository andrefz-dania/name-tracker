import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { RecentChar, TagType, WorldType } from '../types/types'

// Custom APIs for renderer
const api = {

  // characters
  createChar: (character: CharacterData, worldId: number) => ipcRenderer.invoke('createChar', character, worldId),

  deleteChar: (id: number) => ipcRenderer.invoke('deleteChar', id),

  deleteAllChars: (worldId: number) => ipcRenderer.invoke('deleteAllChars', worldId),

  getCount: (worldId: number) => ipcRenderer.invoke('getCount', worldId),

  readAllChars: (worldId: number) => ipcRenderer.invoke('readAllChars', worldId),

  readOneChar: (id: number) => ipcRenderer.invoke('readOneChar', id),

  readList: (list: RecentChar[]) => ipcRenderer.invoke('readList', list),

  readPinned: (worldId: number) => ipcRenderer.invoke('readPinned', worldId),

  loadImage: (id: number) => ipcRenderer.invoke('loadImage', id),

  removeImage: (id: number) => ipcRenderer.invoke('removeImage', id),

  togglePinChar: (id: number, unpin:boolean) => ipcRenderer.invoke('togglePinChar', id, unpin),

  searchChars: (term: string, column: string, reverse:boolean, worldId: number) => ipcRenderer.invoke('searchChars', term, column, reverse, worldId),

  updateChar: (character: CharacterData) => ipcRenderer.invoke('updateChar', character),

  updateImage: (id: number) => ipcRenderer.invoke('updateImage', id, ),

  exportCharacters: (worldId: number) => ipcRenderer.invoke('exportCharacters', worldId),

  importCharacters: (worldId: number) => ipcRenderer.invoke('importCharacters', worldId),

  // tags
  createTag: (tagName: string, worldId: number) => ipcRenderer.invoke('createTag', tagName, worldId),

  getTags: (worldId: number) => ipcRenderer.invoke('getTags', worldId),

  updateTag: (tag: TagType) => ipcRenderer.invoke('updateTag', tag),

  deleteTag: (id: number) => ipcRenderer.invoke('deleteTag', id),

  getCharacterTags: (characterId: number) => ipcRenderer.invoke('getCharacterTags', characterId),

  updateCharacterTags: (characterId: number, tagIds: number[]) => ipcRenderer.invoke('updateCharacterTags', characterId, tagIds),

  searchCharactersByTag: (query: string, column: string, reverse: boolean, worldId: number) => ipcRenderer.invoke('searchCharactersByTag', query, column, reverse, worldId),

  getTagSuggestions: (query: string, worldId: number) => ipcRenderer.invoke('getTagSuggestions', query, worldId),

  // worlds
  getWorld: (id: number) => ipcRenderer.invoke('getWorld', id),

  getWorlds: () => ipcRenderer.invoke('getWorlds'),

  accessWorld: (id: number) => ipcRenderer.invoke('accessWorld', id),

  updateWorld: (id: number, world: WorldType) => ipcRenderer.invoke('updateWorld', id, world),

  createWorld: (world: WorldType) => ipcRenderer.invoke('createWorld', world),

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

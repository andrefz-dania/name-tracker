import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { RecentChar, TagType } from '../types/types'

// Custom APIs for renderer
const api = {

  // characters
  createChar: (character: CharacterData) => ipcRenderer.invoke('createChar', character),

  deleteChar: (id: number) => ipcRenderer.invoke('deleteChar', id),

  deleteAllChars: () => ipcRenderer.invoke('deleteAllChars'),

  getCount: () => ipcRenderer.invoke('getCount'),

  readAllChars: () => ipcRenderer.invoke('readAllChars'),

  readOneChar: (id: number) => ipcRenderer.invoke('readOneChar', id),

  readList: (list: RecentChar[]) => ipcRenderer.invoke('readList', list),

  readPinned: () => ipcRenderer.invoke('readPinned'),

  loadImage: (id: number) => ipcRenderer.invoke('loadImage', id),

  removeImage: (id: number) => ipcRenderer.invoke('removeImage', id),

  togglePinChar: (id: number, unpin:boolean) => ipcRenderer.invoke('togglePinChar', id, unpin),

  searchChars: (term: string, column: string, reverse:boolean) => ipcRenderer.invoke('searchChars', term, column, reverse),

  updateChar: (character: CharacterData) => ipcRenderer.invoke('updateChar', character),

  updateImage: (id: number) => ipcRenderer.invoke('updateImage', id, ),

  exportCharacters: () => ipcRenderer.invoke('exportCharacters'),

  importCharacters: () => ipcRenderer.invoke('importCharacters'),

  // tags
  createTag: (tagName: string) => ipcRenderer.invoke('createTag', tagName),

  getTags: () => ipcRenderer.invoke('getTags'),

  updateTag: (tag: TagType) => ipcRenderer.invoke('updateTag', tag),

  deleteTag: (id: number) => ipcRenderer.invoke('deleteTag', id),

  addTagToCharacter: (characterId: number, tagId: number) => ipcRenderer.invoke('addTagToCharacter', characterId, tagId),

  removeTagFromCharacter: (characterId: number, tagId: number) => ipcRenderer.invoke('removeTagFromCharacter', characterId, tagId),

  getCharacterTags: (characterId: number) => ipcRenderer.invoke('getCharacterTags', characterId),

  searchCharactersByTag: (tagName: string) => ipcRenderer.invoke('searchCharactersByTag', tagName),

  tagSuggestions: (query: string) => ipcRenderer.invoke('tagSuggestions', query),

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

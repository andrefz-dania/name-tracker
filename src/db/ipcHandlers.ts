import { dialog, ipcMain } from 'electron'
import * as fs from 'fs'
import { CharacterType, RecentChar, TagType, WorldType } from '../types/types'
import { Jimp } from 'jimp'

export default function setupHandlers(db) {
  // characters
  ipcMain.handle('createChar', (_, character: CharacterType, worldId: number) => {
    return db.createChar(character, worldId)
  })

  ipcMain.handle('deleteChar', (_, id: number) => {
    return db.deleteChar(id)
  })

  ipcMain.handle('deleteAllChars', (_, worldId: number) => {
    return db.deleteAllChars(worldId)
  })

  ipcMain.handle('getCount', (_, worldId: number) => {
    return db.getCount(worldId)
  })

  ipcMain.handle('readAllChars', (_, worldId: number) => {
    return db.readAllChars(worldId)
  })

  ipcMain.handle('readOneChar', (_, id: number) => {
    return db.readOneChar(id)
  })

  ipcMain.handle('readList', (_, list: RecentChar[]) => {
    return db.readList(list)
  })

  ipcMain.handle('readPinned', (_, worldId: number) => {
    return db.readPinned(worldId)
  })

  ipcMain.handle('loadImage', (_, id: number) => {
    return db.loadImage(id)
  })

  ipcMain.handle('togglePinChar', (_, id: number, unpin: boolean) => {
    return db.togglePinChar(id, unpin)
  })

  ipcMain.handle('updateChar', (_, character: CharacterType) => {
    return db.updateChar(character)
  })

  ipcMain.handle('searchChars', (_, searchQuery: string, column: string, reverse: boolean, worldId: number) => {
    return db.searchChars(searchQuery, column, reverse, worldId)
  })

  ipcMain.handle('exportCharacters', async (_, worldId: number) => {
    console.log('Exporting characters to file...')

    const characters = await db.readAllChars(worldId)

    // remove ID and Pinned fields, and account for valueless fields
    const data = characters.map((c) => ({
      name: c.name,
      desc: c.desc || '',
      dead: c.dead,
      age: c.age || null,
      gender: c.gender || '',
      location: c.location || '',
      occupation: c.occupation || '',
      species: c.species || ''
    }))
    const json = JSON.stringify(data)

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
      fs.writeFileSync(result.filePath, json)
      return { success: true, path: result.filePath }
    } catch (error) {
      console.error(error)
      return { success: false }
    }
  })

  ipcMain.handle('importCharacters', async (_, worldId: number) => {
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
      const characters: CharacterType[] = data.map((c) => ({
        name: c.name || 'Unnamed Character',
        desc: c.desc || '',
        dead: c.dead || 0,
        age: c.age || null,
        gender: c.gender || '',
        location: c.location || '',
        occupation: c.occupation || '',
        species: c.species || ''
      }))

      characters.forEach((c) => {
        db.createChar(c, worldId)
      })
      return { success: true, count: characters.length }
    } catch (error) {
      console.error(error)
      return { success: false }
    }
  })

  ipcMain.handle('removeImage', (_, id: number) => {
    return db.removeImage(id)
  })

  ipcMain.handle('updateImage', async (_, id: number) => {
    const file = await dialog.showOpenDialog({
      title: 'Upload Image',
      filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png'] }]
    })
    if (file.canceled || !file.filePaths || file.filePaths.length === 0) {
      return { success: false, message: 'Import cancelled' }
    }

    try {
      // Resize and convert to Buffer using sharp library
      const image = await Jimp.read(file.filePaths[0])
      image.cover({w: 352, h:352 })
      const imageBuffer = await image.getBuffer('image/jpeg', {quality: 80})
      console.log(imageBuffer);
      // 352 is 2x the size of the avatar display loader
      const result = await db.updateImage(id, imageBuffer)

      if (result && result.success) {
        return { success: true, message: 'Image updated successfully' }
      } else {
        // Handle case where result is null/undefined or success is false
        return {
          success: false,
          message: result?.message || 'Failed to update image',
          isError: true
        }
      }
    } catch (error) {
      console.error('Image processing or DB error:', error)
      return {
        success: false,
        message: 'Image is too large or wrong format',
        isError: true
      }
    }
  })

  // tags
  ipcMain.handle('getTags', async (_, worldId: number) => {
    return db.getTags(worldId)
  })

  ipcMain.handle('createTag', async (_, tag: TagType, worldId: number) => {
    return db.createTag(tag, worldId)
  })

  ipcMain.handle('updateTag', async (_, tag: TagType) => {
    return db.updateTag(tag)
  })

  ipcMain.handle('deleteTag', async (_, id: number) => {
    return db.deleteTag(id)
  })

  ipcMain.handle('getCharacterTags', async (_, characterId: number) => {
    return db.getCharacterTags(characterId)
  })

  ipcMain.handle('updateCharacterTags', async (_, characterId: number, tagList: number[]) => {
    return db.updateCharacterTags(characterId, tagList)
  })

  ipcMain.handle('searchCharactersByTag', async (_, tagName: string, column: string, reverse: boolean) => {
    return db.searchCharactersByTag(tagName, column, reverse)
  })

  ipcMain.handle('getTagSuggestions', async (_, query: string, worldId: number) => {
    return db.getTagSuggestions(query, worldId)
  })

  // worlds
  ipcMain.handle('getWorlds', async () => {
    return db.getWorlds()
  })

  ipcMain.handle('getWorld', async (_, id: number) => {
    return db.getWorld(id)
  })

  ipcMain.handle('accessWorld', async (_, id: number) => {
    return db.accessWorld(id)
  })

  ipcMain.handle('updateWorld', async (_, id: number, world: WorldType) => {
    return db.updateWorld(id, world);
  })

  ipcMain.handle('createWorld', async (_, world: WorldType) => {
    return db.createWorld(world)
  })


}

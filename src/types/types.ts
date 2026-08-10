export type CharacterType = {
  id?: number
  name: string
  desc?: string
  dead: number
  age?: number
  gender?: string
  location?: string
  occupation?: string
  species?: string
  pinned?: number,
  image?: string
}

export const blankCharacter: CharacterType = {
  name: '',
  desc: '',
  dead: 0,
  age: undefined,
  gender: '',
  location: '',
  occupation: '',
  species: '',
  pinned: 0
}

export type ApiTypes = {
  // CHARACTERS
  // create
  createChar(character: CharacterType, worldId: number): Promise<{ id: number; success: boolean }>
  
  //read
  getCount(worldId: number): Promise<number>
  readAllChars(worldId: number): Promise<CharacterType[]>
  readOneChar(id: number): Promise<CharacterType>
  readList(list: RecentChar[]): Promise<CharacterType[]>
  readPinned(worldId: number): Promise<CharacterType[]>
  searchChars(term: string, column: string, reverse: boolean, worldId: number): Promise<CharacterType[]>
  loadImage(id: number): Promise<{ success: boolean; image?: Buffer }>
  
  //update
  togglePinChar(id: number, unpin: boolean): Promise<{ success: boolean }>
  updateChar(character: CharacterType): Promise<{ success: boolean }>
  updateImage(id: number): Promise<{ success: boolean, message?: string, isError?: boolean }>
  
  //delete
  deleteChar(id: number): Promise<{ id: number; success: boolean }>
  deleteAllChars(worldId: number): Promise<{ success: boolean; count: number }>
  removeImage(id: number): Promise<{ success: boolean }>

  //import & export
  exportCharacters(worldId: number): Promise<{ success: boolean }>
  importCharacters(worldId: number): Promise<{ success: boolean; count?: number }>

  // TAGS
  //create
  createTag(tagName: string, worldId: number): Promise<{ success: boolean, newId: number }>

  //read
  getTags(worldId: number): Promise<TagType[]>
  getCharacterTags(characterId: number): Promise<TagType[]>
  getTagSuggestions(query: string, worldId: number): Promise<TagType[]>
  searchCharactersByTag(tagName: string,  column: string, reverse: boolean, worldId: number): Promise<CharacterType[]>

  //update
  updateTag(tag: TagType): Promise<{ success: boolean }>
  updateCharacterTags(characterId: number, tagIds: number[]): Promise<{ success: boolean, deleted: number, added: number }>

  //delete
  deleteTag(tagId: number): Promise<{ success: boolean }>

  // WORLDS
  // create
  createWorld(world: WorldType): Promise<{ success: boolean; id?: number }>

  //read
  getWorld(id: number): Promise<WorldType>
  getWorlds(): Promise<WorldType[]>

  //update
  accessWorld(id: number): Promise<{ success: boolean }>
  updateWorld(id: number, world: WorldType): Promise<{ success: boolean }>
}

export type RecentChar = {
  id: number
  timeStamp?: number
}

export type InterfaceConfig = {
  listStyle: 'small' | 'large'
  interfaceStyle: 'light' | 'dark'
  descLength: number
  speciesVisible: boolean
  genderVisible: boolean
  occupationVisible: boolean
  locationVisible: boolean
}

export type SearchMemory = {
  lastSearch: string
  lastSortColumn: string
  lastSortReverse: boolean
  lastScrollLocation: number
}

export const defaultSearchMemory = {
  lastSearch: '',
  lastSortColumn: '',
  lastSortReverse: false,
  lastScrollLocation: 0
}

export const defaultInterfaceConfig: InterfaceConfig = {
  listStyle: 'small',
  interfaceStyle: 'dark',
  descLength: 200,
  speciesVisible: true,
  genderVisible: true,
  occupationVisible: true,
  locationVisible: true
}

export type Notification = {
  id: string
  message: string
  type: 'destructive' | 'positive' | 'normal'
  hasProgress: boolean
  done?: boolean
}

export type TagType = {
  id: number,
  tag_name: string
}

export type WorldType = {
  id?: number,
  name: string,
  description?: string,
  lastAccessed?: number 
}

export const defaultActiveWorld = {
  id: 0
}
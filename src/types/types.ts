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
  // create
  createChar(character: CharacterType): Promise<{ id: number; success: boolean }>
  
  //read
  getCount(): Promise<number>
  readAllChars(): Promise<CharacterType[]>
  readOneChar(id: number): Promise<CharacterType>
  readList(list: RecentChar[]): Promise<CharacterType[]>
  readPinned(): Promise<CharacterType[]>
  searchChars(term: string, column: string, reverse: boolean): Promise<CharacterType[]>
  loadImage(id: number): Promise<{ success: boolean; image?: Buffer }>
  
  //update
  togglePinChar(id: number, unpin: boolean): Promise<{ success: boolean }>
  updateChar(character: CharacterType): Promise<{ success: boolean }>
  updateImage(id: number): Promise<{ success: boolean }>
  
  //delete
  deleteChar(id: number): Promise<{ id: number; success: boolean }>
  deleteAllChars(): Promise<{ success: boolean; count: number }>
  deleteImage(id: number): Promise<{ success: boolean }>

  //import & export
  exportCharacters(): Promise<{ success: boolean }>
  importCharacters(): Promise<{ success: boolean; count?: number }>
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

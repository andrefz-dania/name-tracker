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
  pinned?: number
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
  createChar(character: CharacterType): Promise<{ id: number; success: boolean }>
  deleteChar(id: number): Promise<{ id: number; success: boolean }>
  readAllChars(): Promise<CharacterType[]>
  readOneChar(id: number): Promise<CharacterType>
  updateChar(character: CharacterType): Promise<{ success: boolean }>
  searchChars(term: string, column: string, reverse: boolean): Promise<CharacterType[]>
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

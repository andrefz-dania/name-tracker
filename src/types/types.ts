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
}

export const blankCharacter: CharacterType = {
  name: '',
  desc: '',
  dead: 0,
  age: undefined,
  gender: '',
  location: '',
  occupation: '',
  species: ''
}

export type ApiTypes = {
      createChar(character: CharacterType): Promise<CharacterType>;
      deleteChar(id: number): Promise<{id: number, success: boolean}>;
      readAllChars(): Promise<CharacterType[]>;
      readOneChar(id: number): Promise<CharacterType>;
      updateChar(character: CharacterType): Promise<{success: boolean}>;
      searchChars(term: string): Promise<CharacterType[]>;
    };
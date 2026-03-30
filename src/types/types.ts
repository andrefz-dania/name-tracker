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

export type ApiTypes = {
      createChar(character: CharacterType): Promise<CharacterType>;
      deleteChar(id: number): Promise<{id: number, success: boolean}>;
      readAllChars(): Promise<CharacterType[]>;
      searchChars(term: string): Promise<CharacterType[]>;
    };
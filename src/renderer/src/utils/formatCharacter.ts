import type { CharacterType } from "../../../types/types";
import { capitalizeAll, capitalizeFirst, decapitalizeAll } from "./capitalize";

export function formatCharacter(character: CharacterType) {
    const formattedCharacter: CharacterType = {
        ...character,
      name: capitalizeAll(character.name),
      gender: decapitalizeAll(character.gender),
      location: capitalizeFirst(character.location),
      occupation: capitalizeFirst(character.occupation),
      species: decapitalizeAll(character.species),
      pinned: character.pinned ? 1 : 0
    }

    return formattedCharacter;
}
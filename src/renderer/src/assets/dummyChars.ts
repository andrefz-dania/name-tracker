import type { CharacterType } from "../../../types/types"
export const dummyChars: CharacterType[] = [
  {
    id: 0,
    name: 'Jimmy',
    shortDesc: 'Has a rather large nose',
    desc: 'He has a rather large nose, and he is very tall. He also likes to fish in the lakes near his house.',
    dead: false,
    age: 25,
    gender: 'male',
    location: 'unknown',
    occupation: 'Fisherman',
    species: 'Human'
  },
  {
    id: 1,
    name: 'Tim',
    shortDesc: 'Loves casting spells',
    desc: 'He loves casting spells, and also operates the forge in Brightstone. He has a white beard, and frequently wears a pimp outfit',
    dead: false,
    age: 84,
    gender: 'male',
    location: 'Brightstone',
    occupation: 'Forge Operator',
    species: 'Changeling'
  },
  {
    id: 2,
    name: 'Bingus',
    shortDesc:
      'Bingus has a much longer description here to test how the UI handles longer text strings',
    desc: 'Bingus is a cat. Bingus doesnt do much. In fact, he is only here to test the limits of this app that i am currently building',
    dead: false,
    age: 12,
    gender: 'male',
    location: 'Somewhere',
    occupation: 'None',
    species: 'Cat'
  }
]

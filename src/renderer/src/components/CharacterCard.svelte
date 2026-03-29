<script lang="ts">
  // import dummy data to an array
  import { truncateString } from '../lib/truncateString'
  import type { CharacterType } from '../../../types/types'
  let {character}: {character: CharacterType} = $props()
</script>

      <li
        class="grid grid-cols-6 gap-x-4 p-4 place-content-between bg-layer1 hover:bg-layer2 rounded-xl"
      >
        <h3 class="font-bold text-lg">{character.name}</h3>
                <p>{character.species}</p>
                <p>{character.gender}</p>
                <p>{character.occupation}</p>
        <p>{character.location}</p>
        <p>{character.dead ? 'Dead' : 'Alive'}</p>
        <p class="col-span-6 opacity-50">{truncateString(character.shortDesc, 120)}</p>
      </li>
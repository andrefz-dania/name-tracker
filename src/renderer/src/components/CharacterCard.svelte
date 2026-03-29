<script lang="ts">
  // import dummy data to an array
  import { truncateString } from '../lib/truncateString'
  import type { CharacterType } from '../../../types/types'
  let { character }: { character: CharacterType } = $props()
</script>

{#snippet Field(string?: String)}
  {#if string && string.length > 0}
    <p>{string}</p>
  {:else}
    <p class="opacity-50">Unknown</p>
  {/if}
{/snippet}

<li class="grid grid-cols-6 gap-x-4 p-4 place-content-between bg-layer1 hover:bg-layer2 rounded-xl">
  <h3 class="font-bold text-lg">{character.name}</h3>
  {@render Field(character.species)}
  {@render Field(character.gender)}
  {@render Field(character.occupation)}
  {@render Field(character.location)}
  {@render Field(character.dead ? 'Dead' : 'Alive')}

  {#if character.shortDesc}
    <p class="col-span-6 opacity-50">{truncateString(character.shortDesc, 120)}</p>
  {:else}
    <p class="h-0 col-span-6"></p>
  {/if}
</li>

<script lang="ts">
  // import dummy data to an array
  import { truncateString } from '../lib/truncateString'
  import type { CharacterType } from '../../../types/types'
  import { SkullIcon, SproutIcon, SquarePen, TrashIcon } from '@lucide/svelte'
  let { character }: { character: CharacterType } = $props()

  async function deleteCharacter() {
    const result = await window.api.deleteChar(character.id)
    console.log(result)
  }

  const handleDelete = ()=> {
    deleteCharacter();
  }
</script>



{#snippet Field(string?: String)}
  {#if string && string.length > 0}
    <p>{string}</p>
  {:else}
    <p class="opacity-50">Unknown</p>
  {/if}
{/snippet}

<li class="grid grid-cols-6 gap-x-4 px-4 py-2 place-content-between items-center bg-layer1 hover:bg-layer2 rounded-sm">
  <h3 class="font-bold text-lg">{character.name}</h3>
  {@render Field(character.species)}
  {@render Field(character.gender)}
  {@render Field(character.occupation)}
  {@render Field(character.location)}
  <div class="flex gap-2 place-content-between">
    {#if (character.dead === 1)}
    <p class="h-min text-destructive flex flex-row gap-2 bg-destructive-muted/50 w-min px-2 py-1 rounded-full"><SkullIcon></SkullIcon></p>
    {:else}
    <p class="h-min text-positive flex flex-row gap-2 bg-positive-muted/50 w-min px-2 py-1 rounded-full"><SproutIcon></SproutIcon></p>
    {/if}
    <div class="flex gap-2">

      <button class="bg-layer2 p-1 rounded-md text-primary border border-transparent hover:text-primary-highlight hover:border-primary"><SquarePen/></button>
      <button onclick={handleDelete} class="bg-layer2 p-1 rounded-md text-primary border border-transparent hover:text-primary-highlight hover:border-primary"><TrashIcon/></button>
    </div>
  </div>

  {#if character.desc}
    <p class="col-span-6 opacity-50">{truncateString(character.desc, 120)}</p>
  {:else}
    <p class="h-0 col-span-6"></p>
  {/if}
</li>

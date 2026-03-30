<script lang="ts">
  import { truncateString } from '../utils/truncateString'
  import type { CharacterType } from '../../../types/types'
  import { SkullIcon, SproutIcon, SquarePen, TrashIcon } from '@lucide/svelte'
  import { Heading2 } from './Headings.svelte'
  let { character, refresh }: { character: CharacterType; refresh: () => void } = $props()

  async function deleteCharacter() {
    const result = await window.api.deleteChar(character.id)
    // refresh character list once character is successfully deleted
    if (result.success === true) {
      refresh()
    }
    console.log(result)
  }

  const handleDelete = () => {
    deleteCharacter()
  }

  const dialogId = $derived('deleteDialog' + character.id);

  const link = $derived('#/character/' + character.id);

</script>

{#snippet Field(string?: String)}
  {#if string && string.length > 0}
    <p>{string}</p>
  {:else}
    <p class="opacity-50">Unknown</p>
  {/if}
{/snippet}


<a href={link}>
<li
  class="grid grid-cols-6 gap-x-4 px-4 py-2 place-content-between items-center bg-layer1 hover:bg-layer2 rounded-sm"
>
  <h3 class="font-bold text-lg">{character.name}</h3>
  {@render Field(character.species)}
  {@render Field(character.gender)}
  {@render Field(character.occupation)}
  {@render Field(character.location)}
  <div class="flex gap-2 place-content-between">
    {#if character.dead === 1}
      <p
        class="h-min text-destructive flex flex-row gap-2 bg-destructive-muted/50 w-min px-2 py-1 rounded-full"
      >
        <SkullIcon></SkullIcon>
      </p>
    {:else}
      <p
        class="h-min text-positive flex flex-row gap-2 bg-positive-muted/50 w-min px-2 py-1 rounded-full"
      >
        <SproutIcon></SproutIcon>
      </p>
    {/if}
    <div class="flex gap-2">
      <button
        class="p-1 rounded-md text-primary hover:text-primary-highlight hover:bg-layer3"
        ><SquarePen />
      </button>

      <button
        command="show-modal"
        commandfor={dialogId}
        class="p-1 rounded-md text-primary hover:text-primary-highlight hover:bg-layer3"
        ><TrashIcon />
      </button>

      <dialog id={dialogId} class="bg-transparent text-white max-w-xl mx-auto my-auto">
        <div class="flex flex-col bg-layer1 gap-4 p-8 border-primary border rounded-md shadow-xl">
          {@render Heading2(`Delete ${character.name}?`)}
          <p class="mb-4">This change cannot be undone, as the author has not yet made an undo feature.</p>

          <div class="flex gap-4 place-content-between">
            <button class="w-full bg-destructive-muted/50 border border-destructive text-destructive rounded-md text-lg font-bold px-4 py-2 hover:text-destructive-highlight hover:border-destructive-highlight hover:bg-destructive-muted" commandfor={dialogId} onclick={handleDelete} command="close">Delete</button>
            <button class="w-full bg-layer2 text-white rounded-md text-lg font-bold px-4 py-2 hover:bg-layer3" commandfor={dialogId} command="close">Cancel</button>

          </div>

        </div>
      </dialog>
    </div>
  </div>

  {#if character.desc}
    <p class="col-span-6 opacity-50">{truncateString(character.desc, 120)}</p>
  {:else}
    <p class="h-0 col-span-6"></p>
  {/if}
</li>
</a>

<script lang="ts">
  import type { CharacterType } from '../../../types/types'
  import { TrashIcon, UserIcon } from '@lucide/svelte'
  import { Heading2 } from './Headings.svelte'
  import StatusMarker from './StatusMarker.svelte'
  import { truncateString } from '../utils/truncateString'
  let { character, refresh }: { character: CharacterType; refresh: () => void } = $props()

  const settings = JSON.parse(localStorage.getItem('interfaceConfig'))
  const { descLength } = settings;

  async function deleteCharacter() {
    const result = await window.api.deleteChar(character.id)
    // refresh character list once character is successfully deleted
    if (result.success === true) {
      refresh()
    }
  }

  const handleDelete = () => {
    deleteCharacter()
  }

  const dialogId = $derived('deleteDialog' + character.id)

  const link = $derived('#/character/' + character.id)
</script>

{#snippet Field(string?: String)}
  {#if string && string.length > 0}
    <p class="text-sm capitalize">{string}</p>
  {:else}
    <p class="opacity-50 text-sm">Unknown</p>
  {/if}
{/snippet}

<a href={link} class="grid grid-cols-8 bg-layer1 rounded-md hover:bg-layer2">
<div class="p-2">
  <UserIcon size={96}></UserIcon>
</div>
  <li
    class="grid grid-cols-7 col-span-7 gap-x-4 px-4 py-4 place-content-between items-start"
  ><div class="col-span-2 w-full flex gap-2">
    <h3 class="font-bold">{character.name}</h3>
  </div>
    {@render Field(character.species)}
    {@render Field(character.gender)}
    {@render Field(character.occupation)}
    {@render Field(character.location)}
    <div class="flex gap-2 place-content-between">
      <StatusMarker dead={character.dead ? true : false}></StatusMarker>
      <div class="flex gap-2">
        <button
          command="show-modal"
          commandfor={dialogId}
          class="p-1 rounded-md text-primary hover:text-primary-highlight hover:bg-layer3"
          ><TrashIcon />
        </button>

        <dialog id={dialogId} class="bg-transparent text-textcol max-w-xl mx-auto my-auto">
          <div class="flex flex-col bg-layer1 gap-4 p-8 border-primary border rounded-md shadow-xl">
            {@render Heading2(`Delete ${character.name}?`)}
            <p class="mb-4">
              This change cannot be undone, as the author has not yet made an undo feature.
            </p>

            <div class="flex gap-4 place-content-between">
              <button
                class="w-full bg-destructive-muted/50 border border-destructive text-destructive rounded-md text-lg font-bold px-4 py-2 hover:text-destructive-highlight hover:border-destructive-highlight hover:bg-destructive-muted"
                commandfor={dialogId}
                onclick={handleDelete}
                command="close">Delete</button
              >
              <button
                class="w-full bg-layer2 text-textcol rounded-md text-lg font-bold px-4 py-2 hover:bg-layer3"
                commandfor={dialogId}
                command="close">Cancel</button
              >
            </div>
          </div>
        </dialog>


      </div>

     
    </div>
    <div class="col-span-7 mt-4">
     {#if character.desc}
       <p class="text-textcol/60 text-sm whitespace-pre-line">{truncateString(character.desc, descLength)}</p>
       {:else}
       <p class="opacity-50 text-sm">No description</p>
       {/if}
    </div>

  </li>
</a>

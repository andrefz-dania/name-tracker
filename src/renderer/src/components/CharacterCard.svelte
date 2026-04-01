<script lang="ts">
  import type { CharacterType } from '../../../types/types'
  import { TrashIcon } from '@lucide/svelte'
  import StatusMarker from './StatusMarker.svelte'
  import ModalDialogue from './ModalDialogue.svelte'
  let { character, refresh }: { character: CharacterType; refresh: () => void } = $props()

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

<a href={link}>
  <li
    class="grid grid-cols-7 gap-x-4 px-4 py-2 place-content-between items-center bg-layer1 hover:bg-layer2 rounded-sm"
  >
    <div class="col-span-2 w-full flex gap-2">
      <h3 class="font-bold">{character.name}</h3>
    </div>
    {@render Field(character.species)}
    {@render Field(character.gender)}
    {@render Field(character.occupation)}
    {@render Field(character.location)}
    <div class="flex gap-2 place-content-between">
      <div class="sr-only lg:not-sr-only">
        <StatusMarker dead={character.dead ? true : false} showText></StatusMarker>
      </div>
      <div class="not-sr-only lg:sr-only">
        <StatusMarker dead={character.dead ? true : false}></StatusMarker>
      </div>
      <div class="flex gap-2">

        <!-- DELETE FUNCTIONALITY -->
        <button
          command="show-modal"
          commandfor={dialogId}
          class="p-1 rounded-md text-primary hover:text-primary-highlight hover:bg-layer3"
          ><TrashIcon />
        </button>

        <ModalDialogue
          {dialogId}
          confirmAction={handleDelete}
          title={`Delete ${character.name}?`}
          description="This change cannot be undone, as the author has not yet made an undo feature."
          icon="warn"
          confirmText="Delete"
          cancelText="Cancel"
          confirmStyle="destructive"
        ></ModalDialogue>
      </div>
    </div>
  </li>
</a>

<script lang="ts">
  import type { CharacterType, InterfaceConfig } from '../../../types/types'
  import { TrashIcon } from '@lucide/svelte'
  import StatusMarker from './StatusMarker.svelte'
  import ModalDialogue from './ModalDialogue.svelte'
  let {
    character,
    refresh,
    interfaceConfig,
  }: { character: CharacterType; refresh: () => void; interfaceConfig: InterfaceConfig } = $props()

  let visibleColumnCount = $derived(
    1 + // name is always visible
      (interfaceConfig.speciesVisible ? 1 : 0) +
      (interfaceConfig.genderVisible ? 1 : 0) +
      (interfaceConfig.occupationVisible ? 1 : 0) +
      (interfaceConfig.locationVisible ? 1 : 0) +
      1 // status is always visible
  )

  const nameColSpan = 2

  let gridColsCSS = $derived(`grid-cols-${visibleColumnCount + 1}`
  )

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
    <p class="text-sm capitalize wrap-break-word overflow-x-scroll">{string}</p>
  {:else}
    <p class="opacity-50 text-sm">Unknown</p>
  {/if}
{/snippet}

<a href={link}>
  <li
    class="grid gap-x-4 px-4 py-2 place-content-between items-center bg-layer1 hover:bg-layer2 rounded-sm {gridColsCSS}"
  >
    <div class="col-span-{nameColSpan} w-full flex gap-2">
      <h3 class="font-bold wrap-break-word overflow-x-scroll">{character.name}</h3>
    </div>
    {#if interfaceConfig.speciesVisible}
      {@render Field(character.species)}
    {/if}
    {#if interfaceConfig.genderVisible}
      {@render Field(character.gender)}
    {/if}
    {#if interfaceConfig.occupationVisible}
      {@render Field(character.occupation)}
    {/if}
    {#if interfaceConfig.locationVisible}
      {@render Field(character.location)}
    {/if}
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

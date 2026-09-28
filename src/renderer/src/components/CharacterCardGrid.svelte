<script lang="ts">
  import type { CharacterType } from '../../../types/types'
  import { TrashIcon } from '@lucide/svelte'
  import { Heading2 } from './Headings.svelte'
  import StatusMarker from './StatusMarker.svelte'
  import { truncateString } from '../utils/truncateString'
  import AvatarLoader from './AvatarLoader.svelte'
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

<a href={link} class="bg-transparent rounded-md hover:bg-layer1">
  <li class="flex flex-col-reverse p-2 px-6 place-content-between items-center">
        <h3 class="font-bold wrap-break-word overflow-x-scroll -mb-6 p-2">
            {truncateString(character.name, 25)}
        </h3>
        <AvatarLoader id={character.id}></AvatarLoader>
    
    <div class="flex flex-row place-content-between w-full -mb-4">
      <StatusMarker dead={character.dead ? true : false}></StatusMarker>

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
  </li>
</a>

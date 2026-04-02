<script lang="ts">
  import { Pin } from '@lucide/svelte'
  import type { CharacterType } from '../../../types/types'
  import PinnedCharacter from './PinnedCharacter.svelte'

  let pinnedCharacters: CharacterType[] | [] = $state([])

  async function getCharacters() {
    pinnedCharacters = await window.api.readPinned()
  }

  getCharacters();
</script>

<div class="w-full">
  <p class="text-primary font-bold flex gap-2 my-2"><Pin></Pin>PINNED</p>
  {#if pinnedCharacters.length == 0}
    <p>No pinned characters</p>
  {:else}
    <div class="w-full flex gap-2 flex-col max-h-60 overflow-y-scroll">
      {#each pinnedCharacters as character}
        <PinnedCharacter {character}></PinnedCharacter>
      {/each}
    </div>
  {/if}
</div>

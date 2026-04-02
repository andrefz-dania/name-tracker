<script lang="ts">
  import { Clock } from '@lucide/svelte'
  import type { CharacterType, RecentChar } from '../../../types/types'
  import PinnedCharacter from './PinnedCharacter.svelte'

  const recentIds: RecentChar[] | [] = JSON.parse(localStorage.getItem('recents') || '[]')

  let recentCharacters: CharacterType[] | [] = $state([])

  async function getCharacters() {
    recentCharacters = await window.api.readList(recentIds)
    // add timestamp to each character based on matching id
    const timedChars = recentCharacters.map((c: CharacterType) => {
      const matchingTimestamp = recentIds.filter((r: RecentChar) => r.id === c.id)
      const timestamp = matchingTimestamp[0].timeStamp
      return {
        ...c,
        timeStamp: timestamp
      }
    })
    recentCharacters = timedChars.sort((a, b) => {
      return a.timeStamp - b.timeStamp
    })
  }

  getCharacters()
</script>

<div class="w-full">
  <p class="text-primary font-bold flex gap-2 my-2"><Clock></Clock>RECENT</p>
  {#if recentCharacters.length == 0}
    <p>No pinned characters</p>
  {:else}
    <div class="w-full flex gap-2 flex-col-reverse">
      {#each recentCharacters as character, i}
        <PinnedCharacter {character} fadeCount={i+1}></PinnedCharacter>
      {/each}
    </div>
  {/if}
</div>

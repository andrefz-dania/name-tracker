<script lang="ts">
  import { Clock } from '@lucide/svelte'
  import type { CharacterType, RecentChar } from '../../../types/types'
  import PinnedCharacter from './PinnedCharacter.svelte'
  import { getWorldContext } from '../utils/worldContext.svelte'

  const worldId: number = getWorldContext().activeWorld.id

  const storageName = `recents-` + worldId;

  const recentIds: RecentChar[] | [] = JSON.parse(localStorage.getItem(storageName) || '[]')

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
      return b.timeStamp - a.timeStamp
    })
  }

  getCharacters()
</script>

<div class="w-full">
  <p class="text-primary font-bold flex gap-2 my-2"><Clock></Clock>RECENT</p>
  {#if recentCharacters.length == 0}
    <p>No recent characters</p>
  {:else}
    <div class="w-full flex gap-2 flex-col">
      {#each recentCharacters as character, i}
        <PinnedCharacter {character} fadeCount={i}></PinnedCharacter>
      {/each}
    </div>
  {/if}
</div>

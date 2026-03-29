<script lang="ts">
  // import dummy data to an array
  import { ArrowDownAZ } from '@lucide/svelte'
import { dummyChars } from '../assets/dummyChars'
  import CharacterCard from './CharacterCard.svelte'
</script>


  <div class="grid grid-cols-6 gap-4 bg-layer1 px-4 py-2 w-full rounded-xl place-items-center max-w-6xl mx-auto mb-4">
  <!-- table header -->
  <div class="flex flex-row gap-2">
    <ArrowDownAZ class="opacity-50" />
    <p class="opacity-75">Name</p>
  </div>
    <div class="flex flex-row gap-2">
        <ArrowDownAZ class="opacity-50" />
      <p class="opacity-75">Species</p>
    </div>
    <div class="flex flex-row gap-2">
        <ArrowDownAZ class="opacity-50" />
      <p class="opacity-75">Gender</p>
    </div>
    <div class="flex flex-row gap-2">
        <ArrowDownAZ class="opacity-50" />
      <p class="opacity-75">Occupation</p>
    </div>
    <div class="flex flex-row gap-2">
        <ArrowDownAZ class="opacity-50" />
      <p class="opacity-75">location</p>
    </div>
    <div class="flex flex-row gap-2">
        <ArrowDownAZ class="opacity-50" />
      <p class="opacity-75">Status</p>
    </div>
  </div>

  <ul class="flex flex-col gap-2 w-full rounded-xl max-w-6xl mx-auto h-full overflow-y-scroll">
    {#each dummyChars as char}
      <CharacterCard character={char} />
    {/each}
  </ul>


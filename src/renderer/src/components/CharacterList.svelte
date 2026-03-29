<script lang="ts">
  // import dummy data to an array
  import { dummyChars } from '../assets/dummyChars'
  import CharacterCard from './CharacterCard.svelte'
</script>


  <div class="grid grid-cols-6 gap-4 bg-gray-800 px-4 py-2 w-full rounded-xl">
    <p>Name:</p>
    <p>Species:</p>
    <p>Gender:</p>
    <p>Occupation:</p>
    <p>location:</p>
    <p>Status:</p>
  </div>

  <ul class="flex flex-col gap-2 bg-gray-800 p-2 w-full rounded-xl">
    {#each dummyChars as char}
      <CharacterCard character={char} />
    {/each}
  </ul>


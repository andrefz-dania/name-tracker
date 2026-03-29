<script lang="ts">
  import { Heading1 } from '../components/Headings.svelte'

  // let {id} = $props();
</script>

<div>
  {@render Heading1('Create new character')}
  <form action="" class="max-w-6xl mx-auto flex flex-col gap-4">
    <div>
      <label for="name">Name:</label>
      <input
        class="p-2 rounded-lg bg-layer1 w-full focus-within:outline-0 focus-within:bg-layer2"
        type="text"
        name="name"
        placeholder="Name"
      />
    </div>
        <div>
      <label for="status">Name:</label>
      <select
        class="p-2 rounded-lg bg-layer1 w-full focus-within:outline-0 focus-within:bg-layer2 select"
        name="status"
        placeholder="Status"
        id="status"
      >
        <option class="opacity-50" value="" disabled selected hidden>Select a status...</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
      </select>
    </div>

    <button class="bg-primary rounded-lg p-4 font-bold mx-auto">Submit</button>
  </form>
</div>

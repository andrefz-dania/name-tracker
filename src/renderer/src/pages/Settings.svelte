<script lang="ts">
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
</script>

<Navigation></Navigation>

<Header>
  {@render Heading1('Settings')}
</Header>

<div class="max-w-6xl w-full mx-auto overflow-y-scroll">
  <div class="flex flex-row gap-2 w-full">
    <section>
      <h2 class="text-xl font-bold text-primary">General</h2>
      <h2 class="text-xl font-bold text-primary">Worlds</h2>
      <h2 class="text-xl font-bold text-primary">Storage</h2>
    </section>
    <form>
      <section class="m-4 p-4 bg-layer1 rounded-md w-full">
        <h3>interface style</h3>
        <h3>list style</h3>
        <h3>shown columns</h3>
        <h3>export all characters</h3>
        <h3>import characters</h3>
        <h3>tags</h3>
      </section>
    </form>
  </div>
</div>

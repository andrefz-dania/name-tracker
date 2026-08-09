<script lang="ts">
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'



</script>

<Navigation></Navigation>

<Header>
  {@render Heading1('Worlds')}
</Header>

<article class="mx-auto w-full max-w-6xl overflow-y-scroll p-2 flex flex-col gap-16">
  

</article>

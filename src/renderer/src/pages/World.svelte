<script lang="ts">
  import Header from "../components/Header.svelte"
  import { Heading1 } from "../components/Headings.svelte"
  import Navigation from "../components/Navigation.svelte"

let { id }: { id: number } = $props()
  
</script>

<Navigation>

</Navigation>

<Header>
  {@render Heading1('Title')}
  <p>{id}</p>
</Header>


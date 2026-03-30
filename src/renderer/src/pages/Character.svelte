<script lang="ts">
  import Header from "../components/Header.svelte"
  import { Heading1 } from "../components/Headings.svelte"

	let {id} = $props();
</script>
<Header>
  {@render Heading1('Characters Name')}
</Header>


<div>
  <h1>{id}</h1>
</div>


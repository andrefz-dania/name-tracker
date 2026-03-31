<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Heading3 } from './Headings.svelte'

  type Props = {
    children?: Snippet
    description?: String
    name: string
  }
  let { children, description, name }: Props = $props()
</script>

<div class="flex flex-col gap-2">
  <div id={name} class="flex flex-row gap-2 text-primary">
    {@render children?.()}
    {@render Heading3(name)}
  </div>
  <p class="text-textcol/50 text-sm">{description}</p>
</div>

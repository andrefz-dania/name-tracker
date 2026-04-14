<script lang="ts">
  import { XIcon } from '@lucide/svelte'
import type { TagType } from '../../../types/types'

  let { tag, editable, removeTag }: { tag: TagType, editable?: boolean, removeTag?: ()=> void } = $props()

</script>

<div class="px-2 py-1 rounded-full bg-primary/30 flex items-center text-primary-highlight h-min group w-fit">
  <p>#{tag.name}</p>
  {#if editable && removeTag}
  <button onclick={removeTag} class="text-primary-highlight px-3 sr-only group-hover:not-sr-only hover:text-textcol" type="button">
    <XIcon size={20}></XIcon>
  </button>
  {/if}
</div>

<script lang="ts">
  import { ChevronLeft, Settings } from '@lucide/svelte'
  import ButtonDecorated from './ButtonDecorated.svelte'
  import type { Snippet } from 'svelte'

  type PropTypes = {
    style?: 'no-back' | 'back'
    children?: Snippet
  }

  let { style, children }: PropTypes = $props()
</script>

{#if style == 'no-back'}
  <nav class="fixed flex w-full place-content-between pr-8">
    <div></div>
    <div class="flex gap-2">
      {@render children?.()}
      <a href="#/settings"
        ><ButtonDecorated style="outline" type="button"><Settings /></ButtonDecorated></a
      >
    </div>
  </nav>
{:else}
  <nav class="fixed flex w-full place-content-between pr-8">
    <div>
      <a href="#/"><ButtonDecorated style="outline"><ChevronLeft />Back</ButtonDecorated></a>
    </div>
    <div class="flex gap-2">
      {@render children?.()}
      <a href="#/settings"
        ><ButtonDecorated style="outline" type="button"><Settings /></ButtonDecorated></a
      >
    </div>
  </nav>
{/if}

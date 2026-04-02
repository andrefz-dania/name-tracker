<script lang="ts">
  import { ChevronLeft, Settings } from '@lucide/svelte'
  import ButtonDecorated from './ButtonDecorated.svelte'
  import type { Snippet } from 'svelte'

  type PropTypes = {
    style?: 'no-back' | 'back'
    children?: Snippet
    backOverride?: string
  }

  let { style, children, backOverride }: PropTypes = $props()

  const goBack= ()=> {
    if (backOverride) {
      window.location.href = backOverride
    }

    window.history.back()
  }
</script>

{#if style == 'no-back'}
  <nav class="fixed flex w-full place-content-between pr-8">
    <div></div>
    <div class="flex gap-4">
      {@render children?.()}
      <a href="#/settings"
        ><ButtonDecorated style="outline" type="button"><Settings /></ButtonDecorated></a
      >
    </div>
  </nav>
{:else}
  <nav class="fixed flex w-full place-content-between pr-8">
    <div>
         <ButtonDecorated style="outline" onclick={goBack}><ChevronLeft />Back</ButtonDecorated>
    </div>
    <div class="flex gap-4">
      {@render children?.()}
      <a href="#/settings"
        ><ButtonDecorated style="outline" type="button"><Settings /></ButtonDecorated></a
      >
    </div>
  </nav>
{/if}

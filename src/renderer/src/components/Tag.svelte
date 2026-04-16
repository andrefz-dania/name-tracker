<script lang="ts">
  import { XIcon } from '@lucide/svelte'
  import { defaultSearchMemory, type SearchMemory, type TagType } from '../../../types/types'

  type Props = {
    tag: TagType
    editable?: boolean
    navigable?: boolean
    removeTag?: () => void
  }
  let { tag, editable, navigable, removeTag }: Props = $props()

  const goToTag = () => {
    // load previous search and replace it with the #tag, then navigate to the sarch page with the #tag populated
    const prevSearch: SearchMemory =
      JSON.parse(localStorage.getItem('searchMemory')) || defaultSearchMemory
    const newSearch: SearchMemory = {
      ...prevSearch,
      lastSearch: '#' + tag.tag_name
    }
    localStorage.setItem('searchMemory', JSON.stringify(newSearch))
    window.location.hash = `#/list`
  }
</script>

<div
  class="px-2 py-1 rounded-full bg-primary/30 flex items-center text-primary-highlight h-min group w-fit"
>
  {#if navigable}
    <button type="button" onclick={goToTag} class="hover:cursor-pointer">
      <p>#{tag.tag_name}</p>
    </button>
  {:else}
    <p>#{tag.tag_name}</p>
  {/if}
  {#if editable && removeTag}
    <button
      onclick={removeTag}
      class="text-primary-highlight px-3 sr-only group-hover:not-sr-only hover:text-textcol hover:cursor-pointer"
      type="button"
    >
      <XIcon size={20}></XIcon>
    </button>
  {/if}
</div>

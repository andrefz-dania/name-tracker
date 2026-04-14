<script lang="ts">
  import { PlusIcon, XIcon } from '@lucide/svelte'
  import ButtonDecorated from './ButtonDecorated.svelte'
  import type { TagType } from '../../../types/types'
  import Tag from './Tag.svelte'

  type Props = {
    tags: TagType[]
    addTag: (tag: TagType) => void
  }

  let { tags, addTag }: Props = $props()

  let allTags: TagType[] = $state([])

  async function fetchTags() {
    const fetched = await window.api.getTags()
    allTags = fetched
  }

  fetchTags()

  let open: boolean = $state(false)
</script>
<div>
<ButtonDecorated
  style='transparent-primary'
  onclick={() => {
    open = !open
  }}
  type="button"
  ><PlusIcon></PlusIcon>
  {#if tags.length == 0}
    Add tags
  {/if}

</ButtonDecorated>
</div>


  <div class="relative h-0 w-0">
    {#if open}
      <div
        class="absolute shadow-md bg-layer0 border border-primary min-w-64 top-8 -left-8 p-2 flex flex-col gap-2 rounded-md max-h-64"
      >
        <div class="flex flex-row gap-2 place-content-between items-center min-w-full">
          <p class="text-primary-highlight pl-3 text-lg font-bold">Select tags to add</p>
          <ButtonDecorated style="transparent" type='button' onclick={() => open = false}><XIcon></XIcon></ButtonDecorated>
        </div>
        <div class="flex flex-row gap-2 flex-wrap w-full p-2">
          {#each allTags as t}
            <button
              type="button"
              onclick={(e) => {
                e.preventDefault()
                addTag(t)
              }}
            >
              <Tag tag={t}></Tag>
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>

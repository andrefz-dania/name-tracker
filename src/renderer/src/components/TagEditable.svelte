<script lang="ts">
  import { XIcon } from '@lucide/svelte'
  import type { TagType } from '../../../types/types'
  import ModalDialogue from './ModalDialogue.svelte'

  type Props = {
    tag: TagType,
    deleteSelf: () => Promise<void>
  }

  let { tag, deleteSelf }: Props = $props()
  const dialogId:string = $derived(tag.id + 'dialog')
</script>

<div
  class="px-2 py-1 rounded-full bg-primary/30 flex items-center text-primary-highlight h-min group"
>
  <p>#{tag.tag_name}</p>
  <button
    command="show-modal"
    commandfor={dialogId}
    class="text-primary-highlight px-3 sr-only group-hover:not-sr-only hover:text-textcol"
    type="button"
  >
    <XIcon size={20}></XIcon>
  </button>
  <ModalDialogue
  {dialogId}
  confirmAction={deleteSelf}
  title="Delete #{tag.tag_name}?"
  description='Are you sure you want to delete #{tag.tag_name}? This will also remove this tag from ALL characters'
  icon='warn'
  confirmText='Delete'
  cancelText='Cancel'
  confirmStyle='destructive'
  >

  </ModalDialogue>
</div>

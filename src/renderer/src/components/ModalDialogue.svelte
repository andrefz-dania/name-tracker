<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Heading2 } from './Headings.svelte'
  import ButtonDecorated from './ButtonDecorated.svelte'
  import { Info, TriangleAlert } from '@lucide/svelte'

  type Props = {
    dialogId: string
    title: string
    description?: string
    icon?: 'warn' | 'info'
    confirmAction: () => void
    children?: Snippet
    cancelText?: string
    confirmText?: string
    confirmStyle?: 'destructive' | 'normal' | 'outline' | 'positive'
  }

  let {
    dialogId,
    title,
    description,
    icon,
    confirmAction,
    children,
    cancelText,
    confirmText,
    confirmStyle
  }: Props = $props()
</script>

<dialog id={dialogId} class="bg-transparent text-textcol max-w-xl mx-auto my-auto">
  <div class="flex flex-col bg-layer0 gap-4 p-8 border-primary border rounded-md shadow-xl md:min-w-lg">
    <div class="flex flex-row gap-2 text-primary w-full items-center place-content-center">
      {#if icon == 'warn'}
        <TriangleAlert></TriangleAlert>
      {:else if icon == 'info'}
        <Info></Info>
      {/if}
      {@render Heading2(`${title}`)}
    </div>
    <p class="mb-4 text-textcol/75">
      {description ? description : ''}
    </p>
    {@render children?.()}

    <div class="flex gap-4 place-content-between">
      <ButtonDecorated type="button" commandfor={dialogId} onclick={confirmAction} command="close" style={confirmStyle}>
        {confirmText ?? 'Confirm'}
      </ButtonDecorated>

      <ButtonDecorated type="button" commandfor={dialogId} command="close" style='outline'>
        {cancelText ?? 'Cancel'}
      </ButtonDecorated>
    </div>
  </div>
</dialog>

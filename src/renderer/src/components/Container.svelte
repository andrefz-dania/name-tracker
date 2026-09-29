<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    children?: Snippet
  }

  let { children }: Props = $props()
</script>

<div
  class="w-full bg-layer1/50 rounded-2xl border-layer2 corner-scoop border"
>
  <div
    class="flex flex-col gap-4 p-4 items-center text-center h-full rounded-[3rem] border border-layer2"
  >
    {@render children?.()}
  </div>
</div>

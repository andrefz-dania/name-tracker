<script lang="ts">
  import { CircleUserRound } from '@lucide/svelte'
  import { onMount } from 'svelte'

  let { id }: { id: number } = $props()
  let generatedUrl = $state('')

  async function loadImage(id: number) {
    const buffer = await window.api.loadImage(id)
    if (buffer.image.byteLength > 1) {
      const blob = new Blob([buffer.image], { type: 'image/jpeg' })
      const imageUrl = URL.createObjectURL(blob)
      generatedUrl = imageUrl
      loaded = true
    }
  }

  let loaded = $state(false)
  onMount(() => {
    console.log('Loader', id)
    loadImage(id)
  })
</script>

<div class="max-w-44 aspect-square border-3 border-primary rounded-full overflow-hidden">
    {#if loaded}
    <img alt="" src={generatedUrl} class="rounded-full"/>
  {:else}
    <CircleUserRound size={176} class="text-primary"></CircleUserRound>
  {/if}
</div>

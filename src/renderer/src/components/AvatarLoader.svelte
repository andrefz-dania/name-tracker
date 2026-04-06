<script lang="ts">
  import { CircleUserRound } from '@lucide/svelte'

  let { id }: { id: number } = $props()
  let generatedUrl = $state('')
    let loaded = $state(false)

  async function loadImage(id: number) {
    loaded = false
    const buffer = await window.api.loadImage(id)
    if (buffer && buffer.image && buffer.image.byteLength > 1) {
      const blob = new Blob([buffer.image], { type: 'image/jpeg' })
      const imageUrl = URL.createObjectURL(blob)
      generatedUrl = imageUrl
      loaded = true
    }
  }

  $effect(()=>{
    loadImage(id)
  }) 


</script>

<div class="max-w-44 aspect-square border-3 border-primary rounded-full overflow-hidden flex items-center">
    {#if loaded}
    <img alt="" src={generatedUrl} class="rounded-full"/>
  {:else}

    <CircleUserRound class="text-primary w-full" size={'auto'}></CircleUserRound>
  {/if}
</div>

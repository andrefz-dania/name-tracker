<script lang="ts">
  import { SkullIcon, SproutIcon } from '@lucide/svelte'

  type PropTypes = {
    dead?: Boolean
    showText?: Boolean
  }

  let { dead, showText }: PropTypes = $props()

  const mainClasses = "h-min flex flex-row gap-2 w-min px-2 py-1 rounded-full";
  const text = $derived(dead ? "Dead" : "Alive")
  const statusClasses = $derived(dead ? "text-destructive bg-destructive-muted/50" : "text-positive bg-positive-muted/50")
  const textClasses = $derived(showText ? "font-bold pr-4" : "")

  const classes = $derived(`${mainClasses} ${statusClasses} ${textClasses}`)

</script>

<p class={classes}>
    {#if dead}
        <SkullIcon></SkullIcon>
    {:else}
        <SproutIcon></SproutIcon>
    {/if}


    {#if showText}
       {text}
    {/if}
</p>



<script lang="ts">
  import { Check, LoaderCircle, TriangleAlert } from "@lucide/svelte"

    type Props = {
        message: string,
        id: string,
        type?: 'normal' | 'positive' | 'destructive' | 'progress'
    }
    let {message, type}: Props = $props()
</script>


{#if type == 'destructive'}
<div class="w-full max-w-lg bg-destructive-muted/50 border border-destructive p-2 rounded-md">
    <p class="text-destructive flex gap-2"><TriangleAlert></TriangleAlert>{message}</p>
</div>

{:else if type == 'positive'}

<div class="w-full max-w-lg bg-positive-muted/50 border border-positive p-2 rounded-md">
    <p class="text-positive flex gap-2"><Check></Check>{message}</p>
</div>

{:else if type == 'progress'}

<div class="w-full max-w-lg bg-layer1 border border-primary p-2 rounded-md text-primary-highlight">
    <p class="flex gap-2"><LoaderCircle class="animate-spin" />{message}</p>
</div>

{:else}

<div class="w-full max-w-lg bg-layer1 border border-primary p-2 rounded-md text-primary-highlight">
    <p>{message}</p>
</div>

{/if}
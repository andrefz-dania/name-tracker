<script lang="ts">
  import type { Snippet } from 'svelte'

  interface ButtonProps {
    children?: Snippet
    type?: 'submit' | 'reset' | 'button'
    onclick?: () => void
    style?: 'active' | 'inactive'
    disabled?: boolean
  }

  let { children, type, onclick, style, disabled }: ButtonProps = $props()

</script>

{#if style == 'active'}
  <button
    class="flex font-bold items-center gap-2 cursor-pointer bg-linear-to-r from-layer1 via-layer2 to-layer1 corner-bevel px-4 p-2 rounded-full w-full place-items-center place-content-center border border-primary-highlight text-primary-highlight relative"
    {type}
    {onclick}
    {disabled}>{@render children()}
    <div class="aspect-square h-2 bg-primary-highlight bottom-0 left-0 absolute corner-bevel rounded-tr-full outline outline-primary-highlight"></div>
    <div class="aspect-square h-2 bg-primary-highlight top-0 right-0 absolute corner-bevel rounded-bl-full outline outline-primary-highlight"></div>

    </button
  >
{:else}
  <button
    class="flex font-bold items-center gap-2 cursor-pointer p-2 bg-layer1 corner-bevel px-8 rounded-full w-full place-items-center place-content-center border border-transparent text-primary"
    {type}
    {onclick}
    {disabled}>{@render children()}</button
  >
{/if}

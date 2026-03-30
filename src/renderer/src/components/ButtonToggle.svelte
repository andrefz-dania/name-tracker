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
    class="flex items-center gap-2 cursor-pointer bg-layer1 p-2 rounded-full w-full place-items-center place-content-center border border-primary-highlight text-primary-highlight"
    {type}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else}
  <button
    class="flex items-center gap-2 cursor-pointer p-2 rounded-full w-full place-items-center place-content-center border border-transparent text-primary"
    {type}
    {onclick}
    {disabled}>{@render children()}</button
  >
{/if}

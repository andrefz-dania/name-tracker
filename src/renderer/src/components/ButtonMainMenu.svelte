<script lang="ts">
  import type { Snippet } from 'svelte'

  interface ButtonProps {
    children?: Snippet
    type?: 'submit' | 'reset' | 'button'
    onclick?: () => void
    style?:
      | 'normal'
      | 'small'
    disabled?: boolean
    command?: string
    commandfor?: string
  }

  let { children, type, onclick, style, disabled, command, commandfor }: ButtonProps = $props()
</script>

{#if disabled && style=='small'}
  <button
    class="opacity-50 text-xl font-bold items-center flex place-content-between gap-2 text-primary bg-layer1 rounded-xl p-4 px-4"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else if disabled}
  <button
    class="opacity-50 text-xl font-bold items-center flex place-content-between gap-2 text-primary bg-layer1 rounded-xl p-4 px-4 w-full"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else if style == 'small'}
  <button
    class="cursor-pointer text-xl font-bold items-center flex place-content-between gap-2 text-primary bg-layer1 rounded-xl p-4 px-4 hover:text-primary-highlight hover:bg-layer2"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else}
  <button
    class="cursor-pointer text-xl font-bold items-center flex place-content-between gap-2 text-primary bg-layer1 rounded-xl p-4 px-4 w-full hover:text-primary-highlight hover:bg-layer2"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{/if}
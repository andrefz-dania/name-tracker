<script lang="ts">
  import type { Snippet } from 'svelte'

  interface ButtonProps {
    children?: Snippet
    type?: 'submit' | 'reset' | 'button'
    onclick?: () => void
    style?:
      | 'normal'
      | 'normal-static'
      | 'outline'
      | 'destructive'
      | 'positive'
      | 'simple'
      | 'transparent'
      | 'menu'
    disabled?: boolean
    command?: string
    commandfor?: string
  }

  let { children, type, onclick, style, disabled, command, commandfor }: ButtonProps = $props()
</script>

{#if disabled}
  <button
    class="cursor-pointer items-center flex place-content-center gap-2 text-primary bg-transparent outline-primary outline-1 rounded-md p-2 px-2 w-full opacity-50"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else if style == 'positive'}
  <button
    class="cursor-pointer items-center flex place-content-center gap-2 text-positive bg-positive-muted/50 rounded-md p-2 px-2 w-full hover:bg-positive-muted hover:text-positive-highlight hover:outline border-positive-highlight"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else if style == 'outline'}
  <button
    class="cursor-pointer items-center flex place-content-center gap-2 text-primary bg-transparent outline-primary outline-1 rounded-md p-2 px-2 w-full hover:bg-layer3/20 hover:outline-primary-highlight hover:text-primary-highlight"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else if style == 'destructive'}
  <button
    class="cursor-pointer items-center flex place-content-center gap-2 text-destructive bg-destructive-muted/50 rounded-md p-2 px-2 w-full hover:bg-destructive-muted hover:text-destructive-highlight hover:outline border-destructive-highlight"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else if style == 'simple'}
  <button
    class="cursor-pointer items-center flex place-content-center gap-2 bg-layer2 text-textcol p-2 rounded-md hover:bg-layer3"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else if style == 'transparent'}
  <button
    class="cursor-pointer items-center flex place-content-center gap-2 text-textcol p-2 rounded-md hover:bg-layer1"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else if style == 'normal-static'}
  <button
    class="cursor-pointer items-center flex place-content-center gap-2 text-white bg-primary rounded-md p-2 px-2 w-full hover:bg-primary-muted"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{:else if style == 'menu'}
  <button
    class="cursor-pointer text-xl font-bold items-center flex place-content-between gap-2 text-primary bg-layer1 rounded-xl p-4 px-4 w-full hover:text-primary-highlight hover:bg-layer2"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
  {:else}
  <button
    class="cursor-pointer font-bold items-center flex place-content-center gap-2 text-white bg-primary rounded-md p-2 px-4 w-full hover:bg-primary-muted"
    {type}
    {command}
    {commandfor}
    {onclick}
    {disabled}>{@render children()}</button
  >
{/if}

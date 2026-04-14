<script lang="ts">

type Props = {
  label: string,
  value: any,
  name: string,
  placeholder: string,
  id: string,
  maxLength?: number,
  autofocus?: boolean
  type?: 'text' | 'number'
}
  let { label, value = $bindable(), name, placeholder, id, type = 'text', maxLength, autofocus }: Props = $props();
  let error = $state('');
</script>

<div class="flex flex-col gap-1 w-full">
  <label for={id || name} class="text-primary">
    {label}
  </label>
  <input
    class="whitespace-pre p-2 rounded-md bg-layer1 w-full focus-within:outline-0 border border-transparent focus-within:border-primary"
    type={type}
    name={name}
    bind:value={value}
    placeholder={placeholder}
    id={id}
    maxlength={maxLength}
    {autofocus}
  />
  {#if error}
    <span class="text-xs text-error">{error}</span>
  {/if}
</div>
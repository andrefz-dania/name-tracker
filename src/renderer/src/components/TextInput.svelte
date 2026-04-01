<script lang="ts">
  let { label, value = $bindable(), name, placeholder, id, type = 'text' } = $props();
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
  />
  {#if error}
    <span class="text-xs text-error">{error}</span>
  {/if}
</div>
<script lang="ts">
  let { label, value, name, placeholder, id, type = 'text' } = $props();
  let error = $state('');
</script>

<div class="flex flex-col gap-1">
  <label for={id || name}>
    {label}
  </label>
  <input
    class="p-2 rounded-md bg-layer1 w-full focus-within:outline-0 focus-within:bg-layer2"
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
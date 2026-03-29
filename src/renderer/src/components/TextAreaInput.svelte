<script lang="ts">
  let { label, value = $bindable(), name, placeholder, id, rows } = $props();
  let error = $state('');
</script>

<div class="flex flex-col gap-1">
  <label for={id || name}>
    {label}
  </label>
  <textarea
    class="p-2 rounded-md bg-layer1 w-full focus-within:outline-0 border border-transparent focus-within:border-primary"
    name={name}
    rows={rows || '4'}
    bind:value={value}
    placeholder={placeholder}
    id={id}
  ></textarea>
  {#if error}
    <span class="text-xs text-error">{error}</span>
  {/if}
</div>
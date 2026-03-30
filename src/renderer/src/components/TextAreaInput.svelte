<script lang="ts">

type PropTypes = {
  label?: string;
  value: any;
  name: string;
  placeholder?: string;
  id: string;
  rows?: number;
}
  let { label, value = $bindable(), name, placeholder, id, rows }: PropTypes = $props();
</script>

<div class="flex flex-col gap-1">
{#if label}
  <label for={id || name}>
    {label}
  </label>

  {/if}
  <textarea
    class="p-2 rounded-md bg-layer1 w-full focus-within:outline-0 border border-transparent focus-within:border-primary"
    name={name}
    rows={rows || 4}
    bind:value={value}
    placeholder={placeholder}
    id={id}
  ></textarea>
</div>
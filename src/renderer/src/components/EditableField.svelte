<script lang="ts">
  type PropTypes = {
    value: any
    name: string
    id: string
    type?: 'text' | 'number'
    placeholder?: string
    defaultvalue?: string | number
    size?: number
  }
  let { value = $bindable(), name, id, type, placeholder, defaultvalue, size }: PropTypes = $props()

</script>


  <input
    {name}
    {id}
    bind:value={value}
    type={type || 'text'}
    {placeholder}
    {defaultvalue}
    {size}
    class="text-white/50 focus-within:text-white p-2 w-full rounded-md text-center min-w-fit focus-within:outline-0 border border-transparent focus-within:border-primary whitespace-pre-wrap"
  />

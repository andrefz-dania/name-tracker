<script lang="ts">
  type PropTypes = {
    value: any
    name: string
    id: string
    placeholder?: string
    defaultvalue?: string | number
  }
  let { value = $bindable(), name, id, placeholder, defaultvalue }: PropTypes = $props()

</script>


  <input
    {name}
    {id}
    bind:value={value}
    type='text'
    {placeholder}
    {defaultvalue}
    class="text-primary capitalize font-bold text-3xl focus-within:text-textcol p-2 w-full rounded-md text-center min-w-fit focus-within:outline-0  whitespace-pre-wrap font-display"
  />

<script lang="ts">
  import { onMount } from 'svelte'
  type PropTypes = {
    value: any
    name: string
    id: string
    placeholder?: string
    defaultvalue?: string
  }
  let { value = $bindable(), name, id, placeholder, defaultvalue }: PropTypes = $props()

  // get scrollHeight of this component
  let element
  let scrollHeight = $state(0)
  // account for border
  let desiredHeigt = $derived(scrollHeight + 2 + 'px')

  onMount(() => {
    if (element) {
      scrollHeight = element.scrollHeight
    }
  })

  const resize = () => {
    if (element) {
      //allow the component to shrink as well
      element.style.height = 'auto'
      scrollHeight = element.scrollHeight
      element.style.height = desiredHeigt
    }
  }

  // run the resize whenever text changes
  $effect(() => {
    if (value) {
      resize()
    }
  })
</script>

<textarea
  bind:this={element}
  {name}
  {id}
  bind:value
  {placeholder}
  {defaultvalue}
  class="text-white/50 focus-within:text-white p-4 rounded-md bg-layer1 w-full focus-within:outline-0 border border-transparent focus-within:border-primary whitespace-pre-wrap resize-none box-border"
>
</textarea>

<script lang="ts">
  import type { CharacterType, TagType } from '../../../types/types'
  import { debounce } from '../utils/debounce'
  import {
    commands,
    navigateToCharacter,
    runCommand,
    showTagged,
    type CommandType
  } from '../utils/runCommand'
  import { Heading1 } from './Headings.svelte'

  let isOpen: boolean = $state(false)
  let selectedOption: number = $state(0)
  let commandBar

  let command: string = $state('')

  let tags: TagType[] = $state([])
  let characters: CharacterType[] = $state([])

  let filteredCommands = $derived(
    commands.filter((c: CommandType) => c.name.toLowerCase().includes(command.toLowerCase()))
  )

  let totalLength: number = $derived(filteredCommands.length + tags.length + characters.length)

  const debouncedSearch = $derived(debounce(search, 100))

  async function invertState() {
    isOpen = !isOpen
  }

  function focusCommandbar() {
    if (commandBar) {
      commandBar.select()
    }
  }

  async function getTagSuggestions() {
    tags = await window.api.getTagSuggestions(command)
    console.log($state.snapshot(tags))
  }

  async function getCharacterSuggestions() {
    characters = await window.api.searchChars(command, 'name', false)
  }

  async function search() {
    getTagSuggestions()
    getCharacterSuggestions()
  }

  const hotkeys = (e: KeyboardEvent) => {
    const key = e.key as 'ArrowDown' | 'ArrowUp' | 'Enter' | 'p' | 'k' | 'Escape'

    switch (key) {
      case 'p':
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault()
          invertState().then(() => focusCommandbar())
        }
        break
        
      case 'k':
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault()
          invertState().then(() => focusCommandbar())
        }
        break

      case 'Escape':
        isOpen = false
        break

      case 'ArrowDown':
        e.preventDefault()
        if (selectedOption < totalLength - 1) selectedOption++
        else selectedOption = 0
        break

      case 'ArrowUp':
        e.preventDefault()
        if (selectedOption > 0) selectedOption--
        else selectedOption = totalLength - 1
        break

      case 'Enter':
        runSelected();
        break
    }
  }

  function runSelected() {
        if (totalLength == 0 || command.length == 0) return;
        if (selectedOption <= filteredCommands.length - 1 && filteredCommands.length != 0) {
          runCommand(filteredCommands[selectedOption].id)
        } else if (selectedOption < filteredCommands.length + characters.length) {
          const index = selectedOption - (filteredCommands.length | 0)
          navigateToCharacter(characters[index].id)
        } else {
          const index = selectedOption - (filteredCommands.length | 0) - (characters.length | 0)
          showTagged(tags[index].tag_name)
        }
        isOpen = false
  }

  async function setSelected(n: number) {
    selectedOption = n
  }

  $effect(() => {
    if (command.length > 0) {
      debouncedSearch()
    }
  })

</script>

<svelte:window onkeydown={hotkeys} />

{#snippet Result(text, index, offset)}
<button class="text-left cursor-pointer" onclick={()=>{setSelected(index + offset).then(()=>runSelected())}}>
  {#if selectedOption == index + offset}
    <p class="p-1 px-2 rounded-md text-textcol bg-layer2">
      {text}
    </p>
  {:else}
    <p class="p-1 px-2 rounded-md text-textcol/50 hover:bg-layer2 hover:text-textcol">
      {text}
    </p>
  {/if}
  </button>
{/snippet}

{#snippet TagResult(text, index, offset)}
<button class="text-left cursor-pointer my-1" onclick={()=>{setSelected(index + offset).then(()=>runSelected())}}>
  {#if selectedOption == index + offset}
    <p class="p-1 px-2 rounded-full text-textcol bg-primary/30 w-fit outline outline-textcol">
      #{text}
    </p>
  {:else}
    <p class="p-1 px-2 rounded-full text-primary-highlight bg-primary/30 w-fit outline outline-transparent hover:outline-textcol hover:text-textcol">
      #{text}
    </p>
  {/if}
  </button>
{/snippet}

<dialog class="absolute top-0 h-screen w-screen z-90 bg-black/50 backdrop-blur-xs" open={isOpen}>
  <section class=" flex items-center place-content-center">
    <div class="mt-24 flex flex-col gap-2 text-textcol md:min-w-xl">
      {@render Heading1('Quick Commands')}
      <input
        bind:this={commandBar}
        bind:value={command}
        type="text"
        placeholder="Enter command..."
        class="p-4 rounded-md bg-layer1 text-lg w-full focus-within:outline-0 border border-transparent focus-within:border-primary text-textcol"
      />
      {#if command.length > 0}
        <div class="bg-layer1 border flex flex-col border-primary rounded-md p-2 max-h-96 overflow-y-scroll">
          <p class="text-sm uppercase text-primary font-bold">commands</p>
          {#each filteredCommands as o, index}
            {@render Result(o.name, index, 0)}
          {/each}
          <p class="text-sm uppercase text-primary font-bold mt-2">characters</p>
          {#each characters as c, index}
            {@render Result(c.name, index, filteredCommands.length)}
          {/each}
            <p class="text-sm uppercase text-primary font-bold mt-2">tags</p>
            {#each tags as t, index}
              {@render TagResult(t.tag_name, index, filteredCommands.length + characters.length)}
            {/each}
        </div>
        <!-- <p class="text-textcol">Option: {selectedOption}</p>
        <p class="text-textcol">commands: {filteredCommands.length}</p>
        <p class="text-textcol">Characters: {characters.length}</p>
        <p class="text-textcol">tags: {tags.length}</p>
        <p class="text-textcol">Length: {totalLength}</p> -->
      {/if}
    </div>
  </section>
</dialog>

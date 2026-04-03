<script lang="ts">
  import {
    ArrowDownWideNarrow,
    ArrowUpDown,
    ArrowUpNarrowWide,
    CaseUpper,
    Cat,
    CirclePlus,
    Hammer,
    Info,
    MapPin,
    Search,
    VenusAndMars,
    XIcon
  } from '@lucide/svelte'
  import CharacterCard from './CharacterCard.svelte'
  import { Heading1 } from './Headings.svelte'
  import Header from './Header.svelte'
  import ButtonDecorated from './ButtonDecorated.svelte'
  import Navigation from './Navigation.svelte'
  import { debounce } from '../utils/debounce'
  import {
    defaultSearchMemory,
    type InterfaceConfig,
    type SearchMemory
  } from '../../../types/types'
  import CharacterCardImage from './CharacterCardImage.svelte'

  let { interfaceConfig }: { interfaceConfig: InterfaceConfig } = $props()

  const savedSearch: SearchMemory =
    JSON.parse(localStorage.getItem('searchMemory')) || defaultSearchMemory

  let sortColumn: string = $state(savedSearch.lastSortColumn || 'name')
  let sortReverse: boolean = $state(savedSearch.lastSortReverse || false)
  let searchTerm: string = $state(savedSearch.lastSearch || '')

  let skipDebounce: boolean = $state(false)

  let visibleColumnCount = $derived(
    2 + // name is always visible
      (interfaceConfig.speciesVisible ? 1 : 0) +
      (interfaceConfig.genderVisible ? 1 : 0) +
      (interfaceConfig.occupationVisible ? 1 : 0) +
      (interfaceConfig.locationVisible ? 1 : 0) +
      1 // status is always visible
  )

  let gridColsCSS = $derived(
    interfaceConfig.listStyle === 'large'
      ? `grid-cols-${visibleColumnCount + 1}`
      : `grid-cols-${visibleColumnCount}`
  )

  let searchBar

  let characters = $state([])

  const debouncedSearch = $derived(debounce(search, 300))

  $effect(() => {
    // instantly re-fetch the full list when the field is cleared
    // also makes searchTerm a dependency of the effect, making it work correctly.
    if (searchTerm.length == 0 || skipDebounce) {
      search()
    } else {
      debouncedSearch()
    }
  })

  function focusSearch() {
    if (searchBar) {
      // this part places cursor inside field
      //searchBar.focus()
      // this part selects all text in it, but also focuses the field, making the previous line unneeded. Kept for reference
      searchBar.select()
    }
  }

  const hotkeyCtrlF = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
      e.preventDefault()
      focusSearch()
    }
  }

  async function getCharacters() {
    characters = await window.api.readAllChars()
  }

  async function search() {
    characters = await window.api.searchChars(searchTerm, sortColumn, sortReverse)
    console.log('searching for', searchTerm)
    // save search to localstorage
    const saved: SearchMemory = {
      lastSearch: searchTerm,
      lastSortColumn: sortColumn,
      lastSortReverse: sortReverse,
      lastScrollLocation: 0
    }
    localStorage.setItem('searchMemory', JSON.stringify(saved))
  }

  const refresh = () => {
    if (searchTerm.length > 0) {
      search()
    } else {
      getCharacters()
    }
  }
</script>

<svelte:window onkeydown={hotkeyCtrlF}></svelte:window>

<Navigation>
  <a href="#/create"><ButtonDecorated type="button"><CirclePlus />New Character</ButtonDecorated></a
  >
</Navigation>

<Header>
  {@render Heading1('Characters')}

  <!-- search bar -->
  <div class="max-w-2xl flex flex-row w-full mx-auto gap-4 mb-4 mt-8">
    <form class="flex flex-row w-full gap-3" action="" onsubmit={e=>e.preventDefault()}>
      <input
        class="p-4 rounded-md bg-layer1/75 text-lg w-full focus-within:outline-0 border border-transparent focus-within:border-primary"
        type="text"
        bind:this={searchBar}
        bind:value={searchTerm}
        placeholder="search..."
        onkeydown={() => (skipDebounce = false)}
      />
      <div class="w-16 -ml-18 flex items-center place-content-center">
        {#if searchTerm.length > 0}
          <ButtonDecorated style="simple" type="reset"><XIcon></XIcon></ButtonDecorated>
        {:else}
          <ButtonDecorated style="transparent" type="submit"><Search></Search></ButtonDecorated>
        {/if}
      </div>
    </form>
  </div>
</Header>

{#snippet ColumnIcon()}
  {#if sortReverse == false}
    <ArrowDownWideNarrow class="" />
  {:else}
    <ArrowUpNarrowWide class="" />
  {/if}
{/snippet}

{#snippet ColumnLabelIcon(name: String)}
  {#if name == 'species'}
    <Cat></Cat>
  {:else if name == 'name'}
    <CaseUpper></CaseUpper>
  {:else if name == 'occupation'}
    <Hammer></Hammer>
  {:else if name == 'location'}
    <MapPin></MapPin>
  {:else if name == 'gender'}
    <VenusAndMars></VenusAndMars>
  {:else if name == 'status'}
    <Info></Info>
  {/if}
{/snippet}

{#snippet ColumnLabel(name: string)}
  {#if sortColumn == name}
    <button
      type="button"
      class="flex w-full border border-transparent flex-row gap-2 hover:bg-layer1 p-2 px-2 rounded-md text-primary-highlight hover:text-textcol relative"
      onclick={() => {
        skipDebounce = true
        sortColumn = name
        sortReverse = !sortReverse
      }}
    >
      {@render ColumnIcon()}
      <p class="capitalize font-bold sr-only lg:not-sr-only">{name}</p>
      <div class="not-sr-only lg:sr-only">
        {@render ColumnLabelIcon(name)}
      </div>
    </button>
  {:else}
    <button
      type="button"
      class="flex w-full border border-transparent flex-row gap-2 hover:bg-layer1 p-2 px-2 rounded-md text-primary hover:text-primary-highlight"
      onclick={() => {
        skipDebounce = true
        sortColumn = name
      }}
    >
      <ArrowUpDown class="scale-75" />
      <p class="capitalize sr-only lg:not-sr-only">{name}</p>
      <div class="not-sr-only lg:sr-only">
        {@render ColumnLabelIcon(name)}
      </div>
    </button>
  {/if}
{/snippet}

{#if interfaceConfig.listStyle == 'large'}
  <div class="grid pr-4 {gridColsCSS} w-full rounded-md place-items-between max-w-7xl mx-auto">
    {#if interfaceConfig.listStyle == 'large'}
      <div></div>
    {/if}
    <div class="w-full col-span-2">
      {@render ColumnLabel('name')}
    </div>
    {#if interfaceConfig.speciesVisible}
      {@render ColumnLabel('species')}
    {/if}
    {#if interfaceConfig.genderVisible}
      {@render ColumnLabel('gender')}
    {/if}
    {#if interfaceConfig.occupationVisible}
      {@render ColumnLabel('occupation')}
    {/if}
    {#if interfaceConfig.locationVisible}
      {@render ColumnLabel('location')}
    {/if}
    {@render ColumnLabel('status')}
  </div>
  <ul class="flex flex-col gap-2 w-full rounded-md max-w-7xl mx-auto h-full overflow-y-scroll">
    {#each characters as char}
      <CharacterCardImage character={char} {refresh} {interfaceConfig} />
    {/each}
  </ul>
{:else}
  <div class="grid pr-4 {gridColsCSS} w-full rounded-md place-items-between max-w-7xl mx-auto">
    <div class="w-full col-span-2">
      {@render ColumnLabel('name')}
    </div>
    {#if interfaceConfig.speciesVisible}
      {@render ColumnLabel('species')}
    {/if}
    {#if interfaceConfig.genderVisible}
      {@render ColumnLabel('gender')}
    {/if}
    {#if interfaceConfig.occupationVisible}
      {@render ColumnLabel('occupation')}
    {/if}
    {#if interfaceConfig.locationVisible}
      {@render ColumnLabel('location')}
    {/if}
    {@render ColumnLabel('status')}
  </div>
  <ul class="flex flex-col gap-2 w-full rounded-md max-w-7xl mx-auto h-full overflow-y-scroll">
    {#each characters as char}
      <CharacterCard character={char} {refresh} {interfaceConfig} />
    {/each}
  </ul>
{/if}

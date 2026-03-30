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

  let sortColumn: string = $state('name')
  let sortReverse: boolean = $state(false)
  let searchTerm: string = $state('')

  let characters = $state([])

  const debouncedSearch = $derived(debounce(search, 300))

  $effect(() => {
    // instantly re-fetch the full list when the field is cleared
    // also makes searchTerm a dependency of the effect, making it work correctly.
    if (searchTerm.length == 0) {
      search();
    } else {
      debouncedSearch();
    }
  })

  async function getCharacters() {
    characters = await window.api.readAllChars()
  }

  async function search() {
    characters = await window.api.searchChars(searchTerm, sortColumn, sortReverse);
    console.log('searching for', searchTerm)
  }

  const refresh = () => {
    if (searchTerm.length > 0) {
      search()
    } else {
      getCharacters()
    }
  }
</script>

<Navigation style='no-back'>
  <a href="#/create"><ButtonDecorated type="button"><CirclePlus />New Character</ButtonDecorated></a
  >
</Navigation>

<Header>
  {@render Heading1('Characters')}

  <!-- search bar -->
  <div class="max-w-2xl flex flex-row w-full mx-auto gap-4 mb-4 mt-8">
    <form class="flex flex-row w-full gap-3" action="">
      <input
        class="p-4 rounded-md bg-layer1/75 text-lg w-full focus-within:outline-0 border border-transparent focus-within:border-primary"
        type="text"
        bind:value={searchTerm}
        placeholder="search..."
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
      class="flex w-full flex-row gap-2 hover:bg-layer1 p-2 px-2 rounded-md text-primary-highlight hover:text-white relative"
      onclick={() => {
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
      class="flex w-full flex-row gap-2 hover:bg-layer1 p-2 px-2 rounded-md text-primary hover:text-primary-highlight"
      onclick={() => (sortColumn = name)}
    >
      <ArrowUpDown class="scale-75" />
      <p class="capitalize sr-only lg:not-sr-only">{name}</p>
      <div class="not-sr-only lg:sr-only">
      {@render ColumnLabelIcon(name)}
      </div>
    </button>
  {/if}
{/snippet}

<div class="grid grid-cols-7 pr-4 w-full rounded-md place-items-between max-w-7xl mx-auto">
  <!-- table header -->
   <div class="col-span-2 w-full">
    {@render ColumnLabel('name')}
   </div>
  {@render ColumnLabel('species')}
  {@render ColumnLabel('gender')}
    {@render ColumnLabel('occupation')}
  {@render ColumnLabel('location')}
  {@render ColumnLabel('status')}
</div>

<ul class="flex flex-col gap-2 w-full rounded-md max-w-7xl mx-auto h-full overflow-y-scroll">
  {#each characters as char}
    <CharacterCard character={char} {refresh} />
  {/each}
</ul>

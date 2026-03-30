<script lang="ts">
  // import dummy data to an array
  import { ArrowDownWideNarrow, ArrowUpDown, ArrowUpNarrowWide, CirclePlus, Search, Settings, XIcon } from '@lucide/svelte'
  import CharacterCard from './CharacterCard.svelte'
  import { Heading1 } from './Headings.svelte'
  import Header from './Header.svelte'
  import ButtonDecorated from './ButtonDecorated.svelte'

  let sortColumn: String = $state('name');
  let sortReverse: Boolean = $state(false);
  let searchTerm: string = $state('');

  let characters = $state([]);

  $effect(()=> {
    console.log('searching for', searchTerm);
    search();
  })

  async function getCharacters() {
    characters = await window.api.readAllChars();
  }

  async function search() {
    characters = await window.api.searchChars(searchTerm);
  }

  const refresh = () => {
    if (searchTerm.length > 0) {
      search();
    } else {
      getCharacters();
    }
  }

  getCharacters();
</script>

<div class="fixed flex w-full place-content-between pr-8">
<div>

</div>
<div class="flex gap-2">
  <a href="#/create"><ButtonDecorated type="button"><CirclePlus/>New Character</ButtonDecorated></a>
  <a href="#/settings"><ButtonDecorated style="outline" type="button"><Settings/></ButtonDecorated></a>

</div>
</div>

<Header>
  {@render Heading1('Characters')}

  <!-- search bar -->
  <div class="max-w-2xl flex flex-row w-full mx-auto gap-4 mb-4 mt-8">
  <form class="flex flex-row w-full gap-3" action="">
    <input
      class="p-4 rounded-md bg-layer1/50 text-lg w-full focus-within:outline-0 border border-transparent focus-within:border-primary"
      type="text"
      bind:value={searchTerm}
      placeholder="search..."
    />
    <div class="w-16 -ml-18 flex items-center place-content-center">
    {#if searchTerm.length > 0}
    <ButtonDecorated style='simple' type="reset"><XIcon></XIcon></ButtonDecorated>
    {/if}
    </div>

    <div class="max-w-xs flex min-w-16 md:min-w-20">
      <ButtonDecorated><Search></Search></ButtonDecorated>
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

{#snippet ColumnLabel(name: String)}
  {#if sortColumn == name}
    <button
      class="flex flex-row gap-2 hover:bg-layer1 p-2 px-2 rounded-md text-primary-highlight hover:text-white relative"
      onclick={() => {sortColumn = name; sortReverse = !sortReverse}}
    >
      {@render ColumnIcon()}
      <p class="capitalize font-bold">{name}</p>
      <!-- <div class="bg-linear-to-r from-transparent via-primary to-transparent h-0.5 w-full absolute bottom-0"></div> -->
    </button>
  {:else}
    <button
      class="flex flex-row gap-2 hover:bg-layer1 p-2 px-2 rounded-md text-primary hover:text-primary-highlight"
      onclick={() => (sortColumn = name)}
    >
    <ArrowUpDown class="scale-75" />
      <p class="capitalize ">{name}</p>
    </button>
  {/if}
{/snippet}

<div class="grid grid-cols-6 pr-4 w-full rounded-md place-items-between max-w-7xl mx-auto">
  <!-- table header -->
  {@render ColumnLabel('name')}
  {@render ColumnLabel('species')}
  {@render ColumnLabel('gender')}
  {@render ColumnLabel('occupation')}
  {@render ColumnLabel('location')}
  {@render ColumnLabel('status')}
  <!-- <div class="w-fit p-2">
    <p class="text-primary">Actions</p>
  </div> -->
</div>

<ul class="flex flex-col gap-2 w-full rounded-md max-w-7xl mx-auto h-full overflow-y-scroll">
  {#each characters as char}
    <CharacterCard character={char} refresh={refresh}/>
  {/each}
</ul>
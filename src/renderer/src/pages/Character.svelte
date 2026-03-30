<script lang="ts">
  import {
    BookOpenText,
    Cat,
    CircleUserRound,
    Hammer,
    Hourglass,
    MapPin,
    VenusAndMars

  } from '@lucide/svelte'
  import type { CharacterType } from '../../../types/types'
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
  import StatusMarker from '../components/StatusMarker.svelte'
  import TextAreaInput from '../components/TextAreaInput.svelte'

  let editing: Boolean = $state(false)
  let field: String | null = $state(null)
  let character: CharacterType | null = $state(null)
  let editedCharater: CharacterType | null = $state(null)
  let { id }: { id: number } = $props()

  let rows = $derived(Math.ceil(character.desc.length / 80) + 2)

  async function getCharacter() {
    character = await window.api.readOneChar(id)
  }

  function startEditing(fieldToEdit) {
    editing = true;
    field = fieldToEdit;
  }

  getCharacter().then(()=>{
    editedCharater=character;
  }
  )
</script>

<Navigation></Navigation>

<Header>
  {#if !character}
    {@render Heading1('Loading data...')}
  {:else}
    {@render Heading1(character.name)}
  {/if}
</Header>

<div class="overflow-y-scroll">
  {#if !character}
    <p>Loading...</p>
  {:else}

<div class="flex flex-row gap-2 mx-auto w-full max-w-6xl">

    <section class="rounded-md p-4 flex flex-col items-center gap-4">
      <div class="border-primary rounded-full border-2 p-0">
        <CircleUserRound size={178}></CircleUserRound>
      </div>
          <StatusMarker dead={character.dead ? true : false} showText={true}></StatusMarker>

      <div class="flex gap-2 items-center">
        <h2 class="font-bold flex gap-2 items-center place-content-center text-primary">
          <Hourglass />Age:
        </h2>
        {#if character.age}
          <p class="text-white">{character.age}</p>
        {:else}
          <p class="text-white/75">Unknown</p>
        {/if}
      </div>

      <div class="flex gap-2 items-center">
        <h2 class="font-bold flex gap-2 items-center place-content-center text-primary">
          <VenusAndMars />Gender:
        </h2>
        {#if character.gender}
          <p class="text-white">{character.gender}</p>
        {:else}
          <p class="text-white/75">Unknown</p>
        {/if}
      </div>

      <div class="flex gap-2 items-center">
        <h2 class="font-bold flex gap-2 items-center place-content-center text-primary">
          <Cat />Species:
        </h2>
        {#if character.species}
          <p class="text-white">{character.species}</p>
        {:else}
          <p class="text-white/75">Unknown</p>
        {/if}
      </div>
    </section>

    <section class="mt-2flex flex-col gap-8 w-full">
      <div class="flex gap-2 mb-4 bg-layer1 p-4 rounded-md">
        <div class="w-full text-center">
          <h2 class="font-bold flex gap-2 items-center place-content-center text-xl text-primary">
            <Hammer />Occupation
          </h2>
          {#if character.occupation}
            <p class="text-white/75">{character.occupation}</p>
          {:else}
            <p class="text-white/50">Unknown</p>
          {/if}
        </div>

        <div class="w-full text-center">
          <h2 class="font-bold flex gap-2 items-center place-content-center text-xl text-primary">
            <MapPin />Location
          </h2>

          {#if character.location}
            <p class="text-white/75">{character.location}</p>
          {:else}
            <p class="text-white/50">Unknown</p>
          {/if}
        </div>
      </div>

      <div class="bg-layer1 p-4 px-8 flex gap-2 flex-col">
      <h2 class="font-bold flex gap-2 items-center place-content-center text-xl text-primary">
        <BookOpenText />Description
      </h2>

      {#if editing}
        <TextAreaInput name="desc" bind:value={editedCharater.desc} rows={rows}></TextAreaInput>
        {:else}
              {#if character.desc}
        <p class="text-white/75 whitespace-pre-wrap" onclick={()=>startEditing('desc')}>{character.desc}</p>
      {:else}
        <p class="text-white/50 whitespace-pre-wrap">No description provided.</p>
      {/if}
      {/if}


      </div>


    </section>
  </div>
  {/if}



  
</div>

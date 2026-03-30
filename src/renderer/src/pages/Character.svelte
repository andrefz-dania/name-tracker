<script lang="ts">
  import {
    BookOpenText,
    Cat,
    CircleUserRound,
    Eye,
    Hammer,
    Hourglass,
    MapPin,
    Pencil,
    VenusAndMars

  } from '@lucide/svelte'
  import type { CharacterType } from '../../../types/types'
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
  import ButtonToggle from '../components/ButtonToggle.svelte'
  import StatusMarker from '../components/StatusMarker.svelte'

  let editing = $state(false)
  let character: CharacterType | null = $state(null)
  let { id }: { id: number } = $props()

  async function getCharacter() {
    character = await window.api.readOneChar(id)
  }

  getCharacter()
</script>

<Navigation></Navigation>

<Header>
  {#if !character}
    {@render Heading1('Loading data...')}
  {:else}
    {@render Heading1(character.name)}
  {/if}
</Header>

  <div class="max-w-lg flex flex-row gap-4 mx-auto w-full mt-4 mb-4">
    {#if editing}
      <ButtonToggle style="inactive" onclick={() => (editing = false)}><Eye></Eye>View</ButtonToggle
      >
      <ButtonToggle style="active" onclick={() => (editing = true)}
        ><Pencil></Pencil>Edit</ButtonToggle
      >
    {:else}
      <ButtonToggle style="active" onclick={() => (editing = false)}><Eye></Eye>View</ButtonToggle>
      <ButtonToggle style="inactive" onclick={() => (editing = true)}
        ><Pencil></Pencil>Edit</ButtonToggle
      >
    {/if}
  </div>

<div class="overflow-y-scroll">
  {#if !character}
    <p>Loading...</p>
  {/if}



  <div class="flex flex-row gap-2 mx-auto w-full max-w-6xl">
    <section class="rounded-md p-4 flex flex-col items-center gap-4">
      <div class="border-primary rounded-full border-2 p-0">
        <CircleUserRound size={178}></CircleUserRound>
      </div>
      {#if character}
          <StatusMarker dead={character.dead ? true : false} showText={true}></StatusMarker>
      {/if}

      <div class="flex gap-2 items-center">
        <h2 class="font-bold flex gap-2 items-center place-content-center text-primary">
          <Hourglass />Age:
        </h2>
        {#if character && character.age}
          <p class="text-white">{character.age}</p>
        {:else}
          <p class="text-white/75">Unknown</p>
        {/if}
      </div>

      <div class="flex gap-2 items-center">
        <h2 class="font-bold flex gap-2 items-center place-content-center text-primary">
          <VenusAndMars />Gender:
        </h2>
        {#if character && character.gender}
          <p class="text-white">{character.gender}</p>
        {:else}
          <p class="text-white/75">Unknown</p>
        {/if}
      </div>

      <div class="flex gap-2 items-center">
        <h2 class="font-bold flex gap-2 items-center place-content-center text-primary">
          <Cat />Species:
        </h2>
        {#if character && character.species}
          <p class="text-white">{character.species}</p>
        {:else}
          <p class="text-white/75">Unknown</p>
        {/if}
      </div>
    </section>

    <section class="bg-layer1 rounded-md p-4 flex flex-col gap-2 w-full">
      <div class="flex gap-2 mb-4">
        <div class="w-full text-center">
          <h2 class="font-bold flex gap-2 items-center place-content-center text-xl text-primary">
            <Hammer />Occupation
          </h2>
          {#if character && character.occupation}
            <p class="text-white/75">{character.occupation}</p>
          {:else}
            <p class="text-white/50">Unknown</p>
          {/if}
        </div>

        <div class="w-full text-center">
          <h2 class="font-bold flex gap-2 items-center place-content-center text-xl text-primary">
            <MapPin />Location
          </h2>

          {#if character && character.location}
            <p class="text-white/75">{character.location}</p>
          {:else}
            <p class="text-white/50">Unknown</p>
          {/if}
        </div>
      </div>

      <h2 class="font-bold flex gap-2 items-center place-content-center text-xl text-primary">
        <BookOpenText />Description
      </h2>
      {#if character && character.desc}
        <p class="text-white/75 whitespace-pre-wrap">{character.desc}</p>
      {:else}
        <p class="text-white/50 whitespace-pre-wrap">No description available.</p>
      {/if}
    </section>
  </div>
</div>

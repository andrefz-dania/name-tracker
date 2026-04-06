<script lang="ts">
  import {
    BookOpenText,
    Cat,
    Check,
    Hammer,
    Hourglass,
    MapPin,
    PinIcon,
    PinOff,
    VenusAndMars,
    XIcon
  } from '@lucide/svelte'
  import { blankCharacter, type CharacterType } from '../../../types/types'
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
  import StatusMarker from '../components/StatusMarker.svelte'
  import EditableField from '../components/EditableField.svelte'
  import EditableArea from '../components/EditableArea.svelte'
  import EditableTitle from '../components/EditableTitle.svelte'
  import ButtonDecorated from '../components/ButtonDecorated.svelte'
  import { formatCharacter } from '../utils/formatCharacter'
  import ButtonToggleL2 from '../components/ButtonToggleL2.svelte'
  import { onMount } from 'svelte'
  import { addRecent } from '../utils/recent'
  import AvatarEditable from '../components/AvatarEditable.svelte'

  let character: CharacterType = $state(blankCharacter)
  let { id }: { id: number } = $props()
  let isUpdatable: boolean = $state(false)

  async function getCharacter() {
    character = await window.api.readOneChar(id)
  }

  const saveCharacter = async () => {
    const newCharacter = formatCharacter(character)
    const response = await window.api.updateChar(newCharacter)
    if (response.success) {
      isUpdatable = false
    }
  }

    const hotkeyCtrlS = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      saveCharacter();

      // wait 100 ms
      setTimeout(() => {
        isUpdatable = false;
      }, 100);
    }
  }
  onMount(()=>{
    addRecent(id);
  })

  const togglePinned = async () => {
    const unpin = character.pinned ? true : false;
    const response = await window.api.togglePinChar(character.id, unpin)
    character.pinned = character.pinned == 1 ? 0 : 1;
    console.log(response)
  }

  const discardChanges = () => {
    getCharacter()
    isUpdatable = false
  }

  const invertDeadState = () => {
    character.dead == 0 ? (character.dead = 1) : (character.dead = 0)
    isUpdatable = true
  }

  getCharacter()
</script>

<svelte:window onkeydown={hotkeyCtrlS}></svelte:window>

<Navigation>
  <div>
    <ButtonDecorated style="outline" disabled={!isUpdatable} onclick={discardChanges}
      ><XIcon></XIcon>Discard changes</ButtonDecorated
    >
  </div>
  <div>
    <ButtonDecorated
      style={isUpdatable ? 'normal-static' : 'outline'}
      disabled={!isUpdatable}
      onclick={saveCharacter}><Check></Check>Save changes</ButtonDecorated
    >
  </div>
</Navigation>

<Header>
  {#if !character}
    {@render Heading1('Loading data...')}
  {:else}
    <form onchange={() => (isUpdatable = true)} onsubmit={(e)=>e.preventDefault()}>
      <EditableTitle
        id="name"
        name="name"
        bind:value={character.name}
        defaultvalue={character.name}
        placeholder="Name"
      ></EditableTitle>
    </form>
  {/if}
</Header>

<form class="overflow-y-scroll" onchange={() => (isUpdatable = true)}>
  {#if !character || !character.id}
    <p>Loading...</p>
  {:else}
    <div class="flex flex-row gap-2 mx-auto w-full max-w-6xl">
      <section class="rounded-md p-4 flex flex-col items-center gap-4">
          <AvatarEditable id={character.id}></AvatarEditable>
        <button class="cursor-pointer" onclick={invertDeadState} type="button">
          <StatusMarker dead={character.dead ? true : false} showText={true}></StatusMarker>
        </button>

        <div class="flex flex-col items-center mt-4">
          <h2 class="font-bold flex gap-2 items-center place-content-center text-primary">
            <Hourglass />Age
          </h2>

          <EditableField
            bind:value={character.age}
            defaultvalue={character.age}
            name="age"
            id="age"
            placeholder="Unknown"
            type="number"
          ></EditableField>
        </div>

        <div class="flex flex-col items-center">
          <h2 class="font-bold flex gap-2 items-center place-content-center text-primary">
            <VenusAndMars />Gender
          </h2>
          <EditableField
            bind:value={character.gender}
            defaultvalue={character.gender}
            name="gender"
            id="gender"
            placeholder="Unknown"
          ></EditableField>
        </div>

        <div class="flex flex-col items-center">
          <h2 class="font-bold flex gap-2 items-center place-content-center text-primary">
            <Cat />Species
          </h2>
          <EditableField
            bind:value={character.species}
            defaultvalue={character.species}
            name="species"
            id="species"
            placeholder="Unknown"
          ></EditableField>
        </div>
      </section>

      <section class="flex flex-col gap-4 w-full">
        <div class="flex place-content-end">
          <div>
            {#if character.pinned || character.pinned == 1}
              <ButtonToggleL2 onclick={togglePinned} style="active" type="button"
                ><PinIcon></PinIcon>Pinned</ButtonToggleL2
              >
            {:else}
              <ButtonToggleL2 onclick={togglePinned} style="inactive" type="button"
                ><PinOff></PinOff>Not pinned</ButtonToggleL2
              >
            {/if}
          </div>
        </div>
        <div class="flex gap-2 bg-layer1 p-4 rounded-md">
          <div class="w-full text-center">
            <h2 class="font-bold flex gap-2 items-center place-content-center text-xl text-primary">
              <Hammer />Occupation
            </h2>
            <EditableField
              bind:value={character.occupation}
              defaultvalue={character.occupation}
              name="occupation"
              id="occupation"
              placeholder="Unknown"
            ></EditableField>
          </div>

          <div class="w-full text-center">
            <h2 class="font-bold flex gap-2 items-center place-content-center text-xl text-primary">
              <MapPin />Location
            </h2>

            <EditableField
              bind:value={character.location}
              defaultvalue={character.location}
              name="location"
              id="location"
              placeholder="Unknown"
            ></EditableField>
          </div>
        </div>

        <div class="bg-layer1 p-4 px-8 flex gap-2 flex-col rounded-md">
          <h2 class="font-bold flex gap-2 items-center place-content-center text-xl text-primary">
            <BookOpenText />Description
          </h2>

          <EditableArea
            bind:value={character.desc}
            defaultvalue={character.desc}
            name="desc"
            id="desc"
            placeholder="No Description"
          ></EditableArea>
        </div>
      </section>
    </div>
  {/if}
</form>

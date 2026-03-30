<script lang="ts">
  import type { CharacterType } from '../../../types/types'
  import ButtonDecorated from '../components/ButtonDecorated.svelte'
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
  import TextAreaInput from '../components/TextAreaInput.svelte'
  import TextInput from '../components/TextInput.svelte'
  import { Check, SkullIcon, SproutIcon, XIcon } from '@lucide/svelte'

  let name = $state('')
  let status = $state('Alive') // Default to Alive
  let dead = $derived(status == 'Dead' ? 1 : 0)  //sqlite cannot handle booleans

  let desc = $state('')
  let age = $state('')
  let gender = $state('')
  let location = $state('')
  let occupation = $state('')
  let species = $state('')

  const handleAddCharacter = async () => {

    const character: CharacterType = {
      name,
      dead,
      desc,
      age: age ? parseInt(age) : undefined,
      gender,
      location,
      occupation,
      species
    }
    console.log(character)

    await window.api.createChar(character)
  }

  // let {id} = $props();
</script>

<Navigation></Navigation>

<Header>
  {@render Heading1('Create new character')}
</Header>
<div class="overflow-y-scroll">


<form
  onsubmit={handleAddCharacter}
  class="max-w-2xl w-full mx-auto flex flex-col gap-4"
>
  <TextInput label="Name" id="nameInput" name="name" bind:value={name} placeholder="Name" />

  <div class="w-full">
    <label for="statusRadio">Status:</label>
    <div class="flex gap-4 mt-2">
      <div class="flex items-center gap-2 w-full">
        <input
          type="radio"
          name="status"
          value="Alive"
          checked={status === 'Alive'}
          onchange={() => (status = 'Alive')}
          id="statusRadio-alive"
          class="sr-only"
        />
        {#if status == 'Alive'}
          <button
            class="flex items-center gap-2 cursor-pointer bg-positive-muted/50 p-2 rounded-full w-full place-items-center place-content-center border border-positive"
            onclick={() => (status = 'Alive')}
            type="button"
          >
            <SproutIcon class="text-positive" />
            <span class="text-positive">Alive</span>
          </button>
        {:else}
          <button
            class="flex items-center gap-2 cursor-pointer bg-layer1 p-2 rounded-full w-full place-items-center place-content-center border border-transparent"
            onclick={() => (status = 'Alive')}
            type="button"
          >
            <SproutIcon class="text-primary" />
            <span class="text-primary">Alive</span>
          </button>
        {/if}
      </div>
      <div class="flex items-center gap-2 w-full">
        <input
          type="radio"
          name="status"
          value="Dead"
          checked={status === 'Dead'}
          onchange={() => (status = 'Dead')}
          id="statusRadio-dead"
          class="sr-only"
        />

        {#if status == 'Dead'}
          <button
            class="flex items-center gap-2 cursor-pointer bg-destructive-muted/50 p-2 rounded-full w-full place-items-center place-content-center border border-destructive"
            onclick={() => (status = 'Dead')}
            type="button"
          >
            <SkullIcon class="text-destructive" />
            <span class="text-destructive">Dead</span>
          </button>
        {:else}
          <button
            class="flex items-center gap-2 cursor-pointer bg-layer1 p-2 rounded-full w-full place-items-center place-content-center border border-transparent"
            onclick={() => (status = 'Dead')}
            type="button"
          >
            <SkullIcon class="text-primary" />
            <span class="text-primary">Dead</span>
          </button>
        {/if}
      </div>
    </div>
  </div>

  <TextInput
    label="Occupation"
    id="occupationInput"
    name="occupation"
    bind:value={occupation}
    placeholder="Occupation"
  />

  <TextAreaInput
    label="Description"
    id="descInput"
    name="desc"
    bind:value={desc}
    placeholder="Full description"
    rows={5}
  />

  <div class="flex flex-row mx-auto gap-4">
    <TextInput label="Age" id="ageInput" name="age" bind:value={age} placeholder="Age" type="number" />
    <TextInput label="Gender" id="genderInput" name="gender" bind:value={gender} placeholder="Gender" />
  </div>

  <div class="flex flex-row mx-auto gap-4">
    <TextInput
      label="Species"
      id="speciesInput"
      name="species"
      bind:value={species}
      placeholder="Species"
    />
    <TextInput
      label="Location"
      id="locationInput"
      name="location"
      bind:value={location}
      placeholder="Location"
    />
  </div>

  <div class="flex gap-4 mb-2 mt-8">
    <ButtonDecorated type='submit'><Check></Check>Create</ButtonDecorated>
    <ButtonDecorated style='outline' type='reset'><XIcon></XIcon>Reset</ButtonDecorated>

  </div>

</form>

</div>

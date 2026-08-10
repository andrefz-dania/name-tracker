<script lang="ts">
  import type { WorldType } from '../../../types/types'
  import ButtonDecorated from '../components/ButtonDecorated.svelte'
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
  import TextAreaInput from '../components/TextAreaInput.svelte'
  import TextInput from '../components/TextInput.svelte'
  import { Check, XIcon } from '@lucide/svelte'
  import { capitalizeAll } from '../utils/capitalize'
  import { notif, sendNotif } from '../utils/context'
  import { INPUT_LONG_MAX } from '../input.config'

  let name = $state('')
  let desc = $state('')


  const handleAddWorld = async (e) => {
    e.preventDefault()

    const world: WorldType = {
      name: capitalizeAll(name),
      description: desc,
      lastAccessed: 0
    }

    const response = await window.api.createWorld(world)
    if (response.success) {
      sendNotif(notif, `${world.name} has been created`, 'positive')
      window.location.href = `#/worlds`
    }
  }

</script>

<Navigation></Navigation>

<Header>
  {@render Heading1('Create a new world')}
</Header>
<div class="overflow-y-scroll">


<form
  onsubmit={handleAddWorld}
  class="max-w-2xl w-full mx-auto flex flex-col gap-4"
>
  <TextInput label="World Name" id="nameInput" name="name" bind:value={name} placeholder="Name" autofocus={true} maxLength={INPUT_LONG_MAX} />

  <TextAreaInput
    label="Description"
    id="descInput"
    name="desc"
    bind:value={desc}
    placeholder="Full description"
    rows={5}
  />

  <div class="flex gap-4 mb-2 mt-8">
    <ButtonDecorated type='submit'><Check></Check>Create</ButtonDecorated>
    <ButtonDecorated style='outline' type='reset'><XIcon></XIcon>Reset</ButtonDecorated>

  </div>

</form>

</div>

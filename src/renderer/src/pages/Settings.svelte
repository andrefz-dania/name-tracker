<script lang="ts">
  import {
    IdCard,
    Rows2,
    TableOfContents,
    Sun,
    Moon,
    List,
    Check,
    RefreshCcw
  } from '@lucide/svelte'
  import Header from '../components/Header.svelte'
  import { Heading1, Heading3 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
  import SettingInfo from '../components/SettingInfo.svelte'
  import ButtonToggleL2 from '../components/ButtonToggleL2.svelte'
  import RangeSlider from '../components/RangeSlider.svelte'
  import ButtonDecorated from '../components/ButtonDecorated.svelte'
  import { defaultInterfaceConfig } from '../../../types/types'
  import ModalDialogue from '../components/ModalDialogue.svelte'

  let { interfaceConfig = $bindable() } = $props()

  let descLength = $state(interfaceConfig.descLength || defaultInterfaceConfig.descLength)

  function changeSetting(settingName: string, settingValue: string | number | undefined) {
    interfaceConfig = {
      ...interfaceConfig,
      [settingName]: settingValue
    }
  }

  const restoreDefaults = () => {
    interfaceConfig = defaultInterfaceConfig
    // clear the separate variable too, only to show the change to the user
    descLength = defaultInterfaceConfig.descLength
  }

  const handleListStyleChange = () => {
    if (interfaceConfig.listStyle == 'large') {
      changeSetting('listStyle', 'small')
    } else {
      changeSetting('listStyle', 'large')
    }
  }

  const handleInterfaceStyleChange = () => {
    if (interfaceConfig.interfaceStyle === 'dark') {
      changeSetting('interfaceStyle', 'light')
    } else {
      changeSetting('interfaceStyle', 'dark')
    }
  }

  const handleDescLengthChange = () => {
    changeSetting('descLength', descLength)
  }
</script>

<Navigation></Navigation>

<Header>
  {@render Heading1('Settings')}
</Header>

<div class="max-w-6xl w-full mx-auto overflow-y-scroll">
  <div class="flex flex-row gap-2 w-full">
    <!-- sidebar -->
    <section class="md:min-w-48 p-4 rounded-md flex flex-col gap-4 bg-layer1 h-min sticky top-0">
      <h2 class="text-xl font-bold text-primary">General</h2>
      <h2 class="text-xl font-bold text-primary">Worlds</h2>
      <h2 class="text-xl font-bold text-primary">Storage</h2>
    </section>

    <!-- main content -->
    <section class="mx-4 rounded-md w-full">
      <SettingInfo
        name="Interface Style"
        description="Toggle between light and dark mode for the application"
        ><Sun></Sun></SettingInfo
      >

      <div class="flex flex-row gap-4 p-4">
        <ButtonToggleL2
          style={interfaceConfig.interfaceStyle == 'dark' ? 'inactive' : 'active'}
          onclick={handleInterfaceStyleChange}><Sun></Sun>Light</ButtonToggleL2
        >
        <ButtonToggleL2
          style={interfaceConfig.interfaceStyle == 'dark' ? 'active' : 'inactive'}
          onclick={handleInterfaceStyleChange}><Moon></Moon>Dark</ButtonToggleL2
        >
      </div>

      <hr class="text-primary my-8 opacity-50" />

      <SettingInfo
        name="List Style"
        description="Choose whether to show a compact list of characters, or an expanded field with a preview image and the first few lines of their description"
        ><IdCard></IdCard></SettingInfo
      >

      <div class="flex flex-row gap-4 p-4">
        <ButtonToggleL2
          style={interfaceConfig.listStyle == 'small' ? 'active' : 'inactive'}
          onclick={handleListStyleChange}><TableOfContents></TableOfContents>Compact</ButtonToggleL2
        >
        <ButtonToggleL2
          style={interfaceConfig.listStyle == 'small' ? 'inactive' : 'active'}
          onclick={handleListStyleChange}><Rows2></Rows2>Expanded</ButtonToggleL2
        >
      </div>

      <hr class="text-primary my-8 opacity-50" />

      <SettingInfo
        name="Description Preview Length"
        description="How many characters to display in the preview when the list style is set to Expanded"
        ><List></List></SettingInfo
      >
      <div class="flex flex-row w-full gap-4 md:gap-8">
        <RangeSlider min={100} max={1000} bind:value={descLength}></RangeSlider>
        <div class="h-28 flex items-center">
          <ButtonDecorated onclick={handleDescLengthChange} type="button"
            ><Check></Check>Apply</ButtonDecorated
          >
        </div>
      </div>

      <hr class="text-primary my-8 opacity-50" />
      <SettingInfo
        name="Restore Defaults"
        description="Restore ALL settings to their defaults. This will remove all your settings, but keep you characters."
        ><RefreshCcw></RefreshCcw></SettingInfo
      >
      <div class="p-4">
        <ButtonDecorated
          type="button"
          style="destructive"
          command="show-modal"
          commandfor="reset-modal"><RefreshCcw></RefreshCcw>Reset</ButtonDecorated
        >
      </div>

      <ModalDialogue
        dialogId="reset-modal"
        title="Restore Defaults?"
        confirmAction={restoreDefaults}
        confirmText="Reset"
        confirmStyle="destructive"
        cancelText="cancel"
        icon='warn'
      ></ModalDialogue>

      <hr class="text-primary my-8 opacity-50" />
      <div class="flex flex-col gap-2 opacity-50">
        {@render Heading3('Unimplemented settings:')}
        <h3>shown columns</h3>
        <h3>export all characters</h3>
        <h3>import characters</h3>
        <h3>tags</h3>
      </div>
    </section>
  </div>
</div>

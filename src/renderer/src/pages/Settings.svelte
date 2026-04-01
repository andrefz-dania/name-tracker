<script lang="ts">
  import {
    IdCard,
    Rows2,
    TableOfContents,
    Sun,
    Moon,
    List,
    Check,
    RefreshCcw,
    ChevronRight,
    Eye,
    EyeClosed
  } from '@lucide/svelte'
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
  import SettingInfo from '../components/SettingInfo.svelte'
  import ButtonToggleL2 from '../components/ButtonToggleL2.svelte'
  import RangeSlider from '../components/RangeSlider.svelte'
  import ButtonDecorated from '../components/ButtonDecorated.svelte'
  import { defaultInterfaceConfig } from '../../../types/types'
  import ModalDialogue from '../components/ModalDialogue.svelte'

  let { interfaceConfig = $bindable() } = $props()

  let descLength = $state(interfaceConfig.descLength || defaultInterfaceConfig.descLength)

  type CurrentPage = 'general' | 'worlds' | 'storage' | 'reset'

  let currentPage: CurrentPage = $state('general')

  function changeSetting(settingName: string, settingValue: string | number | boolean | undefined) {
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

  const toggleColumn = (
    column: 'speciesVisible' | 'genderVisible' | 'occupationVisible' | 'locationVisible'
  ) => {
    changeSetting(column, !interfaceConfig[column])
  }
</script>

{#snippet Hr()}
  <hr class="text-primary my-8 opacity-50" />
{/snippet}

{#snippet Category(name: CurrentPage)}
  <button onclick={() => (currentPage = name)}>
    {#if name == currentPage}
      <h2
        class="text-xl font-bold text-primary-highlight flex flex-row gap-2 place-content-between items-center capitalize p-2 rounded-md px-4 hover:bg-layer2"
      >
        {name}<ChevronRight></ChevronRight>
      </h2>
    {:else}
      <h2
        class="text-xl text-primary flex flex-row gap-2 items-center place-content-between capitalize hover:text-primary-highlight hover:bg-layer2 p-2 rounded-md px-4"
      >
        {name}<ChevronRight></ChevronRight>
      </h2>
    {/if}
  </button>
{/snippet}

<Navigation></Navigation>

<Header>
  {@render Heading1('Settings')}
</Header>

<div class="max-w-6xl w-full mx-auto overflow-y-scroll">
  <div class="flex flex-row gap-2 w-full">
    <!-- sidebar -->
    <section class="md:min-w-48 p-2 bg-layer1 rounded-xl flex flex-col h-min sticky top-0">
      <p class="font-bold text-sm text-primary p-2">CATEGORIES</p>
      {@render Category('general')}
      <!-- {@render Category('worlds')}
      {@render Category('storage')} -->
      {@render Category('reset')}
    </section>

    <!-- main content -->
    <section class="mx-4 rounded-md w-full">
      <!-- GENERAL SETTINGS PAGE -->
      {#if currentPage == 'general'}
        <section>
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

          {@render Hr()}

          <SettingInfo
            name="List Style"
            description="Choose whether to show a compact list of characters, or an expanded field with a preview image and the first few lines of their description"
            ><IdCard></IdCard></SettingInfo
          >

          <div class="flex flex-row gap-4 p-4">
            <ButtonToggleL2
              style={interfaceConfig.listStyle == 'small' ? 'active' : 'inactive'}
              onclick={handleListStyleChange}
              ><TableOfContents></TableOfContents>Compact</ButtonToggleL2
            >
            <ButtonToggleL2
              style={interfaceConfig.listStyle == 'small' ? 'inactive' : 'active'}
              onclick={handleListStyleChange}><Rows2></Rows2>Expanded</ButtonToggleL2
            >
          </div>

          {@render Hr()}

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

          {@render Hr()}

          <SettingInfo
            name="Column Visibility"
            description="Choose which columns to show in the character list. Name and status columns are always shown"
            ><Eye></Eye></SettingInfo
          >

          <div class="flex flex-col md:flex-row gap-4 p-4">
            <ButtonToggleL2
              style={interfaceConfig.speciesVisible ? 'active' : 'inactive'}
              onclick={() => toggleColumn('speciesVisible')}>{#if interfaceConfig.speciesVisible}<Eye></Eye>{:else}<EyeClosed
                ></EyeClosed>{/if}Species</ButtonToggleL2
            >
            <ButtonToggleL2
              style={interfaceConfig.genderVisible ? 'active' : 'inactive'}
              onclick={() => toggleColumn('genderVisible')}
              >{#if interfaceConfig.genderVisible}<Eye></Eye>{:else}<EyeClosed
                ></EyeClosed>{/if}Gender</ButtonToggleL2
            >
            <ButtonToggleL2
              style={interfaceConfig.occupationVisible ? 'active' : 'inactive'}
              onclick={() => toggleColumn('occupationVisible')}
              >{#if interfaceConfig.occupationVisible}<Eye></Eye>{:else}<EyeClosed
                ></EyeClosed>{/if}Occupation</ButtonToggleL2
            >
            <ButtonToggleL2
              style={interfaceConfig.locationVisible ? 'active' : 'inactive'}
              onclick={() => toggleColumn('locationVisible')}>{#if interfaceConfig.locationVisible}<Eye></Eye>{:else}<EyeClosed
                ></EyeClosed>{/if}Location</ButtonToggleL2
            >
          </div>
        </section>
      {/if}

      {#if currentPage == 'reset'}
        <section>
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
            title="Restore Default Settings?"
            confirmAction={restoreDefaults}
            confirmText="Reset"
            confirmStyle="destructive"
            cancelText="cancel"
            icon="warn"
          ></ModalDialogue>
        </section>
      {/if}
    </section>
  </div>
</div>

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
    EyeClosed,
    Upload,
    FolderX,
    Download,
    HardDrive,
    Wrench,
    Milestone,
    SquarePen,
    Search,
    TagIcon,
    PlusIcon
  } from '@lucide/svelte'
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
  import SettingInfo from '../components/SettingInfo.svelte'
  import ButtonToggleL2 from '../components/ButtonToggleL2.svelte'
  import RangeSlider from '../components/RangeSlider.svelte'
  import ButtonDecorated from '../components/ButtonDecorated.svelte'
  import { defaultInterfaceConfig, type TagType } from '../../../types/types'
  import ModalDialogue from '../components/ModalDialogue.svelte'
  import { notif, sendNotif } from '../utils/context'
  import TagEditable from '../components/TagEditable.svelte'

  let { interfaceConfig = $bindable() } = $props()

  let descLength = $state(interfaceConfig.descLength || defaultInterfaceConfig.descLength)

  type CurrentPage = 'general' | 'world' | 'storage' | 'reset' | 'debug' | 'hotkeys'

  let currentPage: CurrentPage = $state('general')

  function changeSetting(settingName: string, settingValue: string | number | boolean | undefined) {
    interfaceConfig = {
      ...interfaceConfig,
      [settingName]: settingValue
    }
  }

  // RESETS
  const restoreDefaults = () => {
    interfaceConfig = defaultInterfaceConfig
    // clear the separate variable too, only to show the change to the user
    descLength = defaultInterfaceConfig.descLength
  }

  const handleDeleteAll = async () => {
    const response = await window.api.deleteAllChars()
    if (response.success) {
      sendNotif(notif, `Deleted ${response.count} characters`, 'positive')
    } else {
      sendNotif(notif, `0 characters were deleted`, 'normal')
    }
  }

  // INTERFACE
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

  // STORAGE

  const handleExport = async () => {
    sendNotif(notif, 'Exporting characters...', 'progress')
    const response = await window.api.exportCharacters()
    if (response.success) {
      sendNotif(notif, `Export finished`, 'positive')
    } else {
      sendNotif(notif, 'Export failed', 'destructive')
    }
  }

  const handleImport = async () => {
    sendNotif(notif, 'Importing characters...', 'progress')
    const response = await window.api.importCharacters()
    if (response.success) {
      sendNotif(notif, `Imported ${response.count} characters`, 'positive')
    } else {
      sendNotif(notif, 'Import failed', 'destructive')
    }
  }

  // WORLD
  let tags:TagType[] = $state([])
  let newTagName: string = $state('')

  async function getTags() {
    tags = await window.api.getTags()
  }

  getTags();

  const createTag = async (e) => {
    e.preventDefault()
    const response = await window.api.createTag(newTagName)
    if (response.success) {
      tags = [...tags, {id: response.newId, tag_name: newTagName}]
      newTagName = ''
    }
  }

  async function deleteTag(id: number) {
    const response = await window.api.deleteTag(id)
    if (response.success) {
      tags = tags.filter((tag) => tag.id !== id)
      console.log(tags)
    }
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
      {@render Category('hotkeys')}
      {@render Category('world')}
      {@render Category('storage')}
      {@render Category('reset')}
      <!-- {@render Category('debug')} -->
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
              onclick={() => toggleColumn('speciesVisible')}
              >{#if interfaceConfig.speciesVisible}<Eye></Eye>{:else}<EyeClosed
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
              onclick={() => toggleColumn('locationVisible')}
              >{#if interfaceConfig.locationVisible}<Eye></Eye>{:else}<EyeClosed
                ></EyeClosed>{/if}Location</ButtonToggleL2
            >
          </div>
        </section>
      {:else if currentPage == 'storage'}
        <section>
          <SettingInfo
            name="Import & Export Characters"
            description="Import characters from a JSON file or export all characters from the current world to a JSON file that can be saved anywhere you like. Importing can cause duplicates"
            ><HardDrive /></SettingInfo
          >
          <div class="p-4 flex gap-4">
            <ButtonDecorated onclick={handleImport}><Download></Download>Import</ButtonDecorated>
            <ButtonDecorated onclick={handleExport}><Upload></Upload>Export</ButtonDecorated>
          </div>
        </section>
      {:else if currentPage == 'reset'}
        <section>
          <SettingInfo
            name="Restore Default Settings"
            description="Restore ALL settings to their defaults. Your existing worlds and characters will be kept"
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
            description="This will reset ALL settings to their defaults. Your existing worlds and characters will be kept"
            confirmAction={restoreDefaults}
            confirmText="Reset"
            confirmStyle="destructive"
            cancelText="Cancel"
            icon="warn"
          ></ModalDialogue>
          {@render Hr()}
          <SettingInfo
            name="Delete all characters"
            description="Removes ALL currently stored characters in this world. Your settings and world configuration will be kept"
            ><FolderX></FolderX></SettingInfo
          >
          <div class="p-4">
            <ButtonDecorated
              type="button"
              style="destructive"
              command="show-modal"
              commandfor="delete-modal"><FolderX></FolderX>Delete</ButtonDecorated
            >
          </div>

          <ModalDialogue
            dialogId="delete-modal"
            title="Delete All Characters?"
            description="This will delete ALL characters in this world. Your settings and world configuration will be kept"
            confirmAction={handleDeleteAll}
            confirmText="Delete All"
            confirmStyle="destructive"
            cancelText="Cancel"
            icon="warn"
          ></ModalDialogue>
        </section>
      {/if}

      {#if currentPage == 'debug'}
        <section>
          <SettingInfo
            name="Test notifications"
            description="See if the notification system is behaving itself"
            ><Wrench></Wrench></SettingInfo
          >
        </section>
        <div class="flex flex-row gap-2 p-2">
          <ButtonDecorated onclick={() => sendNotif(notif, 'Hello there', 'normal')}
            >send notif</ButtonDecorated
          >
          <ButtonDecorated onclick={() => sendNotif(notif, 'Oh no!', 'destructive')}
            >send BAD notif</ButtonDecorated
          >
          <ButtonDecorated onclick={() => sendNotif(notif, 'poggers', 'positive')}
            >send GOOD notif</ButtonDecorated
          >
          <ButtonDecorated onclick={() => sendNotif(notif, 'Loading...', 'progress')}
            >send PROG notif</ButtonDecorated
          >
        </div>
      {/if}

      {#if currentPage == 'world'}
        <section>
          <SettingInfo
            name="Character Tags"
            description="Add or remove tags that can be used to organize your characters in this world"
            ><TagIcon></TagIcon></SettingInfo
          >
          <form class="flex flex-row gap-2 items-center mt-4 w-full" onsubmit={createTag}>
            <div class="flex flex-row gap-2 w-full relative">
              <p class="absolute bottom-2 left-4 text-textcol">#</p>
              <input
                class="pl-8 whitespace-pre p-2 rounded-md bg-layer1 w-full focus-within:outline-0 border border-transparent focus-within:border-primary"
                name="Tag name"
                id="newtag"
                bind:value={newTagName}
                placeholder="Newtag"
                maxlength=24
              />
            </div>

            <div class="flex flex-row w-full h-min max-w-36 mb-0.5">
              <ButtonDecorated><PlusIcon></PlusIcon>Add tag</ButtonDecorated>
            </div>
          </form>

          <div class="flex flex-row flex-wrap gap-2 mt-4">
            {#each tags as tag}
              <TagEditable tag={tag} deleteSelf={()=>deleteTag(tag.id)}></TagEditable>
            {/each}
          </div>
        </section>
      {/if}

      {#if currentPage == 'hotkeys'}
        <p class="text-center mb-4">
          Hotkeys are currently static. Rebinding might come in a future update
        </p>
        {#snippet hotkey(string: string)}
          <div
            class="border border-primary-muted text-primary bg-layer1 p-1 px-2 rounded-md min-w-8 w-fit flex place-content-center"
          >
            {string}
          </div>
        {/snippet}
        <section>
          <SettingInfo name="Navigation" description="Navigate between different pages of the app"
            ><Milestone></Milestone></SettingInfo
          >
        </section>
        <div class="grid grid-cols-2 gap-y-2 mt-4 text-textcol/50">
          <p>Home</p>
          <div class="flex flex-row gap-2">
            {@render hotkey('ctrl')}
            +
            {@render hotkey('h')}
          </div>

          <p>Settings</p>

          <div class="flex flex-row gap-2">
            {@render hotkey('ctrl')}
            +
            {@render hotkey('o')}
          </div>

          <p>Search Characters</p>

          <div class="flex flex-row gap-2">
            {@render hotkey('ctrl')}
            +
            {@render hotkey('f')}
          </div>

          <p>New Character</p>

          <div class="flex flex-row gap-2">
            {@render hotkey('ctrl')}
            +
            {@render hotkey('n')}
          </div>
        </div>
        {@render Hr()}
        <section>
          <SettingInfo
            name="Edit Page Actions"
            description="Trigger specific functions on the edit page"
            ><SquarePen></SquarePen></SettingInfo
          >
        </section>

        <div class="grid grid-cols-2 gap-y-2 mt-4 text-textcol/50">
          <p>Save changes</p>

          <div class="flex flex-row gap-2">
            {@render hotkey('ctrl')}
            +
            {@render hotkey('s')}
          </div>
        </div>
        {@render Hr()}
        <section>
          <SettingInfo
            name="Search Page Actions"
            description="Trigger specific functions on the search page"
            ><Search></Search></SettingInfo
          >
        </section>

        <div class="grid grid-cols-2 gap-y-2 mt-4 text-textcol/50">
          <p>Highlight search bar</p>

          <div class="flex flex-row gap-2">
            {@render hotkey('ctrl')}
            +
            {@render hotkey('f')}
          </div>
        </div>
      {/if}
    </section>
  </div>
</div>

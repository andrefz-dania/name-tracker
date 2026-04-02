<script lang="ts">
  import { ChevronRight, Clock, Earth, Pin, Plus, UserIcon } from '@lucide/svelte'
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
  import ButtonMainMenu from '../components/ButtonMainMenu.svelte'

  let worldName = 'dummyWorld'
  let characterCount = 129
</script>

<Navigation style="no-back"></Navigation>

<Header>
  <div class="flex flex-row gap-2 items-center w-full place-content-center">
    <div class="logo-img h-24 w-24"></div>
    <h1 class="text-6xl text-primary">CaraBase</h1>
  </div>
</Header>

<article class="mx-auto w-full max-w-6xl overflow-y-scroll p-2 flex flex-col gap-12">
  <!-- world -->
  <section class="flex-col gap-4 flex">
    <div class="text-primary flex flex-row gap-2 items-center place-content-center">
      <Earth class="h-8 w-8"></Earth>
      {@render Heading1('World: ')}
      <p class="text-center text-textcol/75 text-3xl pl-4">{worldName}</p>
    </div>
    <div class="w-full max-w-2xl mx-auto flex gap-4">
      <ButtonMainMenu style="normal" disabled>Switch worlds<ChevronRight /></ButtonMainMenu>
      <ButtonMainMenu style="small" disabled><Plus></Plus></ButtonMainMenu>
    </div>
  </section>

  <!-- characters -->
  <section class="flex-col gap-4 flex">
    <div class="text-primary flex flex-row gap-2 items-center place-content-center">
      <UserIcon class="h-8 w-8"></UserIcon>
      {@render Heading1('Characters: ')}
      <p class="text-center text-textcol/75 text-3xl pl-4">{characterCount}</p>
    </div>
    <div class="w-full max-w-2xl mx-auto flex gap-4">
          <a href="#/list" class="w-full"
        ><ButtonMainMenu style="normal">Browse all characters<ChevronRight /></ButtonMainMenu></a
      >
      <a href="#/create" class="flex"
        ><ButtonMainMenu style="small"><Plus></Plus></ButtonMainMenu></a
      >

    </div>
    <div class="w-full max-w-6xl flex gap-4">
      <div class="w-full">
        <p class="text-primary font-bold flex gap-2 my-2"><Pin></Pin>PINNED</p>
        <div class="w-full flex gap-2 flex-col">
        <div class="h-10 bg-layer1 rounded-md p-2">Person</div>
        <div class="h-10 bg-layer1 rounded-md p-2">Person</div>

        <div class="h-10 bg-layer1 rounded-md p-2">Person</div>

        <div class="h-10 bg-layer1 rounded-md p-2">Person</div>
        </div>

      </div>
      <div class="w-full">
        <p class="text-primary font-bold flex gap-2 my-2"><Clock></Clock>RECENT</p>
                <div class="w-full flex gap-2 flex-col">
        <div class="h-10 bg-layer1 rounded-md p-2">Person</div>
        <div class="h-10 bg-layer1 rounded-md p-2">Person</div>

        <div class="h-10 bg-layer1 rounded-md p-2">Person</div>

        <div class="h-10 bg-layer1 rounded-md p-2">Person</div>
        </div>
      </div>
    </div>
  </section>
</article>

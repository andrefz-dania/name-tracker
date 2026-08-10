<script lang="ts">
  import { CirclePlus } from '@lucide/svelte'
  import type { WorldType } from '../../../types/types'
  import ButtonDecorated from '../components/ButtonDecorated.svelte'
  import Header from '../components/Header.svelte'
  import { Heading1 } from '../components/Headings.svelte'
  import Navigation from '../components/Navigation.svelte'
  import WorldCard from '../components/WorldCard.svelte'
  import { notif, sendNotif } from '../utils/context'
  let { activeWorld = $bindable() } = $props()
  let worlds: WorldType[] = $state([])

    async function getWorlds() {
    worlds = await window.api.getWorlds()
  }

  getWorlds();
  const changeActiveWorld = async (id: number) => {
        sendNotif(notif, 'Switching worlds...', 'progress')
    activeWorld = {
      id: id
    };
    const worldName = worlds.filter((world) => {
      return world.id === id;
    })[0].name;
    const response = await window.api.accessWorld(id)
    console.log(response)
    if (response.success) {
      sendNotif(notif, `Switched world to ${worldName}`, 'normal')
    } else {
      sendNotif(notif, `Failed to switch world`, 'destructive')
    }
  }
</script>

<Navigation>
      <a href="#/createworld"><ButtonDecorated type="button"><CirclePlus />New World</ButtonDecorated></a
  >
</Navigation>

<Header>
  {@render Heading1('Worlds')}
</Header>



<article class="mx-auto w-full max-w-6xl overflow-y-scroll p-2 flex flex-col gap-16">
{#if worlds}
  <div class="w-full flex gap-8 flex-wrap place-content-center">
    {#each worlds as world}
    <WorldCard
      {world}
      active={activeWorld.id === world.id ? true : false}
      changeActiveWorld={changeActiveWorld} />
    {/each}
  </div>
  {:else}
  <p class="opacity-50">No worlds found</p>
  {/if}
</article>

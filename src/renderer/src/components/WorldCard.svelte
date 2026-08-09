<script lang="ts">
  import { Earth } from '@lucide/svelte'
  import type { WorldType } from '../../../types/types'
  import { Heading2 } from './Headings.svelte'

  type Props = {
    world: WorldType
    active: boolean
    changeActiveWorld: (id: number) => void
  }

  const handleChangeWorld = (e) => {
    e.stopPropagation()
    e.preventDefault()
    changeActiveWorld(world.id)
  }

  let { world, active, changeActiveWorld }: Props = $props()
  const link = `#/world/${world.id}`
</script>

{#if !active}
  <a
    href={link}
    class="bg-layer1 p-8 rounded-xl flex flex-col gap-4 max-w-sm items-center text-center grow basis-0 cursor-pointer hover:bg-layer2 border border-transparent relative place-content-between"
  >
  <div class="flex flex-col items-center gap-2">
    <Earth class="h-12 w-12 text-primary"></Earth>
    {@render Heading2(world.name)}
    <p class="opacity-50">{world.description}</p>
</div>
    <button class="flex items-center place-content-center bg-transparent outline-primary outline-1 rounded-md p-2 px-2 w-full hover:bg-layer3/20 hover:outline-primary-highlight hover:text-primary-highlight text-primary" onclick={handleChangeWorld}>Load</button>
  </a>
{:else}
  <a
    href={link}
    class="bg-layer2 p-8 rounded-xl flex flex-col gap-4 max-w-sm items-center text-center grow basis-0 cursor-pointer hover:bg-layer2 border border-primary relative place-content-between"
  >
  <div class="flex flex-col items-center gap-2">
    <Earth class="h-12 w-12 text-primary"></Earth>
    {@render Heading2(world.name)}
    <p class="opacity-50">{world.description}</p>
    </div>
        <button class="flex items-center text-primary-highlight bg-primary/30 place-content-center rounded-md p-2 px-2 w-full" disabled>Active</button>

  </a>
{/if}

<script lang="ts">
  import { Earth } from '@lucide/svelte'
  import type { WorldType } from '../../../types/types'
  import { Heading2 } from './Headings.svelte'
  // import ButtonDecorated from './ButtonDecorated.svelte'

  type Props = {
    world: WorldType
    active: boolean
    changeActiveWorld: (id: number) => void
  }

  const handleChangeWorld = () => {
    // e.stopPropagation()
    // e.preventDefault()
    changeActiveWorld(world.id)
  }

  let { world, active, changeActiveWorld }: Props = $props()
  //const link = `#/world/${world.id}`
</script>

{#if !active}
  <div class="relative flex grow basis-0 max-w-md min-w-xs">
    <!-- <div class="absolute top-4 right-4 z-10">
      <a href={link}>
        <ButtonDecorated style="outline"><PencilIcon /></ButtonDecorated>
      </a>
    </div> -->
    <button
      onclick={handleChangeWorld}
      class="w-full bg-layer1 p-8 rounded-xl flex flex-col gap-4 items-center text-center cursor-pointer hover:bg-layer2 border border-transparent relative"
    >
      <Earth class="h-12 w-12 text-primary"></Earth>
      {@render Heading2(world.name)}
      <p class="opacity-50">{world.description}</p>
    </button>
  </div>
{:else}
  <div class="relative flex grow basis-0 max-w-md min-w-xs">
    <!-- <div class="absolute top-4 right-4 z-10">
      <a href={link}>
        <ButtonDecorated style="outline"><PencilIcon /></ButtonDecorated>
      </a>
    </div> -->
    <div
      class="w-full bg-layer2 p-8 rounded-xl flex flex-col gap-4  items-center text-center cursor-pointer hover:bg-layer2 border border-primary relative"
    >
      <Earth class="h-12 w-12 text-primary"></Earth>
      {@render Heading2(world.name)}
      <p class="opacity-50">{world.description}</p>

      <p
        class="px-2 py-1 bg-primary/30 text-primary-highlight text-sm rounded-full absolute top-4 left-4"
      >
        Active
      </p>
    </div>
  </div>
{/if}

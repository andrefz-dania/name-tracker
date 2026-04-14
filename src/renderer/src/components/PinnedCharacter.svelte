<script lang="ts">
  import type { CharacterType } from '../../../types/types'
  import { truncateString } from '../utils/truncateString'

  type Props = {
    character: CharacterType
    fadeCount?: number
  }

  let { character, fadeCount }: Props = $props()

  const link = $derived('#/character/' + character.id)
  const opacity = (fadeCount || 0) * 20;
</script>

<a
  href={link}
  class="h-10 bg-layer1 hover:bg-layer2 flex flex-row gap-2 items-center p-2 rounded-md place-content-between opacity-{fadeCount ? opacity : 100} hover:opacity-100!"
>
  <p>{truncateString(character.name, 50)}</p>
  {#if character.dead}
    <div class="h-4 w-4 bg-destructive-muted rounded-full flex items-center place-content-center">
      <div class="h-2 w-2 bg-destructive rounded-full"></div>
    </div>
  {:else}
    <div class="h-4 w-4 bg-positive-muted rounded-full flex items-center place-content-center">
      <div class="h-2 w-2 bg-positive rounded-full"></div>
    </div>
  {/if}
</a>

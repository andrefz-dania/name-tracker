<script lang="ts">
  import { onMount } from 'svelte'
  import CharacterList from './components/CharacterList.svelte'
  import Character from './pages/Character.svelte'
  import Create from './pages/Create.svelte'
  import Other from './pages/Other.svelte'
  import Settings from './pages/Settings.svelte'
  import { defaultInterfaceConfig, type InterfaceConfig } from '../../types/types'

  // load settings from localStorage - create settings if it doesn't exist
  let interfaceConfig: InterfaceConfig = $state(defaultInterfaceConfig)
  onMount(() => {
    const loadedInteraceConfig = JSON.parse(localStorage.getItem('interfaceConfig'))
    if (!loadedInteraceConfig) {
      localStorage.setItem('interfaceConfig', JSON.stringify(defaultInterfaceConfig))
    }

    interfaceConfig = loadedInteraceConfig
  })

  $effect(()=> {
    console.log('LOADED CONFIG', interfaceConfig)
    localStorage.setItem('interfaceConfig', JSON.stringify(interfaceConfig))
  })

  let currentRoute = $state(window.location.hash.slice(1) || '/')

  let route = $derived.by(() => {
    const parts = currentRoute.split('/')
    return parts[1]
  })

  let id = $derived.by(() => {
    const parts = currentRoute.split('/')
    if (parts[2]) {
      return parseInt(parts[2])
    } else {
      return null
    }
  })

  $effect(() => {
    const handler = () => {
      currentRoute = window.location.hash.slice(1) || '/'
      console.log('route', currentRoute, 'core route', route, 'id', id)
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  })
</script>

<main class="flex flex-col gap-2 p-4 max-h-screen">
  <!-- <p class="fixed mt-8 bottom-0 bg-black text-textcol">DEBUG ROUTE: {currentRoute}</p> -->
  {#if currentRoute === '/'}
    <CharacterList interfaceConfig={interfaceConfig}/>
  {:else if currentRoute === '/other'}
    <Other />
  {:else if route === 'character'}
    <Character {id} />
  {:else if route === 'create'}
    <Create />
  {:else if route === 'settings'}
    <Settings bind:interfaceConfig={interfaceConfig}></Settings>
  {:else}
    <h2>404 Not Found</h2>
  {/if}
</main>

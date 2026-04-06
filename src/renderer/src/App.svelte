<script lang="ts">
  import { onMount } from 'svelte'
  import CharacterList from './components/CharacterList.svelte'
  import Character from './pages/Character.svelte'
  import Create from './pages/Create.svelte'
  import Other from './pages/Other.svelte'
  import Settings from './pages/Settings.svelte'
  import { defaultInterfaceConfig, type InterfaceConfig } from '../../types/types'
  import Home from './pages/Home.svelte'
  import {notif} from './utils/context'
  import Notification from './components/Notification.svelte'

  let interfaceConfig: InterfaceConfig = $state(defaultInterfaceConfig)


  let themeClass = $derived(
    interfaceConfig.interfaceStyle === 'dark' ? 'theme-dark' : 'theme-light'
  )

  onMount(() => {
    const loadedInteraceConfig = JSON.parse(localStorage.getItem('interfaceConfig'))
    if (!loadedInteraceConfig || loadedInteraceConfig.length < 1) {
      setDefaultConfig();
      window.location.reload();
    }

    interfaceConfig = loadedInteraceConfig
  })

  function setDefaultConfig() {
    localStorage.setItem('interfaceConfig', JSON.stringify(defaultInterfaceConfig))
  }

  $effect(() => {
    console.log('LOADED CONFIG', interfaceConfig)
    if (interfaceConfig?.listStyle) {
    localStorage.setItem('interfaceConfig', JSON.stringify(interfaceConfig))
    }
  })

  let currentRoute = $state(window.location.hash.slice(1) || '/')

  const navHotkeys = (e: KeyboardEvent) => {
    e.preventDefault()
    if ((e.metaKey || e.ctrlKey) && e.key == 'n') {
      window.location.hash = '#/create'
    } else if (e.key == '1') {
      window.location.hash = '#/'
    } else if (e.key == '2') {
      window.location.hash = '#/list'
    } else if (e.key == '3') {
      window.location.hash = '#/settings'
    }
  }

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

$effect(() => {
  let idTimeout = undefined
    if ($notif !== null) {
      const time = $notif.type == 'progress' ? 60000 : 3000
    idTimeout = setTimeout(() => {
        $notif = null
      }, time)
    }
  return () => {
    if (idTimeout !== undefined) {
      clearTimeout(idTimeout)
    }
  }
  })
</script>

<svelte:window onkeydown={navHotkeys}></svelte:window>

<main class="flex flex-col gap-2 p-4 min-h-screen max-h-screen {themeClass} text-textcol bg-layer0 font-block">
<div class="absolute w-full top-4 flex flex-col gap-2 items-center place-content-center">
 {#if $notif}
  <Notification id={'1'} message={$notif.message} type={$notif.type}></Notification>
 {/if}
</div>
  <!-- <p class="fixed mt-8 bottom-0 bg-black text-textcol">DEBUG ROUTE: {currentRoute}</p> -->
  {#if currentRoute === '/'}
    <Home />
  {:else if currentRoute === '/list'}
    <CharacterList {interfaceConfig} />
  {:else if currentRoute === '/other'}
    <Other />
  {:else if route === 'character'}
    <Character {id} />
  {:else if route === 'create'}
    <Create />
  {:else if route === 'settings'}
    <Settings bind:interfaceConfig></Settings>
  {:else}
    <h2>404 Not Found</h2>
  {/if}
</main>


<script lang="ts">
  import CharacterList from './components/CharacterList.svelte'
  import Character from './pages/Character.svelte'
  import Create from './pages/Create.svelte'
  import Other from './pages/Other.svelte'

  let currentRoute = $state(window.location.hash.slice(1) || '/')

  let route = $derived.by(() => {
    const parts = currentRoute.split('/')
    return parts[1]
  })

  let id = $derived.by(() => {
    const parts = currentRoute.split('/')
    if (parts[2]) {
      return parts[2]
    } else {
      return null
    }
  })

  $effect(() => {
    const handler = () => {
      currentRoute = window.location.hash.slice(1) || '/'
      console.log('route', currentRoute)
      console.log('core route', route)
      console.log('id', id)
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  })

  // $effect(() => {
  //   console.log('route', currentRoute)
  // })

  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<main class="flex flex-col gap-2 p-4 max-h-screen">
  <!-- <nav class="fixed flex flex-row gap-8">
    <a class="hover:bg-layer1" href="#/">List</a>
    <a class="hover:bg-layer1" href="#/other">Other page</a>
    <a class="hover:bg-layer1" href="#/create">Create page</a>
    <a class="hover:bg-layer1" href="#/character/1">character 1</a>
    <a class="hover:bg-layer1" href="#/character/2">character 2</a>
  </nav> -->
  <p class="fixed mt-8 bottom-0 bg-black text-white">DEBUG ROUTE: {currentRoute}</p>
  {#if currentRoute === '/'}
    <CharacterList />
  {:else if currentRoute === '/other'}
    <Other />
  {:else if route === 'character'}
    <Character {id} />
  {:else if route === 'create'}
    <Create />
  {:else}
    <h2>404 Not Found</h2>
  {/if}
</main>

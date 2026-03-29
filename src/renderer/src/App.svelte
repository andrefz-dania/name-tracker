<script lang="ts">
  import CharacterList from './components/CharacterList.svelte'
  import Character from './pages/Character.svelte'
  import Other from './pages/Other.svelte'

  let currentRoute = $state(window.location.hash.slice(1) || '/')

  let route = $derived.by(() => {
    const parts = currentRoute.split('/')
    return parts[1];
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
      console.log('route', currentRoute);
      console.log('core route', route);
      console.log('id', id);
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  })

  // $effect(() => {
  //   console.log('route', currentRoute)
  // })

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>



<main class="flex flex-col gap-2 p-4 max-h-screen">
<nav>
  <a href="#/">List</a>
  <a href="#/other">Other page</a>
  <a href="#/character/1">character 1</a>
    <a href="#/character/2">character 2</a>
</nav>
  <p>{currentRoute}</p>
  {#if currentRoute === '/'}
    <CharacterList />
  {:else if currentRoute === '/other'}
    <Other />
  {:else if route === 'character'}
    <Character id={id} />
  {:else}
    <h2>404 Not Found</h2>
  {/if}
  <div>
  <button onclick={ipcHandle}>Send IPC</button>
</div>

</main>


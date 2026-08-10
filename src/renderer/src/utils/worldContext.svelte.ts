import { getContext, setContext } from 'svelte'
import { defaultActiveWorld } from '../../../types/types'

const WORLD_CONTEXT_KEY = Symbol('worldContext')

export class WorldContext {
  activeWorld: { id: number } = $state(defaultActiveWorld)

  constructor(initial: { id: number } = defaultActiveWorld) {
    this.activeWorld = initial
  }

  setActiveWorld(id: number): void {
    this.activeWorld = { id }
  }
}

export function createWorldContext(initial: { id: number } = defaultActiveWorld): WorldContext {
  const saved = JSON.parse(localStorage.getItem('activeWorld') ?? 'null')
  const activeWorld = saved?.id ? { id: saved.id } : initial
  return new WorldContext(activeWorld)
}

export function setWorldContext(): WorldContext {
  return setContext(WORLD_CONTEXT_KEY, createWorldContext())
}

export function getWorldContext(): WorldContext {
  return getContext<WorldContext>(WORLD_CONTEXT_KEY)
}

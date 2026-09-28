import type { InterfaceConfig, SearchMemory } from '../../../types/types'
import { notif, sendNotif } from './context'

export type CommandType = { id: number; name: string }

export const commands = [
  { id: 0, name: 'Toggle Light/Dark Mode' },
  { id: 1, name: 'Use Compact/Small List View' },
  { id: 2, name: 'Use Expanded/Large List View' },
  { id: 3, name: 'Use Grid List View' },
  { id: 4, name: 'Go to Home' },
  { id: 5, name: 'Go to Settings' },
  { id: 6, name: 'Create new character' },
  { id: 7, name: 'Go to character list' },
  { id: 8, name: 'Switch worlds' },
  { id: 9, name: 'Show/hide species column' },
  { id: 10, name: 'Show/hide gender column' },
  { id: 11, name: 'Show/hide occupation column' },
  { id: 12, name: 'Show/hide location column' },
  { id: 13, name: '?' }
]

function changeInterfaceSetting(
  currentSettings: InterfaceConfig,
  setting: string,
  value: string | number | boolean
) {
  const newInterfaceConfig: InterfaceConfig = {
    ...currentSettings,
    [setting]: value
  }
  localStorage.setItem('interfaceConfig', JSON.stringify(newInterfaceConfig))
  window.location.reload()
}

function hashNavigate(path: string) {
  window.location.hash = path
}

export function runCommand(id: number) {
  const prev: InterfaceConfig = JSON.parse(localStorage.getItem('interfaceConfig'))
  switch (id) {
    case 0:
      const newStyle = prev.interfaceStyle == 'dark' ? 'light' : 'dark'
      changeInterfaceSetting(prev, 'interfaceStyle', newStyle)
      break
    case 1:
      changeInterfaceSetting(prev, 'listStyle', 'small')
      break
    case 2:
      changeInterfaceSetting(prev, 'listStyle', 'large')
      break
    case 3:
      changeInterfaceSetting(prev, 'listStyle', 'grid')
      break
    case 4:
      hashNavigate('#/')
      break
    case 5:
      hashNavigate('#/settings')
      break
    case 6:
      hashNavigate('#/create')
      break
    case 7:
      hashNavigate('#/list')
      break
    case 8:
      hashNavigate('#/worlds')
      break
    case 9:
      const newSpeciesVisible = !prev.speciesVisible
      changeInterfaceSetting(prev, 'speciesVisible', newSpeciesVisible)
      break
    case 10:
      const newGenderVisible = !prev.genderVisible
      changeInterfaceSetting(prev, 'genderVisible', newGenderVisible)
      break
    case 11:
      const newOccupationVisible = !prev.occupationVisible
      changeInterfaceSetting(prev, 'occupationVisible', newOccupationVisible)
      break
    case 12:
      const newLocationVisible = !prev.locationVisible
      changeInterfaceSetting(prev, 'locationVisible', newLocationVisible)
      break
    case 13:
      sendNotif(notif, 'It is wednesday my dudes', 'normal')
    default:
      break
  }
}

export function navigateToCharacter(id: number) {
  window.location.hash = `#/character/${id}`
}

export function showTagged(tag: string) {
  const prevSearch: SearchMemory = JSON.parse(localStorage.getItem('searchMemory'))
  const newSearch = {
    ...prevSearch,
    lastSearch: `#${tag}`
  }
  localStorage.setItem('searchMemory', JSON.stringify(newSearch))
  if (window.location.hash == '#/list') {
    window.location.reload()
  } else {
    window.location.hash = `#/list`
  }
}

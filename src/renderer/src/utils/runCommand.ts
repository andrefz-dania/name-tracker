import type { InterfaceConfig, SearchMemory } from '../../../types/types'
import { notif, sendNotif } from './context';

export type CommandType = { id: number; name: string }

export const commands = [
  { id: 0, name: 'Toggle Light/Dark Mode' },
  { id: 1, name: 'Toggle Compact/Expanded List View' },
  { id: 3, name: 'Go to Home' },
  { id: 4, name: 'Go to Settings' },
  { id: 5, name: 'Create new character' },
  { id: 6, name: 'Go to character list' },
  { id: 7, name: 'Switch worlds' },
  { id: 8, name: 'Show/hide species column' },
  { id: 9, name: 'Show/hide gender column' },
  { id: 10, name: 'Show/hide occupation column' },
  { id: 11, name: 'Show/hide location column' },
    { id: 12, name: '?' },
]

function changeInterfaceSetting(currentSettings: InterfaceConfig, setting: string, value: string | number | boolean) {
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
      const newListView = prev.listStyle == 'small' ? 'large' : 'small'
      changeInterfaceSetting(prev, 'listStyle', newListView)
      break
    case 3:
      hashNavigate('#/')
      break
    case 4:
      hashNavigate('#/settings')
      break
    case 5:
      hashNavigate('#/create')
      break
    case 6:
        hashNavigate('#/list')
        break
    case 7:
        // implement worlds first
        break
    case 8:
        const newSpeciesVisible = !prev.speciesVisible
        changeInterfaceSetting(prev, 'speciesVisible', newSpeciesVisible)
        break
    case 9:
        const newGenderVisible = !prev.genderVisible
        changeInterfaceSetting(prev, 'genderVisible', newGenderVisible)
        break
    case 10:
        const newOccupationVisible = !prev.occupationVisible
        changeInterfaceSetting(prev, 'occupationVisible', newOccupationVisible)
        break
    case 11: 
        const newLocationVisible = !prev.locationVisible
        changeInterfaceSetting(prev, 'locationVisible', newLocationVisible)
        break
    case 12: 
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
    if (window.location.hash == "#/list") {
        window.location.reload()
    } else {
        window.location.hash = `#/list`
    }
}
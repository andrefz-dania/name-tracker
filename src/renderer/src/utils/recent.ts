import type { RecentChar } from "../../../types/types"

export async function addRecent(id: number) {

  const existingRecents: RecentChar[] | [] = JSON.parse(localStorage.getItem('recents') || '[]')

  // remove duplicates
  const newRecents = existingRecents.filter((c: RecentChar) => c.id !== id)

// sort array by timestamp
  newRecents.sort((a: RecentChar, b: RecentChar) => {
    return b.timeStamp - a.timeStamp
  })

  while (newRecents.length > 4) {
    newRecents.pop()
  }

  // add the character to the list at the beginning
  newRecents.unshift({ id: id, timeStamp: Date.now() })


  localStorage.setItem('recents', JSON.stringify(newRecents))
}

import { writable } from 'svelte/store';
import type { Notification } from '../../../types/types';

export const notifs = writable<Notification[] | []>([])

export const notif = writable<{message: string, type: 'normal' | 'positive' | 'destructive' | 'progress', id?: string} | null>(null)

export function sendNotif(notifier, message: string, type?: 'normal' | 'positive' | 'destructive' | 'progress') {
  if (notifier) notifier.update(()=>{
    return {message, type}
  })
}
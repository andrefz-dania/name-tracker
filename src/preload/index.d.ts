import { ElectronAPI } from '@electron-toolkit/preload'
import type { ApiTypes, CharacterType } from '../types/types';

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiTypes
  }
}

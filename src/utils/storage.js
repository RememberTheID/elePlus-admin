import { useStorage } from '@vueuse/core'
import { sysSetting } from '@/setting/sysSetting.js'
const { STORAGE_KEY } = sysSetting
export const useStoragePublic = () => {
  const storage = useStorage(STORAGE_KEY, {}, localStorage)
  const setItem = (key, value) => {
    storage.value[key] = value
  }
  const getItem = (key) => {
    return storage.value[key] || null
  }
  return {
    setItem,
    getItem
  }
}
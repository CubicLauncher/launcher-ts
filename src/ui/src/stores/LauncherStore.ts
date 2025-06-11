import { defineStore } from 'pinia'
import {type Instance} from '../../../shared/types'

export const useLauncherStore = defineStore('launcher', {
    state: () => ({
      CurrentInstance: null as Instance | null,
      Instances: [] as Instance[],
      isSettingsModalOpen: false,
      isAddInstanceModalOpen: false
    }),
    actions: {
      addInstance(instance: Instance) {
        this.Instances.push(instance)
      },
      setCurrentInstance(instance: Instance) {
        this.CurrentInstance = instance
      },
      toggleSettingsModel() {
        this.isSettingsModalOpen = !this.isSettingsModalOpen
      },
      toggleAddInstanceModal() {
        this.isAddInstanceModalOpen = !this.isAddInstanceModalOpen
      }
    }
})

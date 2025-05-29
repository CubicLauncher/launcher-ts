import { defineStore } from 'pinia'
import {type Instance} from '../../../shared/types'

export const useLauncherStore = defineStore('launcher', {
    state: () => ({
      CurrentInstance: null as Instance | null,
      Instances: [] as Instance[]  
    }),
    actions: {
      addInstance(instance: Instance) {
        this.Instances.push(instance)
      },
      setCurrentInstance(instance: Instance) {
        this.CurrentInstance = instance
      }
    }
})

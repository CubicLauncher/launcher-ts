import { defineStore } from "pinia";
import type { Instance } from "../../../shared/types";
import { SaveInstance } from "../api";

export const useLauncherStore = defineStore("launcher", {
	state: () => ({
		CurrentInstance: null as Instance | null,
		Instances: [] as Instance[],
		isSettingsModalOpen: false,
		isAddInstanceModalOpen: false,
	}),
	actions: {
		addInstance(instance: Instance) {
			this.Instances.push(instance);
			this.saveInstances(instance);
		},
		setCurrentInstance(instance: Instance) {
			this.CurrentInstance = instance;
		},
		toggleSettingsModel() {
			this.isSettingsModalOpen = !this.isSettingsModalOpen;
		},
		toggleAddInstanceModal() {
			this.isAddInstanceModalOpen = !this.isAddInstanceModalOpen;
		},
		async loadInstances() {
			try {
				const response = await window.cubic.launcher.getInstances();
				if (response.success && response.data) {
					this.Instances = response.data as Instance[];
				}
			} catch (error) {
				console.error("Error loading instances:", error);
			}
		},
		async saveInstances(instance: Instance) {
			try {
				await SaveInstance(instance);
			} catch (error) {
				console.error("Error saving instances:", error);
			}
		},
		// async deleteInstance(instanceName: string) {
		//   this.Instances = this.Instances.filter(instance => instance.name !== instanceName)
		//   if (this.CurrentInstance?.name === instanceName) {
		//     this.CurrentInstance = null
		//   }
		//   await this.saveInstances()
		// }
	},
});

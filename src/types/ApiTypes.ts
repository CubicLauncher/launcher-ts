import { NotificationAction } from "electron";

//launcher
export interface InstanceLaunch {
	version: string;
	InstanceName: string;
}

// Settings
export interface Settings {
	username: string;
	theme: string;
	java8: string;
	java17: string;
	java21: string;
	autoupdate: boolean;
	notifications: boolean;
	minMem: number;
	maxMem: number;
	gamedir: string;
}

// Api
export type CodeType = "ERR" | "OK" | "INF";

export interface CodeDefinition {
	type: CodeType;
	template: string; // Usa {field} como marcador de inserción
}

export interface APIResponse {
	type: CodeType;
	safeCode: CodeType;
	message: string;
}

// notifications
export interface NotificationRequest {
	title: string;
	body: string;
	actions?: NotificationAction[];
	silent?: boolean;
	urgency?: "normal" | "critical" | "low";
}

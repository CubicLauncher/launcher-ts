import { z } from "zod/v4";

export enum CubicError {
	// Errores de configuracion
	SettingsFileENOENT = "NOT_FOUND",
	UsernameLimitExceeded = "USERNAME_LIMIT_EXCEEDED",
	InvalidSettings = "INVALID_SETTINGS",

	// Errores de Instancias
	InstanceFileENOENT = "INSTANCE_FILE_NOT_FOUND",
	InstanceNameLimitExceeded = "INSTANCE_NAME_LIMIT_EXCEEDED",
	InvalidInstance = "INVALID_INSTANCE",

	// Errores de Ventana
	CloseWinError = "WINDOW_CLOSE_ERROR",
	HideWinError = "WINDOW_HIDE_ERROR",
	MaximizeWinError = "WINDOW_MAXIMIZE_ERROR",

	InvalidRequest = "INVALID_REQUEST",
	GenericFilesystem = "GENERIC_FILESYSTEM_ERROR",
}

export enum CubicRes {
	AlreadyExists = "ALREADY_EXISTS",
}

export enum Loaders {
	Fabric = "Fabric",
	Forge = "Forge",
	Quilt = "Quilt",
	NeoForge = "NeoForge",
	Vanilla = "Vanilla",
}

export const settingsSchema = z.object({
	username: z
		.string()
		.max(16, CubicError.UsernameLimitExceeded)
		.default("Steve"),
	resolution: z.object({
		height: z.number(),
		width: z.number(),
	}),
	memory: z.object({
		min: z.number(),
		max: z.number(),
	}),
	java: z.object({
		java8: z.string(),
		java17: z.string(),
		java21: z.string(),
	}),
});

export interface BackendRes {
	success: boolean;
	errorType?: CubicError;
	data?: any;
	error?: any;
}

export interface MinecraftVersion {
	id: string;
	type: "release" | "snapshot";
	url: string;
	time: string;
	releaseTime: string;
	sha1: string;
	complianceLevel: number;
}

export interface VersionManifest {
	latest: {
		release: string;
		snapshot: string;
	};
	versions: MinecraftVersion[];
}

export interface DownloadEvent {
	version: string;
	percent: number;
}

export const InstanceSchema = z.object({
	name: z.string().max(16, CubicError.InstanceNameLimitExceeded),
	loader: z.object({
		loader: z.enum(Loaders),
		version: z.string(),
	}),
	game: z.object({
		version: z.string(),
	}),
	lastPlayed: z.string().optional(),
});

export interface LauncherData {
	version: string;
	OS: string;
	OS_version: string;
}

export type Settings = z.infer<typeof settingsSchema>;
export type Instance = z.infer<typeof InstanceSchema>;

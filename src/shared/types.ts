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

  InvalidRequest = "INVALID_REQUEST",
  GenericFilesystem = "GENERIC_FILESYSTEM_ERROR",
}

const base64ImageSchema = z.string().refine(
  (val) =>
    /^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=\n\r]+$/.test(val),
  {
    message: "El icono debe ser una imagen en base64 válida (data URL).",
  }
);


export const settingsSchema = z.object({
  username: z
    .string()
    .max(16, CubicError.UsernameLimitExceeded)
    .default("Steve"),
  minMem: z.number().positive().default(512),
  maxMem: z.number().positive().default(2048),
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
  version: string,
  percent: number
}

export const InstanceSchema = z.object({
  name: z
    .string()
    .max(16, CubicError.InstanceFileENOENT),
  loader: z.string(),
  modded: z.boolean(),
  icon: base64ImageSchema,
  version: z.string(),
  java: z.object({
    java8: z.string(),
    java17: z.string(),
    java21: z.string(),
  })
});

export type Settings = z.infer<typeof settingsSchema>;
export type Instance = z.infer<typeof InstanceSchema>;

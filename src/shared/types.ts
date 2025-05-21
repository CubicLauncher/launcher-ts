import { z } from "zod/v4";

export enum CubicError {
  // Errores de configuracion
  SettingsFileENOENT = "NOT_FOUND",
  UsernameLimitExceeded = "USERNAME_LIMIT_EXCEEDED",
  InvalidSettings = "INVALID_SETTINGS",

  InvalidRequest = "INVALID_REQUEST",
  GenericFilesystem = "GENERIC_FILESYSTEM_ERROR",
}

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

// 2. Exporta el tipo inferido
export type Settings = z.infer<typeof settingsSchema>;

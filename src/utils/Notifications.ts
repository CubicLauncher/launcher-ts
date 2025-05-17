import {
	NotificationRequest,
	Settings,
} from "../types/ApiTypes.js";
import { getSettings } from "./settings.js";
import { Notification } from "electron";
import handleCode from "./Api.js";
const settings = await getSettings();

async function VerifyIfNotificationsEnabled(): Promise<boolean> {
	if (
		settings.success &&
		(settings.data as Settings).notifications === true
	) {
		return true;
	} else {
		return false;
	}
}

export async function showNotification(
	request: NotificationRequest,
) {
	const isEnabled = await VerifyIfNotificationsEnabled();
	const options: Electron.NotificationConstructorOptions = {
		title: request.title,
		body: request.body,
		...(request.actions !== undefined && {
			actions: request.actions,
		}),
		...(request.silent !== undefined && {
			silent: request.silent,
		}),
		...(request.urgency !== undefined && {
			urgency: request.urgency,
		}),
	};

	const notification = new Notification(options);
	if (isEnabled) {
		try {
			notification.show();
			return handleCode(
				"OK03",
				`show notification with title ${request.title}`,
			);
		} catch (error: unknown) {
			if (typeof error === "string") {
				return handleCode("ERR11", error);
			}
			if (error instanceof Error) {
				return handleCode("ERR11", error.message);
			}
			return handleCode("ERR99", "Unknown error");
		}
	} else {
		return handleCode(
			"ERR10",
			"Notificaciones deshabilitadas por el usuario",
		);
	}
}

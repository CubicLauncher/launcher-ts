export interface LocaleFile {
	meta: {
		author: string;
		[key: string]: any;
	};
	errorCodes: {
		[errorCode: string]: string;
	};
	translations: {
		[key: string]: any;
	};
}

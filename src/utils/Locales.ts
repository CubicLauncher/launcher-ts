import fs from 'node:fs/promises';
import path from 'node:path';
import axios from 'axios';
import appPaths from './AppPaths';

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

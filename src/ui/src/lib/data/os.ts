export type OperatingSystem = "Windows" | "MacOS" | "Linux" | "Unknown";
export type Architecture =
	| "x86_64"
	| "x86"
	| "ARM64"
	| "ARM"
	| "RISC-V"
	| "PowerPC"
	| "Unknown";

// Cache for OS and architecture detection
let cachedOS: OperatingSystem | null = null;
let cachedArchitecture: Architecture | null = null;

// Precompiled regex patterns for better performance
const WINDOWS_PATTERNS = /(win|windows|win64|win32)/i;
const MACOS_PATTERNS = /(mac|macintosh|darwin|mac os x)/i;
const LINUX_PATTERNS = /(linux|ubuntu|debian|fedora|centos|redhat)/i;
const X86_64_PATTERNS = /(x86_64|x64|amd64|win64)/i;
const X86_PATTERNS = /(x86|i386|i686|win32)/i;
const ARM64_PATTERNS = /(arm64|aarch64)/i;
const ARM_PATTERNS = /(arm)/i;
const RISC_V_PATTERNS = /(riscv|risc-v)/i;
const POWERPC_PATTERNS = /(ppc|powerpc)/i;

export function getOperatingSystem(): OperatingSystem {
	// Return cached result if available
	if (cachedOS !== null) {
		return cachedOS;
	}

	// Check if we're in a browser environment
	if (typeof window === "undefined" || !window.navigator) {
		cachedOS = "Unknown";
		return cachedOS;
	}

	const userAgent = window.navigator.userAgent;
	const platform = window.navigator.platform;

	// Check most common OS first for better performance
	if (WINDOWS_PATTERNS.test(platform) || WINDOWS_PATTERNS.test(userAgent)) {
		cachedOS = "Windows";
	} else if (MACOS_PATTERNS.test(platform) || MACOS_PATTERNS.test(userAgent)) {
		cachedOS = "MacOS";
	} else if (LINUX_PATTERNS.test(platform) || LINUX_PATTERNS.test(userAgent)) {
		cachedOS = "Linux";
	} else {
		cachedOS = "Unknown";
	}

	return cachedOS;
}

export function getArchitecture(): Architecture {
	// Return cached result if available
	if (cachedArchitecture !== null) {
		return cachedArchitecture;
	}

	if (typeof window === "undefined" || !window.navigator) {
		cachedArchitecture = "Unknown";
		return cachedArchitecture;
	}

	const userAgent = window.navigator.userAgent;
	const platform = window.navigator.platform;

	// Check most common architectures first
	if (X86_64_PATTERNS.test(userAgent) || X86_64_PATTERNS.test(platform)) {
		cachedArchitecture = "x86_64";
	} else if (X86_PATTERNS.test(userAgent) || X86_PATTERNS.test(platform)) {
		cachedArchitecture = "x86";
	} else if (
		ARM64_PATTERNS.test(userAgent) ||
		ARM64_PATTERNS.test(platform) ||
		(userAgent.includes("macintosh") && ARM_PATTERNS.test(userAgent))
	) {
		cachedArchitecture = "ARM64";
	} else if (ARM_PATTERNS.test(userAgent) || ARM_PATTERNS.test(platform)) {
		cachedArchitecture = "ARM";
	} else if (
		RISC_V_PATTERNS.test(userAgent) ||
		RISC_V_PATTERNS.test(platform)
	) {
		cachedArchitecture = "RISC-V";
	} else if (
		POWERPC_PATTERNS.test(userAgent) ||
		POWERPC_PATTERNS.test(platform)
	) {
		cachedArchitecture = "PowerPC";
	} else {
		cachedArchitecture = "Unknown";
	}

	return cachedArchitecture;
}

export function getProcessorInfo() {
	if (typeof window === "undefined") {
		return {
			hardwareConcurrency: "Unknown",
			architecture: "Unknown" as Architecture,
		};
	}

	return {
		hardwareConcurrency: navigator.hardwareConcurrency || "Unknown",
		architecture: getArchitecture(),
	};
}

export function getSystemDetails() {
	const processorInfo = getProcessorInfo();

	return {
		os: getOperatingSystem(),
		platform:
			typeof window !== "undefined" ? window.navigator.platform : "Unknown",
		userAgent:
			typeof window !== "undefined" ? window.navigator.userAgent : "Unknown",
		language:
			typeof window !== "undefined" ? window.navigator.language : "Unknown",
		processor: {
			architecture: processorInfo.architecture,
			cores: processorInfo.hardwareConcurrency,
		},
	};
}

// Función para limpiar la caché si es necesario
export function clearDetectionCache() {
	cachedOS = null;
	cachedArchitecture = null;
}

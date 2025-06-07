export type OperatingSystem = 'Windows' | 'MacOS' | 'Linux' | 'Unknown';
export type Architecture = 
    | 'x86_64' 
    | 'x86' 
    | 'ARM64'
    | 'ARM'
    | 'RISC-V'
    | 'PowerPC'
    | 'Unknown';

export function getOperatingSystem(): OperatingSystem {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || !window.navigator) {
        return 'Unknown';
    }

    const platform = window.navigator.platform.toLowerCase();
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (platform.includes('win') || userAgent.includes('windows')) {
        return 'Windows';
    }

    if (platform.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('darwin')) {
        return 'MacOS';
    }

    if (platform.includes('linux') || userAgent.includes('linux')) {
        return 'Linux';
    }

    return 'Unknown';
}

export function getArchitecture(): Architecture {
    if (typeof window === 'undefined' || !window.navigator) {
        return 'Unknown';
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform.toLowerCase();
    
    // Detectar arquitecturas x86_64/x64
    if (
        userAgent.includes('x86_64') || 
        userAgent.includes('x64') || 
        userAgent.includes('amd64') ||
        userAgent.includes('win64') ||
        platform.includes('x86_64') ||
        platform.includes('x64') ||
        platform.includes('amd64')
    ) {
        return 'x86_64';
    }
    
    // Detectar arquitecturas x86/32-bit
    if (
        userAgent.includes('x86') || 
        userAgent.includes('i386') || 
        userAgent.includes('i686') ||
        platform.includes('x86') ||
        platform.includes('i386') ||
        platform.includes('i686') ||
        (platform.includes('win32') && !userAgent.includes('arm'))
    ) {
        return 'x86';
    }
    
    // Detectar ARM64/AArch64
    if (
        userAgent.includes('arm64') ||
        userAgent.includes('aarch64') ||
        platform.includes('arm64') ||
        platform.includes('aarch64')
    ) {
        return 'ARM64';
    }
    
    // Detectar ARM
    if (
        userAgent.includes('arm') ||
        platform.includes('arm')
    ) {
        return 'ARM';
    }
    
    // Detectar RISC-V
    if (
        userAgent.includes('riscv') ||
        platform.includes('riscv')
    ) {
        return 'RISC-V';
    }
    
    // Detectar PowerPC
    if (
        userAgent.includes('ppc') ||
        userAgent.includes('powerpc') ||
        platform.includes('ppc') ||
        platform.includes('powerpc')
    ) {
        return 'PowerPC';
    }

    return 'Unknown';
}

export function getProcessorInfo() {
    if (typeof window === 'undefined') {
        return {
            hardwareConcurrency: 'Unknown',
            architecture: 'Unknown' as Architecture
        };
    }

    return {
        // Número de núcleos lógicos del procesador
        hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
        // Arquitectura del procesador
        architecture: getArchitecture()
    };
}

// También podemos obtener más detalles del sistema
export function getSystemDetails() {
    const processorInfo = getProcessorInfo();
    
    return {
        os: getOperatingSystem(),
        platform: typeof window !== 'undefined' ? window.navigator.platform : 'Unknown',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
        language: typeof window !== 'undefined' ? window.navigator.language : 'Unknown',
        // Información del procesador
        processor: {
            architecture: processorInfo.architecture,
            cores: processorInfo.hardwareConcurrency
        }
    };
}

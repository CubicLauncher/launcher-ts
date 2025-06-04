import type { Component } from 'vue';
import FabricIcon from '../../assets/icons/fabric.vue';
import Quilt from '../../assets/icons/Quilt.vue';

export interface INoInstance {
    message: string;
    description: string;
    icon: Component;
}

export const noInstanceMessages: Record<number, INoInstance> = {
    1: { 
        message: "Parece que no tienes instancias descargadas.", 
        description: "Descarga una aquí!",
        icon: FabricIcon
    },
    2: { 
        message: "¿Listo para empezar?", 
        description: "Crea tu primera instancia de Minecraft",
        icon: Quilt
    },
    3: { 
        message: "¡Bienvenido a Cubic!", 
        description: "Comienza descargando tu primera instancia",
        icon: FabricIcon
    },
    4: { 
        message: "No hay instancias disponibles", 
        description: "Haz clic para descargar una nueva",
        icon: Quilt
    },
}; 
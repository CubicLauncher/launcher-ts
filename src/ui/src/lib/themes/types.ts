export type Theme = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  text: string;
  hover: string;
  border: string;
  separator: string;
}

export interface ThemeInput {
  background: string;
  text: string;
  border: string;
  focus: string;
}

export interface ThemeButton {
  background: string;
  text: string;
  hover: string;
  border: string;
}

export interface ThemeNavItem {
  active: {
    background: string;
    text: string;
    border: string;
    shadow: string;
    hoverText: string;
    labelText: string;
  };
  inactive: {
    background: string;
    text: string;
    border: string;
    hover: string;
    hoverText: string;
    labelText: string;
  };
}

export interface ThemeComponent {
  background: string;
  text: string;
  border: string;
  hover?: string;
}

export interface ThemeConfig {
  background: string;
  text: string;
  hover: string;
  border: string;
  separator: string;
  input: ThemeInput;
  button: {
    primary: ThemeButton;
  };
  drawer: ThemeComponent;
  sidebar: ThemeComponent & {
    navItem: ThemeNavItem;
  };
}

export interface ThemeStyles {
  light: ThemeConfig;
  dark: ThemeConfig;
} 
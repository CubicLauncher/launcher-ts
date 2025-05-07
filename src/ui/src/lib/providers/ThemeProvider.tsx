import { useEffect } from 'react';
import useThemeStore from '../stores/ThemeStore';

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;

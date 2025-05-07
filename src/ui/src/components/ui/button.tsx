import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useThemeStyles } from '../../lib/hooks/useThemeStyles';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const styles = useThemeStyles();
    const buttonStyles = styles.button[variant];

    const sizeStyles = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          buttonStyles.background,
          buttonStyles.text,
          buttonStyles.border,
          buttonStyles.hover,
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button }; 
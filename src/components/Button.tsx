import React, { ReactNode, MouseEventHandler } from 'react';
import styles from './Button.module.css'; // Importe os estilos

interface ButtonProps {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

function Button({ children, onClick, className }: ButtonProps) {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick}> {/* Use styles.button */}
            {children}
        </button>
    );
}

export default Button;
export {}
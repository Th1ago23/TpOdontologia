import React from 'react';
import styles from './Footer.module.css'; // Importe os estilos

function Footer() {
    return (
        <footer className={styles.footer}> {/* Use styles.footer */}
            <p>&copy; [Ano] [Nome do Consultório]. Todos os direitos reservados.</p>
        </footer>
    );
}

export default Footer;
export {}
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Importe os estilos


function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src='/images/Logo.png' alt="Logo TP Odontologia" /> {/* Substitua o h1 pela img */}
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><Link to="/login" className={styles.authLink}>Logar</Link></li>
                    <li><Link to="/cadastro" className={styles.authLink}>Registrar</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export {}
export default Header;
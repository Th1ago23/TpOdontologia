import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Importe os estilos

function Header() {
    return (
        <header className={styles.header}> {/* Use styles.header */}
            <div className={styles.logo}> {/* Use styles.logo */}
                <h1>[Nome do Consultório]</h1>
            </div>
            <nav className={styles.nav}> {/* Use styles.nav */}
            <li>
                        <Link to="/login">
                            <button className={styles.authButton}>Logar</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cadastro">
                            <button className={styles.authButton}>Registrar</button>
                        </Link>
                    </li>
            </nav>
        </header>
    );
}
export {}
export default Header;
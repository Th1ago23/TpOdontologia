import React from 'react';
import styles from './LoginPage.module.css'; // Importe os estilos

function LoginPage() {
    return (
        <main className={styles.loginPage}> {/* Use styles.loginPage */}
            <h1>Login</h1>
            {/* Aqui você pode colocar o formulário de login */}
        </main>
    );
}

export default LoginPage;
export {};
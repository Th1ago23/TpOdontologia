import React from 'react';
import styles from './CadastroPage.module.css'; // Importe os estilos

function CadastroPage() {
    return (
        <main className={styles.cadastroPage}> {/* Use styles.cadastroPage */}
            <h1>Cadastro de Paciente</h1>
            {/* Aqui você pode colocar o formulário de cadastro */}
        </main>
    );
}

export default CadastroPage;
export {};
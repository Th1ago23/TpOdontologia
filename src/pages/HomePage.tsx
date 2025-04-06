import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import Button from '../components/Button';
import { motion } from 'framer-motion';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const procedimentos = [
    {
        nome: 'Limpeza Dental',
        descricao: 'Remoção de placa bacteriana e tártaro para manter seus dentes saudáveis.',
        imagem: '/imagens/limpeza_dental.jpg',
    },
    {
        nome: 'Clareamento Dental',
        descricao: 'Tratamento estético para clarear seus dentes e melhorar seu sorriso.',
        imagem: '/imagens/clareamento_dental.jpg',
    },
    {
        nome: 'Implantes Dentários',
        descricao: 'Substituição de dentes perdidos com implantes para restaurar a função e estética.',
        imagem: '/imagens/implantes_dentarios.jpg',
    },
    // Adicione mais procedimentos conforme necessário
];

function HomePage() {
    const swiperRef = useRef<any>(null);

    return (
        <motion.main
            className={styles.main}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.section
                className={styles.hero}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className={styles.heroContent}>
                    <h2>TP Odontologia</h2>
                    <p>O melhor da vida é sorrir!</p>
                    <Link to="/procedimentos">
                        <Button className="primary">Descubra Mais</Button>
                    </Link>
                </div>
            </motion.section>

            <section id="procedimentos" className={`${styles.contentSection} ${styles.leftImage}`}>
                <div className={styles.imageContainer}>
                    {/* Carrossel de Procedimentos com Swiper */}
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={true}
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination, A11y]}
                        className="mySwiper"
                    >
                        {procedimentos.map((procedimento, index) => (
                            <SwiperSlide key={index}>
                                <div className={styles.carouselItem}>
                                    <img src={procedimento.imagem} alt={procedimento.nome} />
                                    <h3>{procedimento.nome}</h3>
                                    <p>{procedimento.descricao}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={styles.textContainer}>
                    <h2>Nossos Procedimentos</h2>
                    <p>Conheça alguns dos nossos principais procedimentos.</p>
                    <Link to="/procedimentos">
                        <Button>Ver Todos os Procedimentos</Button>
                    </Link>
                </div>
            </section>

            <motion.section
                id="dentistas"
                className={`${styles.contentSection} ${styles.rightImage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <div className={styles.imageContainer}>
                    <img src="/imagens/dentista_exemplo.jpg" alt="Dentista Exemplo" />
                </div>
                <div className={styles.textContainer}>
                    <h2>Conheça os Nossos Dentistas</h2>
                    <p>Apresente os dentistas que fazem parte da equipe. Destaque suas especializações e um breve resumo de suas experiências.</p>
                    <div className={styles.dentistCard}>
                        <h3>Dra. [Nome do Dentista 1]</h3>
                        <p>Especialista em [Especialidade]</p>
                    </div>
                    <div className={styles.dentistCard}>
                        <h3>Dr. [Nome do Dentista 2]</h3>
                        <p>Especialista em [Outra Especialidade]</p>
                    </div>
                    <Link to="/dentistas">
                        <Button>Conheça a Equipe Completa</Button>
                    </Link>
                </div>
            </motion.section>

            <motion.section // Animação na seção localização
                id="localizacao"
                className={`${styles.contentSection} ${styles.leftImage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <div className={styles.imageContainer}>
                    <div>[MAPA]</div>
                </div>
                <div className={styles.textContainer}>
                    <h2>Nossa Localização</h2>
                    <p>Encontre-nos facilmente!</p>
                    <p>[Endereço Completo do Consultório]</p>
                    <p>Telefone: [Número de Telefone]</p>
                    <Link to="/localizacao">
                        <Button>Ver no Mapa</Button>
                    </Link>
                </div>
            </motion.section>

            <motion.section // Animação na seção fotos
                id="fotos"
                className={`${styles.contentSection} ${styles.rightImage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
            >
                <div className={styles.imageContainer}>
                    <div className={styles.gallery}>
                        <img src="/imagens/consultorio_foto1.jpg" alt="Foto do Consultório 1" />
                        <img src="/imagens/consultorio_foto2.jpg" alt="Foto do Consultório 2" />
                    </div>
                </div>
                <div className={styles.textContainer}>
                    <h2>Fotos do Consultório</h2>
                    <p>Veja um pouco do nosso espaço acolhedor e moderno.</p>
                    <Link to="/fotos">
                        <Button>Ver Mais Fotos</Button>
                    </Link>
                </div>
            </motion.section>
        </motion.main>
    );
}

export default HomePage;
export {};
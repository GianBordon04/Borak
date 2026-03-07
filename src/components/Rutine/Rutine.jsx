import { useState } from 'react';
import styles from './Rutine.module.css';

const Rutine = () => {
    // Ejemplo de datos de ejercicios. Reemplaza con datos reales o props.
    const ejercicios = [
        { id: 1, nombre: 'Push-ups', videoUrl: 'https://example.com/pushups-video' },
        { id: 2, nombre: 'Squats', videoUrl: 'https://example.com/squats-video' },
        { id: 3, nombre: 'Planks', videoUrl: 'https://example.com/planks-video' },
    ];

    const [calificaciones, setCalificaciones] = useState({});

    const handleCalificacion = (id, calif) => {
        setCalificaciones(prev => ({ ...prev, [id]: calif }));
    };

    const handleVerVideo = (url) => {
        window.open(url, '_blank');
    };

    return (
        <>
            <h1>Rutina</h1>
            <div>
                <div>
                    <p>Buscar por fecha</p>
                    <p>Calendario</p>
                </div>
                <div>
                    <p>Rutina (por dias)</p>
                    <div className={styles.ejercicios}>
                        {ejercicios.map(ej => (
                            <div key={ej.id} className={styles.ejercicio}>
                                <h3>{ej.nombre}</h3>
                                <button onClick={() => handleVerVideo(ej.videoUrl)}>Ver Video</button>
                                <div className={styles.calificacion}>
                                    <button 
                                        className={calificaciones[ej.id] === 'bien' ? styles.selected : ''} 
                                        onClick={() => handleCalificacion(ej.id, 'bien')}
                                    >
                                        Bien
                                    </button>
                                    <button 
                                        className={calificaciones[ej.id] === 'masomenos' ? styles.selected : ''} 
                                        onClick={() => handleCalificacion(ej.id, 'masomenos')}
                                    >
                                        Más o menos
                                    </button>
                                    <button 
                                        className={calificaciones[ej.id] === 'mal' ? styles.selected : ''} 
                                        onClick={() => handleCalificacion(ej.id, 'mal')}
                                    >
                                        Mal
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <p>Comentarios</p>
                </div>
            </div>
        </>
    );
};

export default Rutine;
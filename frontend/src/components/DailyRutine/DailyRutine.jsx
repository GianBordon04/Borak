import { useState, useEffect } from 'react';
import styles from './DailyRutine.module.css';

const DailyRutine = ({ user }) => {
    const [diaActual, setDiaActual] = useState('');
    const [rutinaDelDia, setRutinaDelDia] = useState([]);
    const [progreso, setProgreso] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Establecer el día actual en español
        const hoy = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
        setDiaActual(hoy);

        const fetchRutinaReal = async () => {
            try {
                // Llamamos a tu endpoint personalizado
                const response = await fetch(`http://localhost:3000/routine/${user.id}`);
                const data = await response.json();

                if (response.ok) {
                    setRutinaDelDia(data);
                    
                    // Inicializamos el estado del progreso basándonos en los ejercicios reales
                    const initialProgreso = {};
                    data.forEach((ej, index) => {
                        // Usamos index o un id único de la DB
                        initialProgreso[index] = { series: '', reps: '', peso: '' };
                    });
                    setProgreso(initialProgreso);
                }
            } catch (error) {
                console.error("Error cargando rutina diaria:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) fetchRutinaReal();
    }, [user]);

    const handleChange = (id, field, value) => {
        setProgreso(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));
    };

    if (loading) return <p>Cargando entrenamiento de hoy...</p>;

    if (rutinaDelDia.length === 0) {
        return <p className={styles.noRutina}>No hay rutina programada para hoy ({diaActual}).</p>;
    }

    return (
        <div className={styles.container}>
            <h1>Rutina del Día: {diaActual.charAt(0).toUpperCase() + diaActual.slice(1)}</h1>
            <p className={styles.routineSubtitle}>Enfoque: {rutinaDelDia[0]?.routine_name}</p>
            
            <div className={styles.ejercicios}>
                {rutinaDelDia.map((ej, index) => (
                    <div key={index} className={styles.ejercicio}>
                        <h3>{ej.exercise_name}</h3>
                        <div className={styles.sugerido}>
                            <span>Sugerido: {ej.series} series x {ej.reps} reps ({ej.weight_kg}kg)</span>
                        </div>
                        
                        <div className={styles.inputs}>
                            <label>
                                Series:
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={progreso[index]?.series || ''}
                                    onChange={(e) => handleChange(index, 'series', e.target.value)}
                                />
                            </label>
                            <label>
                                Reps:
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={progreso[index]?.reps || ''}
                                    onChange={(e) => handleChange(index, 'reps', e.target.value)}
                                />
                            </label>
                            <label>
                                Peso:
                                <input
                                    type="number"
                                    placeholder="kg"
                                    value={progreso[index]?.peso || ''}
                                    onChange={(e) => handleChange(index, 'peso', e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.guardar}>Finalizar y Guardar Entrenamiento</button>
        </div>
    );
};

export default DailyRutine;
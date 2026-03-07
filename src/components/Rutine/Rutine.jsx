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
                ))}

            </div>
            ))}
            </>

            <div style={{ position: "relative", width: "300px" }}>
                <input
                    type="text"
                    placeholder="Buscar ejercicio..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setShowDropdown(true)
                        setSelectedExercise(null)
                    }}
                    onFocus={() => setShowDropdown(true)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                    }}
                />

                {showDropdown && (
                    <div
                        style={{
                            position: "absolute",
                            width: "100%",
                            maxHeight: "200px",
                            overflowY: "auto",
                            border: "1px solid #ccc",
                            background: "white",
                            zIndex: 1000,
                        }}
                    >
                        {filteredExercises.length > 0 ? (
                            filteredExercises.map((exercise) => (
                                <div
                                    key={exercise.id}
                                    onClick={() => {
                                        setQuery(exercise.name)
                                        setSelectedExercise(exercise)
                                        setShowDropdown(false)
                                    }}
                                    style={{
                                        padding: "8px",
                                        cursor: "pointer",
                                    }}
                                >
                                    {exercise.name}
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: "8px" }}>
                                No se encontraron ejercicios
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 🔥 PREVIEW DEL EJERCICIO */}
            {selectedExercise && (
                <div
                    style={{
                        marginTop: "30px",
                        padding: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        width: "400px"
                    }}
                >
                    <h2>{selectedExercise.name}</h2>

                    <p>
                        <strong>Músculo principal:</strong>{" "}
                        {selectedExercise.primaryMuscle}
                    </p>

                    {selectedExercise.secondaryMuscles.length > 0 && (
                        <p>
                            <strong>Músculos secundarios:</strong>{" "}
                            {selectedExercise.secondaryMuscles.join(", ")}
                        </p>
                    )}

                    <p>
                        <strong>Tipo:</strong> {selectedExercise.type}
                    </p>

                    <p>
                        <strong>Equipamiento:</strong>{" "}
                        {selectedExercise.equipment}
                    </p>

                    <img
                        src={selectedExercise.image}
                        alt={selectedExercise.name}
                        style={{
                            width: "100%",
                            marginTop: "15px",
                            borderRadius: "6px"
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default Rutine;
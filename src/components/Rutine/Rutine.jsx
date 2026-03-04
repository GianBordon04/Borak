import { useState } from "react"
import exercises from "../../data/exercises.json"

const Rutine = () => {
    const [query, setQuery] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState(null)

    const filteredExercises = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <>
            <h1>Rutina</h1>

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
    )
}

export default Rutine
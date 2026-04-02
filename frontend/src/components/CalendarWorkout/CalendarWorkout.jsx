import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarWorkout.css";

// Agregamos = [] para que si llega undefined, el código no rompa
const WorkoutCalendar = ({ routineDays = [], workoutSessions = [], onDateClick }) => {

  const getTileClass = ({ date, view }) => {
    // Solo aplicar lógica en la vista de mes
    if (view !== "month") return;

    const dayOfWeek = date.getDay(); // 0 (Dom) a 6 (Sáb)
    const dateString = date.toISOString().split("T")[0];

    // 1. Ver historial con Optional Chaining (?.)
    const session = workoutSessions?.find(s => s.date === dateString);
    if (session) return "completed-day";

    // 2. Ver si hay rutina asignada para ese día de la semana
    // Usamos ?. por si routineDays llega nulo accidentalmente
    const hasRoutine = routineDays?.some(day => day.weekDay === dayOfWeek);
    
    if (hasRoutine) {
      return "training-day"; 
    }

    return "rest-day";
  };

  return (
    <div className="calendar-container">
      <Calendar 
        tileClassName={getTileClass} 
        onClickDay={onDateClick} 
      />
    </div>
  );
};

export default WorkoutCalendar;
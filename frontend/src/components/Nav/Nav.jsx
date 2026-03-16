import HamburgerMenu from "../HamburguerMenu/HamburgerMenu";

import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = ({ user, logout, isAdmin }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link to="/">BORAK</Link>
      </div>

      <ul className={styles.menu}>
        {/* Rutas para todos los usuarios logueados */}
        <li><Link to="/seccion/Rutina">Mi Rutina</Link></li>
        <li><Link to="/seccion/Progresos">Progresos</Link></li>
        <li><Link to="/seccion/Objetivos">Objetivos</Link></li>
        <li><Link to="/seccion/Perfil">Perfil</Link></li>
        <li><Link to="/seccion/Us">Nosotros</Link></li>

        {/* --- LO NUEVO: RUTA PROTEGIDA PARA EL PROFE --- */}
        {isAdmin && (
          <li>
            <Link 
              to="/seccion/AdministrarPerfiles" 
              className={styles.adminLink}
              style={{ fontWeight: "bold", color: "#ffcc00" }} // Un color distinto para resaltar
            >
              ADMINISTRAR CLIENTES
            </Link>
          </li>
        )}
      </ul>

      <div className={styles.userSection}>
        <span className={styles.userName}>Hola, {user?.name}</span>
        <button onClick={logout} className={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Nav;
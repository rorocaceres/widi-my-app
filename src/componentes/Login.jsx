import React, { useState } from "react";
import "./../disenios/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-box">
          <h2 className="login-title">Inicia tu viaje</h2>
          <h1 className="login-subtitle">Iniciar sesión en Horario Profesores EPET 20</h1>

          <form onSubmit={handleLogin}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-btn">
              Entrar
            </button>
          </form>

          <div className="divider">o inicia sesión con</div>

          <div className="social-buttons">
            <button className="social-btn fb">f</button>
            <button className="social-btn google">G</button>
            <button className="social-btn apple"></button>
          </div>

          <p className="register-text">
            ¿No tenés cuenta? <a href="/register">Registrate</a>
          </p>
        </div>
      </div>

      <div className="login-right"></div>
    </div>
  );
}

export default Login;

/**


Ahora quiero que me sumes una pagina mas a mi pagina de horarios para profesores y preceptores, dentro del sidebar creo con los demas links o como se conecte. Una pagina que van a usar los alumnos, en donde se van a registrar o loguear antes de entrar a la pagina de la epet20 "horarios para profesores y preceptores" y depsues de ahi se les va a mostrar entre otras paginas, una pagina llamada Alumnos, en donde los lleva a ver sus horarios con el cursos en el que se registraron, los horarios se van a mostrar por tablas y estos mismos horarios se traen de la basde de datos de firebase "en donde se usa firestore", "ya en la base de datos tengo las colecciones, profesores, preceptores, horarios,y otras mas con sus datos o docuemntos".
Mi idea para el registro es que haya una opcion que diga alumnos en donde se los lleve al registro para alumnos y le aparesca para llenar en los casilleros, el nombre y apellido, email "con esto se loguean para entrar a la pagina de la epet 20 y tambien se usa en la BD firestore", contraseña "tiene que ser el DNI del alumno, tambien se va a usar para loguearse para entrar a la pagina de la epet 20", elegir que curso son "si son 4to 4ta,5to 5ta,6to 2da, 3ra, por el momento estos son los que estan cargados en la base de datos." "estos es como se ve un documento de la coleccion de horarios:
curso: "6to 3ra"
(cadena)dia: "Viernes"
(cadena)horaFin: "19:20"
(cadena)horaInicio: "18:00"
(cadena)materia: "Ingles Tecnico ||"
(cadena)profesor: "Giuliani Maria ".
y asi es como se ve la colecion preceptores:
cursos(array)
0 "6to 3ra"
(cadena)
1 "5to 5ta"
(cadena)
email: "francobutala@gmail.com"
(cadena)nombre: "Butala Franco"
(cadena) turno: "noche"
y asi es como se ve la coleciones profesores:
email: "exequielwiedermann@gmail.com"
(cadena)nombre: "Exequiel Wiedermann"
(cadena) rol: "profesor". " nose si hace falta turno para el registro?, y le agregaria un telefono como otro casillero "es para tener asi como relleno. Te pase un documento por coleciones, que son profesores,preceptores,horarios para que ves como esta cargados cada uno y puedas traer bien y completo desde la base de datos. Esto seria el registro, analiza si esta bien."
Despues a mi idea la queria seguir sumando cosas como,si cuando se registraron y iniciaron sesion para entrar a la pagina de la epet20 ahi recien puedan entrar a la pagina de Alumnos, y en donde se pueda mostrar un mensaje como titulo principal que diga Bienvenido y al lado el nombre con el que se registro el Alumno, y abajo de eso en subtitulo del curso en el que tambein se registro y al lado el turno que tambien con el que se registro "si hace falta, si no no lo agregues, porque me paso que agregue cosas como turnos o otras cosas mas y no me traia nada de la Base de datos o me lo traia a medias. entonces nose si hace falta en el registro, eso evalualo bien y decimelo." y abajo otro subtitulo, diciendo Preceptor: y al lado el nombre del preceptor del curso con el que el alumno se registro,"si bien en la base de datos esta el preceptor con su curso". y abajo de todo eso, quiero que haya una tabla con los horarios completos traidos de la base de datos con el curso en el que el alumno se registro, y que el horario se muestra completo apartir del lunes a viernes, y que por cada bloque se muestre el nombre de la materia, nombres del profesor de la materia,la horaInicio y horaFin de lo que dura la materia, y dentro de ese mismo bloque haya un boton que tenga como mensaje "asistencia", en donde el alumno pueda dar precente y esta misma asistencia quede registrada en una coleccion llamada avisos en donde se carguen todas las asistencias de los alumnos, asi como te lo dije quiero que se vea la tabla con el horario para los alumnos.
esta es mi idea para sumar a mi proyecto, si bien tengo archivos con sus estilos incluidos, tambien la firestores de firebase, pero para esto quiero que hagas archivos apartes para no dañar los archivos de mis compañeres como por ejemplo para los horarios de los alumnos, o sus asistencias y tambien para la pagina Alumnos en donde tambien se pueda ver como las otras.
si necesitas mas informacion para empezar bien como datos de la base de datos para las conexiones, y archivos y estilos de otros archivos te los paso asi me lo vas haciendo y quiero que me vallas explicando como lo vas haciendo, necesitaria que lo termines y quede completo y funcionando, y respetando la logica y las funciones que ya tiene cada usuario

componentes carpeta:
CursoFiltro.jsx
CursoLista.jsx
CursosHorariosTabla.jsx
HorariosTabla.jsx
Layout.jsx
Login.jsx
Profesores.jsx
rightSidebar.jsx
ScheduleTable.js
Sidebar.jsx
TablaHorarios.jsx
Turnos.jsx

context carpeta:
AuthContext.jsx

firebase carpeta:
client.js

pagess carpeta:
Cursos.jsx
Detalle.jsx
Inicio.js
Profile.js
Register.jsx

App.jsx

 */

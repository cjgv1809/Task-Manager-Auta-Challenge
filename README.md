# Task Manager Challenge

## Descripción General

Su tarea es crear una pequeña aplicación web usando React con un backend en Firestore. La aplicación debería permitir a los usuarios gestionar una lista de tareas pendientes, admitiendo operaciones CRUD básicas. Los formularios deben administrarse mediante `react-hook-form` y los datos deben almacenarse en una base de datos de Firestore.

## Requisitos

1. **Agregar tareas pendientes**: los usuarios deberían poder agregar una nueva tarea pendiente con un título y una descripción.
2. **Ver tareas pendientes**: los usuarios deberían poder ver una lista de todas las tareas pendientes. La lista debe mostrar el título y una versión truncada de la descripción (por ejemplo, los primeros 50 caracteres).
3. **Editar tareas pendientes**: los usuarios deberían poder editar el título y la descripción de una tarea pendiente existente.
4. **Eliminar tareas pendientes**: los usuarios deberían poder eliminar una tarea pendiente.
5. **Marcar como completado**: los usuarios deberían poder marcar una tarea pendiente como completada. Las tareas pendientes completadas deben distinguirse visualmente de las incompletas.
6. **Persistir datos**: las tareas pendientes deben almacenarse en una base de datos de Firebase, asegurando que no se pierdan datos entre sesiones.
7. **Diseño responsivo**: la aplicación debe ser responsiva y funcionar bien tanto en dispositivos móviles como de escritorio.
8. **Manejo de errores**: la aplicación debe manejar los errores con elegancia y proporcionar comentarios significativos al usuario (por ejemplo, errores de validación de formularios, estado vacío de la lista de tareas pendientes). Manejar errores en la parte delantera y trasera.

## Características

### Tecnologías Usadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **TypeScript**: Un superconjunto de JavaScript que añade tipos estáticos.
- **Vite**: Un entorno de desarrollo rápido y ligero.
- **Firebase Firestore**: Base de datos NoSQL para almacenar las tareas.
- **react-hook-form**: Librería para el manejo de formularios en React.
- **Material-UI**: Biblioteca de componentes para un diseño de interfaz de usuario moderno y responsivo.

## Instalación

Para configurar el proyecto, siga los siguientes pasos:

1. Clona el repositorio:

   ```sh
   git clone https://github.com/cjgv1809/Task-Manager-Auta-Challenge.git
   cd task-manager
   ```

2. Instala las dependencias:

   ```sh
   pnpm install
   ```

3. Levanta el server de desarrollo:

   ```sh
   pnpm run dev
   ```

## Variables de entorno

Para correr este proyecto, necesitarás agregar un archivo `.env` en la carpeta raíz (a nivel del package.json) con las siguientes variables:

`VITE_FIREBASE_CONFIG_API_KEY`

`VITE_FIREBASE_CONFIG_AUTH_DOMAIN`

`VITE_FIREBASE_CONFIG_PROJECT_ID`

`VITE_FIREBASE_CONFIG_STORAGE_BUCKET`

`VITE_FIREBASE_CONFIG_MESSAGING_SENDER_ID`

`VITE_FIREBASE_CONFIG_APP_ID`

## Autor

- [@cjgv1809](https://www.github.com/cjgv1809)

## Capturas de pantalla

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Documentación

- [Firebase](https://firebase.google.com/?hl=es)
- [React-Hook-Form](https://react-hook-form.com/)
- [Material-UI](https://mui.com/)

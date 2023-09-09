### API EXAMEN INTRODUCCIÓN AL DESARROLLO WEB Y MÓVIL

## Requisitos previos

**Asegúrate de tener instalados los siguientes requisitos previos en tu sistema:**

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) 
- [SQLite3](https://www.sqlite.org/download.html) ***sqlite-tools-win32-x86-3430000.zip***

**LUEGO AGREGA SQLITE A LAS VARIABLES GLOBALES DEL DISPOSITIVO**

## Configuración

```bash
# Clona el repositorio
# Navega al directorio del proyecto
# Instala las dependencias del proyecto
npm install

# Crea un archivo .env:
# Copia los valores del archivo .env.example y configura las siguientes variables:
# - PORT: El puerto en el que se ejecutará la API (por defecto: 3001).
# - DBFILE: El nombre de la base de datos SQLite (debe terminar en .db, por defecto: mydatabase.db).
# Ejecuta las migraciones
node db/migration.js

# Inicia el servidor de desarrollo
npm run dev
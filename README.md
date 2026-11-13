## Variables de entorno

Antes de ejecutar el proyecto, crea un archivo `.env` en la raíz del repositorio con las siguientes variables:

```env
MONGO_URL=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombre_db>
PORT=3000
```

- **MONGO_URL**: cadena de conexión a la base de datos en MongoDB Atlas. Reemplazar `<usuario>`, `<password>` y `<cluster>` por las credenciales reales.
- **PORT**: puerto en el que correrá el servidor Express.

## Instalación y ejecución

```bash
npm install
npm run dev
```

El servidor quedará disponible en `http://localhost:PORT`.

# Auth-API

API de autenticación de usuarios desarrollada con **Node.js**, **Express**, **MongoDB** y **JWT**. Permite registro, inicio de sesión y manejo seguro de contraseñas con **bcrypt**.

---

## 📌 Tecnologías

- **Node.js** v18+  
- **Express** v5.2.1  
- **MongoDB** v8+ (con Mongoose)  
- **JWT (jsonwebtoken)** para autenticación  
- **bcrypt** para hash de contraseñas  
- **dotenv** para variables de entorno  
- **express-validator** para validaciones  
- **nodemon** como herramienta de desarrollo

---

## 🚀 Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repo>

2. Entrar en la carpeta del proyecto:

cd auth-api

3. Instalar dependencias:

npm install


4. Crear archivo .env en la raíz del proyecto y agregar tus variables de entorno:

PORT=3000
MONGO_URI=<tu_uri_mongodb>
JWT_SECRET=<tu_clave_secreta>

Estructura del proyecto:

auth-api/
│
├─ src/
│  ├─ app.js           # Archivo principal de la aplicación
│  ├─ routes/          # Rutas de la API
│  ├─ controllers/     # Lógica de cada endpoint
│  ├─ models/          # Modelos de MongoDB
│  ├─ middlewares/     # Middlewares (JWT, validaciones, errores)
│
├─ package.json
├─ .env
└─ README.md

Scripts:

| Comando       | Descripción                                       |
| ------------- | ------------------------------------------------- |
| `npm start`   | Ejecuta la API en modo producción                 |
| `npm run dev` | Ejecuta la API en modo desarrollo con **nodemon** |
| `npm test`    | Script de pruebas (no implementado)               |


Endpoints principales:

| Método | Ruta            | Descripción                  | Requiere Auth |
| ------ | --------------- | ---------------------------- | ------------- |
| POST   | `/api/register` | Registrar un nuevo usuario   | ❌             |
| POST   | `/api/login`    | Iniciar sesión y obtener JWT | ❌             |
| GET    | `/api/profile`  | Obtener datos del usuario    | ✅             |


Todos los endpoints que requieren autenticación deben enviar el JWT en el header Authorization: Bearer <token>.

Validaciones:

Email válido (express-validator)

Contraseña mínima 6 caracteres

Hash de contraseñas con bcrypt antes de guardarlas


Seguridad:

Contraseñas nunca se almacenan en texto plano

Tokens JWT con expiración configurable

Middleware de verificación JWT en rutas privadas


Pruebas con Postman:

Importa la colección de Postman proporcionada (o crea una nueva).

Configura variables de entorno: baseUrl = http://localhost:3000.

Prueba endpoints en este orden:

POST /api/register → Crear usuario
Content-Type: application/json

{
  "email": "jesus@gmail.com",
  "password": "123456"
}

POST /api/login → Obtener token JWT
Content-Type: application/json

{
  "email": "jesus@.gmailcom",
  "password": "123456"
}


Respuesta:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}



GET /api/profile → Probar acceso con token
Headers:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...


Buenas prácticas:

Mantener variables sensibles en .env

Usar middleware de validación para sanitizar entradas

Manejo centralizado de errores

Separación de responsabilidades: rutas, controladores y modelos



Recursos adicionales:

Express.js Documentation

Mongoose Documentation

JSON Web Tokens

bcrypt.js


Autor:

Jesús Cabrejo – Proyecto académico – SENA


Licencia:

Este proyecto está bajo licencia ISC.
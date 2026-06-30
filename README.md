# 🪴 Habit Tracker

Aplicación full-stack para crear hábitos, registrarlos día a día y visualizar el progreso a través de rachas y estadísticas.

> [!WARNING]
> Este proyecto está en **desarrollo activo**. La arquitectura, los endpoints y las funcionalidades descritas aquí pueden cambiar a medida que avanza la implementación.

## 📋 Descripción

Este es un proyecto de portfolio para practicar el stack de MEAN. La idea central es sencilla: el usuario define hábitos que quiere mantener (beber agua, leer, hacer ejercicio...), los marca como completados cada día, y la aplicación calcula automáticamente rachas y tendencias para ayudarle a mantener la constancia.

> [!TIP]
> Estas son las ideas planteadas para el **MVP**:
>
> - Registro y login de usuarios con autenticación JWT
> - CRUD de hábitos (crear, editar, eliminar, listar)
> - Registro diario de hábitos completados (_logs_)
> - Estadísticas básicas: racha actual y promedio semanal por hábito
> - Frontend ligero (Angular o Vue, pendiente de decidir) que consuma la API

## 🛠️ Stack tecnológico

| Capa               | Tecnología                     |
| ------------------ | ------------------------------ |
| Backend            | Node.js + Express + TypeScript |
| Base de datos      | MongoDB (Mongoose)             |
| Autenticación      | JWT                            |
| Gestor de paquetes | pnpm                           |
| Frontend           | Angular                        |

## 📁 Estructura del proyecto

```
habit-tracker/
├── src/
│   ├── config/
│   │   └── db.ts              # conexión a MongoDB
│   ├── middleware/
│   │   └── auth.ts            # verificación de JWT
│   ├── models/
│   │   ├── User.ts
│   │   ├── Habit.ts
│   │   └── Log.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── habit.routes.ts
│   │   ├── log.routes.ts
│   │   └── stats.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── habit.controller.ts
│   │   └── log.controller.ts
│   ├── services/
│   │   └── stats.service.ts   # lógica de rachas y promedios
│   └── app.ts                 # punto de entrada
├── .env
├── tsconfig.json
└── package.json
```

## 🔌 Endpoints planeados

| Método   | Ruta                    | Descripción                     |
| -------- | ----------------------- | ------------------------------- |
| `POST`   | `/auth/register`        | Registro de usuario             |
| `POST`   | `/auth/login`           | Login → devuelve JWT            |
| `GET`    | `/habits`               | Listar hábitos del usuario      |
| `POST`   | `/habits`               | Crear hábito                    |
| `PUT`    | `/habits/:id`           | Editar hábito                   |
| `DELETE` | `/habits/:id`           | Eliminar hábito                 |
| `POST`   | `/logs`                 | Registrar día completado        |
| `GET`    | `/logs?habitId=&month=` | Historial de un hábito          |
| `GET`    | `/stats/:habitId`       | Racha actual y promedio semanal |

## 🗺️ Roadmap

- [x] Inicializar el proyecto (TypeScript, Express, pnpm)
- [x] Conectar MongoDB
- [x] Crear modelos (`User`, `Habit`, `Log`)
- [ ] Autenticación completa (registro, login, middleware JWT)
- [ ] CRUD de hábitos
- [ ] Endpoint de logs diarios
- [ ] Lógica de estadísticas (rachas, promedios)
- [ ] Integrar frontend (Angular o Vue)

## ⚙️ Puesta en marcha

```bash
# Instalar dependencias
pnpm install

# Crear el archivo .env en la raíz con:
# PORT=3000
# MONGO_URI=tu_conexion_a_mongodb
# JWT_SECRET=una_clave_larga_y_aleatoria

# Arrancar en modo desarrollo
pnpm dev
```

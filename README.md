# ⚡ Energy Market App

Una aplicación web de compraventa de energía entre usuarios. Los vendedores pueden crear ofertas de energía (kWh) y los compradores pueden adquirirlas según disponibilidad. Construido con un stack moderno: Node.js, Express, MongoDB, Next.js, Tailwind CSS y SWR.

## 📦 Tecnologías usadas

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Javascript / TypeScript
- JWT (Autenticación)
- bcryptjs (Hash de contraseñas)
- dotenv
- CORS

### Frontend

- Next.js (App Router) + TypeScript
- Tailwind CSS
- SWR (data fetching reactiva)
- JWT (manejo de autenticación)
- jwt-decode

## 🚀 Cómo iniciar el proyecto

### Clonar repositorio

```bash
git clone https://github.com/tuusuario/energy-market-app.git
cd energy-market-app
```

### Iniciar el Backend

```bash
cd backend
npm install
npm run dev
```

- Puerto por defecto: http://localhost:4000
- Para este proyecto existe un archivo **.env** (esta por facilidad del proyecto de prueba, pero en producción este archivo no estaría).

### Iniciar el Frontend

```bash
cd frontend
npm install
npm run dev
```

- Puerto por defecto: http://localhost:3000
- Para este proyecto existe un archivo **.env** (esta por facilidad del proyecto de prueba, pero en producción este archivo no estaría).

## Justificación de la arquitectura
La arquitectura de este proyecto fue diseñada con un enfoque moderno, escalable y de fácil mantenimiento, aplicando principios de separación de responsabilidades entre frontend y backend, y utilizando tecnologías ampliamente adoptadas en la industria.

### Backend: API RESTful con Node.js, Express y MongoDB

- **Node.js + Express**: Elegido por su alto rendimiento, asincronía natural y bajo consumo de recursos. Express facilita la creación de APIs con una sintaxis clara y modular.

- **MongoDB + Mongoose**: Base de datos NoSQL ideal para representar entidades como usuarios, ofertas y transacciones de forma flexible. Mongoose proporciona un ODM que facilita la validación y estructuración de los datos.

- **TypeScript**: Mejora la robustez del código y previene errores comunes al ofrecer tipado estático, autocompletado y validaciones durante el desarrollo.

- **JWT + bcryptjs**: Permiten una autenticación segura sin almacenar sesiones en el servidor. JWT mantiene la app stateless, y bcryptjs asegura contraseñas mediante hashing fuerte.

- **dotenv + CORS**: .env gestiona configuraciones sensibles por entorno; CORS habilita la comunicación segura entre frontend y backend en distintos dominios/puertos.

Esta combinación permite un backend ligero, seguro y fácilmente extensible.

### Frontend: SPA Reactiva con Next.js y Tailwind CSS

- **Next.js + TypeScript**: Ofrece una estructura moderna basada en archivos, soporte para SSR/CSR, rutas protegidas y excelente rendimiento. TypeScript aporta confiabilidad al código.

- **Tailwind CSS**: Sistema de diseño utilitario que permite construir interfaces limpias, responsivas y consistentes rápidamente.

- **SWR**: Permite una capa de fetch reactivo y cacheable, que actualiza automáticamente los datos y mejora la experiencia del usuario con menor complejidad que alternativas como Redux.

- **jwt-decode**: Se utiliza para extraer información del token y definir el comportamiento de la app según el rol del usuario sin necesidad de hacer más llamadas al backend.

Esta elección garantiza una interfaz moderna, veloz y centrada en la experiencia del usuario, manteniendo una arquitectura desacoplada y segura.

### Arquitectura General: Cliente-Servidor desacoplado

- **Separación clara de responsabilidades**: el frontend consume la API sin acoplamientos directos.

- **Token-based authentication (JWT)**: el frontend incluye el token en cada request, permitiendo un flujo seguro y sin sesiones en el servidor.

- **Escalable horizontalmente**: al no depender de estado en el servidor, se puede distribuir fácilmente en múltiples instancias.

## Autor
Desarrollado por Jose Rafael Molina Montaño
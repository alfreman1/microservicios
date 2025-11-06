# Microservices Architecture

Una arquitectura de microservicios moderna construida con tecnologías de última generación.

## 🚀 Tecnologías

- **Backend**: NestJS (TypeScript)
- **Base de datos**: PostgreSQL
- **Load Balancer**: Nginx
- **Contenedorización**: Docker & Docker Compose
- **Circuit Breaker**: Opossum
- **HTTP Client**: Axios

## 🏗️ Arquitectura

### Servicios Core

1. **API Gateway** (`api-gateway/`)

   - Punto de entrada único para todas las peticiones
   - Enrutamiento a microservicios internos
   - Implementación de patrones de resiliencia:
     - Circuit Breaker
     - Retry Pattern
   - Exposición de endpoints en `/api/**`

2. **Servicio de Autenticación** (`auth-service/`)

   - Gestión de usuarios y autenticación
   - Base de datos PostgreSQL dedicada
   - Endpoints:
     - `/api/auth/register`: Registro de usuarios
     - `/api/auth/login`: Autenticación de usuarios
   - Implementación de JWT

3. **Servicio de Productos** (`products-service/`)

   - Gestión del catálogo de productos
   - Base de datos PostgreSQL dedicada
   - Load balancing con dos réplicas
   - Endpoints:
     - `/api/products`: CRUD de productos

4. **Load Balancer** (`nginx-lb/`)
   - Balanceo de carga para el servicio de productos
   - Configuración de health checks
   - Distribución de tráfico entre réplicas

## 🛠️ Configuración

### Variables de Entorno

1. **Variables Globales** (`./.env`)

   - Configuración de puertos
   - Credenciales de bases de datos
   - Configuración general del sistema

2. **Variables por Servicio**
   - `api-gateway/.env`
   - `auth-service/.env`
   - `products-service/.env`

### Bases de Datos

- **auth-db**: Base de datos dedicada para autenticación
- **products-db**: Base de datos dedicada para productos

## 🚦 Inicio Rápido

### Prerequisitos

- Docker v20.10 o superior
- Docker Compose v2.0 o superior
- Node.js v18 o superior (para desarrollo)

### Instalación y Ejecución

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/alfreman1/microservicios.git
   cd microservices-arch
   ```

2. Configurar variables de entorno:

   ```bash
   cp auth-service/env.example auth-service/.env
   cp products-service/env.example products-service/.env
   ```

3. Levantar los servicios:
   ```bash
   docker compose up -d --build
   ```

## Endpoints

### Health Check

```
GET http://localhost:${LB_PORT}/health
```

### API Gateway

```
GET    http://localhost:${GATEWAY_PORT}/api/products
POST   http://localhost:${GATEWAY_PORT}/api/auth/register
POST   http://localhost:${GATEWAY_PORT}/api/auth/login
```

## Desarrollo

### Estructura de Directorios

```
├── api-gateway/          # API Gateway service
├── auth-service/         # Authentication service
├── nginx-lb/            # Load balancer configuration
├── products-service/     # Products service (x2 replicas)
└── docker-compose.yml   # Docker compose configuration
```

### Guías de Desarrollo

1. **Modificar servicios existentes**:

   - Asegúrate de mantener los endpoints de health check (`GET /health`)
   - Respeta las variables de entorno `PORT` y `DATABASE_URL`
   - Mantén la compatibilidad con Docker

2. **Añadir nuevos servicios**:
   - Sigue la estructura de los servicios existentes
   - Implementa health checks
   - Configura las variables de entorno necesarias
   - Actualiza el docker-compose.yml

## 📝 Notas

- Los servicios utilizan bases de datos independientes para mantener el desacoplamiento
- El sistema implementa patrones de resiliencia para alta disponibilidad
- Se recomienda monitorizar los logs de los servicios para debugging

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias.

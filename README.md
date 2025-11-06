# Microservices Architecture (NestJS + Nginx LB + Postgres + Docker Compose)

## Servicios
- **api-gateway**: expone `/api/**` y enruta a `auth-service` y `products-lb`.
  - Implementa Retry + Circuit Breaker con Axios + Opossum.
- **auth-service**: coloca aquí tu código NestJS (usa `DATABASE_URL`).
- **products-service**: coloca aquí tu código NestJS (usa `DATABASE_URL`).
- **nginx-lb**: balanceador para dos réplicas de `products-service`.
- **auth-db** y **products-db**: Postgres aisladas por servicio.

## Variables de entorno
- Globales en `./.env` (usuarios, contraseñas y puertos)
- Por servicio en `api-gateway/.env`, `auth-service/.env`, `products-service/.env`

## Levantar
```bash
docker compose up -d --build
```

## Probar
- LB health: `GET http://localhost:${LB_PORT}/health`
- Gateway (rutas proxy):
  - `GET http://localhost:${GATEWAY_PORT}/api/products`
  - `POST http://localhost:${GATEWAY_PORT}/api/auth/register`
  - `POST http://localhost:${GATEWAY_PORT}/api/auth/login`

> Sustituye el contenido de `auth-service/` y `products-service/` por tus proyectos NestJS.
> Asegúrate de exponer `GET /health` y de leer `PORT` y `DATABASE_URL`.

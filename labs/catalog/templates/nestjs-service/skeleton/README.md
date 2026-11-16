# ${{ values.name }}

${{ values.description }}

Servicio generado por el golden path `nestjs-microservice` de ACME.

## Dueño

`${{ values.owner }}`

## Arranque local

```bash
npm install
npm run start
```

El proceso escucha en el puerto `3000` de este servicio. No lo confundas con el puerto `3000` de Backstage: no corras los dos en el mismo host sin cambiar `PORT`.

## Qué incluye este esqueleto

- `src/main.ts` levanta NestJS
- `Dockerfile` construye la imagen
- `catalog-info.yaml` registra el servicio en Backstage
- `.github/workflows/ci.yml` compila y testea en GitHub Actions

La lógica de dominio no viene hecha. El golden path estandariza el arranque, no el negocio.

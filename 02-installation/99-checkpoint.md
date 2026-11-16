# Checkpoint — instalación

- [ ] Node 22 o 24
- [ ] `acme-developer-portal` arranca en http://localhost:3000
- [ ] Distingo demo y catálogo ACME
- [ ] Sé que el path del location es relativo a `packages/backend`
- [ ] El directorio `catalog/` ya está copiado dentro de la app

## Mini entrevista

1. ¿Qué comando crea la app?
2. ¿Qué es el usuario guest?
3. ¿Por qué falla a menudo la instalación en Windows nativo?
4. ¿Dónde registrarás un plugin de backend?

Respuestas:

1. `npx @backstage/create-app@latest`
2. Identidad de desarrollo, sin IdP. No vale para producción.
3. Módulos nativos (`better-sqlite3`) y el sistema operativo que la guía no soporta. El camino es WSL o Linux o macOS.
4. `packages/backend/src/index.ts` con `backend.add`.

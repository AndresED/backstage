# ACME — curso intensivo de Backstage

Tiempo total: 12 horas si vas de corrido. Un día si recortas los opcionales.
Versión del curso: Backstage **1.55.3** (estable al 7 de octubre de 2026).
Próxima línea en pre-release: 1.56.0-next. No la uses para este laboratorio.

Empieza aquí. El portal que vas a construir se llama `acme-developer-portal`. La empresa es ACME. Los servicios son `ms-auth`, `ms-orders` y `ms-payments`.

## Cómo usar este curso

Cada capítulo termina en un laboratorio. La teoría existe para que el laboratorio tenga sentido.

Los archivos que vas a copiar ya están en `docs/backstage-course/labs/`. No los reescribas a mano salvo que el capítulo te lo pida: el objetivo es entender cada línea, no teclear YAML durante una hora.

Comandos: ejecútalos en **WSL2** o en una terminal Unix. Backstage documenta Linux, macOS o WSL. En Windows nativo, `better-sqlite3` suele romper la instalación.

## Mapa de un día

| Bloque | Horas | Prioridad | Qué sales sabiendo hacer |
| --- | --- | --- | --- |
| 01 Introducción | 0:00–1:00 | CRÍTICO | Explicar qué es Backstage y dibujar su arquitectura |
| 02 Instalación | 1:00–2:30 | CRÍTICO | Tener el portal en http://localhost:3000 |
| 03 Catálogo | 2:30–5:30 | CRÍTICO | Registrar servicios, APIs, resources, systems, domains y owners |
| 04 TechDocs | 5:30–6:30 | ALTO | Publicar docs de `ms-orders` dentro del portal |
| 05 Templates | 6:30–8:15 | CRÍTICO | Explicar Scaffolder y un golden path NestJS |
| 06 Plugins | 8:15–10:00 | CRÍTICO | Crear un plugin que lee una API externa |
| 07 Integraciones | 10:00–11:00 | ALTO | GitHub, Kubernetes, CI/CD, Grafana |
| 08–09 Seguridad y producción | 11:00–11:30 | ALTO | Auth, secretos, Postgres, despliegue |
| 10–11 Entrevista y proyecto | 11:30–12:00 | CRÍTICO | Defender el diseño |

Si te falta tiempo, no te saltes 03, 05, 06 y `backstage-interview.md`.

## Laboratorios

| Lab | Capítulo | Resultado |
| --- | --- | --- |
| 01 | `02-installation/02-installation.md` | Portal local |
| 02 | `03-software-catalog/02-components.md` | `ms-auth` en el catálogo |
| 03 | `03-software-catalog/02-components.md` | Los tres microservicios relacionados |
| 04 | `03-software-catalog/03-apis.md` | Tres APIs OpenAPI |
| 05 | `03-software-catalog/04-resources.md` | Postgres, Redis, Kafka |
| 06 | `03-software-catalog/05-systems.md` y `06-domains.md` | Domain Commerce y systems |
| 07 | `03-software-catalog/08-ownership.md` | Tres equipos dueños |
| 08 | `04-techdocs/02-creating-documentation.md` | Docs de `ms-orders` |
| 09 | `05-software-templates/04-create-template.md` | Template NestJS |
| 10 | `05-software-templates/06-golden-path.md` | El template como camino oficial |
| 11 | `07-integrations/01-github.md` | Repo, PRs, código |
| 12 | `07-integrations/02-kubernetes.md` | Plugin de Kubernetes |
| 13 | `06-plugins/03-frontend-plugin.md` | Plugin Service Health |
| 14 | `06-plugins/05-api-integration.md` | El plugin llama a una API |
| 15 | `07-integrations/04-grafana.md` | Dashboard desde la ficha del servicio |
| 16 | `07-integrations/03-cicd.md` | GitHub Actions en el golden path |
| 17 | `11-final-project/implementation.md` | Portal ACME completo |

## Material de entrevista

- `12-hour-backstage-crash-course.md` — solo lo que preguntan
- `backstage-cheatsheet.md` — conceptos, comandos, archivos
- `backstage-interview.md` — simulación de 8 rondas
- `10-interview/` — preguntas por nivel, más el mapeo con tu experiencia NestJS

## Documentación oficial usada para fijar comandos

Revisada el 7 de octubre de 2026:

- [Standalone installation](https://backstage.io/docs/getting-started/)
- [Descriptor format](https://backstage.io/docs/features/software-catalog/descriptor-format)
- [Writing templates](https://backstage.io/docs/features/software-templates/writing-templates)
- [Building backend plugins](https://backstage.io/docs/backend-system/building-plugins-and-modules/index)
- [Create a plugin (frontend legacy)](https://backstage.io/docs/plugins/create-a-plugin)
- [New frontend system](https://backstage.io/docs/frontend-system/architecture/15-plugins)
- [Kubernetes configuration](https://backstage.io/docs/features/kubernetes/configuration)
- Releases: estable `v1.55.3`, pre-release `v1.56.0-next.2`

## Diferencias de versión que debes poder decir en voz alta

| Tema | Versión anterior | 1.55.x |
| --- | --- | --- |
| Yarn en apps nuevas | La guía de instalación aún menciona Yarn 4.4.1 | El changelog de `create-app` fija Yarn 4.13.0 y `npmMinimalAgeGate: 3d` en apps recién creadas. No fuerces 4.4.1. Deja que `create-app` escriba `packageManager`. |
| Publicar un repo | Un solo paso `publish:github` | Sigue existiendo. El camino explícito, y el de este curso, es `github:repo:create` y después `github:repo:push`. En 1.55 se quitaron inputs que `github:repo:create` aceptaba y no usaba. |
| Relaciones del catálogo | Algunas respuestas traían `target` y `targetRef` | `catalog.enableRelationsCompatibility` ya no existe. Usa `targetRef`. |
| Frontend | `createPlugin` + `createRoutableExtension` | Sigue siendo lo que genera `yarn new` → `frontend-plugin` en muchas apps. El sistema nuevo usa `createFrontendPlugin` y `PageBlueprint`. En la entrevista nombra los dos y di cuál usa tu app. |
| Plantillas del CLI | `@backstage/cli/templates/*` | Las apps nuevas apuntan a `@backstage/cli-module-new/templates/*`. |

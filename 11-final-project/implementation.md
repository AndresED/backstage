# Implementación

Tiempo estimado: 20 min
Nivel: Intermedio
Importancia para entrevista: ALTO
Prioridad: ALTO

## 1. Objetivo

Saber qué fichero abrir cuando te pidan "enséñame cómo está hecho".

## 2. Prerrequisitos

La copia `acme-developer-portal/catalog` y, si llegaste, los plugins.

## 3. Concepto

| Qué | Fichero |
| --- | --- |
| Índice del catálogo | `catalog/all.yaml` |
| Equipos | `catalog/org.yaml` |
| Domain | `catalog/domains.yaml` |
| Systems | `catalog/systems.yaml` |
| ms-auth | `catalog/components/ms-auth.yaml` |
| ms-orders y docs | `catalog/components/ms-orders/` |
| ms-payments | `catalog/components/ms-payments.yaml` o la carpeta si hiciste el lab de docs |
| APIs | `catalog/apis/` |
| Postgres, Redis, Kafka | `catalog/resources/` |
| Template | `catalog/templates/nestjs-service/template.yaml` |
| Skeleton | `catalog/templates/nestjs-service/skeleton/` |
| CI generado | `skeleton/.github/workflows/ci.yml` |
| Manifiesto de orders | `docs/backstage-course/labs/k8s/ms-orders.yaml` |
| Mock de salud | `docs/backstage-course/labs/mock-health-api/server.mjs` |
| Plugin | `plugins/service-health` y `plugins/service-health-backend` dentro de la app |
| Config | `app-config.yaml` y `app-config.local.yaml` |
| Arranque del backend | `packages/backend/src/index.ts` |

Las rutas de `catalog/` son dentro de `acme-developer-portal` después del `cp`. El origen versionado en este repo es `docs/backstage-course/labs/catalog`.

## 4. ¿Por qué existe?

Buscar en el momento de la entrevista es peor que no haber hecho el lab. Esta tabla es el índice.

## 5. Arquitectura

No hay otro dibujo. El de `architecture.md` más esta tabla.

## 6. Ejemplo real

Si te piden el owner de Kafka: `resources/kafka.yaml` → `spec.owner: platform-team`, y `ms-orders` lo referencia en `dependsOn`.

## 7. Laboratorio

Abre cuatro ficheros, en este orden, y di una línea de cada uno en voz alta:

1. `org.yaml` — quién es Ana
2. `ms-orders` catalog-info — qué consume
3. `template.yaml` — el id del step de registro
4. `ci.yml` — que no hay deploy

## 8. Validación

Las cuatro líneas son ciertas respecto al fichero, no respecto a tu memoria de ayer.

## 9. Troubleshooting

### El fichero de la app y el del curso difieren

Manda el de la app si lo editaste en un lab (docs de payments, ADR). El del curso es la plantilla. No los sincronices a ciegas el día de la entrevista: puedes pisar el ADR.

### No existe `plugins/service-health`

No llegaste a `yarn new`. En la demo dices que el código de referencia está en `labs/plugin` y que el registro es `backend.add`. No finjas que la ruta `/service-health` abre.

## 10. Ejercicio

Sin la tabla, escribe el path del template. Compruébalo.

## 11. Preguntas de entrevista

### ¿Dónde está el golden path?

Respuesta corta: `catalog/templates/nestjs-service/template.yaml` y su `skeleton/`.

Explicación: el catálogo lo muestra en Create. El scaffolder ejecuta los steps.

Qué mencionar: owner `platform-team`.

## 12. Conexión con arquitectura

Esta tabla es el mapa de ficheros del plano del portal. El código Nest de negocio casi no existe: el skeleton es un health. Dílo. El curso enseña el portal, no un dominio de pedidos completo.

## 13. Checklist

- [ ] Abrí los cuatro ficheros
- [ ] Sé cuál copia manda si divergieron
- [ ] Puedo llegar al template sin la tabla
- [ ] No finjo plugins que no generé

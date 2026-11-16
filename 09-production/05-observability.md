# Observabilidad del portal

Tiempo estimado: 15 min
Nivel: Intermedio
Importancia para entrevista: MEDIO
Prioridad: MEDIO

## 1. Objetivo

Observar el portal como un servicio Node, distinto de observar `ms-orders` a través del portal.

## 2. Prerrequisitos

Capítulos de Grafana y de producción.

## 3. Concepto

Hay dos observabilidades:

1. La de los productos de ACME, enlazada desde el catálogo. Ya la hiciste.
2. La del propio Backstage: ¿arrancó el backend?, ¿falla la ingesta?, ¿el scaffolder termina en error?, ¿la base de Postgres se queda sin conexiones?

El backend ya escribe logs estructurados. En el lab viste líneas `backstage info` con plugin y tipo. En producción esos logs van al mismo sitio que el resto de la plataforma. No hace falta un plugin para leer el log del portal.

Métricas útiles del portal, cuando las pidas: latencia de `/api/catalog`, fallos de location, duración de tasks del scaffolder, saturación del pool de Postgres. No son las métricas de `POST /v1/orders`.

El service-health que construiste no observa el portal. Observa un mock de los microservicios. No lo reutilices como healthcheck de Kubernetes del portal. La probe es `/healthcheck` del proceso.

## 4. ¿Por qué existe?

Un portal ciego se cae y commerce se entera porque "no carga el catálogo". Platform tiene que enterarse antes.

## 5. Arquitectura

```mermaid
flowchart LR
  Portal[Backstage] --> Logs[Logs del backend]
  Portal --> Probe[/healthcheck]
  Orders[ms-orders] --> Graf[Grafana de orders]
  Portal --> Link[Link a ese Grafana]
```

## 6. Ejemplo real

Si `all.yaml` tiene un path mal, el síntoma de usuario es un catálogo a medias. El síntoma de plataforma es un log `location` con error. El lab de catalog ya te hizo leer ese log. En producción esa línea es una alerta, no algo que miras en la terminal de `yarn start`.

## 7. Laboratorio

Objetivo: encontrar una línea de log útil y decir a qué caja del diagrama pertenece.

Con `yarn start` en marcha, localiza una línea que nombre el plugin `catalog` o `service-health`. Cópiala en tus notas y etiquétala "observabilidad del portal".

Después abre el link de Grafana de `ms-orders` y etiquétalo "observabilidad del producto, vía portal".

Son dos notas. No hace falta un dashboard nuevo.

## 8. Validación

Las dos notas no describen el mismo sistema.

## 9. Troubleshooting

### No hay líneas nuevas

¿Por qué ocurre? El proceso está idle.
¿Cómo diagnosticarlo? Refresca el Catalog. La ingesta o el GET dejan log.
¿Cómo solucionarlo: un refresh en la UI y mira la terminal.

### Quieres Prometheus del portal en el mismo compose, scrapeando 7007

No está expuesto un `/metrics` garantizado en este curso. No añadas un scrape que falle. Los logs bastan para el concepto.

### Alertas de orders dentro del proceso de Backstage

Eso acopla el portal al negocio. La alerta vive junto a Prometheus. El portal solo enlaza.

## 10. Ejercicio

Escribe el texto de una alerta: "el location del catálogo falló tres veces". ¿A quién páginas, a commerce o a platform?

## 11. Preguntas de entrevista

### ¿Cómo observas Backstage?

Respuesta corta: logs del backend, probes, métricas del proceso y de Postgres. La observabilidad de los productos se enlaza, no se reimplementa.

Explicación: son dos planos. Platform es dueña del plano del portal.

Qué mencionar: la probe no es el plugin service-health.

## 12. Conexión con arquitectura

- Microservicios: el portal se observa como cualquier servicio.
- Platform Engineering: la alerta de ingesta es de platform-team.
- DevOps: logs centralizados, no la terminal del laptop.
- CI/CD: un deploy del portal se correlaciona con sus logs, igual que harías con Nest.
- Cloud: el mismo agente de logs que ya uses.
- Developer Experience: si el portal está caído, la página de estado es de plataforma, no un misterio.

## 13. Checklist

- [ ] Separé las dos observabilidades
- [ ] Copié una línea de log real
- [ ] Sé a quién alertar si falla un location
- [ ] No usé service-health como probe

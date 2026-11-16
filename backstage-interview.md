# Simulación de entrevista

Cuarenta preguntas. Ocho rondas. Hazlas en voz alta. La respuesta ideal cabe en un minuto, salvo la ronda 5 y la 8, donde puedes usar dos.

Cómo usarla: lee la pregunta, responde, luego mira. Si tu respuesta se parece a la insuficiente, repite con los conceptos listados. El follow-up no se salta.

Contexto que el entrevistador ya te dio: la empresa es ACME, tres NestJS (`ms-auth`, `ms-orders`, `ms-payments`), y te piden opinión de Backstage. Tú construiste `acme-developer-portal` sobre la 1.55.

---

## Round 1 — Fundamentos

### 1

Pregunta: ¿Qué es Backstage?

Respuesta ideal: Un framework open source para construir el developer portal de la empresa. En ACME es `acme-developer-portal`: catálogo, templates, docs y plugins. No es el runtime de los pedidos.

Conceptos: framework, portal, Catalog, Scaffolder, TechDocs, plugins.

Respuesta insuficiente: "Una herramienta de Spotify para ver microservicios."

Follow-up: ¿Qué no hace?

### 2

Pregunta: ¿Qué problema resuelve en una empresa que ya tiene GitHub y Grafana?

Respuesta ideal: Ninguno de los dos dice, en un solo sitio, quién posee `ms-orders`, qué API expone y cómo se crea el siguiente servicio. El portal junta eso. No sustituye a GitHub ni a Grafana.

Conceptos: discoverability, ownership, golden path, enlace y no reemplazo.

Respuesta insuficiente: "Centraliza todo."

Follow-up: ¿Dónde sigue viviendo el código?

### 3

Pregunta: ¿Qué es un developer portal y quién es el usuario?

Respuesta ideal: La interfaz interna para el desarrollador. El cliente de la tienda no entra. El usuario es Ana, de commerce, o alguien nuevo que necesita entender orders.

Conceptos: usuario interno, ficha por servicio, distinto del producto.

Respuesta insuficiente: "Es un portal web de la empresa."

Follow-up: ¿En qué se diferencia de un wiki?

### 4

Pregunta: Nombra las tres features que explicarías primero.

Respuesta ideal: Software Catalog, Software Templates y TechDocs. Los plugins vienen después, cuando el núcleo no tiene el dato.

Conceptos: las tres features, criterio para un plugin.

Respuesta insuficiente: lista de diez plugins de un marketplace.

Follow-up: ¿Por qué el catálogo va antes que el plugin de Kubernetes?

### 5

Pregunta: ¿Backstage despliega `ms-orders`?

Respuesta ideal: No. Puede generar el workflow y mostrar los pods. El deploy lo hace CI con otro rol. El plugin de Kubernetes lee.

Conceptos: scaffolder, Actions, kubernetes plugin, separación de roles.

Respuesta insuficiente: "Sí, es una plataforma de deployment."

Follow-up: ¿Qué pasaría si el portal se cae durante una compra?

---

## Round 2 — Software Catalog

### 6

Pregunta: ¿Cómo entra `ms-orders` al catálogo?

Respuesta ideal: Un `catalog-info.yaml` lo describe. Un location en `app-config.yaml` apunta al índice `all.yaml`, que incluye ese fichero. El backend valida, calcula relaciones y guarda. La UI lee la API.

Conceptos: location, descriptor, procesador, `/api/catalog`.

Respuesta insuficiente: "Se importa el repo y ya aparece."

Follow-up: ¿El path del location es relativo a qué directorio?

### 7

Pregunta: Lee este fragmento y di qué relaciones genera.

```yaml
spec:
  type: service
  owner: commerce-team
  system: commerce-platform
  providesApis: [orders-api]
  dependsOn:
    - resource:default/acme-kafka
```

Respuesta ideal: `ownedBy` commerce-team, `partOf` commerce-platform, `providesApi` orders-api, `dependsOn` el resource Kafka. Yo no escribo esas relaciones. Las escribe el procesador. Desde 1.55 miro `targetRef`, no el campo viejo `target`.

Conceptos: owner, system, providesApis, dependsOn, targetRef.

Respuesta insuficiente: "Crea un grafo."

Follow-up: ¿Por qué `dependsOn` lleva `resource:` y `owner` no lleva `group:`?

### 8

Pregunta: ¿Component, API o Resource?

Respuesta ideal: `ms-payments` es Component. `payments-api` es API. `acme-redis` es Resource. El repo es el lugar del Component, no un kind. El Deployment de Kubernetes no es el Component: se enlaza con un label.

Conceptos: los tres kinds, el label aparte.

Respuesta insuficiente: "Todo es un componente."

Follow-up: ¿Y el cluster?

### 9

Pregunta: Orders llama a auth. ¿Los pones en el mismo system?

Respuesta ideal: No. Auth está en `identity-platform`. Orders está en `commerce-platform`. La llamada es `consumesApis: [auth-api]`. Pertenecer y depender son campos distintos. Los dos systems cuelgan del domain `commerce` en esta ACME pequeña.

Conceptos: system, consumesApis, domain.

Respuesta insuficiente: "Sí, porque se hablan."

Follow-up: ¿Cuándo crearías otro domain?

### 10

Pregunta: ¿Cómo implementas ownership y qué no consigue?

Respuesta ideal: Groups `platform-team`, `commerce-team`, `payments-team`. `spec.owner` con un solo team. Commerce posee orders y la API. Platform posee Kafka. Eso no impide que Leo lea orders. La autorización es otra capa.

Conceptos: Group, children, ownedBy, un owner, no es RBAC.

Respuesta insuficiente: "Pones el nombre de la persona en el YAML."

Follow-up: ¿Por qué `children` vacío sigue siendo obligatorio?

---

## Round 3 — Templates

### 11

Pregunta: ¿Qué es un Software Template?

Respuesta ideal: Una entidad `kind: Template` con apiVersion `scaffolder.backstage.io/v1beta3`. Tiene parameters, steps y output. El catálogo lo lista en Create. El Scaffolder lo ejecuta.

Conceptos: v1beta3, parameters, steps, separación catalog/scaffolder.

Respuesta insuficiente: "Un generador de código."

Follow-up: ¿Qué sintaxis usarías, `${{ }}` o `{{ }}`?

### 12

Pregunta: ¿Qué pregunta el golden path de ACME y qué genera?

Respuesta ideal: Name, description, owner y repositorio. Genera un Nest que arranca, un test, un Dockerfile que no corre como root, un README, un `catalog-info.yaml` y un workflow de Actions.

Conceptos: cuatro parámetros, skeleton, no root, CI.

Respuesta insuficiente: "Un microservicio completo con Kafka y Postgres."

Follow-up: ¿Dónde queda la arquitectura hexagonal?

### 13

Pregunta: Ordena las acciones y di cuál necesita token.

Respuesta ideal: `fetch:template` no necesita token. `github:repo:create` y `github:repo:push` sí. `catalog:register` usa la URL que devuelve el push. En 1.55 el autor del commit y la protección de rama van en el push, no en el create.

Conceptos: las cuatro acciones, breaking change 1.55, output entre steps.

Respuesta insuficiente: "`publish:github` y listo", sin decir qué falla si el token no está.

Follow-up: ¿Cómo escapas `${{ github.sha }}` en el workflow generado?

### 14

Pregunta: ¿Qué es un golden path y qué queda fuera en la v1?

Respuesta ideal: El camino soportado para crear un Nest en ACME: formulario, repo, catálogo y CI, poseído por platform-team. Fuera: el dominio, la base, el deploy a producción y un cluster nuevo.

Conceptos: platform engineering, legado catalogado, lo nuevo generado.

Respuesta insuficiente: "Es obligatorio y despliega."

Follow-up: ¿Cómo sabes después qué servicios nacieron de ese template?

### 15

Pregunta: El dry run falla con permission denied después de subir a 1.55. ¿Qué miras?

Respuesta ideal: El permiso `scaffolder.template.dry-run`. Si la policy niega lo desconocido, hay que permitir ese permiso. No vuelvo a allow-all en producción para salir del paso.

Conceptos: permission framework, release 1.55, deny-by-default.

Respuesta insuficiente: "Reinstalo Backstage."

Follow-up: ¿Qué otros breaking changes de ese release tocarían a tu template?

---

## Round 4 — Plugins

### 16

Pregunta: ¿Cuándo escribes un plugin y cuándo no?

Respuesta ideal: Plugin si hay lógica o una credencial, como el estado de deploy que viene de una API interna. No hay plugin para el owner, porque ya es un campo. Grafana, en la v1, es un `metadata.links`.

Conceptos: criterio, links, no un plugin por servicio.

Respuesta insuficiente: "Un plugin por cada integración que exista en el mercado."

Follow-up: ¿Y un processor que añade una etiqueta?

### 17

Pregunta: Dibuja service-health.

Respuesta ideal: La página pide la base URL con `discoveryApi` y llama con `fetchApi`. El backend, `createBackendPlugin`, lee `acme.healthApi.baseUrl` y hace fetch al mock. Si el mock cae, 502. El browser nunca habla con el puerto 4010.

Conceptos: discovery, fetchApi, rootConfig, 502, schema.

Respuesta insuficiente: "Un React que hace fetch al mock."

Follow-up: ¿Por qué un curl sin token no debe ver la tabla?

### 18

Pregunta: ¿Dónde se registra el backend plugin?

Respuesta ideal: `packages/backend/src/index.ts` con `backend.add(import('...'))`. El paquete exporta el plugin por defecto. La config nueva necesita `config.d.ts` enlazado como `configSchema`, o el proceso no arranca.

Conceptos: new backend system, schema, pluginId.

Respuesta insuficiente: "En el frontend, en un useEffect."

Follow-up: ¿Qué diferencia hay con un backend module?

### 19

Pregunta: Hay dos formas de hacer la página. ¿Cuáles?

Respuesta ideal: La clásica, `createPlugin` y una ruta en `App.tsx`, que es lo que sigue generando `yarn new` como frontend-plugin y la doc marca como legacy. La nueva, `createFrontendPlugin` y `PageBlueprint`. Uso la que mi app ya tiene, y en diseño nombro las dos.

Conceptos: dos frontend systems, no reescribir App.tsx entero.

Respuesta insuficiente: "Solo existe una, la de los tutoriales de 2021."

Follow-up: ¿Cómo supiste cuál usa tu app?

### 20

Pregunta: El mock y el catálogo discrepan en el nombre del servicio. ¿Qué se rompe?

Respuesta ideal: El enlace de la fila a la ficha, porque el contrato es que `name` es `metadata.name`. No copio el owner al mock para "arreglarlo". Corrijo el identificador.

Conceptos: una sola fuente, contrato del name, ficha del catálogo.

Respuesta insuficiente: "Guardo el owner también en el JSON del mock."

Follow-up: ¿Reenvías el JWT del usuario al mock?

---

## Round 5 — Arquitectura

### 21

Pregunta: Diseña Backstage para 500 microservicios.

Respuesta ideal: Un solo portal. Cada repo trae su descriptor, ingerido por discovery o por locations por dominio. Domains y systems para navegar. Owners obligatorios y de tipo team, sincronizados con el IdP. Postgres. Template para lo nuevo. TechDocs en CI. Permisos de lectura amplios y de ejecución del template más estrechos. El legado se cataloga. No se reescribe el primer mes.

Conceptos: un portal, Git como fuente, jerarquía, Postgres, adopción.

Respuesta insuficiente: "Un cluster grande y un YAML con los 500."

Follow-up: ¿Qué trade-off tiene el discovery automático?

### 22

Pregunta: ¿Cómo evitas un catálogo inmanejable?

Respuesta ideal: Taxonomía corta de `type` y de lifecycle, system obligatorio para servicios de negocio, owner que no valida si falta el group y alguien lo tiene que ver, y ningún kind nuevo sin una pantalla que lo use.

Conceptos: taxonomía, system, no kinds decorativos.

Respuesta insuficiente: "Más filtros en el frontend."

Follow-up: ¿Qué haces con cuarenta valores distintos de `spec.type`?

### 23

Pregunta: ¿Domain de Backstage o bounded context?

Respuesta ideal: No son lo mismo. El bounded context de pedidos es el servicio y su modelo. El Domain `commerce` agrupa systems. Lo digo explícito para no modelar un aggregate como Domain.

Conceptos: DDD vs kind Domain, system, component.

Respuesta insuficiente: "Es lo mismo, solo cambia el nombre."

Follow-up: ¿Dónde vivirían los ADR de esa decisión?

### 24

Pregunta: ¿Cómo integras AWS sin convertir el portal en la consola?

Respuesta ideal: El portal corre con un rol chico. EKS, si hace falta ver pods, con el auth provider de AWS. La imagen en ECR con tag de sha. RDS distinta para el portal. Secretos en el gestor. TechDocs en un bucket, escritos por CI y leídos por el portal. No listo toda la cuenta.

Conceptos: least privilege, dos bases, publisher, tag inmutable.

Respuesta insuficiente: "Instalo el plugin de AWS con AdministratorAccess."

Follow-up: ¿El rol que despliega `ms-orders` es el del portal?

### 25

Pregunta: Hay una plataforma interna que ya despliega. ¿Dónde entra Backstage?

Respuesta ideal: Backstage crea el repo, registra la ficha y deja el workflow. Esa plataforma sigue desplegando. El nombre del servicio es el mismo en los dos sitios. Un botón de deploy, si existe, es otro permiso y no forma parte del Create de la v1.

Conceptos: no duplicar el deployer, identificador único, permiso aparte.

Respuesta insuficiente: "Sustituyo esa plataforma por el Scaffolder."

Follow-up: ¿Qué propiedad tienen que tener las acciones si el scaffolder reintenta?

---

## Round 6 — Platform engineering

### 26

Pregunta: ¿Qué es platform engineering en este contexto?

Respuesta ideal: Tratar la plataforma como producto. El usuario es el equipo de producto. El golden path es la feature. El éxito es que el próximo servicio nazca con owner, CI y ficha, no que haya muchos plugins.

Conceptos: producto interno, adopción, template con dueño.

Respuesta insuficiente: "Es DevOps con un portal."

Follow-up: ¿Quién posee el template?

### 27

Pregunta: `ms-auth` ya existe y no salió del template. ¿Lo borras?

Respuesta ideal: No. Lo registro en el catálogo con su owner y sus dependencias. El template obliga a lo nuevo. Reescribir el legado para que el diagrama quede bonito no entrega nada.

Conceptos: legado vs camino nuevo, catalog-info en el repo.

Respuesta insuficiente: "Todo tiene que salir del template o no entra."

Follow-up: ¿Qué sí le exigirías al legado en el primer mes?

### 28

Pregunta: ¿Qué estandarizas y qué dejas libre?

Respuesta ideal: Estandarizo Dockerfile, CI, descriptor, health y la estructura corta de docs. Dejo libre el modelo de dominio. Carpetas vacías de hexagonal no van en la v1. Si tres equipos piden lo mismo, entra en la v2 del template.

Conceptos: contrato con la plataforma, YAGNI del skeleton.

Respuesta insuficiente: "Estandarizo toda la arquitectura interna de Nest."

Follow-up: ¿Por qué el test del skeleton es `node:test` y no Jest?

### 29

Pregunta: ¿Cómo convence a commerce de usar el portal?

Respuesta ideal: El primer uso que les ahorra tiempo: la ficha de orders con contrato, dueño y link al dashboard, y un template que les evita el Dockerfile. No les pido que rellenen cien campos. Mido cuántos servicios nuevos salen del template.

Conceptos: DX, time-to-first-service, métrica de adopción.

Respuesta insuficiente: "Lo hago obligatorio el lunes y quito el acceso a GitHub."

Follow-up: ¿Qué harías si el template tarda más que copiar un repo viejo?

### 30

Pregunta: ¿Dónde encaja tu experiencia de Nest en esta historia?

Respuesta ideal: Sigo diseñando el servicio. El portal no lo reemplaza. El plugin de salud es un adapter, el mismo oficio. El template solo deja el arranque para que el equipo escriba dominio. Kafka es un Resource, no un framework nuevo que tenga que aprender para operar pedidos.

Conceptos: el mapeo de experiencia, adapter, dos planos.

Respuesta insuficiente: "Migraría Backstage a NestJS."

Follow-up: ¿Reimplementarías el catálogo?

---

## Round 7 — Production

### 31

Pregunta: ¿Qué cambia entre tu laptop y producción?

Respuesta ideal: Se apaga guest. Entra el IdP. SQLite pasa a Postgres. Los locations apuntan a Git. TechDocs se generan en CI. Los secretos vienen del entorno. Hay más de una replica. El portal no se publica a internet.

Conceptos: la lista corta de producción.

Respuesta insuficiente: "Se hace docker build y ya."

Follow-up: ¿Qué backup necesitas y qué no?

### 32

Pregunta: ¿Por qué Postgres y por qué no el de pedidos?

Respuesta ideal: Dos replicas no comparten un fichero SQLite. La base del portal guarda estado de plugins y de tasks. La de pedidos guarda pedidos. Juntarlas acopla el ciclo de vida y el acceso.

Conceptos: `backend.database.client: pg`, bases distintas, reingesta desde Git.

Respuesta insuficiente: "Porque es más profesional."

Follow-up: ¿Hace falta un dump de SQLite para pasar al lab de Postgres?

### 33

Pregunta: Describe el Deployment del portal.

Respuesta ideal: Namespace de plataforma, no el de `acme`. Imagen con el sha. Secretos por `secretKeyRef`. Probe al health del backend, con margen para migraciones. Postgres fuera del pod. Sin docker.sock. Service account distinta de la que despliega orders.

Conceptos: replicas, probes, secretos, límite con el namespace de negocio.

Respuesta insuficiente: "El mismo manifiesto que ms-orders, cambiando la imagen."

Follow-up: ¿Qué token usa el plugin para listar pods?

### 34

Pregunta: ¿Cómo aseguras el portal?

Respuesta ideal: Red interna, IdP, policy en el backend, tokens de integración con alcance mínimo y distintos entre sí, nada de secretos en anotaciones, contenedor no root si la imagen lo permite, age gate de Yarn en las apps nuevas, y revocar si un token llegó a git.

Conceptos: guest off, 401 vs 403, supply chain, rotación.

Respuesta insuficiente: "HTTPS y un usuario admin."

Follow-up: ¿Ocultar el botón Create es suficiente?

### 35

Pregunta: ¿Cómo observas el portal, y cómo observa el portal a orders?

Respuesta ideal: Son dos cosas. El portal: logs, probes, métricas del proceso y de su Postgres. Una alerta a platform si un location falla. Orders: Prometheus y Grafana. La ficha solo enlaza el dashboard. service-health no es la probe del portal.

Conceptos: dos planos de observabilidad, link, no scrapear desde el portal.

Respuesta insuficiente: "Pongo Grafana dentro de Backstage y quito Prometheus."

Follow-up: ¿A quién páginas si `ms-payments` sale degraded en la tabla?

---

## Round 8 — Scenarios

### 36

Pregunta: La ficha de orders muestra owner `commerce` y no navega.

Respuesta ideal: El group se llama `commerce-team`. Corrijo el string. No creo un segundo group para tapar el typo. Miro si el template está generando el mismo valor.

Conceptos: metadata.name del Group, relación sin resolver.

Respuesta insuficiente: "Reinicio la base."

Follow-up: ¿La entidad se guardó igual?

### 37

Pregunta: Un token de GitHub apareció en un commit de `app-config.yaml`.

Respuesta ideal: Lo revoco en GitHub antes de discutir el git history. Sustituyo el valor por `${GITHUB_TOKEN}`. Borrar el fichero en un commit nuevo no saca el secreto del historial. No pego el token en el ticket del incidente.

Conceptos: revocar, `${ENV}`, gitignore de `app-config.local.yaml`.

Respuesta insuficiente: "Hago un commit que lo borra y ya está."

Follow-up: ¿Ese token servía también para el login de las personas?

### 38

Pregunta: Commerce pide su propio Backstage para que payments no vea sus docs.

Respuesta ideal: Pregunto si ese documento es secreto dentro de la empresa. Si orders y payments se llaman, el contrato tiene que verse. Un segundo portal deshace el motivo de tener catálogo. Si hay algo sensible de verdad, no va en el TechDocs del portal general.

Conceptos: un portal, permisos, no clonar.

Respuesta insuficiente: "Levanto otro create-app para commerce."

Follow-up: ¿Qué permiso sí separarías?

### 39

Pregunta: Quieren que Create despliegue a producción.

Respuesta ideal: No en ese botón. Create deja repo, tests e imagen construida en CI. Producción es otro workflow, con environment protegido y otro rol. Un error en el formulario no puede ser un deploy.

Conceptos: v1 del golden path, separación de roles, idempotencia si más adelante hay una acción.

Respuesta insuficiente: "Añado kubectl apply al skeleton."

Follow-up: ¿Dónde queda el kubeconfig?

### 40

Pregunta: Después del upgrade, el template publica mal y el dry run también falla.

Respuesta ideal: Miro el release, no el azar. En 1.55 el dry run pide un permiso nuevo, y `github:repo:create` dejó de aceptar inputs que se ignoraban: protección de rama, autor del commit, y otros. Esos inputs viven en `github:repo:push`. Corrijo el template y la policy. No bajo la versión "para siempre" sin entender el cambio.

Conceptos: release notes, permisos, split de acciones de GitHub.

Respuesta insuficiente: "Pruebo versiones hasta que arranque."

Follow-up: ¿Qué les dices a los equipos que tienen templates copiados del viejo `publish:github` con esos inputs metidos en el create?

---

## Cómo cerrar

Si te queda un minuto, usa el guion de `11-final-project/interview-defense.md`. Termina con el límite: el portal no cobra, no despliega solo, y en producción no hay guest ni SQLite.

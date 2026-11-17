# Preguntas intermedias

Tiempo estimado: 45 min
Nivel: Intermedio
Importancia para entrevista: CRÍTICO
Prioridad: CRÍTICO

## 1. Objetivo

Veinte respuestas de "cómo lo harías", no de definición.

## 2. Prerrequisitos

Catálogo, template y el concepto de plugin.

## 3. Concepto

Empieza por el mecanismo y termina en el límite. El límite es lo que separa un intermedio de alguien que leyó la home.

## 4. ¿Por qué existe?

Aquí preguntan el flujo, no el glosario.

## 5. Arquitectura

Reutiliza los diagramas de catálogo, scaffolder y plugins.

## 6. Ejemplo real

ACME en cada respuesta.

## 7. Laboratorio

Responde en voz alta las preguntas 2, 6, 9 y 15. Máximo 90 segundos.

## 8. Validación

Nombras un fichero o un campo real (`spec.owner`, `github:repo:push`, `kubernetes-id`).

## 9. Troubleshooting

Si la respuesta no tiene un campo YAML o una acción, está demasiado abstracta. Añade uno.

## 10. Ejercicio

Graba la 9. Si dices "se integra con GitHub" sin token, anotación o plugin, repite.

## 11. Preguntas de entrevista

### 1. ¿Cómo funciona el Software Catalog?

Respuesta corta: un location apunta a YAML, el backend valida el kind, calcula relaciones y persiste.

Explicación: la UI lee `/api/catalog`. En local la base es SQLite. En serio, Postgres, y la fuente es Git.

Qué mencionar: rules, `targetRef` desde 1.55, el path relativo a `packages/backend`.

### 2. ¿Cómo registras un microservicio?

Respuesta corta: `catalog-info.yaml` en el repo, kind Component, owner, system, y un location que lo ingiera.

Explicación: `ms-orders` declara APIs y `dependsOn`. El golden path lo genera y llama a `catalog:register`.

Qué mencionar: el mismo PR cambia código y descriptor.

### 3. ¿Cómo implementas ownership?

Respuesta corta: Group por equipo y `spec.owner` apuntando al group.

Explicación: un solo owner. En ACME, commerce posee orders y platform posee Kafka. No es RBAC.

Qué mencionar: `children: []`, ingesta desde el IdP cuando hay cientos de personas, el template pregunta el owner para que el servicio no nazca huérfano.

### 4. ¿Qué son los Software Templates?

Respuesta corta: entidades Template v1beta3 con formulario, steps y output.

Explicación: el formulario es JSON Schema con `OwnerPicker` y `RepoUrlPicker`. Un campo propio, como `AcmeServiceName`, se cita con `ui:field` y se registra en el frontend.

Qué mencionar: lo registra el catálogo y lo ejecuta el scaffolder.

### 5. ¿Qué es el Scaffolder?

Respuesta corta: el motor de esos steps sobre un workspace efímero.

Explicación: `fetch:template` sustituye `${{ values }}`. Los steps de GitHub necesitan el token en el backend.

Qué mencionar: dry run, `acme:service:stamp` registrada con `scaffolderActionsExtensionPoint`, y que las acciones deben poder reintentarse si activas task recovery.

### 6. ¿Qué es un golden path?

Respuesta corta: el camino soportado, con dueño, que deja repo, catálogo y CI alineados.

Explicación: en ACME no crea la base ni despliega. Lo legado se cataloga.

Qué mencionar: `backstage.io/source-template` y el tag `recommended`.

### 7. ¿Cómo evitas que cada equipo invente un servicio distinto?

Respuesta corta: un template poseído por platform y una taxonomía corta de `spec.type` y `lifecycle`.

Explicación: `service`, no `microservice` y `svc` a la vez.

Qué mencionar: el template no impone el bounded context.

### 8. ¿Cómo modelas que orders llama a payments?

Respuesta corta: `consumesApis: [payments-api]` y, si el runtime depende del proceso, `dependsOn` al component.

Explicación: no meto payments dentro del system de orders por eso. Auth se consume igual y vive en otro system.

Qué mencionar: la relación la calcula el procesador.

### 9. ¿Cómo integras GitHub?

Respuesta corta: anotación `github.com/project-slug`, `integrations.github` con `${GITHUB_TOKEN}`, plugin de UI para PRs y código.

Explicación: el núcleo solo guarda la anotación. El token no es el OAuth del login.

Qué mencionar: con muchos repos, discovery de la org. El link estático no consulta la API.

### 10. ¿Cómo integras Kubernetes?

Respuesta corta: label y anotación `backstage.io/kubernetes-id`, cluster en el locator del backend, token de lectura fuera del catálogo.

Explicación: el plugin lista Deployment y Pods. No aplica manifiestos.

Qué mencionar: el namespace en la anotación. `multiTenant` frente a `catalogRelation`.

### 11. ¿Cómo integras una API interna?

Respuesta corta: backend plugin, URL y secreto en config con schema, UI vía `discoveryApi` y `fetchApi`.

Explicación: service-health llama al mock en 4010 y devuelve 502 si cae.

Qué mencionar: no reenviar el JWT del usuario. Dos autenticaciones distintas.

### 12. ¿Cuándo creas un plugin custom?

Respuesta corta: cuando hay lógica o una credencial, y el catálogo no tiene el dato.

Explicación: versión y último deploy sí. El owner no. Grafana, primero un link.

Qué mencionar: no un plugin por microservicio.

### 13. ¿Dónde va el OpenAPI?

Respuesta corta: en `spec.definition` de una entidad API, con `servers` puesto.

Explicación: el visor se elige con `spec.type: openapi`. La explicación del `202` va en TechDocs.

Qué mencionar: `$text` si el fichero vive aparte, y `backend.reading.allow` si es una URL externa.

### 14. ¿Cómo documentas un servicio?

Respuesta corta: Markdown junto al descriptor, `techdocs-ref: dir:.`, estructura fija.

Explicación: Overview, Architecture, API, Deployment, Troubleshooting. ADR como página, no como kind.

Qué mencionar: builder external en producción.

### 15. ¿Qué diferencia hay entre el token de GitHub del scaffolder y el login?

Respuesta corta: el del scaffolder es un token de servidor para crear repos. El login identifica a la persona.

Explicación: uno vive en `integrations.github`. El otro en `auth.providers`.

Qué mencionar: alcances distintos. No reutilizar el mismo secreto "porque es GitHub".

### 16. ¿Cómo conviven el catálogo de fichero y un servicio creado por el template?

Respuesta corta: `all.yaml` ingiere lo legado. `catalog:register` añade lo nuevo desde la URL del repo.

Explicación: si la base local se recrea, hay que volver a registrar o apuntar un location a ese repo.

Qué mencionar: Git sigue siendo la fuente.

### 17. ¿Por qué el skeleton no trae la arquitectura hexagonal completa?

Respuesta corta: porque el path estandariza el contrato con la plataforma, no el estilo interno, hasta que más de un equipo lo pida.

Explicación: health, Docker, CI y catalog-info sí. Carpetas vacías de domain, no.

Qué mencionar: es un límite consciente, no una ignorancia de hexagonal.

### 18. ¿Cómo ves el estado de un pipeline?

Respuesta corta: en GitHub. El portal enlaza el repo. Un plugin de CI puede mostrar checks si está montado.

Explicación: el workflow del curso no llama a Backstage al terminar.

Qué mencionar: no confundir con service-health, que lee otra API.

### 19. ¿Qué es un backend module?

Respuesta corta: una extensión de un plugin ya existente, por ejemplo un processor del catálogo.

Explicación: service-health es un plugin nuevo, no un module.

Qué mencionar: `createBackendModule` y el `pluginId` del plugin que extiende.

### 20. ¿Qué miras el día que el catálogo "no actualiza"?

Respuesta corta: el log del location, las rules y si el YAML sigue en el sitio que el location lee.

Explicación: la UI no lee el disco. Si el procesador rechazó el name, la entidad desaparece.

Qué mencionar: duplicados, path relativo, kind no permitido.

## 12. Conexión con arquitectura

Estas respuestas son las que conectan tu experiencia de servicios con la plataforma. Úsalas junto al mapeo.

## 13. Checklist

- [ ] Cuatro respuestas grabadas
- [ ] Cada una tiene un campo o una acción concreta
- [ ] Separé token de integración y login
- [ ] Separé plugin y module

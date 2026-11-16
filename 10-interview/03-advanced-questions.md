# Preguntas avanzadas

Tiempo estimado: 45 min
Nivel: Avanzado
Importancia para entrevista: CRÍTICO
Prioridad: CRÍTICO

## 1. Objetivo

Veinte respuestas de producción, seguridad y diseño, con un trade-off explícito.

## 2. Prerrequisitos

Módulos de plugins, seguridad y producción.

## 3. Concepto

La respuesta avanzada tiene tres partes: qué harías, qué no harías, y qué se rompe si te equivocas de límite.

## 4. ¿Por qué existe?

El salto de "usé el demo" a "puedo operarlo" está aquí.

## 5. Arquitectura

El diagrama de producción del módulo 09 es la base. No lo repitas entero en cada respuesta. Señala la caja que tocas.

## 6. Ejemplo real

ACME con 3 servicios en el lab y la misma forma con 500.

## 7. Laboratorio

Responde por escrito, en cinco líneas, las preguntas 1, 8 y 14. Sin mirar. Luego contrasta.

## 8. Validación

Cada texto dice un no: algo que rechazas. Si solo hay features, recórtalo.

## 9. Troubleshooting

Si citas un import de policy que no compilaste, dilo como diseño. No como código que ya corre en ACME.

## 10. Ejercicio

Añade a la respuesta 1 el número de portales. Tiene que ser uno.

## 11. Preguntas de entrevista

### 1. ¿Cómo diseñas Backstage para muchos equipos?

Respuesta corta: un portal, domains, systems, owners, discovery desde Git y permisos.

Explicación: varios portales duplican el mapa. El aislamiento fino es de policy y de RBAC del cluster, no de otra instalación.

Qué mencionar: platform posee el portal. Los equipos poseen servicios.

### 2. ¿Cómo escalas el catálogo?

Respuesta corta: dejas de editar un `all.yaml` central. Cada repo es un location o entra por discovery.

Explicación: Postgres, no SQLite. Ingesta que falle en un repo no tira el resto.

Qué mencionar: taxonomía corta para poder filtrar.

### 3. ¿Cómo funciona un plugin de backend?

Respuesta corta: `createBackendPlugin`, `registerInit` con servicios inyectados, router bajo `/api/<id>`, `backend.add`.

Explicación: config vía `rootConfig` y `config.d.ts`. Auth del `httpRouter` por defecto.

Qué mencionar: 502 si el upstream cae. No tragar el error.

### 4. ¿Y uno de frontend?

Respuesta corta: página que descubre la base URL y llama con el token de la sesión.

Explicación: sistema clásico con `createPlugin`, o el nuevo con `createFrontendPlugin` y `PageBlueprint`. Di cuál usaste.

Qué mencionar: el puerto 7007 no está escrito en el componente.

### 5. ¿Cómo autenticas?

Respuesta corta: provider de IdP en producción, guest solo en local, resolver hacia el User del catálogo.

Explicación: el auth del portal no es `ms-auth`.

Qué mencionar: quitar guest el día que el hostname es compartido.

### 6. ¿Cómo autorizas?

Respuesta corta: permission framework en el backend. El owner es un dato que la policy puede consultar.

Explicación: la UI escondiendo botones no basta. En 1.55 hay permisos nuevos, entre ellos el dry run.

Qué mencionar: deny-by-default se actualiza en el upgrade. No pegues una policy de otra versión sin compilarla.

### 7. ¿Cómo manejas secretos?

Respuesta corta: `${ENV}`, visibilidad secret, inyección en runtime, nunca en el catálogo ni en el bundle.

Explicación: token de GitHub, token de Kubernetes y el futuro token de la API de salud son secretos distintos.

Qué mencionar: rotar si se coló en git. `npmMinimalAgeGate` en apps Yarn 4.13.

### 8. ¿Cómo lo despliegas en Kubernetes?

Respuesta corta: imagen del portal, dos replicas, Postgres externo, probes, secretos por `secretKeyRef`, namespace de plataforma.

Explicación: TechDocs ya construidos. Sin docker.sock. Token de lectura para ver pods ajenos.

Qué mencionar: la probe no es el plugin service-health. Las migraciones pueden exigir arrancar de una en una la primera vez.

### 9. ¿Cómo observas el portal?

Respuesta corta: logs del backend, probes, métricas del proceso y de Postgres.

Explicación: los dashboards de orders se enlazan. No se calculan dentro del portal.

Qué mencionar: alerta a platform si falla un location.

### 10. ¿Cómo encaja el CI/CD?

Respuesta corta: el template deja Actions. Actions construye y testea. El deploy es otro workflow con otro rol.

Explicación: el portal tiene su propio pipeline y su propia imagen.

Qué mencionar: el estado del job no vuelve solo al catálogo.

### 11. ¿Multi-equipo y un solo template?

Respuesta corta: el template pregunta el owner. La policy decide quién puede ejecutarlo.

Explicación: commerce no debería poder crear un servicio y asignárselo a payments para lavarse las manos. Es una decisión de policy, aún no implementada en el lab.

Qué mencionar: `allowedOwners` del picker es otra restricción, la del repo, no la del group.

### 12. ¿Qué pasa en un upgrade de Backstage?

Respuesta corta: lees los breaking changes antes de subir.

Explicación: 1.55 quitó compatibilidad de relaciones `target`, movió inputs de `github:repo:create` a `github:repo:push`, y añadió permisos.

Qué mencionar: no saltar a un `1.56.0-next` en producción.

### 13. ¿SQLite o Postgres?

Respuesta corta: SQLite en la laptop. Postgres en cuanto hay más de un proceso o te importa sobrevivir al reinicio compartido.

Explicación: la fuente de las entidades es Git, así que el cambio de motor reingiere. El estado que no está en Git necesita backup.

Qué mencionar: la base del portal no es la de `ms-orders`.

### 14. ¿Cómo integras AWS?

Respuesta corta: el portal corre en tu plataforma (EKS u otra), secretos en el gestor, EKS con `authProvider: aws` si el plugin de Kubernetes habla con el cluster, sin ARNs secretos en el catálogo.

Explicación: no hay un plugin de "AWS completo" que este curso instale. Cada integración es un cliente con rol mínimo.

Qué mencionar: el rol del portal no es el rol de deploy.

### 15. ¿Cómo integras una plataforma interna de deployment?

Respuesta corta: un plugin o una acción de scaffolder que llame a su API, con secreto de servicio, y un link o una pestaña en la ficha.

Explicación: no metas `kubectl apply` dentro del template v1. Si la plataforma ya existe, Backstage es el formulario y el catálogo, y esa plataforma sigue desplegando.

Qué mencionar: idempotencia de la acción si el scaffolder reintenta.

### 16. ¿El frontend nuevo o el clásico?

Respuesta corta: el que la app use. Conoces los dos.

Explicación: clásico registra rutas en `App.tsx`. El nuevo instala `createFrontendPlugin` y blueprints.

Qué mencionar: la doc "Create a Plugin" está marcada legacy. No finjas que solo existe una.

### 17. ¿Cómo evitas que TechDocs tumbe el pod?

Respuesta corta: no generas en el request. El CI publica el HTML y el portal lee.

Explicación: `builder: local` vale en la laptop, con Docker.

Qué mencionar: el `mkdocs.yml` junto al descriptor si usas `dir:.`.

### 18. ¿Qué no metes en el catálogo?

Respuesta corta: secretos, tokens, connection strings y el estado de salud en tiempo real.

Explicación: el catálogo lo lee mucha gente. La salud va por el plugin. El secreto va por config.

Qué mencionar: el link a Grafana puede mentir si el dashboard no existe. Es aceptable. Un token filtrado no.

### 19. ¿Cómo pruebas un template?

Respuesta corta: dry run y, si la policy es estricta, el permiso `scaffolder.template.dry-run`.

Explicación: compruebas la sustitución y el escape de `${{ github.sha }}` antes de crear repos.

Qué mencionar: no compilas el skeleton con los placeholders todavía puestos.

### 20. ¿Qué mides para saber si el portal sirve?

Respuesta corta: servicios con owner, servicios nuevos nacidos del template, docs presentes el día uno.

Explicación: `backstage.io/time-saved` es una estimación, no el KPI.

Qué mencionar: adopción, no número de plugins.

## 12. Conexión con arquitectura

Esta lista es la que usas en la ronda de producción y en la de escenarios. No la memorices como texto. Memorice los no.

## 13. Checklist

- [ ] Escribí las tres respuestas del laboratorio
- [ ] Cada una incluye un rechazo
- [ ] No cité una policy como si compilara
- [ ] Un solo portal

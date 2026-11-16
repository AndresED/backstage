# Preguntas básicas

Tiempo estimado: 40 min
Nivel: Básico
Importancia para entrevista: CRÍTICO
Prioridad: CRÍTICO

## 1. Objetivo

Responder veinte preguntas de fundamento sin divagar.

## 2. Prerrequisitos

Módulos 01 a 03. El resto mejora los ejemplos, no hace falta para estas respuestas.

## 3. Concepto

Respuesta corta, luego una frase de ACME. Si no cabe ACME, la respuesta está vacía.

## 4. ¿Por qué existe?

Las primeras diez minutos de entrevista deciden si pasas a arquitectura. Aquí se decide.

## 5. Arquitectura

No hay diagrama nuevo. Usa el del capítulo de arquitectura de Backstage.

## 6. Ejemplo real

Todas las respuestas usan ACME cuando aplique.

## 7. Laboratorio

Objetivo: responder en voz alta las preguntas 1, 5, 9, 14 y 18. Un minuto cada una como máximo.

Dónde: tus notas. Marca las que pasaste de un minuto y recórtalas.

## 8. Validación

Las cinco caben en un minuto y nombran un objeto de ACME cuando la pregunta lo permite.

## 9. Troubleshooting

### Respondes con la definición de marketing

Añade `ms-orders` o el template. Si no entra, no entendiste la pregunta.

### Corriges al entrevistador durante un minuto

Responde primero. El matiz, después.

### Inventas un kind

Si no está en el curso, no lo nombres como si existiera.

## 10. Ejercicio

Escribe la respuesta de la pregunta 7 en cuatro líneas y bórrale los adjetivos.

## 11. Preguntas de entrevista

### 1. ¿Qué es Backstage?

Respuesta corta: un framework para construir el developer portal de una empresa.

Explicación: app React y backend Node, extendida con plugins. ACME lo usa como `acme-developer-portal`.

Qué mencionar: Catalog, Scaffolder, TechDocs. CNCF. No es un SaaS que enciendes y ya tiene tus servicios.

### 2. ¿Qué problema resuelve?

Respuesta corta: encontrar dueño, contrato, docs y la forma oficial de crear un servicio.

Explicación: con `ms-auth`, `ms-orders` y `ms-payments` esa información se parte entre Git, Grafana y Slack.

Qué mencionar: discoverability y golden paths.

### 3. ¿Qué es un developer portal?

Respuesta corta: la interfaz interna para descubrir, entender y crear software.

Explicación: no es la tienda que ve el cliente de ACME.

Qué mencionar: una ficha por servicio.

### 4. ¿Qué es el Software Catalog?

Respuesta corta: el inventario de entidades y sus relaciones.

Explicación: ingiere YAML, calcula relaciones y las sirve por API.

Qué mencionar: no es el código fuente.

### 5. ¿Qué es un Component?

Respuesta corta: una unidad de software. En ACME, un microservicio.

Explicación: `type`, `lifecycle`, `owner` obligatorios.

Qué mencionar: `ms-orders` es un Component `service`.

### 6. ¿Qué es una API?

Respuesta corta: el contrato, separado del servicio que lo implementa.

Explicación: OpenAPI en `spec.definition`. `ms-orders` provee `orders-api`.

Qué mencionar: `providesApis` y `consumesApis`.

### 7. ¿Qué es un Resource?

Respuesta corta: infraestructura de la que el software depende.

Explicación: Postgres, Redis y Kafka en ACME. No son repos.

Qué mencionar: `dependsOn: resource:default/acme-kafka`.

### 8. ¿Qué es un System?

Respuesta corta: un conjunto de piezas que entregan una capacidad.

Explicación: `commerce-platform` agrupa orders y payments. Auth está en otro system.

Qué mencionar: pertenecer no es lo mismo que llamar.

### 9. ¿Qué es un Domain?

Respuesta corta: el área de negocio que agrupa systems.

Explicación: `commerce` contiene los dos systems de ACME.

Qué mencionar: no es un equipo ni un bounded context de DDD.

### 10. ¿Qué es catalog-info.yaml?

Respuesta corta: el descriptor de una entidad, normalmente en el repo del servicio.

Explicación: `apiVersion`, `kind`, `metadata`, `spec`.

Qué mencionar: el nombre es convención. Lo ingiere un location.

### 11. ¿Qué es TechDocs?

Respuesta corta: la documentación Markdown del servicio, renderizada en su ficha.

Explicación: `backstage.io/techdocs-ref: dir:.` y MkDocs.

Qué mencionar: en producción se genera en CI.

### 12. ¿Qué es un plugin?

Respuesta corta: una extensión de UI, de backend, o de las dos.

Explicación: GitHub y service-health son plugins. El owner no necesita uno.

Qué mencionar: `/api/<pluginId>`.

### 13. ¿Qué es un Software Template?

Respuesta corta: un formulario más una lista de acciones para crear software.

Explicación: el de ACME genera un NestJS.

Qué mencionar: apiVersion `scaffolder.backstage.io/v1beta3`.

### 14. ¿Qué es el Scaffolder?

Respuesta corta: el backend que ejecuta esos pasos en un workspace temporal.

Explicación: fetch, crear repo, push, registrar.

Qué mencionar: el token no baja al browser.

### 15. ¿Qué es un golden path?

Respuesta corta: el camino soportado para una tarea repetible.

Explicación: en ACME, crear un NestJS pasando por el template, el repo, el catálogo y el CI.

Qué mencionar: lo posee platform-team. Lo legado se cataloga, no se reescribe el primer día.

### 16. ¿Qué es un Group?

Respuesta corta: un equipo en el catálogo.

Explicación: `commerce-team` posee `ms-orders`. `spec.children` es obligatorio.

Qué mencionar: no es el login.

### 17. ¿Qué es el owner?

Respuesta corta: el equipo responsable de la entidad.

Explicación: un solo owner. Sirve para saber a quién llamar. No es un permiso.

Qué mencionar: `ownedBy` / `ownerOf`.

### 18. ¿Backstage despliega servicios?

Respuesta corta: no.

Explicación: el template puede dejar el workflow. Actions hace build y test. El deploy no está en la v1.

Qué mencionar: el plugin de Kubernetes muestra pods. No hace apply.

### 19. ¿Qué es un location?

Respuesta corta: una fuente de entidades.

Explicación: en el lab, `file` hacia `all.yaml`. En serio, URLs de Git.

Qué mencionar: el path es relativo al backend.

### 20. ¿Qué usuario eres en local?

Respuesta corta: `user:development/guest`.

Explicación: el provider guest firma la sesión. Se apaga en producción.

Qué mencionar: no es `user:default/ana`.

## 12. Conexión con arquitectura

Estas veinte son el vocabulario. Sin él, la arquitectura suena a buzzword.

## 13. Checklist

- [ ] Respondí cinco en voz alta
- [ ] Ninguna pasa de un minuto
- [ ] No dije que Backstage despliega
- [ ] Usé ACME en las que lo admiten

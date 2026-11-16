# Preguntas de escenario

Tiempo estimado: 30 min
Nivel: Avanzado
Importancia para entrevista: CRÍTICO
Prioridad: CRÍTICO

## 1. Objetivo

Practicar situaciones incómodas: legado, fallo, alcance y seguridad.

## 2. Prerrequisitos

El curso entero, aunque sea leído.

## 3. Concepto

En un escenario, el primer movimiento es acotar. Di qué harías hoy y qué no entra en el cambio.

## 4. ¿Por qué existe?

Las definiciones ya las tienes. Aquí se ve el juicio.

## 5. Arquitectura

La de producción, más el catálogo de ACME.

## 6. Ejemplo real

Cada escenario usa los nombres del curso.

## 7. Laboratorio

Resuelve por escrito el escenario 1 y el 4. Diez líneas cada uno. Estructura: síntoma, causa probable, qué no tocas, qué haces.

## 8. Validación

Ninguna solución es "reinstalar Backstage". Ninguna mete un secreto en el catálogo.

## 9. Troubleshooting

Si tu solución cambia de IdP, de cluster y de template a la vez, la partiste mal. Un escenario, un problema.

## 10. Ejercicio

Añade el escenario de tu última incidencia real de plataforma, mapeado a una caja de Backstage, sin datos de clientes.

## 11. Preguntas de entrevista

### 1. El catálogo muestra `ms-orders` con owner `commerce` y el link no abre.

Respuesta corta: el Group se llama `commerce-team`. El string no coincide.

Explicación: la entidad existe. La relación no resuelve. No es un fallo de GitHub ni de la base.

Qué mencionar: no crees un Group `commerce` para tapar el typo. Corrige el owner. Revisa si el template está generando el mismo error.

### 2. Commerce quiere un Backstage solo suyo porque payments no debe ver sus docs.

Respuesta corta: un portal, y permisos de lectura si de verdad hay un límite. Primero pregunta si el contrato de orders es secreto dentro de la empresa.

Explicación: el portal existe para que payments vea el contrato que consume. Cerrar eso por defecto rompe el objetivo.

Qué mencionar: docs sensibles no van en TechDocs del portal amplio. Van en el sistema que ya controle ese acceso. No clones el portal.

### 3. El template creó el repo y no la ficha.

Respuesta corta: falló `catalog:register` o la base se recreó y el location no apunta al repo.

Explicación: miras el output `repoContentsUrl` y si `catalog-info.yaml` está en la raíz de `main`.

Qué mencionar: Git es la fuente. Puedes registrar la URL otra vez. No copies el YAML a mano al `all.yaml` y te olvides del repo.

### 4. Alguien commiteó un token de GitHub en `app-config.yaml`.

Respuesta corta: revocar el token ya. Luego quitar el valor del fichero. El historial sigue teniendo el secreto.

Explicación: borrar el fichero en un commit nuevo no basta. No reescribas historia en caliente si el equipo no lo tiene pactado. El token revocado deja de servir.

Qué mencionar: sustituir por `${GITHUB_TOKEN}`. Revisar si el frontend llegó a verlo. Avisar, sin pegar el token en el incidente.

### 5. `ms-payments` sale `degraded` en la tabla y el catálogo lo muestra `production` feliz.

Respuesta corta: son señales distintas. El catálogo no hace health checks. La tabla lee el mock o la API de salud.

Explicación: no cambies el lifecycle a deprecated por un degraded de laboratorio. Avisa al owner, que es payments-team, y mira Grafana por el link.

Qué mencionar: no dupliques el estado de salud dentro del YAML.

### 6. Quieren que el golden path despliegue a producción al pulsar Create.

Respuesta corta: no en el mismo paso. Create deja repo, CI y ficha. El deploy a prod tiene revisión y otro rol.

Explicación: el primer error del formulario no puede ser un deploy. El workflow de CI ya construye la imagen. Un segundo workflow, con environment protegido, despliega.

Qué mencionar: idempotencia si más adelante hay una acción de scaffolder hacia la plataforma de deploy.

### 7. Hay 40 `catalog-info.yaml` con `type: svc`, `type: service` y `type: backend`.

Respuesta corta: cierras la taxonomía y corriges en los repos. No escribes un processor que "acepte todo" para que la UI se vea llena.

Explicación: un solo valor `service`. El template ya lo genera así. Lo legado se migra por PRs, por equipo, empezando por los que tengan owner.

Qué mencionar: filtrar es imposible si el type es libre y nadie lo gobierna.

### 8. El upgrade a 1.55 rompió el dry run.

Respuesta corta: la policy niega el permiso nuevo `scaffolder.template.dry-run`.

Explicación: no vuelvas a allow-all. Añade la decisión de ese permiso. Revisa el release por si hay más.

Qué mencionar: los inputs que `github:repo:create` ya no acepta, si el template también falló al publicar.

## 12. Conexión con arquitectura

Los escenarios son los módulos anteriores en forma de incidente. Si uno no te sale, el hueco está en el capítulo, no en la labia.

## 13. Checklist

- [ ] Resolví el owner roto sin crear otro Group
- [ ] Revocar va antes que reescribir git
- [ ] No desplegaría a prod desde Create
- [ ] No clonaría el portal para esconder docs

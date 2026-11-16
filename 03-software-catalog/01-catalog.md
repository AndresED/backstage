# Software Catalog

Tiempo estimado: 30 min
Nivel: Básico
Importancia para entrevista: CRÍTICO
Prioridad: CRÍTICO

## 1. Objetivo

Explicar cómo entra un YAML al catálogo, qué guarda Backstage y qué relación tiene eso con una base de datos.

## 2. Prerrequisitos

Checkpoint de instalación. `acme-developer-portal/catalog/all.yaml` existe.

## 3. Concepto

El Software Catalog es el inventario. Cada elemento es una **entidad** con `apiVersion`, `kind`, `metadata` y `spec`.

El fichero recomendado se llama `catalog-info.yaml`. El nombre no es mágico: puedes llamarlo `ms-auth.yaml`. Lo que importa es el contenido y que un **location** lo apunte.

Un location es una fuente. En local usamos `type: file`. En una empresa de verdad usas `url` apuntando a GitHub, o un provider que descubre repos. El fichero puede ser una entidad o un `kind: Location` cuyo `spec.targets` lista más ficheros. Es el mismo patrón que un índice.

El backend:

1. Lee el fichero.
2. Valida el kind contra `catalog.rules`. Si el kind no está permitido, lo rechaza.
3. Procesa la entidad y calcula relaciones (`ownedBy`, `partOf`, `providesApi`, `dependsOn`, ...).
4. La guarda. En local, SQLite. En producción, PostgreSQL.
5. La sirve en `/api/catalog/entities`.

Tú no escribes las relaciones a mano. Escribes `spec.owner: commerce-team` y el procesador crea `ownedBy` / `ownerOf`.

La referencia a otra entidad tiene forma `kind:namespace/name`. Si omites kind y namespace, el campo tiene un default. `owner: commerce-team` significa Group `commerce-team` en el namespace `default`.

El `uid` lo genera la base. No lo pongas en el YAML. No lo uses como clave externa: si borras y vuelves a registrar, cambia.

## 4. ¿Por qué existe?

Hace falta un modelo común para que los plugins hablen de "el servicio" sin saber si por debajo es NestJS, un bucket o un equipo. Sin ese modelo, cada plugin inventaría su propia lista de servicios.

## 5. Arquitectura

```mermaid
flowchart LR
  Yaml[catalog-info.yaml] --> Location
  Location --> Processor[Catalog backend]
  Processor --> DB[(SQLite o Postgres)]
  DB --> Api[/api/catalog]
  Api --> UI[Catalog UI]
```

Kinds de este curso:

| Kind | Qué es en ACME |
| --- | --- |
| Component | `ms-auth`, `ms-orders`, `ms-payments` |
| API | contratos OpenAPI |
| Resource | Postgres, Redis, Kafka |
| System | identity-platform, commerce-platform |
| Domain | commerce |
| Group | platform, commerce, payments |
| User | ana, leo, guest |
| Template | el golden path NestJS |
| Location | el índice `all.yaml` |

## 6. Ejemplo real

`catalog/all.yaml` no es un servicio. Es el índice. Si registras solo ese fichero, el backend sigue los `targets` y carga el resto. Por eso en producción no pegas 500 YAML en `app-config.yaml`: registras un índice por dominio, o descubres repos por GitHub.

## 7. Laboratorio

Objetivo: dejar las reglas abiertas a los kinds de ACME, sin ingerir todavía todo el árbol. El primer servicio entra en el capítulo siguiente.

Dónde: `acme-developer-portal/app-config.yaml`.

Abre el fichero y localiza el bloque `catalog:`. Vas a dejar **un** `rules` que permita los kinds del curso, y vas a **sustituir** la lista `locations` de la demo.

El bloque queda así (respeta la indentación de dos espacios que ya use tu fichero; el generado por `create-app` indenta con dos espacios):

```yaml
catalog:
  rules:
    - allow:
        - Component
        - API
        - Resource
        - System
        - Domain
        - Group
        - User
        - Location
        - Template
  locations:
    - type: file
      target: ../../catalog/components/ms-auth.yaml
```

Qué hace cada parte:

- `rules.allow`: kinds que este portal acepta. Sin `Group` y `User`, el lab de ownership falla. Sin `Template`, el golden path no aparece en Create.
- `locations`: una sola fuente, el YAML de `ms-auth`.
- `target`: relativo a `packages/backend`.

Si tu `app-config.yaml` ya tiene `catalog.locations` con la demo, borra esas entradas. Si dejas las dos, verás ACME mezclado con ejemplos y no sabrás qué lab funcionó.

Guarda. Si `yarn start` sigue corriendo, el backend recarga la config. Si no recarga, Ctrl+C y:

```bash
cd acme-developer-portal
yarn start
```

## 8. Validación

UI: http://localhost:3000 → Catalog → busca `ms-auth`. Tiene que existir. El owner se verá como un texto `platform-team` aunque el Group todavía no esté cargado: la relación queda colgando hasta el lab de ownership. Es el comportamiento normal. No es un YAML roto.

API, desde otra terminal:

```bash
curl -s "http://localhost:7007/api/catalog/entities?filter=kind=component,metadata.name=ms-auth" | head -c 400
```

Si recibes `401`, el guest protege la API y la prueba buena es la UI. No desactives auth para poder hacer curl.

Errores de procesado: abre la entidad. Si hay un banner de error, léelo. Un owner que no existe **no** suele ser un error fatal.

## 9. Troubleshooting

### `File not found` o location failed en el log

¿Por qué ocurre? El path no es relativo a `packages/backend`, o no copiaste `catalog/`.
¿Cómo diagnosticarlo? `test -f acme-developer-portal/packages/backend/../../catalog/components/ms-auth.yaml`
¿Cómo solucionarlo? Copia de nuevo con el comando del capítulo `04-understanding-the-project.md`.

### `kind Group is not allowed` más adelante

¿Por qué ocurre? Las rules no incluyen Group.
¿Cómo diagnosticarlo? El log de catalog nombra el kind y el fichero.
¿Cómo solucionarlo? El bloque `rules` de este capítulo. Reinicia.

### Siguen apareciendo entidades de la demo

¿Por qué ocurre? No sustituiste `locations`, añadiste otra.
¿Cómo diagnosticarlo? Busca en `app-config.yaml` cuántos `type: file` hay bajo `catalog.locations`.
¿Cómo solucionarlo? Deja solo el de `ms-auth.yaml` hasta el lab 03.

### El YAML es válido y la entidad no aparece

¿Por qué ocurre? El name no cumple `[a-zA-Z0-9]` con separadores `-_.`, o supera 63 caracteres, o duplicaste el name.
¿Cómo diagnosticarlo? Busca `policy check` o `already exists` en el log.
¿Cómo solucionarlo? `ms-auth` cumple la regla. Si renombraste, quédate en minúsculas y guiones.

## 10. Ejercicio

Di en qué orden viaja `ms-auth.yaml` desde el disco hasta la fila que ves en la UI. Nombra location, procesador, base y API.

## 11. Preguntas de entrevista

### ¿Cómo funciona el Software Catalog?

Respuesta corta: ingiere descriptores YAML, valida el kind, calcula relaciones y persiste entidades.

Explicación: la UI no lee el repo. Lee `/api/catalog`.

Qué mencionar: locations, rules, procesadores, `targetRef` en las relaciones desde 1.55.

### ¿Qué es un location?

Respuesta corta: una fuente de entidades.

Explicación: `file` en local, `url` hacia GitHub en serio. Un `kind: Location` agrega varios ficheros.

Qué mencionar: no confundir Location (la fuente) con el path del disco.

### ¿El catálogo es la fuente de verdad del código?

Respuesta corta: no. Es la fuente de verdad de la metadata.

Explicación: el código sigue en Git. El YAML vive al lado para cambiar en el mismo PR.

Qué mencionar: si el YAML y el repo divergen, gana lo que el location está leyendo. Por eso el location de producción apunta al repo, no a una copia en el portal.

## 12. Conexión con arquitectura

- Microservicios: uno a uno con Component, más sus contratos y sus resources.
- Platform Engineering: el modelo (kinds permitidos) lo fija plataforma. Los equipos escriben YAML.
- DevOps: el catalog no despliega.
- CI/CD: un check de CI puede validar el YAML. Backstage lo ingiere después.
- Cloud: la base del catálogo en producción es Postgres, no el disco del pod.
- Developer Experience: buscar un servicio por nombre y ver al dueño.

## 13. Checklist

- [ ] Puedo definir location, entity y relation
- [ ] Las rules permiten los kinds de ACME
- [ ] `ms-auth` sale en el Catalog
- [ ] Sé que el owner puede verse sin que el Group exista todavía

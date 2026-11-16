# Chuleta

Backstage 1.55.x. App de ejemplo: `acme-developer-portal`. Empresa: ACME.

## Conceptos

- Portal: catálogo + templates + docs + plugins. No es la tienda.
- Catalog: inventario. La UI no lee el YAML. Lo lee el backend.
- Component: software. `ms-orders`.
- API: contrato. `orders-api`.
- Resource: infra. `acme-kafka`.
- System: capacidad. `commerce-platform`.
- Domain: negocio. `commerce`. No es un bounded context.
- Group: equipo. `spec.children` aunque esté vacío.
- Owner: un team. Relación `ownedBy`. No es RBAC.
- Location: fuente. `file` en local, Git en serio.
- Template: formulario + steps. `scaffolder.backstage.io/v1beta3`.
- Scaffolder: ejecuta el workspace. Token en el backend.
- Golden path: el template de Nest, con CI y registro, sin deploy y sin dominio.
- TechDocs: MkDocs. `backstage.io/techdocs-ref: dir:.`.
- Plugin: paquete. Backend en `/api/<id>`.
- Guest: `user:development/guest`. Solo local.

## Comandos

Dónde: WSL, en la raíz del repo del curso, salvo que se diga otra cosa.

```bash
node -v
npx @backstage/create-app@latest
```

Nombre de la app: `acme-developer-portal`.

```bash
cd acme-developer-portal
yarn start
```

Resultado: http://localhost:3000 y backend en 7007.

```bash
cp -a docs/backstage-course/labs/catalog acme-developer-portal/catalog
cd acme-developer-portal/packages/backend
test -f ../../catalog/all.yaml && echo ok
```

```bash
cd acme-developer-portal
yarn new
```

`frontend-plugin` o `backend-plugin`, id `service-health`.

```bash
node docs/backstage-course/labs/mock-health-api/server.mjs
curl -s http://127.0.0.1:4010/services
```

Postgres de lab, dentro de la app, si hiciste ese capítulo:

```bash
docker compose -f postgres-lab.compose.yaml up -d
yarn --cwd packages/backend add pg
```

Grafana:

```bash
cd docs/backstage-course/labs/observability
docker compose up -d
```

http://localhost:3001/d/ms-orders

Kubernetes, solo si hay cluster:

```bash
kubectl apply -f docs/backstage-course/labs/k8s/ms-orders.yaml
kubectl -n acme get pods -l backstage.io/kubernetes-id=ms-orders
```

## Config que tienes que reconocer

Location, path relativo a `packages/backend`:

```yaml
catalog:
  locations:
    - type: file
      target: ../../catalog/all.yaml
```

GitHub, sin valor en claro:

```yaml
integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}
```

TechDocs de laptop:

```yaml
techdocs:
  builder: local
  generator:
    runIn: docker
  publisher:
    type: local
```

Postgres:

```yaml
backend:
  database:
    client: pg
    connection:
      host: ${POSTGRES_HOST}
      port: ${POSTGRES_PORT}
      user: ${POSTGRES_USER}
      password: ${POSTGRES_PASSWORD}
```

Salud:

```yaml
acme:
  healthApi:
    baseUrl: http://127.0.0.1:4010
```

Solo después de que el plugin tenga `config.d.ts`. Si no, el arranque rechaza la clave.

## Steps del template

| id | action |
| --- | --- |
| fetch | `fetch:template` |
| create | `github:repo:create` |
| push | `github:repo:push` |
| register | `catalog:register` |

Output: `steps.push.output.repoContentsUrl` y `steps.register.output.entityRef`.

## Anotaciones

| Clave | Uso |
| --- | --- |
| `github.com/project-slug` | `org/repo` |
| `backstage.io/techdocs-ref` | `dir:.` |
| `backstage.io/kubernetes-id` | igual al label del pod |
| `backstage.io/kubernetes-namespace` | `acme` |
| `backstage.io/source-template` | de qué template salió |

## Puertos

| Puerto | Qué |
| --- | --- |
| 3000 | UI de Backstage en desarrollo |
| 7007 | Backend |
| 4010 | Mock de salud |
| 3001 | Grafana del lab |
| 9090 | Prometheus del lab |
| 5432 | Postgres del lab |
| 3000 del skeleton | El Nest generado. No lo arranques a la vez sin cambiar `PORT` |

## Errores que ya conoces

| Síntoma | Causa |
| --- | --- |
| `better-sqlite3` / node-gyp | Windows nativo o sin toolchain. Usa WSL. |
| kind no permitido | Falta en `catalog.rules`. Group, User y Template hay que listarlos. |
| Fichero no encontrado | Path no relativo a `packages/backend`. |
| Name inválido | Espacio, o más de 63, o duplicado. |
| Owner sin link | El Group no existe o el nombre no coincide. |
| 401 en el plugin | Curl sin token, o `fetch` sin `fetchApi`. Correcto. |
| 502 en la tabla | El mock no está en 4010. |
| Clave `acme` desconocida | Schema no enlazado. |
| Dry run denegado tras un upgrade | Permiso `scaffolder.template.dry-run`. |
| Repo `acme/ms-orders` 404 | El slug es de ejemplo. El catálogo no se rompe. |
| Pods vacíos | El label no está en el pod template, o el namespace no es `acme`. |

## Respuestas de una línea

- ¿Qué es? El framework del portal interno.
- ¿Despliega? No.
- ¿Component o Resource para Kafka? Resource.
- ¿Quién posee orders? `commerce-team`.
- ¿Quién posee Kafka? `platform-team`.
- ¿Dónde está el contrato? Entidad API. La explicación del `202`, en TechDocs.
- ¿Dónde está el secreto? En el entorno. En el YAML solo `${NOMBRE}`.
- ¿Cuántos portales para 500 servicios? Uno.
- ¿Qué base en producción? Postgres, distinta de la de pedidos.
- ¿Qué se mide? Owners, servicios nacidos del template, docs el día uno.

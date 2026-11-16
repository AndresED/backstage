# Deployment

El servicio corre en el namespace `acme` del cluster local o de producción.

La etiqueta que el plugin de Kubernetes usa para encontrarlo:

```yaml
labels:
  app: ms-orders
  backstage.io/kubernetes-id: ms-orders
```

El manifiesto de laboratorio está en `docs/backstage-course/labs/k8s/ms-orders.yaml`.

## Pipeline

GitHub Actions hace build, test y construye la imagen. Backstage no ejecuta el pipeline. Lo muestra porque la entidad tiene:

```yaml
github.com/project-slug: acme/ms-orders
```

El workflow de referencia que el golden path copia a cada servicio nuevo está en el skeleton del template, archivo `.github/workflows/ci.yml`.

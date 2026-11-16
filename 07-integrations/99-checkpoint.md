# Checkpoint — integraciones

- [ ] Qué hace el plugin de GitHub y qué hace el núcleo
- [ ] Cómo se une un pod con un Component
- [ ] Dónde no se guarda el token de Kubernetes
- [ ] Qué hace el workflow y qué no hace
- [ ] Quién guarda las métricas

## Mini entrevista

1. ¿Backstage despliega o ejecuta el CI?
2. ¿Qué tienen que compartir el YAML de Kubernetes y el catalog-info?
3. ¿Por qué el dashboard se enlaza en vez de reimplementarse?

Respuestas:

1. Ninguno de los dos. Enlaza el repo y genera el workflow. Actions ejecuta.
2. El valor `backstage.io/kubernetes-id`.
3. Porque Prometheus y Grafana ya son el sistema de observabilidad. El portal evita la búsqueda.

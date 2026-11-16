# Checkpoint — catálogo

- [ ] Qué es un location
- [ ] Qué es un Component
- [ ] Qué es una API
- [ ] Qué es un Resource
- [ ] Qué es un System
- [ ] Qué es un Domain
- [ ] Qué es un Group y por qué `children` va aunque esté vacío
- [ ] Qué es ownership y por qué no es un permiso
- [ ] Qué es `catalog-info.yaml`

## Mini entrevista

1. ¿Qué problema resuelve el catálogo dentro de Backstage?
2. ¿Qué diferencia hay entre Component y Resource?
3. ¿Para qué sirve `catalog-info.yaml`?
4. ¿Por qué `ms-auth` y `ms-orders` están en systems distintos si uno llama al otro?
5. ¿Quién es el owner de Kafka y por qué?

Respuestas:

1. Dar un inventario con relaciones, no una lista de repos.
2. Component es software que desarrollas. Resource es infraestructura que ese software usa.
3. Describir una entidad al lado del código para que el portal la ingiera.
4. Llamar a una API es `consumesApis`. Pertenecer es `spec.system`. Auth es otra capacidad.
5. `platform-team`. El bus es compartido. Orders lo usa; no lo posee.

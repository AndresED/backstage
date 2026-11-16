# Checkpoint — introducción

Antes de instalar, tienes que poder explicar esto en voz alta.

- [ ] Qué es Backstage
- [ ] Qué es un developer portal
- [ ] Qué problema de microservicios resuelve
- [ ] Qué es un golden path
- [ ] Qué proceso escucha en 3000 y cuál en 7007
- [ ] Por qué el token de GitHub no va en el frontend

## Mini entrevista

1. ¿Qué problema resuelve Backstage en ACME?
2. ¿Qué diferencia hay entre el portal y el catálogo?
3. ¿Backstage despliega `ms-orders`?
4. ¿Dónde vive el secreto de una API interna?

Respuestas en una línea:

1. Nadie encuentra dueño, contrato, docs ni la forma oficial de crear un servicio.
2. El catálogo es el inventario. El portal es el producto: catálogo, templates, docs y plugins.
3. No. Lo despliega el pipeline. Backstage lo muestra.
4. En el backend, leído de una variable de entorno.

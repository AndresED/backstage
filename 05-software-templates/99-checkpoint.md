# Checkpoint — templates

- [ ] Qué es un Software Template
- [ ] Qué es el Scaffolder
- [ ] Qué hacen fetch, create, push y register
- [ ] Por qué el skeleton no compila con los placeholders
- [ ] Qué es un golden path en ACME
- [ ] Qué no automatiza la v1

## Mini entrevista

1. ¿Qué diferencia hay entre el catálogo y el Scaffolder?
2. ¿Por qué el token de GitHub no está en el frontend?
3. ¿Qué anotación deja huella del template en el componente generado?

Respuestas:

1. El catálogo describe. El Scaffolder ejecuta pasos para crear algo nuevo y, al final, registra.
2. Porque acabaría en el bundle. Lo lee el backend desde el entorno.
3. `backstage.io/source-template: template:default/nestjs-microservice`.

# Checkpoint — templates

- [ ] Qué es un Software Template
- [ ] Qué es el Scaffolder
- [ ] Qué hacen fetch, create, push y register
- [ ] Por qué el skeleton no compila con los placeholders
- [ ] Qué es un golden path en ACME
- [ ] Qué no automatiza la v1
- [ ] Dónde se registra un custom field en el frontend nuevo
- [ ] Cómo se publica una custom action
- [ ] Qué template usa `AcmeServiceName` y `acme:service:stamp`

## Mini entrevista

1. ¿Qué diferencia hay entre el catálogo y el Scaffolder?
2. ¿Por qué el token de GitHub no está en el frontend?
3. ¿Qué anotación deja huella del template en el componente generado?
4. ¿Dónde vive un custom field y dónde vive una custom action?

Respuestas:

1. El catálogo describe. El Scaffolder ejecuta pasos para crear algo nuevo y, al final, registra.
2. Porque acabaría en el bundle. Lo lee el backend desde el entorno.
3. `backstage.io/source-template: template:default/nestjs-microservice`.
4. El field es un frontend module del plugin `scaffolder` (`FormFieldBlueprint`). La action es un backend module en `scaffolderActionsExtensionPoint`. El template solo cita `ui:field` y `action`.

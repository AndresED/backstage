# Checkpoint — plugins

- [ ] Cuándo no crear un plugin
- [ ] Diferencia entre plugin y module
- [ ] Dónde se registra el backend
- [ ] Por qué la UI no llama al mock
- [ ] Qué es `config.d.ts`
- [ ] Qué pasa si el upstream cae

## Mini entrevista

1. ¿Por qué service-health es un plugin y el owner no?
2. ¿Qué header no reenvías al upstream?
3. ¿Qué URL abre la página?

Respuestas:

1. El owner ya es un campo del catálogo. El estado de deploy viene de otro sistema y necesita credenciales y una vista.
2. El token del usuario de Backstage. Si el upstream necesita auth, es un token de servicio distinto.
3. La que resuelve `discoveryApi` para `service-health`, más `/services`.

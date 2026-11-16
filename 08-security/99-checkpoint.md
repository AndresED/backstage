# Checkpoint — seguridad

- [ ] Guest solo en desarrollo
- [ ] El auth del portal no es `ms-auth`
- [ ] La policy de desarrollo permite, y eso no es el diseño final
- [ ] 401 no es 403
- [ ] Los secretos son `${ENV}` y no viven en el catálogo

## Mini entrevista

1. ¿Qué apagas el día que el portal sale de tu laptop?
2. ¿El owner impide que Leo lea orders?
3. ¿Dónde guarda Backstage el token de GitHub en el repo?

Respuestas:

1. El provider guest.
2. No. Hoy no. Haría falta una policy. El owner es metadata.
3. No lo guarda. Guarda `${GITHUB_TOKEN}` si acaso, y el valor está en el entorno.

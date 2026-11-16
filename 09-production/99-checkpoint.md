# Checkpoint — producción

- [ ] Un portal, Postgres, varias replicas
- [ ] SQLite no sale de la laptop
- [ ] Imagen del portal distinta de la de Nest
- [ ] Secretos por `secretKeyRef` o env
- [ ] Guest apagado cuando el hostname es compartido
- [ ] TechDocs generados fuera del pod

## Mini entrevista

1. ¿Por qué no un Backstage por equipo?
2. ¿Qué se pierde si no hay backup de Postgres?
3. ¿El portal está en el camino de una compra?

Respuestas:

1. Porque el problema era un solo mapa. Los límites se hacen con domains y permisos.
2. Lo ingerido desde Git se recupera. El estado de tasks y de plugins que no está en Git, no.
3. No. Si el portal cae, la tienda sigue. Cae la experiencia del desarrollador.

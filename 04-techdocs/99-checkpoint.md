# Checkpoint — TechDocs

- [ ] Qué significa `backstage.io/techdocs-ref: dir:.`
- [ ] Diferencia entre builder local y external
- [ ] Dónde está el contrato y dónde está la explicación
- [ ] Cómo entra un ADR sin un kind nuevo

## Mini entrevista

1. ¿Qué es TechDocs?
2. ¿Por qué no generar la doc dentro del pod en producción?
3. ¿Qué página del estándar explica el `202` de orders?

Respuestas:

1. Docs en Markdown, junto al servicio, renderizadas en su ficha.
2. Porque ata el runtime a MkDocs/Docker y no escala con réplicas. Se genera en CI y se publica en storage.
3. La página API de TechDocs. El OpenAPI declara el status; la doc explica que el cobro va aparte.

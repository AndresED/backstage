# Checkpoint — entrevista

- [ ] Veinte básicas en corto
- [ ] Sé decir cómo registro, quién posee y qué es un golden path
- [ ] El plugin no lleva el secreto al browser
- [ ] Un portal para 500 servicios
- [ ] Puedo negar un deploy automático desde Create

## Mini entrevista

1. ¿Qué es Backstage en una frase con ACME dentro?
2. ¿Component o Resource para Kafka?
3. ¿Qué step registra la ficha?
4. ¿Qué apagas en producción?

Respuestas:

1. El portal interno donde ACME encuentra `ms-orders`, su dueño, su contrato y el camino para crear el siguiente Nest.
2. Resource.
3. `catalog:register`, después del push.
4. Guest, y SQLite.

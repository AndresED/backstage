# ms-orders

Servicio NestJS que crea y consulta pedidos de ACME.

Dueño: `commerce-team`.
Sistema: `commerce-platform`.
API que expone: `orders-api`.

## Qué hace

1. Recibe `POST /v1/orders`.
2. Persiste el pedido en PostgreSQL.
3. Publica `order.created` en Kafka.
4. Pide la autorización a `payments-api`.

## Qué no hace

No cobra. El cobro vive en `ms-payments`.

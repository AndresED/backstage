# API

El contrato vive en la entidad `orders-api` del catálogo, no solo en este Markdown.

| Método | Ruta | Efecto |
| --- | --- | --- |
| GET | `/v1/orders` | Lista pedidos |
| POST | `/v1/orders` | Acepta un pedido y publica `order.created` |
| GET | `/v1/orders/{orderId}` | Consulta un pedido |

La definición OpenAPI está en `catalog/apis/orders-api.yaml`, campo `spec.definition`.

En la ficha de la API, Backstage renderiza ese contrato. Esta página explica el comportamiento que el YAML no cuenta: el POST es asíncrono respecto al cobro. Devuelve `202` cuando el pedido quedó persistido, no cuando el pago ya se autorizó.

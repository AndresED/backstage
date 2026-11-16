# Troubleshooting

## El pedido queda en `pending` y el pago no arranca

Causa habitual: `ms-orders` publicó en Kafka y `ms-payments` no consume `order.created`.

Diagnóstico: en Backstage abre `ms-orders` → Relations. Confirma `dependsOn` hacia `acme-kafka` y hacia `ms-payments`. Después mira el dashboard de Grafana enlazado en la ficha.

## 401 al crear un pedido

`ms-orders` consume `auth-api`. Si la introspección falla, el pedido no se crea.

Diagnóstico: ficha de `ms-orders` → APIs consumidas → `auth-api`. El dueño es `platform-team`, no `commerce-team`.

## La documentación no aparece en Backstage

Revisa la anotación `backstage.io/techdocs-ref: dir:.` y que `mkdocs.yml` esté al lado de `catalog-info.yaml`. El generador local necesita Docker o Python con `mkdocs` y `mkdocs-techdocs-core`. El detalle está en el capítulo de TechDocs.

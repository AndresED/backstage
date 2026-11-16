# Defensa de entrevista

Tiempo estimado: 15 min
Nivel: Intermedio
Importancia para entrevista: CRÍTICO
Prioridad: CRÍTICO

## 1. Objetivo

Un guion de cinco minutos para enseñar el portal sin perderte en el YAML.

## 2. Prerrequisitos

El pase del proyecto final.

## 3. Concepto

Orden: problema, mapa, camino para crear otro servicio, límite. El límite al final, no como disculpa al principio.

## 4. ¿Por qué existe?

Cinco minutos es lo que te dan antes de la primera interrupción. Si empiezas por Yarn, perdiste el tiempo.

## 5. Arquitectura

Los dos planos de `architecture.md`. Los dibujas si hay pizarra. Si hay pantalla, enseñas la UI en el mismo orden.

## 6. Ejemplo real

Guion:

1. "ACME tiene tres Nest: auth, orders y payments. El problema no es desplegarlos. Es saber de quién son, qué contrato tienen y cómo nace el siguiente."
2. Abres `commerce` → `commerce-platform` → `ms-orders`. Señalas owner commerce-team, API que provee, API que consume, Kafka.
3. Abres Docs o dices que viven junto al servicio si el generador no está.
4. Abres Create y el template. Nombras fetch, create, push, register. Dices que el CI hace build y test, y que no despliega.
5. Abres service-health si existe. Dices que el browser no ve el mock.
6. Cierras: "En producción quito guest, uso Postgres, saco los docs al CI y no pongo el portal en el camino de una compra."

## 7. Laboratorio

Haz la toma. Cronometra. Si pasas de seis minutos, corta el punto 3, no el 6. El límite de producción es lo que más preguntan después.

## 8. Validación

Quien te oiga puede repetir: un portal, orders no posee Kafka, el template no despliega.

## 9. Troubleshooting

### Te interrumpen en el paso 2 con "¿y Kubernetes?"

Respondes el label y vuelves al guion. No abras un kind en medio de la demo si no está arriba.

### La UI no arranca el día de la entrevista

Pasas al papel: los dos planos y el `template.yaml` abierto en el editor. No pidas cinco minutos para `yarn install`.

### Empiezas a disculparte por lo que no levantaste

Sustituye la disculpa por el límite: "Grafana está enlazado. No reimplementé métricas."

## 10. Ejercicio

Quita una frase del guion que no enseñe nada. La candidata suele ser "Backstage es un proyecto de la CNCF". Guárdala por si preguntan qué es. No la uses de apertura.

## 11. Preguntas de entrevista

### Enséñame tu diseño

Respuesta corta: el guion de la sección 6.

Explicación: problema, ficha de orders, template, límite de producción.

Qué mencionar: un dato concreto (owner, `202`, step `catalog:register`).

## 12. Conexión con arquitectura

Este guion es la conexión. Tu experiencia de Nest entra en el punto 4: "el skeleton no trae el dominio; eso lo sigue escribiendo el equipo como hasta ahora".

## 13. Checklist

- [ ] Hice una toma cronometrada
- [ ] El paso 6 está dentro de los cinco minutos
- [ ] No abrí con la definición de la CNCF
- [ ] Puedo seguir si la UI no arranca

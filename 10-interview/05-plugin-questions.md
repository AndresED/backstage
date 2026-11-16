# Preguntas de plugins

Tiempo estimado: 25 min
Nivel: Avanzado
Importancia para entrevista: CRÍTICO
Prioridad: CRÍTICO

## 1. Objetivo

Defender el plugin service-health y el criterio de cuándo no escribir uno.

## 2. Prerrequisitos

Módulo 06.

## 3. Concepto

Dibuja la flecha browser → backend del portal → API externa antes de hablar de React.

## 4. ¿Por qué existe?

Es la ronda donde se ve si pones el token en el frontend.

## 5. Arquitectura

```mermaid
flowchart LR
  UI[Page] --> Api[/api/service-health]
  Api --> Up[API interna]
```

## 6. Ejemplo real

La tabla de auth, orders y payments. Payments degradado es un dato del mock.

## 7. Laboratorio

Explica el plugin en tres minutos, de pie, sin abrir el código. Luego abre `router.ts` y comprueba que no contradijiste el 502.

## 8. Validación

Dijiste discoveryApi, config schema, 502 y que el JWT del usuario no se reenvía.

## 9. Troubleshooting

Si no recuerdas el pluginId, es `service-health` y la ruta es `/api/service-health/services`.

## 10. Ejercicio

Responde la pregunta 4 sin decir la palabra "fácil".

## 11. Preguntas de entrevista

### 1. ¿Qué partes tiene service-health?

Respuesta corta: un frontend con una tabla y un backend que hace de proxy autenticado hacia el mock.

Explicación: el mock escucha en 127.0.0.1:4010. El browser no lo llama.

Qué mencionar: `createBackendPlugin`, `fetchApi`, `config.d.ts`.

### 2. ¿Por qué un 502 y no una lista vacía?

Respuesta corta: porque una lista vacía parece "no hay servicios" y el upstream está caído.

Explicación: el log del plugin guarda el fallo sin guardar un secreto, porque no hay secreto.

Qué mencionar: el operador distingue 401 (no hay token) de 502 (el mock no responde).

### 3. ¿Dónde se registra?

Respuesta corta: `backend.add` en `packages/backend/src/index.ts`, y la ruta de UI en la app.

Explicación: el paquete exporta el plugin por defecto. El nombre npm es el que generó `yarn new`.

Qué mencionar: no editas el núcleo de Backstage.

### 4. ¿Por qué no llamas al mock desde React?

Respuesta corta: porque el día que haya un token de servicio, estaría en el bundle, y porque el browser no debería estar en esa red.

Explicación: `discoveryApi` resuelve `/api/service-health`. `rootConfig` lee `acme.healthApi.baseUrl` solo en el backend.

Qué mencionar: visibilidad `backend` en el schema. Una clave sin schema impide el arranque.

### 5. ¿Qué es un module y por qué esto no lo es?

Respuesta corta: un module extiende un plugin existente. Esto es un plugin con su propio id.

Explicación: un processor de entidades sería un module del catalog.

Qué mencionar: el prefijo HTTP sería `/api/catalog/modules/...` si fuera un module del catálogo.

### 6. ¿Cómo evolucionas el plugin sin duplicar el catálogo?

Respuesta corta: el `name` enlaza a la ficha. El owner se lee en el catálogo.

Explicación: el contrato es que ese name es `metadata.name`.

Qué mencionar: no guardes el owner en el mock.

### 7. ¿Frontend clásico o nuevo?

Respuesta corta: el de tu app, y sabes que el otro usa `PageBlueprint` y `createFrontendPlugin`.

Explicación: `yarn new` → `frontend-plugin` sigue documentado como legacy. El sistema nuevo es el que nombras en diseño.

Qué mencionar: no reescribas `App.tsx` entero al añadir la ruta.

### 8. ¿Qué permiso tiene?

Respuesta corta: ninguno propio. Exige el token del router.

Explicación: un permiso `acme.service-health.read` sería el incremento si solo platform debe ver la tabla.

Qué mencionar: no lo confundas con la policy del scaffolder.

## 12. Conexión con arquitectura

El plugin es el ejemplo hexagonal que ya sabes explicar: puerto de entrada HTTP, puerto de salida fetch, sin dominio de pedidos.

## 13. Checklist

- [ ] Expliqué el plugin en tres minutos
- [ ] El 502 está en la explicación
- [ ] El token del usuario no sale del portal
- [ ] Distingo plugin y module

# Integrar una API — LAB 14

Tiempo estimado: 25 min
Nivel: Intermedio
Importancia para entrevista: CRÍTICO
Prioridad: CRÍTICO

## 1. Objetivo

Recorrer el camino completo Portal → plugin backend → API externa, y mover la URL a configuración como si el mock fuera un sistema interno.

## 2. Prerrequisitos

Lab de backend plugin. El mock responde en el puerto 4010.

## 3. Concepto

La API externa de este lab es el mock. El patrón es el de una API interna real:

1. El browser solo habla con Backstage.
2. El plugin valida que el upstream respondió.
3. El plugin no reenvía headers de usuario al upstream en este lab. Si el upstream exigiera un token de servicio, se leería con `getOptionalString` y visibilidad `secret` en el schema. No se loguea.
4. El frontend ignora la URL del upstream.

Autenticación hay dos:

- Usuario → Backstage: token de guest (o del IdP en producción), lo adjunta `fetchApi`.
- Backstage → API interna: token de servicio, si existiera. El mock no lo pide. No inventes un header `Authorization` hacia el mock.

El día que el upstream pida un secreto, la forma es:

```yaml
acme:
  healthApi:
    baseUrl: http://health.internal
    token: ${ACME_HEALTH_TOKEN}
```

y en `config.d.ts` el campo `token` con `@visibility secret`. El router lo pondría en un header. Este lab no lo hace porque el mock no autentica y un secreto falso enseña a commitear basura. El capítulo de secretos vuelve aquí.

## 4. ¿Por qué existe?

El lab anterior ya llama al mock. Este lo convierte en una decisión consciente: parar el mock, ver el 502, cambiar la config, entender las dos autenticaciones.

## 5. Arquitectura

```mermaid
flowchart LR
  User[Guest token] --> UI
  UI --> Be[service-health backend]
  Be --> Ext[API de salud]
  Ext --> Be
  Be --> UI
```

## 6. Ejemplo real

Platform quiere que la tabla no mienta. Si el servicio de salud de la empresa cae, la página muestra el error. No una tabla cacheada de ayer. El lab no implementa caché a propósito.

## 7. Laboratorio

Objetivo: provocar el fallo y recuperarlo.

1. Con la tabla funcionando, para el mock (Ctrl+C en su terminal).
2. Refresca http://localhost:3000/service-health
3. Resultado esperado: mensaje de error con status 502, o el texto `health api unavailable`.
4. Vuelve a arrancar el mock:

```bash
cd docs/backstage-course/labs/mock-health-api
node server.mjs
```

5. Refresca. Las tres filas vuelven.
6. Cambia en `app-config.local.yaml` el `baseUrl` a `http://127.0.0.1:4011`. Reinicia `yarn start`. La tabla vuelve a fallar aunque el mock siga en 4010.
7. Devuelve `4010`. Reinicia. La tabla vuelve.

Ese cambio de puerto es el error intencional. No lo dejes en 4011.

## 8. Validación

Viste la tabla, el 502, y otra vez la tabla. El browser nunca llamó al 4010.

## 9. Troubleshooting

### El 502 no aparece y la tabla sigue llena

¿Por qué ocurre? El frontend cacheó el estado de React y no refetch, o no paraste el proceso correcto.
¿Cómo diagnosticarlo? Network → la llamada nueva. `curl` al 4010 tiene que fallar.
¿Cómo solucionarlo: recarga dura. El `useEffect` solo corre al montar. Un refresh de página basta.

### Reinicié Backstage y el token del shell se perdió

¿Por qué ocurre? `GITHUB_TOKEN` y el resto viven en la shell.
¿Cómo diagnosticarlo? GitHub deja de funcionar y el health no, porque el health no necesita ese token.
¿Cómo solucionarlo: export de nuevo si lo usas. El health solo necesita el mock y la config.

### Quise pasar el token de guest al mock

¿Por qué ocurre? "Todas las APIs llevan el Bearer".
¿Cómo diagnosticarlo? El mock no tiene auth. Reenviar el JWT de Backstage a un tercero filtra identidad.
¿Cómo solucionarlo: no reenvíes el header. Un token de servicio sería otro secreto, de Backstage hacia el upstream.

## 10. Ejercicio

Escribe el `config.d.ts` del campo `token` con visibilidad secret, en un comentario al final del fichero, sin usarlo en el router. Tiene que quedar claro que no está cableado.

## 11. Preguntas de entrevista

### ¿Cómo integras una API interna?

Respuesta corta: un backend plugin lee la URL y el secreto de config, llama al upstream y devuelve un DTO a la UI.

Explicación: la UI usa discovery y fetchApi. El upstream no es visible para el browser.

Qué mencionar: 502 si el upstream cae, schema de config, dos autenticaciones distintas.

## 12. Conexión con arquitectura

- Microservicios: el portal es un cliente más de una API interna, con su propio timeout implícito de `fetch`. No hay retry. Si te preguntan, di que un retry con backoff sería el siguiente paso y que no está, para no duplicar tormentas.
- Platform Engineering: la integración es producto de plataforma.
- DevOps: el 502 se puede alertar en el log del plugin.
- CI/CD: el mock no se despliega. En serio, la URL apunta al servicio interno.
- Cloud: secreto en el gestor de secretos, inyectado como env.
- Developer Experience: una tabla, sin VPN a la herramienta de turno, porque el backend ya está en la red correcta.

## 13. Checklist

- [ ] Vi el 502 al parar el mock
- [ ] Recuperé la tabla
- [ ] Probé un `baseUrl` mal y lo revertí
- [ ] Puedo explicar las dos autenticaciones

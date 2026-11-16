# Autenticación

Tiempo estimado: 20 min
Nivel: Intermedio
Importancia para entrevista: CRÍTICO
Prioridad: ALTO

## 1. Objetivo

Explicar quién eres dentro de Backstage y por qué el guest de tu laptop no puede ser el diseño de producción.

## 2. Prerrequisitos

El portal arranca y entras sin password.

## 3. Concepto

Autenticación responde "¿quién es esta petición?". En local, el proveedor **guest** firma un token de backend para `user:development/guest`. Lo ves en el log: `Issuing token for user: development/guest`.

Ese token lo pide el frontend a `/api/auth/guest/refresh` y lo manda en las llamadas siguientes. `fetchApi` lo adjunta. Por eso tu plugin no abre el endpoint.

En una empresa el proveedor es el IdP que ya tengas: GitHub, Google, Microsoft Entra, Okta, OIDC genérico. Backstage no es el directorio de empleados. El módulo de auth habla con el IdP, crea la sesión y un **sign-in resolver** decide a qué entidad `User` del catálogo corresponde esa identidad.

No hay laboratorio de Okta. Exigiría un tenant, un client secret y una redirect URI. Inventarlos no te prepara. El lab es leer la identidad guest y saber qué apagarías.

`auth.providers.guest` existe en la config de desarrollo. En producción se quita. Si el YAML de producción sigue teniendo guest, cualquiera entra.

## 4. ¿Por qué existe?

Sin identidad, el permission framework no tiene a quién permitir o denegar, y los audit logs no sirven.

## 5. Arquitectura

```mermaid
flowchart LR
  Browser --> Auth[/api/auth]
  Auth --> Guest[guest en local]
  Auth --> IdP[IdP en producción]
  Guest --> Token[token de Backstage]
  IdP --> Token
  Token --> Plugins
```

## 6. Ejemplo real

Ana, en producción, entraría con el IdP de ACME. El resolver la mapearía a `user:default/ana`, que ya existe en `org.yaml` como miembro de `commerce-team`. Hoy tú eres guest. Ana en el catálogo y tú en la sesión no sois la misma persona. El capítulo de users ya lo dijo. Aquí se vuelve a ver desde el lado del login.

## 7. Laboratorio

Objetivo: nombrar tu identidad y encontrar el proveedor en la config.

1. http://localhost:3000 → Settings. Anota el nombre de usuario.
2. En el log de `yarn start`, busca `development/guest`.
3. En `app-config.yaml` busca `guest`. No lo borres: sin él, en local, tienes que configurar otro proveedor para volver a entrar.

Resultado esperado: puedes decir la identidad completa y el endpoint de refresh que viste en el concepto.

No copies un client secret de ejemplo a ningún fichero.

## 8. Validación

Settings y el log coinciden en guest. El catálogo sigue mostrando a Ana como User, y no eres Ana.

## 9. Troubleshooting

### Quité guest y ahora no entro

¿Por qué ocurre? No hay otro provider configurado.
¿Cómo diagnosticarlo? La UI se queda en el login sin botón.
¿Cómo solucionarlo: restaura `guest: {}` bajo `auth.providers` como estaba en la app nueva. Reinicia.

### Creo que el User del YAML es la contraseña

¿Por qué ocurre? Están en el mismo producto.
¿Cómo diagnosticarlo? ¿El YAML tiene un campo password? No.
¿Cómo solucionarlo: el YAML describe a la persona. El IdP autentica.

### El token aparece en un log que copiaste a un ticket

¿Por qué ocurre? El log de desarrollo imprime el flujo.
¿Cómo diagnosticarlo? Un JWT en el texto.
¿Cómo solucionarlo: no pegues logs de auth en sitios compartidos. En local el daño es bajo. El hábito es el que te van a pedir.

## 10. Ejercicio

Di qué proveedor usarías en ACME si la empresa ya vive en Microsoft Entra, y qué pieza une ese login con `user:default/ana`.

## 11. Preguntas de entrevista

### ¿Cómo funciona la autenticación?

Respuesta corta: un provider de auth emite la identidad y Backstage firma la sesión. Guest solo en desarrollo.

Explicación: el frontend llama al backend de auth. Los plugins reciben el token, no la contraseña del IdP.

Qué mencionar: sign-in resolver hacia el User del catálogo. Quitar guest en producción.

## 12. Conexión con arquitectura

- Microservicios: el login de los clientes de la tienda es `ms-auth`. No es este auth. Son dos puertas.
- Platform Engineering: el IdP lo elige la empresa, no cada plugin.
- DevOps: el client secret del provider va por entorno.
- CI/CD: el pipeline no usa guest.
- Cloud: Entra, Cognito o Google según el directorio que ya exista. No montes uno nuevo para el portal.
- Developer Experience: un solo login para el portal.

## 13. Checklist

- [ ] Sé quién soy en Settings
- [ ] Distingo guest y `user:default/ana`
- [ ] Distingo el auth del portal y `ms-auth`
- [ ] No borré guest sin tener otro provider

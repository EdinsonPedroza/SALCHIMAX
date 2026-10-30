# Dominio salchimax.com en Cloudflare

El dominio se compró en Hostinger. Esta guía lo deja funcionando con la página alojada en Cloudflare (plan gratis). El código ya está listo: lo que falta son pasos en tus cuentas, en este orden.

## Qué ya quedó hecho en el código

- Todas las direcciones que el sitio da de sí mismo (canonical, Open Graph, datos para Google, `sitemap.xml`, `robots.txt`) apuntan a `https://salchimax.com`. Antes apuntaban a `salchimax.co`, que no existe.
- `wrangler.jsonc` (en la raíz, junto a `vercel.json`) le dice a Cloudflare cómo servir la carpeta `build` y que `/terminos`, `/privacidad` y `/pqr` carguen la página.
- `frontend/public/_headers` trae las mismas medidas de seguridad y de caché que `vercel.json`. Mientras el sitio pueda salir por los dos lados, si cambias una política cambia la otra.
- La analítica de Vercel solo se carga cuando el sitio está en `*.vercel.app`. En Cloudflare no pide scripts que no existen.
- Probado en local con `wrangler dev` (el mismo motor de Cloudflare): las 4 rutas, las cabeceras, la caché, el mapa y el carrito funcionan, sin errores en consola.

## Lo que te toca a ti

### 0. Confirma el correo del dominio (hoy)

Hostinger te manda un correo para verificar quién es el dueño del dominio (es una regla internacional). Si no lo confirmas en 15 días, el dominio se suspende. Búscalo en el correo de tu cuenta de Hostinger (mira también spam).

### 1. Agrega el dominio a Cloudflare

1. Crea una cuenta gratis en <https://dash.cloudflare.com/sign-up>.
2. Pulsa **Add a domain** (o **Onboard a domain**), escribe `salchimax.com` y elige el plan **Free**.
3. Si Cloudflare importa registros `A` o `CNAME` de la página de "parking" de Hostinger, bórralos. Si quedan en `@` o en `www`, pueden impedir que conectes el dominio más adelante.
4. Cloudflare te muestra **dos nameservers**, algo como `ada.ns.cloudflare.com` y `bob.ns.cloudflare.com`. Déjalos a la vista.

### 2. Apunta el dominio a Cloudflare (en Hostinger)

1. hPanel → **Dominios** → `salchimax.com` → **Administrar** → **DNS / Nameservers** → **Cambiar nameservers**.
2. Borra los de Hostinger (`ns1.dns-parking.com` y `ns2.dns-parking.com`) y pega los dos de Cloudflare, exactamente como salen.
3. Si el dominio tiene **DNSSEC** activado en Hostinger, desactívalo antes de cambiar; si no, el dominio puede quedar inalcanzable.
4. Vuelve a Cloudflare y pulsa **Check nameservers**. Cuando esté listo te llega un correo "salchimax.com is now active on Cloudflare" (de minutos a unas horas, máximo 24 h).

El dominio sigue siendo de Hostinger (ahí lo renuevas cada año). Solo cambia quién responde el DNS.

### 3. Crea la página en Cloudflare desde GitHub

**Workers & Pages** → **Create application** → **Import a repository** → GitHub → elige `EdinsonPedroza/SALCHIMAX`.

| Campo | Valor |
|---|---|
| Nombre del Worker | `salchimax` (tiene que ser igual al `name` de `wrangler.jsonc`) |
| Production branch | `main` |
| Root directory | vacío (la raíz del repositorio, `/`) |
| Build command | `cd frontend && yarn install --frozen-lockfile && CI=false GENERATE_SOURCEMAP=false yarn build` |
| Deploy command | `npx wrangler deploy` (el que viene por defecto) |
| Variable de build | `YARN_VERSION` = `1.22.22` |

Pulsa **Save and Deploy**. El primer build tarda un par de minutos. Al terminar abre la dirección `salchimax.<tu-usuario>.workers.dev` y revisa: inicio, `/terminos`, `/privacidad`, `/pqr` y el carrito.

Desde ahí, cada push a `main` se publica solo, igual que en Vercel.

### 4. Conecta salchimax.com

Hazlo cuando el dominio ya diga **Active** en Cloudflare.

1. Tu Worker → **Settings** → **Domains & Routes** → **Add** → **Custom domain** → `salchimax.com`. Cloudflare crea el DNS y el certificado HTTPS solo.
2. Para que `www.salchimax.com` lleve al dominio sin `www`:
   - **DNS** → **Add record**: tipo `A`, nombre `www`, IPv4 `192.0.2.0`, proxy **activado** (nube naranja). Es un registro de relleno: no apunta a ningún servidor real.
   - **Rules** → **Redirect Rules** → **Create rule**. Condición: *Hostname* igual a `www.salchimax.com`. Acción: redirección **dinámica** con `concat("https://salchimax.com", http.request.uri.path)`, código **301**, conservando el query string.

### 5. Ajustes recomendados en Cloudflare

- **SSL/TLS** → Overview: **Full (strict)**.
- **SSL/TLS** → Edge Certificates: **Always Use HTTPS** activado.
- **Caching** → Configuration → **Browser Cache TTL**: *Respect Existing Headers* (así se respetan las reglas de `_headers`).
- **Speed** → Optimization → **Rocket Loader**: déjalo apagado. No hace falta y reescribe scripts.
- Activa la verificación en dos pasos en Cloudflare, Hostinger y GitHub.

### 6. Google y redes

- **Google Search Console** → agregar propiedad de tipo **Dominio** → `salchimax.com`. Google da un registro `TXT`: créalo en Cloudflare (DNS → Add record, nombre `@`) y pulsa Verificar. Luego, en **Sitemaps**, envía `https://salchimax.com/sitemap.xml`.
- **Perfil de Negocio de Google** (el de Maps): cambia el sitio web a `https://salchimax.com`.
- Instagram, Facebook y WhatsApp Business: pon el mismo enlace.

### 7. Cuando todo funcione

- **Política de privacidad.** Hoy dice que el sitio está alojado en Vercel y que se mide con Vercel Analytics. Eso dejará de ser cierto. No la cambié antes para que no dijera algo falso mientras el sitio sigue en Vercel: avísame y la actualizo.
- **Analítica.** La de Vercel no funciona fuera de Vercel, así que en Cloudflare no habrá medición hasta que activen otra. Cloudflare Web Analytics es gratis y sin cookies. Si la activan, hay que permitir sus dos hosts en `public/_headers` (las líneas ya están anotadas arriba en ese archivo) y actualizar la política de privacidad.
- **Vercel.** Si ya no lo vas a usar, borra el proyecto allá y avísame para quitar `vercel.json` y las dos librerías de Vercel.
- **Correo @salchimax.com.** Cloudflare **Email Routing** (gratis) reenvía lo que llegue a `pedidos@salchimax.com` a tu Gmail. Sirve para recibir; para enviar desde esa dirección hace falta otro servicio.
- **Pasar también el registro a Cloudflare** (opcional): se puede una vez pasen 60 días desde la compra. El dominio debe estar activo en Cloudflare, desbloqueado en Hostinger y con su código de autorización. Se paga al costo y suma un año. Mientras tanto no hace falta.

## Si algo falla

| Síntoma | Qué revisar |
|---|---|
| Cloudflare sigue en "Pending Nameserver Update" | En Hostinger deben estar exactamente los dos nameservers de Cloudflare. Espera hasta 24 h. |
| El build falla en `yarn` | Que exista la variable `YARN_VERSION` = `1.22.22`. |
| "Couldn't find a package.json" | El build command debe empezar con `cd frontend &&` y el Root directory debe estar vacío. |
| El build pasa pero falla al desplegar | El nombre del Worker en Cloudflare debe ser `salchimax`. |
| `/terminos` o `/pqr` dan 404 | Que `wrangler.jsonc` conserve `"not_found_handling": "single-page-application"`. |
| No deja agregar el Custom domain | Hay un registro `A` o `CNAME` con ese nombre en DNS: bórralo y repite. |
| La consola del navegador muestra algo bloqueado | La política de seguridad está en `frontend/public/_headers` (y en `vercel.json`). |

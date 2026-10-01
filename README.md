# misaelgranillo.com

Sitio personal de Misael Granillo. Estático, bilingüe (ES/EN), sin framework ni
build step. Un operador que construye sistemas: ventas (Acto I), software y
medicina (Acto II).

## Estructura

```
/
  index.html                         Home: hero, el hilo, tablero de métricas,
                                      Acto I (trayectoria), track record,
                                      Acto II (construyendo hoy), capacidades,
                                      notas (teaser), contacto
  404.html                           Página de error
  robots.txt                         SEO
  sitemap.xml                        SEO (incluye /notas y cada entrada)
  _headers                           Cache/seguridad para Cloudflare Pages
  /assets/css/styles.css             Sistema de diseño completo
  /assets/js/site.js                 Toggle de idioma, menú móvil, split-flap
  /assets/img/favicon.svg            Favicon (marca MG, motivo de tablero)
  /notas/index.html                  Índice de notas
  /notas/<slug>/index.html           Cada nota: URL, title y meta propios
```

## Idioma

ES/EN en el mismo HTML. El toggle cambia `data-lang` en `<html>` y CSS oculta el
idioma inactivo. La preferencia se guarda en `localStorage`. Ambos idiomas están
en el HTML de origen (bueno para SEO y sin JS). El `<title>` se cambia por idioma
vía atributos `data-title-es` / `data-title-en`.

## Agregar una nota

1. Crea `notas/<slug>/index.html` (copia una existente como base).
2. Ajusta `<title>`, `meta description`, `canonical`, OG y el JSON-LD `BlogPosting`.
3. Escribe el cuerpo en `.es` y `.en` dentro de `.prose`.
4. Agrega la entrada al listado en `notas/index.html` y al teaser en `index.html`.
5. Agrega la URL a `sitemap.xml`.

## Diseño

- Primario: índigo `#313E66`. Acento interactivo: ámbar de tablero de aeropuerto
  `#c98a1f`. Papel frío `#f4f5f8`, tinta `#23263a`.
- Tipografía: Fraunces (display serif, titulares) + Hanken Grotesk (cuerpo/UI).
- Lenguaje de aviación: el tablero de salidas (métricas split-flap) es el único
  momento de audacia; el resto es contención.
- Regla de estilo del copy: sin em dashes ni rayas largas.

## Previsualizar en local

```
python3 -m http.server 8000
# abre http://localhost:8000
```

No requiere build. Cualquier servidor estático funciona.

## Despliegue (Cloudflare) — PENDIENTE, requiere confirmación

El sitio es estático y está listo para Cloudflare Pages. No se ha desplegado
desde esta sesión porque:

1. Sobrescribir producción es una acción destructiva que requiere tu visto bueno.
2. El conector MCP de Cloudflare disponible en esta sesión expone Workers, KV,
   R2, D1 e Hyperdrive, pero NO gestión de proyectos Cloudflare Pages ni DNS, así
   que no pude localizar el proyecto/zona actual de misaelgranillo.com ni ejecutar
   el deploy desde aquí.

Lo que sí se verificó (solo lectura): la cuenta tiene 3 Workers (`microdiarios`,
`yola-proxy`, `corebox-dash`). `yola-proxy` sirve a `los20estelares.com`
(proxy a Yola), no a misaelgranillo.com. Ninguno corresponde al dominio.

### Opción A — Cloudflare Pages (recomendada, sin build)

```
npx wrangler pages deploy . --project-name=misaelgranillo
```

Luego, en el dashboard de Cloudflare: Pages > el proyecto > Custom domains >
agregar `misaelgranillo.com` y `www`. Cloudflare crea los registros CNAME.
Preserva el resto de la zona DNS sin cambios.

### Opción B — dashboard

Pages > Create > subir este directorio como carpeta estática, luego asignar el
dominio.

Para que yo lo despliegue desde una sesión, necesito acceso a Pages/DNS (token de
API de Cloudflare con permisos de Pages, o que se habiliten esas herramientas en
el conector) y tu confirmación explícita para reemplazar el sitio actual.

## Confirmaciones pendientes (Misael)

1. **corebox.icu**: cuáles de `clima`, `lounge`, `split-flap`, `gems` están
   desplegados y son públicos, para enlazarlos. Hoy aparecen como texto sin
   enlace con la etiqueta "por confirmar".
2. **Copy del hero**: borrador actual (ES) "Un operador que construye sus propios
   sistemas. Once años dirigiendo ventas de bienes raíces de lujo en la Riviera
   Maya. Hoy construyo software, infraestructura propia y me reentreno en
   medicina. La misma mente, un dominio nuevo." Aprobar o ajustar.
3. **TikTok y X**: en el schema `sameAs` se usaron las formas estándar
   `https://www.tiktok.com/@misaelgranillo` y `https://x.com/misaelgranillo`.
   Confirmar que son los URLs exactos.

## Notas de SEO de entidad

- JSON-LD `Person` en la home: `name` "Misael Granillo", `alternateName`
  "Aldo Misael Granillo Mejía", `jobTitle`, `url`, `sameAs` (solo LinkedIn,
  TikTok, X).
- Facebook, Instagram y los podcasts de Spotify quedan FUERA del `sameAs` y del
  sitio, por decisión del brief.
- Nombre canónico "Misael Granillo" idéntico en title, H1, OG y schema.

## Pendiente de diseño

El brief pedía aplicar dos packs de terceros (`ui-ux-pro-max`, `taste-skill`).
No están instalados en este entorno (no existen en disco ni en los plugins
sincronizados). Se construyó con `frontend-design/SKILL.md` y la regla de
contención por defecto. Si se instalan, vale una segunda pasada.

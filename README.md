# Frida · Estilo & Bienestar

Tienda en React 18 y Vite con páginas independientes por ruta, fichas de referencia y reservas por WhatsApp.

## Ejecutar

- `npm ci`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `node --test src/lib/reservations.test.js`

## Navegación

- `/`: portada editorial y acceso a las colecciones.
- `/ropa`, `/perfumes`, `/maquillaje`, `/ganoderma`: páginas de colección con búsqueda, filtros por tipo y orden alfabético.
- `/:categoria/:producto`: ficha individual con cantidad y preferencias.
- `/reservas`: selección, edición de cantidades, preferencias, eliminación y mensaje para WhatsApp.
- Las rutas desconocidas muestran una página de error con retorno al inicio.

Cada enlace abre una vista independiente; no son secciones de una sola página larga. Vite sirve las rutas directamente en desarrollo y preview. Al desplegar en hosting estático, configurar el fallback de rutas a `/index.html`.

## Catálogo

Los datos editables están en `src/data/catalog.js`. Las referencias de ropa, perfumes y maquillaje son orientativas, con fotos ilustrativas externas de Unsplash; confirmar modelos y marcas antes de publicar. Las seis referencias DXN provienen de la imagen proporcionada, conservada en `public/catalogo-dxn.png`. No se inventan precios ni stock.

## WhatsApp y reservas

- Contacto configurado: `51970170212`. Se asumió código de país +51 (Perú) para el número facilitado.
- Configuración: `src/data/store.js`; puede sobrescribirse con `VITE_WHATSAPP_NUMBER` al compilar.
- El enlace `wa.me` incluye los productos, cantidades, preferencias y los datos opcionales del formulario.
- El usuario revisa y envía el mensaje en WhatsApp. No se envía automáticamente ni se confirma stock, cobro o reserva.
- La selección se guarda localmente con la clave `frida-reservation-v1`. No existe una base de datos de pedidos.
- Nombre, entrega y nota se mantienen solo mientras está abierta la página de reserva.

## Tema

El selector claro/oscuro se conserva. La primera visita usa la preferencia del dispositivo; la elección manual se guarda bajo `frida-theme`. El tema se aplica antes del render para evitar destellos.

## Validación

Build de producción, pruebas unitarias de restauración de datos, combinación de cantidades y codificación de enlaces WhatsApp. Revisión en navegador de páginas por categoría, filtro, búsqueda sin resultados, ordenación, ficha, agregado, persistencia tras recarga, eliminación y ancho móvil de colección y reserva. El enlace WhatsApp se inspecciona sin enviar mensajes reales.

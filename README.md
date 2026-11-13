# AgroAlert Araucanía — Sitio web

Sitio del proyecto **AgroAlert Araucanía**: monitoreo agroclimático y control de
riego desde el celular, por Wi-Fi. Proyecto TI3042 · INACAP · 2026, de
**Darío Candia** y **Sebastián Torres**, docente Franco Fossati Cordero.

- **Sitio publicado:** https://dariochino.github.io/agroalert-web/
- **Repositorio de la app:** https://github.com/DarioChino/agroalert-araucania
- **Descarga del APK:** desde el sitio, sección «Descargar»
  (APK 1.0.0 firmado para Android 8.0 o superior).

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | Página única: problema, solución, características, seguridad, descarga y equipo |
| `css/styles.css` | Estilos (tema oscuro, sin dependencias) |
| `js/main.js` | Comportamiento: menú móvil, cabecera al hacer scroll, aparición de secciones |
| `assets/` | Logo, íconos, capturas de la app, portada Open Graph y el APK de publicación |

## Notas técnicas

- HTML/CSS/JS planos, sin frameworks ni build: clonar y abrir `index.html` basta.
- Fuentes de Google Fonts y script propio con mejora progresiva: si falla algo,
  el sitio sigue siendo legible y navegable.
- Los datos de las capturas provienen del simulador del nodo y están etiquetados
  como tal en el sitio.
- El APK incluido en `assets/` es el mismo firmado que entrega la app; su huella
  SHA-256 está visible en la sección «Descargar».

## Publicado en GitHub Pages

El sitio se publica en la rama `main`, carpeta raíz (el archivo `.nojekyll`
evita el procesamiento de Jekyll). Para actualizar: editar, hacer commit y
`git push`; Pages se reconstruye solo.

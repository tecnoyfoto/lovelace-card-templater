# Lovelace Card Templater 2.0


**Lovelace Card Templater 2.0** es un fork del proyecto original de Steven Rollason que permite aplicar plantillas Jinja2 a otras tarjetas de Lovelace en Home Assistant. Esta versión se ha actualizado para ser compatible con las versiones más recientes de Home Assistant, utilizando Webpack 5 y Babel para transpilar el código moderno.

Esta tarjeta te permite modificar dinámicamente propiedades de otras tarjetas (como nombre, icono, estado, etc.) basadas en la información de entidades o atributos, facilitando la personalización y actualización de la interfaz.

## Características
Compatibilidad actualizada: Migrada a Webpack 5 y Babel, asegurando compatibilidad con las últimas versiones de Home Assistant.
Templating dinámico: Permite modificar propiedades de las tarjetas usando plantillas Jinja2.
Soporte para listas y objetos: Templating de propiedades que son listas o que requieren transformación.
Integración con HACS: Instalable directamente desde HACS.

## Instalación vía HACS
En Home Assistant, ve a HACS > Integraciones (o Frontend para tarjetas Lovelace).
Abre el menú (los tres puntos) y selecciona Custom repositories.
Añade la URL de este repositorio:

https://github.com/tecnoyfoto/lovelace-card-templater-2

Selecciona la categoría Lovelace.
Una vez agregado, busca Lovelace Card Templater 2.0 en HACS y haz clic en Install.
Reinicia Home Assistant si es necesario.

## Uso
Una vez instalada, podrás utilizar la tarjeta en tus dashboards de Lovelace. Por ejemplo, para crear una tarjeta que muestre imágenes basadas en el valor de un sensor, podrías usar:

``` type: custom:card-templater
card:
  type: picture-entity
  entity: sensor.envases_days
  name_template: '{{ states.sensor.envases_days.state }} days'
  show_name: true
  show_state: false
  state_image:
    '0': /local/contenedores/envases.jpg
    '1': /local/contenedores/envases-1.jpg
    '2': /local/contenedores/envases-2.jpg
entities:
  - sensor.envases_days
  ```

Nota: Se recomienda crear sensores template que extraigan el valor numérico (0, 1, 2) a partir de atributos de tus sensores originales, de modo que la tarjeta pueda usar ese valor para seleccionar la imagen correcta. Consulta la documentación de Home Assistant sobre sensores template para más detalles.

## Ejemplo avanzado de templating
Puedes modificar cualquier propiedad que acepte cadenas en la tarjeta cambiando su nombre a *_template. Por ejemplo, en un card tipo entities:


``` type: custom:card-templater
card:
  type: entities
  show_header_toggle: false
  title: Lugares
  entities:
    - entity: zone.home
      name_template: >
        {{ state_attr("zone.home", "friendly_name") }} - {{
        (distance(states.device_tracker.my_phone, states.zone.home) * 0.621371) | round(1)
        }} miles
    - entity: zone.work
      name_template: >
        {{ state_attr("zone.work", "friendly_name") }} - {{
        (distance(states.device_tracker.my_phone, states.zone.work) * 0.621371) | round(1)
        }} miles
entities:
  - device_tracker.my_phone
 ``` 

## Variables disponibles en las plantillas

user: Información del usuario actual (user.name, user.is_admin, etc.).
page: Objeto location del navegador (ejemplo: page.pathname, page.href, etc.).
theme: El nombre del tema actual.

## Licencia y Créditos
Licencia: MIT (se debe incluir el aviso original del autor).
Autor original: Steven Rollason.
Mantenido por: Albert Barnosell
Canal de YouTube: Tecnoyfoto

## Contribuciones
¡Se agradecen las contribuciones y comentarios! Si encuentras algún error o tienes sugerencias para futuras mejoras, abre un issue o un pull request en este repositorio.
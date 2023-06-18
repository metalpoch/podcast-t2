# email endpoint

Este endpoint se encarga de enviar emails a través de una API RESTful con Flask.

## Envío de emails

### `POST /api/email`

Envía un email a un destinatario con los datos proporcionados en un objeto JSON.

**Estructura del objeto JSON:**

```json
{
  "client": "Nombre apellido",
  "date": "2023-06-18T20:23:05.368Z",
  "lang": "ja",
  "recipient": "foo@ziman.com"
}
```

- `client` (string, requerido): nombre del cliente que envía el email.
- `date` (string, requerido): fecha y hora en que se envió el email (formato ISO 8601).
- `lang` (string, requerido): idioma del contenido del email. Solo se permiten los siguientes idiomas: `es`, `en`, `de`, `fr`, `it`, `pt`, `ja`.
- `recipient` (string, requerido): dirección de email del destinatario.

**Respuestas:**

- `200 OK`: el email se ha enviado correctamente.
- `400 Bad Request`: el objeto JSON proporcionado no cumple con los requerimientos, o el idioma especificado no es válido. El cuerpo de la respuesta incluirá un mensaje indicando el error.

**Ejemplo de uso:**

```bash
curl -X POST http://localhost:5000/api/email -H "Content-Type: application/json" -d '{"client": "Nombre apellido", "date": "2023-06-18T20:23:05.368Z", "lang": "ja", "recipient": "foo@ziman.com"}'
```

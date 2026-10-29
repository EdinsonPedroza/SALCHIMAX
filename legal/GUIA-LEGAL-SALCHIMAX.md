# Guía legal de SALCHIMAX (en palabras simples)

**Fecha:** 28 de octubre de 2026
**Para:** quien administra la página y el dueño del negocio
**Importante:** esta guía es una revisión técnica hecha con fuentes oficiales. **No reemplaza a un abogado.** Si van a hacer una campaña grande, tener un conflicto con un cliente o recibir una carta de una autoridad, consulten uno.

---

## 1. La idea en 30 segundos

SALCHIMAX vende comida por internet: el cliente arma el pedido en la página y lo envía por WhatsApp. Para la ley colombiana eso es **comercio electrónico**, aunque se pague en efectivo al recibir. Por eso el negocio tiene obligaciones que un restaurante que solo vende en el local no tiene.

Hay cuatro temas:

| Tema | ¿De qué trata? | Ley |
|---|---|---|
| **Consumidor** | Precios claros, promos honestas, reclamos, devoluciones | Ley 1480 de 2011 y Ley 2439 de 2024 |
| **Datos personales** | Qué haces con el nombre, teléfono y dirección del cliente | Ley 1581 de 2012 y Decreto 1377 de 2013 |
| **Mensajes de publicidad** | A quién y a qué hora le puedes mandar promos por WhatsApp | Ley 2300 de 2023 |
| **Marca** | Que nadie más tenga registrado el nombre "SALCHIMAX" | Superintendencia de Industria y Comercio (SIC) |

La **SIC** (Superintendencia de Industria y Comercio) es la autoridad que vigila los cuatro temas. Es quien puede multar si algo está mal.

---

## 2. Qué se arregló en la página (ya está publicado)

| Problema que había | Qué pasó | Qué se hizo |
|---|---|---|
| 7 reseñas "reales" que en realidad las inventó el generador de la plantilla (mencionaban platos que no existen: Carnívora, Picadita, sándwich cubano) | Publicidad engañosa. Es de lo más riesgoso | Se ocultó la sección. Solo vuelve con reseñas **reales** |
| Calificación "5.0 con 7 reseñas" en los datos que lee Google | Se basaba en esas reseñas inventadas | Se quitó |
| No había enlace a la SIC | La ley lo exige a quien vende por internet | Está en el pie de página |
| No había forma de hacer una PQR con número de radicado | La ley lo exige desde la Ley 2439 de 2024 | Página nueva `/pqr` |
| Los Términos decían "el precio válido es el que confirmemos por WhatsApp" y "solo 30 minutos para reclamar" | La ley dice que el cliente paga **el precio que se anunció**, y que no puedes quitarle derechos | Se reescribieron |
| La política de privacidad era muy corta | Le faltaban contenidos que exige el Decreto 1377 | Se reescribió completa |
| El carrito decía "Total estimado" y no hablaba del domicilio | Hay que informar el valor total y el envío por separado | Ahora dice "Subtotal" y avisa del domicilio |
| El carrito no mostraba aviso de privacidad | Hay que avisarlo cuando se recogen los datos | Ahora lo muestra |
| Menú sin aclarar que los precios son en COP con impuestos | Obligatorio informarlo | Nota agregada, con aviso de fotos "no a escala" |
| Promos sin aclarar cuánto duran | Las condiciones de una promo deben estar en el mismo anuncio | Nota agregada y campo `cond` para restricciones |
| "Perros calientes" en la descripción para Google | No los venden: información falsa | Se quitó |
| Crédito del mapa incompleto | La licencia de OpenStreetMap lo exige | Corregido |

---

## 3. Lo que falta y solo el dueño puede dar

Esto es lo más urgente. Sin estos datos el sitio **todavía no cumple del todo**.

### 3.1 Datos del negocio (archivo `frontend/src/data/legal.js`)

Hay que llenar estos campos entre comillas:

```js
owner: "",   // Nombre completo del dueño (o razón social si es empresa)
nit: "",     // NIT o RUT, con dígito de verificación. Ej: "1.112.345.678-9"
email: "",   // Correo para PQR y temas de datos personales
payments: "efectivo contra entrega",  // Cámbialo si aceptan Nequi, Daviplata, tarjeta, etc.
```

- Mientras `owner`, `nit` y `email` estén vacíos, **no se muestran** en el sitio.
- Cuando se llenen, aparecen solos en el pie de página, los Términos y la Política de Privacidad.
- La ley (Ley 1480, art. 50) exige que quien vende por internet muestre su identidad: nombre o razón social, NIT, dirección, teléfono y correo.
- Si el negocio es de una persona natural, normalmente el NIT es el número de su RUT. Si no tiene RUT, que lo tramite en la DIAN (es gratis).

### 3.2 Afirmaciones que hay que poder demostrar

La publicidad debe ser verdad. Si el sitio dice algo que no se puede probar, es un riesgo.

| Frase del sitio | Pregunta | Qué hacer |
|---|---|---|
| "5.0 en Google Maps" | ¿Sigue siendo cierto hoy? | Revisar en Google Maps. Si cambió, actualizar |
| "100% ingredientes frescos" | ¿La papa francesa o la salchicha son frescas? Normalmente vienen congeladas o procesadas | Cambiar por algo cierto, ej. "ingredientes de calidad" |
| "Carne 100% Angus" (hamburguesas) | ¿Tienen la factura o ficha del proveedor que lo demuestre? | Guardar esa prueba, o quitar "Angus" |
| "Las mejores / más brutales salchipapas de Palmira" | Es exageración publicitaria habitual y se tolera, pero no la conviertan en dato ("las #1 según X") | Dejarla como está |

### 3.3 Reseñas

Si quieren mostrar reseñas:
1. Copiarlas **tal cual** de Google Maps o Instagram.
2. Pedir permiso al cliente (con un mensaje de WhatsApp basta, guárdenlo).
3. Pasárselas a quien mantenga la página para agregarlas en `Testimonials.jsx`.

### 3.4 Restricciones de las promos

Si alguna promo tiene condiciones, hay que decirlas en la misma tarjeta. Ejemplos de preguntas:
- ¿Se puede combinar con otra promo? ¿Aplica también a domicilio o solo en el local?
- "Jueves de alitas 2x1 en TODAS las alitas": ¿incluye las de 24? ¿La salsa extra se cobra?
- "Gaseosa gratis con hamburguesa": ¿una gaseosa por hamburguesa o por pedido?

Se escriben en `frontend/src/data/promos.js` en el campo `cond`. Ejemplo: `cond: "No acumulable con otras promos · Aplica a domicilio"`.

Si no escriben nada, la promo se entiende **sin restricciones**: el cliente puede exigirla tal cual se anuncia.

---

## 4. Lo que hay que hacer en el día a día (en WhatsApp)

La página no puede cumplir esto sola: lo hace quien atiende el WhatsApp.

### 4.1 Confirmar cada pedido (obligatorio)

Antes de cerrarlo, y a más tardar el día siguiente, el cliente debe recibir un resumen con productos, precio de cada uno, domicilio, total, forma de pago y tiempo de entrega. Plantilla:

```
¡Gracias por tu pedido en SALCHIMAX! 🔥
Pedido:
• 1x La Clásica (1 persona) — $18.000
• 1x Gaseosa personal — $5.000
Subtotal: $23.000
Domicilio: $3.000
TOTAL A PAGAR: $26.000 (impuestos incluidos)
Forma de pago: efectivo contra entrega
Tiempo estimado de entrega: 35 a 45 minutos
¿Confirmas el pedido?
```

El cliente debe **aceptar expresamente** ("sí, confirmo"). Ese mensaje es la prueba. Si dice "no" o no responde, no lo despachen.

### 4.2 Guardar las pruebas

La ley exige conservar la prueba de cada venta (quién compró, qué, cuánto, cuándo). **No borren los chats de pedidos.** Lo ideal: hacer copia o captura mensual.

### 4.3 Responder PQR

- **PQR** = Petición, Queja o Reclamo.
- Cuando alguien radica desde `/pqr`, el mensaje llega por WhatsApp con un número como `SMX-261028-1255-1V0W`.
- Hay que **responderle en máximo 15 días hábiles** (no calendario), mencionando el número de radicado.
- Lleven una hoja de Excel con: radicado, fecha, tipo, qué pasó, qué se respondió y fecha de respuesta. Si la SIC pregunta, esa hoja los salva.

Plantilla de respuesta:

```
Hola [nombre]. Recibimos tu [queja/reclamo/petición] con radicado SMX-XXXXXX.
Revisamos lo que pasó: [explicación].
Solución: [reposición / devolución de $X / disculpas y cambio].
Quedamos atentos. Si no quedas conforme puedes acudir a la Superintendencia de Industria y Comercio (sic.gov.co).
```

### 4.4 Cuando el pedido llega mal

Si llega incompleto, equivocado o en mal estado: **reponer el producto o devolver el dinero**. No pongan condiciones como "solo si reclamas en 30 minutos": la ley no lo permite. Pueden pedir una foto para ayudar a resolverlo, pero no exigirla como requisito.

### 4.5 Si no pueden entregar

- Si falta un producto, avisar **de inmediato**.
- Si el pedido no llega en el tiempo prometido, el cliente puede cancelar y se le devuelve **todo** el dinero en máximo **15 días calendario**, por el medio de pago que él prefiera.

### 4.6 Enviar promociones por WhatsApp

Aquí hay tres reglas de la Ley 2300 de 2023:

1. **Solo a quien lo autorizó**, de forma clara. No agreguen a nadie a listas de difusión solo porque pidió una vez. Plantilla: *"¿Quieres recibir las promos de SALCHIMAX por WhatsApp? Responde SÍ. Puedes dejar de recibirlas escribiendo BAJA."*
2. **Respetar el "BAJA"** de inmediato y para siempre.
3. **Solo en estos horarios:** lunes a viernes de 7:00 a. m. a 7:00 p. m., sábados de 8:00 a. m. a 3:00 p. m. **Nunca domingos ni festivos.** Por eso la promo del domingo se avisa el sábado antes de las 3 p. m.

Esto aplica a mensajes que ustedes **inician**. Responderle a un cliente que escribió primero no cuenta.

---

## 5. Datos personales en palabras simples

Cada vez que un cliente da su nombre, teléfono y dirección, el negocio está "tratando datos personales". Obligaciones:

- **Decir para qué** se usan (ya está en la política de privacidad).
- **Pedir autorización.** Alcanza con que el cliente escriba y dé sus datos para el pedido. Para promos hay que pedir aparte (ver 4.6).
- **Atender sus derechos:** ver, corregir o pedir que borren sus datos. Si lo piden, respondan en máximo **10 días hábiles** (consultas) o **15 días hábiles** (reclamos de corrección o eliminación).
- **No vender ni regalar** esa información.
- **Cuidarla:** el celular donde está el WhatsApp del negocio debe tener bloqueo, y no lo presten a cualquiera. Si despiden a alguien que lo usaba, cambien las claves.
- Cuando alguien pide que borren sus datos, borren sus chats **salvo** que haya un deber legal de conservarlos (por ejemplo la prueba de una venta reciente).

La página **no guarda datos**: todo pasa por WhatsApp. Esto simplifica mucho. Si algún día agregan formularios o una base de datos, hay que revisar esta política otra vez.

### Si algún día activan Google Analytics

En `frontend/src/analytics.js` hay un código de Google Analytics apagado (`G-XXXXXXXXXX`). Si lo activan, usa cookies, y entonces **hay que**:
1. Actualizar el apartado "Cookies y analítica" de la Política de Privacidad.
2. Poner un aviso de cookies con opción de aceptar o rechazar.
3. Permitir los dominios de Google en la política de seguridad de `vercel.json` (el mismo archivo `analytics.js` dice cuáles). Sin eso, el navegador bloquea Google Analytics.

Hoy no hace falta porque Vercel Analytics no usa cookies.

---

## 6. La marca "SALCHIMAX"

Registrar la marca protege el nombre. **Nadie lo ha revisado todavía.**

1. Entrar a la base de marcas de la SIC (sic.gov.co → Propiedad industrial) y buscar "SALCHIMAX" y variaciones ("SalchiMax", "Salchimaxx", "Salchi Max") en la clase 43 (restaurantes).
2. Si **otra persona ya la registró**, podría pedirles que dejen de usarla. Mejor saberlo ahora.
3. Si **nadie la tiene**, conviene registrarla (cuesta unos cientos de miles de pesos y dura 10 años). Un abogado de propiedad industrial lo hace en poco tiempo.

El logo es una marca aparte (mixta): si lo diseñó un tercero, que se lo cedan **por escrito**.

Las fotos de **Unsplash** que usa el sitio son gratuitas, pero lo ideal es reemplazarlas por fotos propias de los platos. Es mejor legalmente y vende más.

---

## 7. Lo que NO les aplica hoy (para que no se preocupen)

| Cosa | Por qué no aplica | Qué tan seguro estoy |
|---|---|---|
| Leyendas de alcohol ("el exceso de alcohol es perjudicial…") | El menú publicado no vende licor | Seguro. Si agregan cerveza, **sí** aplica |
| Banner de cookies | El sitio no usa cookies | Seguro |
| Sellos octagonales de advertencia (exceso en sodio, grasas…) | Son para **alimentos empacados**, no para comida preparada al momento | Probable, no lo pude confirmar en el texto oficial de la norma |
| Registro de bases de datos ante la SIC (RNBD) | Solo es obligatorio para empresas grandes (activos sobre 100.000 UVT) | Lo sé de memoria, confírmenlo con un contador |
| Derecho de retracto (devolver por arrepentimiento) | Hay excepción para alimentos perecederos y bienes de uso personal | Seguro (art. 47 Ley 1480). Aun así la garantía sí aplica |

---

## 8. Qué tan confiable es cada afirmación de esta guía

- **Verificado en el texto oficial de la ley** (Ley 1480 arts. 26, 33, 43, 47, 50, 51 y 58; Ley 2439 de 2024; Decreto 1377 arts. 7, 13, 14 y 15; Ley 2300 arts. 3 y 5): precios, promos, cláusulas abusivas, retracto, requisitos del comercio electrónico, PQR con radicado, enlace a la SIC, horarios de mensajes.
- **De mi conocimiento, sin abrir el texto en esta revisión:** los plazos de 10 y 15 días hábiles para datos (Ley 1581, arts. 14 y 15) y el umbral del RNBD.
- **Probable pero no confirmado:** que los sellos de advertencia no aplican a comida preparada.
- **En movimiento:** la Ley 2300 tiene una demanda ante la Corte Constitucional (no supe en qué va) y hay un proyecto para reformar la Ley 1581 que **no está aprobado**. Revisen de vez en cuando.

---

## 9. Lista de tareas (para imprimir o copiar)

**Urgente (esta semana)**
- [ ] Dar al desarrollador: nombre o razón social, NIT y correo del negocio
- [ ] Confirmar medios de pago aceptados
- [ ] Confirmar que "5.0 en Google" es verdad hoy
- [ ] Decidir qué hacer con "100% ingredientes frescos" y "Angus"
- [ ] Empezar a usar la plantilla de confirmación de pedido (4.1)
- [ ] Dejar de enviar promos a quien no las pidió, y no enviarlas domingos ni festivos

**Pronto (este mes)**
- [ ] Crear la hoja de Excel de PQR
- [ ] Definir las restricciones de cada promo
- [ ] Buscar "SALCHIMAX" en la base de marcas de la SIC
- [ ] Pedir permiso a 5 o 7 clientes reales para mostrar su reseña
- [ ] Hacer fotos propias de los platos

**Cuando haya presupuesto**
- [ ] Registrar la marca (nombre y logo)
- [ ] Que un abogado revise Términos y Política de Privacidad una vez

---

## 10. Glosario rápido

- **PQR:** Petición, Queja o Reclamo.
- **Radicado:** número único con fecha y hora que prueba que el reclamo se presentó.
- **SIC:** Superintendencia de Industria y Comercio, la autoridad que vigila consumidor, datos y marcas.
- **Retracto:** derecho a devolver una compra por internet sin dar razones. No aplica a comida preparada.
- **Cláusula abusiva:** frase de un contrato que quita derechos al cliente; la ley la anula aunque el cliente la haya "aceptado".
- **Habeas data:** derecho de cada persona a conocer, corregir y borrar sus datos.
- **Días hábiles:** de lunes a viernes, sin festivos. Un plazo de 15 días hábiles son unas tres semanas.

---

## 11. Dónde leer las leyes originales

- Ley 1480 de 2011 (Estatuto del Consumidor): https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=44306
- Ley 2439 de 2024 (comercio electrónico): https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=171718
- Decreto 1377 de 2013 (datos personales): https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=53646
- Ley 2300 de 2023 (mensajes y horarios): https://www.forvismazars.com/co/es/acerca-de-nosotros/noticias-publicaciones-y-media/nuestras-publicaciones/actualidad-juridica-y-tributaria/2024/conozca-la-ley-2300-de-2023
- Superintendencia de Industria y Comercio: https://www.sic.gov.co

# SALCHIMAX - Landing Page PRD

## Problema Original
Crear una landing page moderna, atractiva y optimizada para pedidos para el restaurante SALCHIMAX en Palmira, Valle del Cauca, Colombia. Objetivo: convertir visitantes en pedidos por WhatsApp o llamadas.

## Información del Negocio
- **Nombre:** SALCHIMAX Urban Food
- **Teléfono/WhatsApp:** 317 737 1695
- **Dirección:** Cra. 28 #19-20, Palmira, Valle del Cauca
- **Horario:** Desde las 5 PM
- **Instagram:** @salchi.maxx
- **Facebook:** https://www.facebook.com/profile.php?id=61571175376351
- **Rating:** 5.0 estrellas Google Maps

## Arquitectura
- **Frontend:** React + Tailwind CSS + Framer Motion
- **Backend:** FastAPI (no usado por landing page estática)
- **Fonts:** Bebas Neue (headings) + Manrope (body)
- **Colores:** #FF6600 (orange logo brand), #0D0D0D (dark bg), white text
- **Estilo:** Dark urban, mobile-first

## Lo Implementado

### Fecha: Marzo 2025
#### MVP Completo - Landing Page + Carrito de Compras

**Secciones de la landing page:**
1. **Navbar** - Fixed, con logo SALCHIMAX, navegación, ícono de carrito con badge, botón "Pedir Ahora"
2. **Hero** - Full screen, imagen de hamburguesa/papas, headline "LAS SALCHIPAPAS MÁS BRUTALES DE PALMIRA", CTA WhatsApp + Ver Menú, badge 5.0 estrellas
3. **Marquee Strip** - Barra naranja animada con palabras clave del negocio
4. **Menú** - 7 categorías con tabs: Salchipapas, Hamburguesas, Alitas, Nachos, Burros, Sándwich Cubano, Bebidas. Nota "Crea la tuya" para salchipapas. Botón "Agregar al Pedido" en cada producto.
5. **Por qué SALCHIMAX** - 5 features con íconos: Ingredientes frescos, Porciones épicas, Precios accesibles, Ambiente familiar, Pedidos rápidos. Stats: 5.0★, 100% frescos, 5PM
6. **Galería** - Bento grid con 6 fotos de comida
7. **Testimonios** - Dos marquees en sentidos opuestos con 7 reseñas
8. **Order CTA** - Sección full-width con glow naranja, botones WhatsApp y Llamar
9. **Ubicación** - Google Maps embed + tarjetas de información (dirección, horario, contacto)
10. **Footer** - Sección social media (Instagram + Facebook), links, info, SALCHIMAX en texto gigante

**Carrito de Compras:**
- CartContext con estado global (addItem, removeItem, updateQty, clearCart)
- Cart sidebar animado con framer-motion (slide desde la derecha)
- Badge en navbar con contador de items
- Controles de cantidad por producto (+/-)
- Total estimado de precios
- Botón "Enviar Pedido" que abre WhatsApp con mensaje pre-formateado con todos los items
- Estado vacío con CTA "Ver Menú"

**Funcionalidades técnicas:**
- SEO optimizado: meta tags, title, description, keywords en español
- Botón flotante de WhatsApp (verde pulsante)
- Animaciones con framer-motion (fade-in, slide-up, whileInView)
- Diseño mobile-first responsive
- Scroll suave entre secciones
- Scrollbar personalizado en orange
- data-testid en todos los elementos interactivos

## Menú Completo (con precios)
### Salchipapas
- La Clásica, Rancherita, De La Casa, Carnívora, La Colombiana, Callejera, Tex-Mex, La Picadita (precios a consultar)
### Hamburguesas
- Burger Clásica, Especial, Doble Burger ($23,000), La Argentina, Tex-Mex
### Alitas
- x6 ($25,000), x12 ($48,000), x24 ($90,000), x50 ($150,000)
### Nachos
- Toppings ($20,000), Colombianos ($32,000), Tex-Mex ($30,000)
### Burros
- El Burro ($18,000), El Gringo ($18,000), El Super Burro ($20,000)
### Sándwich Cubano
- Sencillo ($15,000), Hawaiano ($18,000), Especial ($18,000)
### Bebidas
- Gaseosa ($4,000), Jugo Hit ($4,000), Agua ($2,500), Cervezas desde $4,500

## Backlog / Mejoras Potenciales
### P0 - Completado
- [x] Landing page completa con todas las secciones
- [x] Carrito de compras funcional
- [x] Envío de pedido por WhatsApp

### P1 - Próximas mejoras
- [ ] Agregar precios exactos a las Hamburguesas (la mayoría dice "Consultar")
- [ ] Fotos reales del menú (actualmente usa stock de Unsplash)
- [ ] Sección de combos/promociones especiales
- [ ] Integración con sistema de domicilios

### P2 - Futuro
- [ ] Panel de administración para actualizar el menú
- [ ] Integración con Instagram feed en tiempo real
- [ ] Sistema de reservas/pre-pedidos
- [ ] Aplicación móvil

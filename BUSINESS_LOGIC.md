# BUSINESS_LOGIC.md - 48-Hour Website Builder Funnel

> Generado por SaaS Factory | Fecha: 2026-05-16

## 1. Problema de Negocio
**Dolor:** Los proyectos web tradicionales son lentos, costosos y excesivamente técnicos para los dueños de pequeñas empresas. Las agencias tradicionales imponen procesos pesados, reuniones eternas y formularios complicados.
**Costo actual:** Miles de dólares en presupuestos inflados, semanas/meses de espera para el lanzamiento y pérdida de oportunidades de negocio (leads) por no tener presencia digital rápida.

## 2. Solución
**Propuesta de valor:** Sitios web, tiendas online y aplicaciones ligeras construidos mediante un funnel guiado, con precios disruptivos (1/2 o 1/3 del precio de agencia) y entregados terminados en menos de 48 horas.

**Flujo principal (Happy Path):**
1. El usuario elige el tipo de proyecto en el Landing Page.
2. Completa un funnel interactivo guiado (sin fricción, basado en menús).
3. Recibe una recomendación de plan y resumen del proyecto.
4. Aprueba el plan, realiza el pago y la construcción inicia inmediatamente.
5. Entrega del producto final funcional en menos de 48 horas.

## 3. Usuario Objetivo
**Rol:** Dueños de pequeñas empresas, emprendedores, entrenadores personales, profesionales de salud, consultores y proveedores de servicios locales.
**Contexto:** Necesitan resultados rápidos, no quieren aprender tecnología y valoran la claridad en el precio y el alcance.

## 4. Arquitectura de Datos (Basada en Funnel)
**Input:**
- Tipo de proyecto (Landing, Ecommerce, Web App)
- Objetivos de negocio y KPIs
- Estilo visual seleccionado (Modern, Bold, Premium, Minimal)
- Disponibilidad de activos (Logo, Colores, Fotos, Contenido)
- Detalles específicos por rama (Secciones, Productos, Funcionalidades de App)

**Output:**
- Resumen estructurado del proyecto
- Recomendación automática de plan (Starter, Store, Platform)
- Dashboard de administración de leads (para la agencia)

**Storage (Supabase tables sugeridas):**
- `projects`: Almacena las respuestas del funnel y estado del pedido.
- `leads`: Captura la información de contacto final.
- `analytics`: Tracking de pasos del funnel para optimizar conversión.

## 5. KPI de Éxito
**Métrica principal:** Reducir el tiempo de "Idea a Lanzamiento" de semanas a menos de 48 horas con una conversión de funnel superior al 20%.

## 6. Especificación Técnica (Neobrutalist Style)

### Features a Implementar (Feature-First)
```
src/features/
├── landing/        # Hero, Problema, Promesa, FAQ (Neobrutalist components)
├── funnel/         # Componente central interactivo con lógica de ramificación
├── plans/          # Pricing cards y lógica de recomendación
└── dashboard/      # Vista previa del resumen del proyecto para el usuario
```

### Stack Confirmado
- **Frontend:** Next.js 15 (Golden Path) + React 19 + TypeScript + Tailwind 3.4
- **Diseño:** Neobrutalism (Shadows duras, bordes negros, Space Grotesk)
- **Backend:** Supabase (Auth + Database)
- **Vercel:** Adaptado para despliegue continuo

### Próximos Pasos
1. [ ] Configurar Tailwind Theme con tokens Neobrutalistas
2. [ ] Implementar Landing Page (Hero y Secciones de confianza)
3. [ ] Construir el Funnel Interactivo (Lógica de estados y pasos)
4. [ ] Integrar Supabase para captura de leads
5. [ ] Optimización móvil y Deploy en Vercel
```

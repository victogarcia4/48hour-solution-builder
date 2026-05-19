// Bilingual question/answer map ported from presale_funnel_bilingual.html
// Branch: feature/funnel-segmentation — DO NOT merge to main without review

export type Lang = 'en' | 'es';

export interface PresaleI18n {
  // Nav
  step: string; step1: string; step2: string; step3: string; step4: string;
  continue: string; back: string; seeRec: string; restart: string; resultTag: string;
  // Step 0 — Project type
  tag0: string; q0: string;
  o0_0: string; o0_1: string; o0_2: string; o0_3: string;
  // Step 1 — Goal
  tag1: string; q1: string;
  o1_0: string; o1_1: string; o1_2: string; o1_3: string; o1_4: string;
  // Step 2 — Complexity
  tag2: string; q2: string; hint2: string;
  o2_0: string; o2_1: string; o2_2: string; o2_3: string;
  // Step 3 — Materials (multi)
  tag3: string; q3: string; multi3: string;
  o3_0: string; o3_1: string; o3_2: string; o3_3: string; o3_4: string;
  // Step 4 — Urgency
  tag4: string; q4: string;
  o4_0: string; o4_1: string; o4_2: string; o4_3: string;
  // Results
  rCall_badge: string; rCall_title: string; rCall_why: string; rCall_cta: string;
  rMsg_badge: string;  rMsg_title: string;  rMsg_why: string;  rMsg_cta: string;
  rDirect_badge: string; rDirect_title: string; rDirect_why: string; rDirect_cta: string;
  // Summary pills
  tiers: Record<number, string>;
  customScope: string; aiIncluded: string; delivery48: string;
  assetHas: string; assetNone: string;
  assetMap: Record<string, string>;
  scaleMap: Record<string, string>;
  timeMap:  Record<string, string>;
  typeMap:  Record<string, string>;
}

export const i18n: Record<Lang, PresaleI18n> = {
  en: {
    step:'Step 1 of 5', step1:'Step 2 of 5', step2:'Step 3 of 5', step3:'Step 4 of 5', step4:'Step 5 of 5',
    continue:'Continue', back:'Back', seeRec:'See my recommendation', restart:'Start over', resultTag:'Your recommendation',
    tag0:'Project type', q0:'What do you need to build?',
    o0_0:'A page to capture leads or showcase my business',
    o0_1:'A store to sell products or services online',
    o0_2:'A platform, CRM, portal, or management tool',
    o0_3:"I'm not sure — I need guidance",
    tag1:'Main goal', q1:'What is the most important outcome for you?',
    o1_0:'Get more clients / capture leads',
    o1_1:'Sell and collect payments from the website',
    o1_2:'Organize clients, data, or internal processes',
    o1_3:'Have a professional online presence',
    o1_4:'Validate an idea or launch something fast',
    tag2:'Complexity', q2:'How many products, services, or users do you handle?',
    hint2:'This helps us estimate whether your project fits the 48-hour delivery.',
    o2_0:'Small (1–10 products, services, or records)',
    o2_1:'Medium (11–50 items, a small team)',
    o2_2:'Large (50+ products, multiple user roles)',
    o2_3:"I don't know yet",
    tag3:'Available materials', q3:'What do you have ready today?',
    multi3:'You can select multiple options.',
    o3_0:'Logo or brand identity',
    o3_1:'Written text or content',
    o3_2:'Own photos or images',
    o3_3:'Domain already purchased',
    o3_4:'Starting from scratch — I have nothing ready',
    tag4:'Urgency', q4:'When do you want your solution live?',
    o4_0:'In less than 48 hours — I need it now',
    o4_1:'This week',
    o4_2:'This month, no rush',
    o4_3:"I'm just exploring options",
    rCall_badge:'Call with the team',
    rCall_title:'Your project needs a conversation',
    rCall_why:"We detected a level of complexity or uncertainty that a form can't resolve well. A 15-minute call lets us understand the real scope and give you an exact plan — no commitment required.",
    rCall_cta:'Schedule a quick call',
    rMsg_badge:'Send a message',
    rMsg_title:"Send us details and we'll reply",
    rMsg_why:"Your project fits our plans well, but a few details need confirmation before we start. Send us a message with your idea and the team will reply within 24 hours with a clear proposal.",
    rMsg_cta:'Send message and wait for proposal',
    rDirect_badge:'You can start now',
    rDirect_title:'Your project is ready for the funnel',
    rDirect_why:"Your case is clear and fits within the standard scope. Complete the guided funnel now and receive your final plan — with pricing, content, and delivery date — in minutes.",
    rDirect_cta:'Start my project now',
    tiers: { 1:'Landing Page — $300', 2:'Online Store — $600', 3:'Business Platform — $1,000+', 0:'To be defined' },
    customScope:'Custom scope', aiIncluded:'AI copy + images included', delivery48:'Delivery < 48h',
    assetHas:'You have:', assetNone:'No materials ready',
    assetMap: { logo:'logo', copy:'written copy', photos:'photos', domain:'domain' },
    scaleMap: { small:'Small scale', medium:'Medium scale', large:'Large scale', unknown:'Scale undefined' },
    timeMap:  { now:'Immediate delivery', week:'This week', month:'This month', exploring:'Exploring' },
    typeMap:  { landing:'Landing Page', store:'Online Store', app:'Web App / Platform', unsure:'Type undefined' },
  },
  es: {
    step:'Paso 1 de 5', step1:'Paso 2 de 5', step2:'Paso 3 de 5', step3:'Paso 4 de 5', step4:'Paso 5 de 5',
    continue:'Continuar', back:'Atrás', seeRec:'Ver mi recomendación', restart:'Empezar de nuevo', resultTag:'Tu recomendación',
    tag0:'Tipo de proyecto', q0:'¿Qué necesitas construir?',
    o0_0:'Una página para capturar contactos o mostrar mi negocio',
    o0_1:'Una tienda para vender productos o servicios online',
    o0_2:'Una plataforma, CRM, portal o herramienta de gestión',
    o0_3:'No estoy seguro — necesito orientación',
    tag1:'Objetivo principal', q1:'¿Cuál es el resultado más importante para ti?',
    o1_0:'Conseguir más clientes / capturar contactos',
    o1_1:'Vender y cobrar desde el sitio web',
    o1_2:'Organizar clientes, datos o procesos internos',
    o1_3:'Tener una presencia profesional online',
    o1_4:'Validar una idea o lanzar algo rápido',
    tag2:'Complejidad', q2:'¿Cuántos productos, servicios o usuarios manejas?',
    hint2:'Esto nos ayuda a calcular si tu proyecto entra en la entrega de 48 horas.',
    o2_0:'Pocos (1–10 productos, servicios o registros)',
    o2_1:'Mediano (11–50 elementos, un equipo pequeño)',
    o2_2:'Grande (+50 productos, múltiples roles de usuario)',
    o2_3:'No lo sé todavía',
    tag3:'Materiales disponibles', q3:'¿Qué tienes listo hoy?',
    multi3:'Puedes seleccionar varias opciones.',
    o3_0:'Logo o identidad de marca',
    o3_1:'Textos o contenido escrito',
    o3_2:'Fotos o imágenes propias',
    o3_3:'Dominio web ya comprado',
    o3_4:'Empiezo desde cero — no tengo nada',
    tag4:'Urgencia', q4:'¿Cuándo quieres tener tu solución funcionando?',
    o4_0:'En menos de 48 horas — lo necesito ya',
    o4_1:'Esta semana',
    o4_2:'Este mes, sin prisa',
    o4_3:'Solo estoy explorando opciones',
    rCall_badge:'Llamada con el equipo',
    rCall_title:'Tu proyecto necesita una conversación',
    rCall_why:'Detectamos que tu proyecto tiene un nivel de complejidad o incertidumbre que no se resuelve bien con un formulario. Una llamada de 15 minutos nos permite entender el alcance real y darte un plan exacto sin comprometerte a nada.',
    rCall_cta:'Agendar llamada rápida',
    rMsg_badge:'Envía un mensaje',
    rMsg_title:'Envíanos los detalles y te respondemos',
    rMsg_why:'Tu proyecto encaja bien con nuestros planes, pero hay algunos detalles que conviene confirmar antes de empezar. Envíanos un mensaje y el equipo te responde en menos de 24 horas con una propuesta clara.',
    rMsg_cta:'Enviar mensaje y esperar propuesta',
    rDirect_badge:'Puedes empezar ahora',
    rDirect_title:'Tu proyecto está listo para el funnel',
    rDirect_why:'Tu caso es claro y entra dentro del alcance estándar. Completa el funnel guiado ahora mismo y recibe tu plan final con precio, contenido y fecha de entrega en minutos.',
    rDirect_cta:'Iniciar mi proyecto ahora',
    tiers: { 1:'Landing Page — $300', 2:'Online Store — $600', 3:'Business Platform — $1,000+', 0:'Por definir' },
    customScope:'Scope personalizado', aiIncluded:'Incluimos copy AI + imágenes', delivery48:'Entrega < 48h',
    assetHas:'Tienes:', assetNone:'Sin materiales listos',
    assetMap: { logo:'logo', copy:'textos', photos:'fotos', domain:'dominio' },
    scaleMap: { small:'Escala pequeña', medium:'Escala media', large:'Escala grande', unknown:'Escala sin definir' },
    timeMap:  { now:'Entrega inmediata', week:'Esta semana', month:'Este mes', exploring:'Explorando' },
    typeMap:  { landing:'Landing Page', store:'Online Store', app:'Web App / Plataforma', unsure:'Tipo por definir' },
  },
};

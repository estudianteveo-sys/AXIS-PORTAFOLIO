/* ============================================
   AXIS STUDIO — Main JavaScript Module
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initModals();
  initSmoothScroll();
  initRevealAnimations();
  initLazyYouTube();
  initHeaderScroll();
  initLanguageToggle();
});

/* === HAMBURGER MENU === */
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = navOverlay?.querySelectorAll('.nav-overlay__link');

  if (!hamburger || !navOverlay) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    navOverlay.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
      hamburger.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* === MODALS === */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    // Accessibility: Focus first interactive element or close button
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

function initModals() {
  // Close on backdrop click (optional but good UX)
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        closeModal(activeModal.id);
      }
    }
  });
}

/* === SMOOTH SCROLL === */
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 64;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* === REVEAL ON SCROLL (Intersection Observer) === */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* === LAZY VIDEO LOADING (YouTube & Instagram) === */
function initLazyYouTube() {
  console.log('Video loader initialized');
  
  document.addEventListener('click', (e) => {
    const placeholder = e.target.closest('.project-card__video-placeholder');
    if (!placeholder) return;

    console.log('Video placeholder clicked:', placeholder.dataset.videoId);
    
    const container = placeholder.closest('.project-card__video');
    const videoId = placeholder.dataset.videoId;
    const videoType = placeholder.dataset.videoType || 'youtube';
    
    if (!videoId || !container) {
      console.error('Missing Video ID or Container');
      return;
    }

    const iframe = document.createElement('iframe');

    if (videoType === 'instagram') {
      iframe.src = `https://www.instagram.com/reel/${videoId}/embed/`;
    } else {
      // Use nocookie domain for better compatibility and privacy
      // Added vq=hd720 & controls=1 & mute=0 per user request
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&mute=0&vq=hd720&controls=1`;
    }
    
    iframe.title = videoType === 'instagram' ? 'Instagram reel' : 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

    // Smooth transition
    container.style.background = '#000';
    container.innerHTML = '';
    container.appendChild(iframe);
    
    console.log('Iframe injected:', iframe.src);
  });
}

/* === HEADER SCROLL EFFECT === */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
          header.style.borderBottomColor = 'rgba(197, 160, 89, 0.2)';
          header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
          header.style.borderBottomColor = 'rgba(197, 160, 89, 0.1)';
          header.style.background = 'rgba(0, 0, 0, 0.85)';
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* === BILINGUAL TRANSLATION SYSTEM === */
const translations = {
  es: {
    // Navigation
    'nav.projects': 'Proyectos',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',

    // Hero
    'hero.eyebrow': 'ESTUDIO CREATIVO CON IA',
    'hero.subtitle': 'Especialistas en storytelling visual y producción multimedia de vanguardia impulsados por Inteligencia Artificial.',
    'hero.cta': 'VER PROYECTOS',

    // Section Titles
    'section.projects': 'Nuestros Proyectos',

    // Category Headers
    'cat.storytelling': 'STORYTELLING',
    'cat.storytelling.sub': 'Narrativa visual y realismo mágico',
    'cat.music': 'VIDEOS MUSICALES',
    'cat.music.sub': 'Producción audiovisual con IA',
    'cat.influencers': 'INFLUENCERS DIGITALES',
    'cat.influencers.sub': 'Avatares virtuales y contenido de marca',
    'cat.ads': 'ADS & PROMOS',
    'cat.ads.sub': 'Campañas comerciales de alto impacto',
    'cat.kids': 'KIDS CONTENT',
    'cat.kids.sub': 'Animación y contenido infantil con IA',

    // Shared Labels & Buttons
    'label.brief': 'BRIEF:',
    'btn.tech': 'DETALLES TÉCNICOS',
    'btn.costs': 'COMPARATIVA Y COSTOS',
    'btn.quote': 'COTIZAR PROYECTO SIMILAR',
    'btn.request': 'SOLICITAR COTIZACIÓN',
    'modal.tech.title': 'DETALLES TÉCNICOS',
    'modal.costs.title': 'COMPARATIVA Y COSTOS',

    // Project Numbers
    'p1.number': 'PROYECTO 01', 'p2.number': 'PROYECTO 02', 'p3.number': 'PROYECTO 03',
    'p4.number': 'PROYECTO 04', 'p5.number': 'PROYECTO 05', 'p6.number': 'PROYECTO 06',
    'p7.number': 'PROYECTO 07', 'p8.number': 'PROYECTO 08', 'p9.number': 'PROYECTO 09',
    'p10.number': 'PROYECTO 10', 'p11.number': 'PROYECTO 11', 'p12.number': 'PROYECTO 12',
    'p13.number': 'PROYECTO 13', 'p14.number': 'PROYECTO 14', 'p15.number': 'PROYECTO 15',
    'p16.number': 'PROYECTO 16', 'p17.number': 'PROYECTO 17',

    // Project 1 (Chico Ave)
    'p1.title': 'CHICO AVE — Storytelling Cinematográfico',
    'p1.brief': 'Producción completa de video basada en Realismo Mágico como motor creativo. Ingeniería visual donde el control humano dicta el resultado final, permitiendo que una idea fantástica se sienta real y profesional.',
    'p1.tech.intro': 'Este proyecto requirió 17 horas de trabajo especializado combinando dirección creativa tradicional con herramientas avanzadas de IA generativa para garantizar coherencia visual.',
    'p1.tech.step1.title': 'Conceptualización y Storyboarding',
    'p1.tech.step1.desc': 'Definición del tono de realismo mágico y diseño del viaje visual del personaje mediante prompts refinados.',
    'p1.tech.step2.title': 'Diseño de Personaje y "Digital Twin"',
    'p1.tech.step2.desc': 'Creación del protagonista ("chico ave") manteniendo consistencia física en múltiples ángulos y tomas.',
    'p1.tech.step3.title': 'Continuidad de Entorno',
    'p1.tech.step3.desc': 'Generación de escenarios consistentes con iluminación volumétrica y textura cinematográfica.',
    'p1.tech.step4.title': 'Post-producción y Diseño Sonoro',
    'p1.tech.step4.desc': 'Montaje rítmico, corrección de color profesional y una banda sonora inmersiva que potencia la emoción.',
    'p1.costs.intro': 'Comparativa de costos estimados para una producción cinematográfica de realismo mágico de 1 minuto:',
    'p1.costs.stat.value': '70%',
    'p1.costs.stat.label': 'Reducción en costos de locación y diseño de producción físicos.',

    // Project 2 (Chernobíl)
    'p2.title': 'CHERNÓBIL 1986 — Viaje en el Tiempo',
    'p2.brief': 'Recreación cinematográfica del desastre nuclear de Chernóbil con precisión histórica. Estructuras escenográficas industriales, simulaciones atmosféricas de humo y partículas, y lógica multi-actor de IA para un thriller de viaje en el tiempo.',
    'p2.tech.intro': 'Desarrollo de un entorno histórico detallado mediante modelado de IA y simulación de efectos volumétricos para recrear la atmósfera de la Ucrania soviética de 1986.',
    'p2.tech.step1.title': 'Investigación Histórica y Set Design',
    'p2.tech.step1.desc': 'Curaduría de referencias visuales de la central de Chernóbil y recreación de arquitectura industrial de la época.',
    'p2.tech.step2.title': 'Simulaciones de Fluidos y Humo',
    'p2.tech.step2.desc': 'Fusión de efectos de humo denso y partículas radioactivas generadas mediante algoritmos visuales avanzados.',
    'p2.tech.step3.title': 'Lógica Multi-Actor',
    'p2.tech.step3.desc': 'Dirección visual y consistencia de múltiples personajes dentro de la misma escena y secuencia temporal.',
    'p2.tech.step4.title': 'Atmósfera y Color Grading',
    'p2.tech.step4.desc': 'Etalonaje de color en tonos fríos y desaturados característicos del cine de drama histórico setentero/ochentero.',
    'p2.costs.intro': 'Comparativa de costos para recreación de entornos de época complejos:',
    'p2.costs.stat.value': '85%',
    'p2.costs.stat.label': 'Ahorro en construcción de sets físicos y renta de locaciones industriales reales.',

    // Project 3 (Retro Británico)
    'p3.title': 'RETRO BRITÁNICO 70\'s — Narrativa de Época',
    'p3.brief': 'Narrativa histórica inmersiva que captura la textura y atmósfera de una tienda de barrio británica de los años 70. Consistencia excepcional en diseño de escenarios de época, generación de objetos y suspense narrativo.',
    'p3.tech.intro': 'Estudio exhaustivo del diseño de interiores, tipografías y texturas de empaques comerciales británicos de 1975 para lograr una inmersión completa.',
    'p3.tech.step1.title': 'Diseño de Utilería y Objetos 70s',
    'p3.tech.step1.desc': 'Generación consistente de productos comerciales, cajas registradoras y empaques con textura vintage.',
    'p3.tech.step2.title': 'Consistencia de Personaje',
    'p3.tech.step2.desc': 'Control detallado de rasgos y vestuario de época en planos cerrados y de seguimiento.',
    'p3.tech.step3.title': 'Iluminación y Textura Analógica',
    'p3.tech.step3.desc': 'Simulación de grano de película de 35mm e iluminación cálida de interiores comerciales vintage.',
    'p3.tech.step4.title': 'Edición de Ritmo Lento',
    'p3.tech.step4.desc': 'Estructuración de montaje pausado diseñado para sostener el suspense del drama.',
    'p3.costs.intro': 'Comparativa de costos para producción de drama de época en interiores detallados:',
    'p3.costs.stat.value': '75%',
    'p3.costs.stat.label': 'Ahorro en utilería vintage genuina y diseño de arte de época.',

    // Project 4 (Sonido Popular)
    'p4.title': 'SONIDO POPULAR — Visuales Generativos',
    'p4.brief': 'Visuales generativos que bailan al ritmo de la música. Un viaje psicodélico y técnico donde el sonido esculpe la imagen en tiempo real mediante algoritmos de IA audioreactivos.',
    'p4.tech.intro': 'Arquitectura reactiva que extrae datos de frecuencias sonoras de la pista para modular dinámicamente los parámetros de generación visual de la IA.',
    'p4.tech.step1.title': 'Análisis de Espectro y BPM',
    'p4.tech.step1.desc': 'Extracción de frecuencias de graves, medios y agudos para mapearlos a variables de movimiento e intensidad.',
    'p4.tech.step2.title': 'Diseño de Prompt Generativo',
    'p4.tech.step2.desc': 'Creación de fórmulas estéticas y paletas de color psicodélicas optimizadas para mutación continua.',
    'p4.tech.step3.title': 'Interpolación de Movimiento AI',
    'p4.tech.step3.desc': 'Generación de transiciones de cuadros fluidas y sincronizadas al tempo (BPM) de la canción.',
    'p4.tech.step4.title': 'Color Grade Dinámico',
    'p4.tech.step4.desc': 'Ajustes automáticos de contraste y saturación vinculados a la energía de la música.',
    'p4.costs.intro': 'Comparativa de costos para creación de visualizadores musicales dinámicos de 3 minutos:',
    'p4.costs.stat.value': '80%',
    'p4.costs.stat.label': 'Reducción en tiempo de post-producción y renders pesados 3D tradicionales.',

    // Project 5 (Alisse)
    'p5.title': 'ALISSE — Beat Drop Baby',
    'p5.brief': 'Producción musical audioreactiva con estética retrofuturista de neón. Fusión de mundos sintéticos con performance fluida de personajes para elevar el lanzamiento visual de tracks electrónicos contemporáneos.',
    'p5.tech.intro': 'Integración de animaciones de personajes sincronizadas con una cuadrícula tridimensional luminiscente impulsada por señales de audio.',
    'p5.tech.step1.title': 'Worldbuilding Retrofuturista',
    'p5.tech.step1.desc': 'Diseño de entornos de rejilla de neón y arquitectura sintética vibrante de alta fidelidad.',
    'p5.tech.step2.title': 'Análisis de Frecuencias del Beat',
    'p5.tech.step2.desc': 'Mapeo de la percusión para controlar los destellos y la deformación geométrica del entorno.',
    'p5.tech.step3.title': 'Performance de Personaje Fluido',
    'p5.tech.step3.desc': 'Renderizado de baile sincronizado con consistencia en texturas reflectivas bajo luces de neón.',
    'p5.tech.step4.title': 'Renderizado Híbrido Realtime',
    'p5.tech.step4.desc': 'Combinación de motores de render en tiempo real con optimización de IA para tomas de alta velocidad.',
    'p5.costs.intro': 'Comparativa de costos para video musical electrónico con efectos especiales de neón:',
    'p5.costs.stat.value': '90%',
    'p5.costs.stat.label': 'Ahorro frente a producciones con pantallas LED gigantes (virtual production) o post-producción VFX.',

    // Project 6 (Las Flamingo)
    'p6.title': 'LAS FLAMINGO — Performance Retro 60\'s',
    'p6.brief': 'Performance musical vibrante que captura la esencia nostálgica de una banda femenina de los años 60. Consistencia estilística impecable, coreografía fluida y diseño de vestuario retro generado con IA de alta fidelidad.',
    'p6.tech.intro': 'Uso de flujos de control de poses y vestuario histórico para recrear la estética de la televisión de los sesentas con fidelidad moderna.',
    'p6.tech.step1.title': 'Estilización de Época Sesentera',
    'p6.tech.step1.desc': 'Modelado estético basado en grabaciones clásicas, peinados altos y maquillaje de la época.',
    'p6.tech.step2.title': 'Control de Coreografía Híbrido',
    'p6.tech.step2.desc': 'Mapeo de poses humanas para mantener la sincronización y el ritmo de baile en el ensamble.',
    'p6.tech.step3.title': 'Fidelidad de Telas y Vestuario',
    'p6.tech.step3.desc': 'Simulación física de brillo y movimiento de telas retro bajo reflectores de estudio.',
    'p6.tech.step4.title': 'Emulación de Lente Analógico',
    'p6.tech.step4.desc': 'Ajuste de destellos cromáticos y profundidad de campo típicos de las cámaras de televisión antiguas.',
    'p6.costs.intro': 'Comparativa de costos para video musical de performance con múltiples actrices y vestuario:',
    'p6.costs.stat.value': '70%',
    'p6.costs.stat.label': 'Ahorro en diseño, renta y confección de vestuario de época, así como casting de talentos.',

    // Project 7 (Ice Fucking Ice)
    'p7.title': 'ICE F**KING ICE — Narrativa Urbana',
    'p7.brief': 'Clip de narrativa social poderosa que combina efectos visuales estilo documental con sincronización musical dinámica. Estética urbana callejera y protesta subcultural con generación de IA de alto impacto.',
    'p7.tech.intro': 'Proceso de generación visual ágil estructurado para tomas en exteriores urbanos con estilo de cámara en mano y texturizado grunge.',
    'p7.tech.step1.title': 'Dirección de Arte de Estilo Callejero',
    'p7.tech.step1.desc': 'Desarrollo de una paleta urbana fría con grafitis, texturas de concreto y vestuario streetwear de alta definición.',
    'p7.tech.step2.title': 'Simulación de Movimiento de Cámara',
    'p7.tech.step2.desc': 'Inyección de micro-vibraciones y barridos de lente para emular tomas reales de camarógrafo.',
    'p7.tech.step3.title': 'VFX de Realismo Sucio',
    'p7.tech.step3.desc': 'Fusión de grano analógico y destellos de luz para potenciar el carácter de documental social.',
    'p7.tech.step4.title': 'Montaje Rítmico Dinámico',
    'p7.tech.step4.desc': 'Sincronización milimétrica de cortes de escena al ritmo del bajo y caja de la batería.',
    'p7.costs.intro': 'Comparativa de costos para rodaje de video musical en locaciones urbanas exteriores:',
    'p7.costs.stat.value': '65%',
    'p7.costs.stat.label': 'Ahorro al evitar permisos de filmación municipal en calles públicas y renta de equipo móvil de crew.',

    // Project 8 (Avatar Digital Ropa)
    'p8.title': 'Avatar Digital para Marcas de Ropa',
    'p8.brief': 'Creamos avatares digitales que personifican la marca y promocionan productos con realismo total, eliminando las barreras de logística, contratación de modelos y sesiones fotográficas tradicionales.',
    'p8.tech.intro': 'Ingeniería de tejidos digitalizada y transferencia de movimiento para exhibición dinámica de colecciones de moda sin muestras físicas.',
    'p8.tech.step1.title': 'Estrategia de Avatar de Marca',
    'p8.tech.step1.desc': 'Modelado y refinamiento de rasgos del modelo digital de acuerdo a la identidad de la marca.',
    'p8.tech.step2.title': 'Fidelidad de Producto (Tejidos)',
    'p8.tech.step2.desc': 'Simulación física de la textura, caída y comportamiento de las telas bajo diferentes condiciones de luz.',
    'p8.tech.step3.title': 'Performance y Movimiento',
    'p8.tech.step3.desc': 'Integración de movimientos fluidos de pasarela y poses comerciales de alta naturalidad.',
    'p8.costs.intro': 'Comparativa de costos para desarrollo de campaña de catálogo de moda (3 looks en movimiento):',
    'p8.costs.stat.value': '100%',
    'p8.costs.stat.label': 'Propiedad intelectual absoluta de los avatares para campañas infinitas sin costo de regalías.',

    // Project 9 (Avatar Reseña Productos)
    'p9.title': 'Influencer Digital para Reseñas de Productos',
    'p9.brief': 'Activo corporativo de alto impacto con avatares virtuales personalizados. Expresiones dinámicas matizadas y diseño digital limpio para comunicación de marca fluida en plataformas de streaming.',
    'p9.tech.intro': 'Generación de presentadores virtuales enfocados en análisis de producto con capacidades de gesticulación avanzada para generar empatía.',
    'p9.tech.step1.title': 'Desarrollo de Rostro Expresivo',
    'p9.tech.step1.desc': 'Mapeo detallado de micro-expresiones, parpadeo e interactividad ocular del avatar.',
    'p9.tech.step2.title': 'Sincronización de Labios por Voz',
    'p9.tech.step2.desc': 'Uso de redes neuronales para ajustar la posición labial y bucal en base a cualquier pista de voz (multilenguaje).',
    'p9.tech.step3.title': 'Integración de Escenario y Producto',
    'p9.tech.step3.desc': 'Composición de capas del avatar interactuando de forma realista con el empaque del producto.',
    'p9.costs.intro': 'Comparativa de costos para producción de videos de reviews constantes de producto:',
    'p9.costs.stat.value': '80%',
    'p9.costs.stat.label': 'Ahorro recurrente en honorarios de presentadores, locutores y horas de estudio de grabación.',

    // Project 10 (Avatar Reseña Apps)
    'p10.title': 'Influencer Digital para Reseñas de Aplicaciones',
    'p10.brief': 'Concepto comercial de alto impacto para aplicaciones digitales. Tecnología avanzada de prueba virtual, transiciones rápidas de estilo y consistencia visual diseñada para conversión orgánica en redes sociales.',
    'p10.tech.intro': 'Producción de contenido dinámico para apps móviles integrando captura de pantalla de interfaz real con la performance de un embajador virtual.',
    'p10.tech.step1.title': 'Embajador Virtual Social-First',
    'p10.tech.step1.desc': 'Diseño de un avatar carismático adaptado a formatos de consumo rápido para TikTok/Reels.',
    'p10.tech.step2.title': 'Composición de Interfaz de App',
    'p10.tech.step2.desc': 'Fusión interactiva de tomas de pantalla del software flotando de forma integrada junto al personaje.',
    'p10.tech.step3.title': 'Sincronía de Labios y Acting Natural',
    'p10.tech.step3.desc': 'Modulación de voz en off con los gestos faciales del modelo para simular una recomendación nativa.',
    'p10.costs.intro': 'Comparativa de costos para desarrollo de videos promocionales continuos de software/apps:',
    'p10.costs.stat.value': '75%',
    'p10.costs.stat.label': 'Ahorro al evitar la contratación de creadores de contenido UGC externos y re-filmación por cambios de interfaz.',

    // Project 11 (Spinn Radio)
    'p11.title': 'SPINN RADIO — Contenido Viral Nativo',
    'p11.brief': 'Contenido diseñado para la viralidad en formatos nativos verticales. Estética trendy y montaje rítmico que conecta con las audiencias digitales actuales en tiempo récord.',
    'p11.tech.intro': 'Optimización de flujo para entrega ultra rápida de videos optimizados para algoritmos de retención (TikTok, Instagram Reels, YouTube Shorts).',
    'p11.tech.step1.title': 'Análisis de Retención (Hooks)',
    'p11.tech.step1.desc': 'Diseño de los primeros 3 segundos con estímulos visuales fuertes para retener al espectador.',
    'p11.tech.step2.title': 'Generación Ágil de Assets',
    'p11.tech.step2.desc': 'Procesamiento rápido de imágenes y secuencias estilizadas de acuerdo a tendencias musicales.',
    'p11.tech.step3.title': 'Edición Dinámica y Subtítulos',
    'p11.tech.step3.desc': 'Subtítulos animados automáticos y efectos de sonido rápidos que sostienen el ritmo.',
    'p11.tech.step4.title': 'Optimización de Compresión',
    'p11.tech.step4.desc': 'Exportación optimizada para garantizar la máxima nitidez posible dentro de la compresión de redes sociales.',
    'p11.costs.intro': 'Comparativa de costos para un lote mensual de 10 videos cortos de contenido viral:',
    'p11.costs.stat.value': '60%',
    'p11.costs.stat.label': 'Más engagement orgánico a una fracción del costo de agencias tradicionales de social media.',

    // Project 12 (Metro Pulse)
    'p12.title': 'METRO PULSE — Branding Metropolitano',
    'p12.brief': 'Concepto de branding metropolitano que combina interacción fluida de personajes, texturización de transporte moderno e integración de interfaz de aplicación móvil para promociones de alto impacto.',
    'p12.tech.intro': 'Uso de flujos estables para combinar entornos urbanos realistas en movimiento con elementos gráficos digitales flotantes de branding corporativo.',
    'p12.tech.step1.title': 'Modelado de Entorno Metropolitano',
    'p12.tech.step1.desc': 'Creación de interiores de trenes urbanos realistas con reflejos e iluminación natural de tránsito.',
    'p12.tech.step2.title': 'Integración de Gráficos UI/UX',
    'p12.tech.step2.desc': 'Superposición de interfaces de aplicaciones móviles simulando uso interactivo en tiempo real.',
    'p12.tech.step3.title': 'Consistencia Lumínica en Movimiento',
    'p12.tech.step3.desc': 'Ajuste de destellos y sombras en el personaje coherentes con el paso del tren por túneles y estaciones.',
    'p12.costs.intro': 'Comparativa de costos para comercial con locación en sistemas de transporte públicos:',
    'p12.costs.stat.value': '80%',
    'p12.costs.stat.label': 'Ahorro al evitar rentar vagones reales, permisos gubernamentales de tránsito y crew de iluminación móvil.',

    // Project 13 (Promo ONU)
    'p13.title': 'PROMO ONU — Comunicación Institucional',
    'p13.brief': 'Mensajes de impacto social elevado mediante narrativa cinematográfica. Transformamos la comunicación institucional en una experiencia audiovisual poderosa que genera confianza.',
    'p13.tech.intro': 'Estética sobria y pulida combinando voceros virtuales serios con infografías y material de stock histórico generado con alta fidelidad.',
    'p13.tech.step1.title': 'Curaduría de Guion Institucional',
    'p13.tech.step1.desc': 'Adaptación de datos crudos a una estructura de discurso empático y riguroso.',
    'p13.tech.step2.title': 'Estética \'Clean & Premium\'',
    'p13.tech.step2.desc': 'Composición de planos simétricos con paletas de color sobrias y corporativas.',
    'p13.tech.step3.title': 'Post-producción de Impacto',
    'p13.tech.step3.desc': 'Integración sutil de elementos de texto cinemático y transiciones elegantes.',
    'p13.tech.step4.title': 'Masterización de Audio Vocal',
    'p13.tech.step4.desc': 'Locución pulida con ecualización de alta claridad y música incidental corporativa.',
    'p13.costs.intro': 'Comparativa de costos para video corporativo institucional de 2 minutos:',
    'p13.costs.stat.value': '70%',
    'p13.costs.stat.label': 'Reducción en viáticos, traslados de personal y costos de producción en locación.',

    // Project 14 (Con el Corazón)
    'p14.title': 'CON EL CORAZÓN — Storytelling Emocional',
    'p14.brief': 'Humanizando la tecnología mediante la emoción. Una pieza cinemática que conecta con la esencia humana utilizando herramientas de IA para potenciar la narrativa orgánica.',
    'p14.tech.intro': 'Uso de modelos de simulación emocional y micro-gestos en personajes digitales para transmitir empatía y calidez en tomas íntimas.',
    'p14.tech.step1.title': 'Diseño de Narrativa Emocional',
    'p14.tech.step1.desc': 'Estructura de guion basada en arquetipos narrativos universales que mueven sentimientos.',
    'p14.tech.step2.title': 'Digital Twins Empáticos',
    'p14.tech.step2.desc': 'Diseño de personajes con expresiones oculares y faciales naturales en primer plano.',
    'p14.tech.step3.title': 'Iluminación Orgánica AI',
    'p14.tech.step3.desc': 'Simulación de luz de sol natural de atardecer para aportar calidez visual al encuadre.',
    'p14.tech.step4.title': 'Diseño Sonoro del Corazón',
    'p14.tech.step4.desc': 'Fusión de latidos rítmicos grabados con arreglos de cuerdas acústicas de fondo.',
    'p14.costs.intro': 'Comparativa de costos para cortometraje promocional emocional de 1.5 minutos:',
    'p14.costs.stat.value': '100%',
    'p14.costs.stat.label': 'Propiedad total de los avatares para uso ilimitado en campañas futuras sin costo de regalías.',

    // Project 15 (Peluches en Peligro)
    'p15.title': 'Peluches en Peligro — Narrativa Dramática',
    'p15.brief': 'Ejecución brillante de narrativa dramática con personajes de peluche. Manejo excepcional de texturas, renderizado complejo de humo e interacciones físicas realistas para un universo narrativo cautivador.',
    'p15.tech.intro': 'Técnica de animación física híbrida emulando stop-motion clásica. Simulación avanzada de texturas de tela, lana e hilo bajo iluminación dramática.',
    'p15.tech.step1.title': 'Fidelidad de Textura de Felpa',
    'p15.tech.step1.desc': 'Procesamiento de detalles microscópicos en peluches para simular materiales reales.',
    'p15.tech.step2.title': 'Efectos Volumétricos de Humo',
    'p15.tech.step2.desc': 'Renderizado e integración de humo y niebla a escala que interactúa físicamente con los juguetes.',
    'p15.tech.step3.title': 'Simulación Stop-Motion',
    'p15.tech.step3.desc': 'Limitación deliberada de cuadros por segundo (framerate) para imitar la estética del cine de animación cuadro por cuadro.',
    'p15.costs.intro': 'Comparativa de costos para desarrollo de corto de stop-motion con muñecos reales:',
    'p15.costs.stat.value': '90%',
    'p15.costs.stat.label': 'Ahorro al evitar la fabricación de maquetas físicas, armaduras articuladas y meses de toma manual.',

    // Project 16 (Plastilina)
    'p16.title': 'Animación en Plastilina — Diseño de Personajes',
    'p16.brief': 'Proyecto de animación en plastilina con alta fidelidad. Modelado físico avanzado, actuación expresiva de personajes, paleta interior rica y secuencias de comedia física dinámica.',
    'p16.tech.intro': 'Modelado tridimensional digital simulando deformación física orgánica y huellas dactilares sobre plastilina (claymation).',
    'p16.tech.step1.title': 'Modelado Orgánico de Arcilla',
    'p16.tech.step1.desc': 'Inyección de imperfecciones y relieves sobre los modelos digitales para imitar el moldeado manual.',
    'p16.tech.step2.title': 'Actuación Facial Excesiva',
    'p16.tech.step2.desc': 'Diseño de deformación elástica extrema en ojos y bocas para simular gesticulación caricaturesca.',
    'p16.tech.step3.title': 'Diseño de Set en Plastilina',
    'p16.tech.step3.desc': 'Creación de fondos y utilería con aspecto maleable y colores saturados característicos de la arcilla.',
    'p16.costs.intro': 'Comparativa de costos para producción claymation tradicional de 1 minuto:',
    'p16.costs.stat.value': '80%',
    'p16.costs.stat.label': 'Ahorro en laboriosos procesos manuales y reducción masiva en tiempos de post-producción.',

    // Project 17 (Funky Bear)
    'p17.title': 'Funky Bear — Showcase Visual Costero',
    'p17.brief': 'Viaje costero bañado de sol con performance dinámica de personajes y estilización ambiental consistente. Perfecto para plataformas de alto engagement y contenido orgánico loopable.',
    'p17.tech.intro': 'Flujo de trabajo optimizado para secuencias de movimiento en exteriores abiertos, controlando la consistencia lumínica del sol y reflejos de agua en la arena.',
    'p17.tech.step1.title': 'Styling Ambiental Costero',
    'p17.tech.step1.desc': 'Modelado de la luz dorada directa y reflejos dinámicos del agua del océano sobre la costa.',
    'p17.tech.step2.title': 'Performance de Personaje en Loop',
    'p17.tech.step2.desc': 'Generación de ciclos de caminata y baile consistentes que permiten bucles infinitos sin cortes bruscos.',
    'p17.tech.step3.title': 'Texturizado de Pelo y Viento',
    'p17.tech.step3.desc': 'Simulación física detallada del pelo del oso interactuando con la brisa marina.',
    'p17.costs.intro': 'Comparativa de costos para rodaje promocional en locaciones de playa/mar:',
    'p17.costs.stat.value': '70%',
    'p17.costs.stat.label': 'Ahorro en traslados de crew a playas lejanas, equipos de protección contra humedad y permisos costeros.',

    // Services
    'services.eyebrow': 'TAMBIÉN OFRECEMOS',
    'services.title': 'SERVICIOS PROFESIONALES',
    'svc.tutoring.title': 'Tutoría Personalizada',
    'svc.tutoring.desc': 'Formación práctica en herramientas de IA generativa para creadores y editores de video.',
    'svc.implementation.title': 'Implementación de IA',
    'svc.implementation.desc': 'Integración de flujos de trabajo eficientes con IA en tu estructura de producción actual.',
    'svc.consulting.title': 'Consultoría Creativa',
    'svc.consulting.desc': 'Estrategia, dirección de arte e ingeniería de prompts personalizada para tus proyectos.',
    'svc.apps.title': 'Desarrollo de Apps',
    'svc.apps.desc': 'Desarrollo a medida de aplicaciones móviles y web con integración directa de APIs de IA.',
    'svc.landing.title': 'Landing Pages',
    'svc.landing.desc': 'Creación y diseño de páginas de aterrizaje de alto rendimiento, optimizadas para conversión comercial.',
    'svc.automation.title': 'Automatizaciones',
    'svc.automation.desc': 'Diseño de automatizaciones y conectores inteligentes para acelerar tu producción de contenido.',
    'svc.cta': 'Cotizar Servicio →',

    // Footer
    'footer.copyright': '© 2026 Axis Studio. Todos los derechos reservados.',
    'footer.email.label': 'Email',
    'footer.whatsapp.label': 'WhatsApp'
  },
  en: {
    // Navigation
    'nav.projects': 'Projects',
    'nav.services': 'Services',
    'nav.contact': 'Contact',

    // Hero
    'hero.eyebrow': 'AI-POWERED CREATIVE STUDIO',
    'hero.subtitle': 'Specialists in visual storytelling and cutting-edge multimedia production powered by Artificial Intelligence.',
    'hero.cta': 'VIEW PROJECTS',

    // Section Titles
    'section.projects': 'Our Projects',

    // Category Headers
    'cat.storytelling': 'STORYTELLING',
    'cat.storytelling.sub': 'Visual narrative and magical realism',
    'cat.music': 'MUSIC VIDEOS',
    'cat.music.sub': 'AI-powered music video production',
    'cat.influencers': 'DIGITAL INFLUENCERS',
    'cat.influencers.sub': 'Virtual avatars and branded content',
    'cat.ads': 'ADS & PROMOS',
    'cat.ads.sub': 'High-impact commercial campaigns',
    'cat.kids': 'KIDS CONTENT',
    'cat.kids.sub': 'AI-powered animation and kids\' content',

    // Shared Labels & Buttons
    'label.brief': 'BRIEF:',
    'btn.tech': 'TECHNICAL DETAILS',
    'btn.costs': 'COMPARE & COSTS',
    'btn.quote': 'QUOTE SIMILAR PROJECT',
    'btn.request': 'REQUEST A QUOTE',
    'modal.tech.title': 'TECHNICAL DETAILS',
    'modal.costs.title': 'COMPARE & COSTS',

    // Project Numbers
    'p1.number': 'PROJECT 01', 'p2.number': 'PROJECT 02', 'p3.number': 'PROJECT 03',
    'p4.number': 'PROJECT 04', 'p5.number': 'PROJECT 05', 'p6.number': 'PROJECT 06',
    'p7.number': 'PROJECT 07', 'p8.number': 'PROJECT 08', 'p9.number': 'PROJECT 09',
    'p10.number': 'PROJECT 10', 'p11.number': 'PROJECT 11', 'p12.number': 'PROJECT 12',
    'p13.number': 'PROJECT 13', 'p14.number': 'PROJECT 14', 'p15.number': 'PROJECT 15',
    'p16.number': 'PROJECT 16', 'p17.number': 'PROJECT 17',

    // Project 1 (Chico Ave)
    'p1.title': 'CHICO AVE — Cinematic Storytelling',
    'p1.brief': 'Complete video production based on Magical Realism as the creative engine. Visual engineering where human control dictates the final result, allowing a fantastic idea to feel real and professional.',
    'p1.tech.intro': 'This project required 17 hours of specialized work, combining traditional creative direction with advanced generative AI tools to ensure visual coherence.',
    'p1.tech.step1.title': 'Conceptualization and Storyboarding',
    'p1.tech.step1.desc': 'Defining the tone of magical realism and designing the character\'s visual journey through refined prompts.',
    'p1.tech.step2.title': 'Character Design and "Digital Twin"',
    'p1.tech.step2.desc': 'Creating the protagonist ("bird boy") while maintaining physical consistency across multiple angles and shots.',
    'p1.tech.step3.title': 'Environment Continuity',
    'p1.tech.step3.desc': 'Generating consistent environments with volumetric lighting and cinematic texture.',
    'p1.tech.step4.title': 'Post-production and Sound Design',
    'p1.tech.step4.desc': 'Rhythmic editing, professional color correction, and an immersive soundtrack that enhances emotion.',
    'p1.costs.intro': 'Estimated cost comparison for a 1-minute magical realism cinematic production:',
    'p1.costs.stat.value': '70%',
    'p1.costs.stat.label': 'Reduction in physical location and production design costs.',

    // Project 2 (Chernobyl)
    'p2.title': 'CHERNOBYL 1986 — Time Travel',
    'p2.brief': 'Cinematic recreation of the Chernobyl nuclear disaster with historical precision. Industrial set structures, atmospheric smoke and particle simulations, and multi-actor AI logic for a time travel thriller.',
    'p2.tech.intro': 'Developing a detailed historical environment through AI modeling and volumetric effects simulation to recreate the atmosphere of 1986 Soviet Ukraine.',
    'p2.tech.step1.title': 'Historical Research & Set Design',
    'p2.tech.step1.desc': 'Curating visual references of the Chernobyl plant and recreating industrial architecture of the era.',
    'p2.tech.step2.title': 'Fluid and Smoke Simulations',
    'p2.tech.step2.desc': 'Fusing thick smoke effects and radioactive particles generated by advanced visual algorithms.',
    'p2.tech.step3.title': 'Multi-Actor Logic',
    'p2.tech.step3.desc': 'Visual direction and consistency of multiple characters within the same scene and temporal sequence.',
    'p2.tech.step4.title': 'Atmosphere and Color Grading',
    'p2.tech.step4.desc': 'Color grading in cold and desaturated tones typical of seventies/eighties historical drama films.',
    'p2.costs.intro': 'Cost comparison for complex historical period environment recreation:',
    'p2.costs.stat.value': '85%',
    'p2.costs.stat.label': 'Savings in physical set construction and renting actual industrial locations.',

    // Project 3 (British Retro)
    'p3.title': 'BRITISH RETRO 70\'s — Period Narrative',
    'p3.brief': 'Immersive historical narrative capturing the texture and atmosphere of a 1970s British corner shop. Exceptional consistency in period-accurate set design, object generation, and narrative suspense.',
    'p3.tech.intro': 'Exhaustive study of interior design, typography, and product packaging textures in Britain circa 1975 to achieve full enrichment.',
    'p3.tech.step1.title': '70s Prop & Object Design',
    'p3.tech.step1.desc': 'Consistent generation of commercial goods, cash registers, and packaging with vintage texture.',
    'p3.tech.step2.title': 'Character Consistency',
    'p3.tech.step2.desc': 'Detailed control of features and period clothing in close-up and tracking shots.',
    'p3.tech.step3.title': 'Lighting and Analog Texture',
    'p3.tech.step3.desc': 'Simulation of 35mm film grain and warm lighting for vintage commercial interiors.',
    'p3.tech.step4.title': 'Slow-Paced Editing',
    'p3.tech.step4.desc': 'Structuring a slow montage designed to sustain the suspense of the drama.',
    'p3.costs.intro': 'Cost comparison for period drama production in detailed interiors:',
    'p3.costs.stat.value': '75%',
    'p3.costs.stat.label': 'Savings in genuine vintage props and period art direction.',

    // Project 4 (Sonido Popular)
    'p4.title': 'SONIDO POPULAR — Generative Visuals',
    'p4.brief': 'Generative visuals that dance to the rhythm of music. A psychedelic and technical journey where sound sculpts the image in real-time through audioreactive AI algorithms.',
    'p4.tech.intro': 'Reactive architecture extracting sound frequency data from the track to dynamically modulate the AI\'s visual generation parameters.',
    'p4.tech.step1.title': 'Spectrum and BPM Analysis',
    'p4.tech.step1.desc': 'Extracting bass, mid, and treble frequencies to map them to movement and intensity variables.',
    'p4.tech.step2.title': 'Generative Prompt Design',
    'p4.tech.step2.desc': 'Creating aesthetic formulas and psychedelic color palettes optimized for continuous mutation.',
    'p4.tech.step3.title': 'AI Motion Interpolation',
    'p4.tech.step3.desc': 'Generating fluid frame transitions synchronized to the song\'s tempo (BPM).',
    'p4.tech.step4.title': 'Dynamic Color Grade',
    'p4.tech.step4.desc': 'Automatic adjustments of contrast and saturation linked to the music\'s energy.',
    'p4.costs.intro': 'Cost comparison for creating 3-minute dynamic music visualizers:',
    'p4.costs.stat.value': '80%',
    'p4.costs.stat.label': 'Reduction in post-production time and heavy traditional 3D rendering.',

    // Project 5 (Alisse)
    'p5.title': 'ALISSE — Beat Drop Baby',
    'p5.brief': 'Audioreactive music production with retro-futuristic neon aesthetics. Blending synthetic world-building with fluid character performance to elevate the visual release of contemporary electronic tracks.',
    'p5.tech.intro': 'Integration of character animations synchronized with a luminescent 3D grid driven by audio signals.',
    'p5.tech.step1.title': 'Retro-Futuristic Worldbuilding',
    'p5.tech.step1.desc': 'Designing high-fidelity neon grid environments and vibrant synthetic architecture.',
    'p5.tech.step2.title': 'Beat Frequency Analysis',
    'p5.tech.step2.desc': 'Mapping percussion to control flashes and geometric warping of the environment.',
    'p5.tech.step3.title': 'Fluid Character Performance',
    'p5.tech.step3.desc': 'Rendering synchronized dance with consistency in reflective textures under neon lights.',
    'p5.tech.step4.title': 'Realtime Hybrid Rendering',
    'p5.tech.step4.desc': 'Combining realtime render engines with AI optimization for high-speed shots.',
    'p5.costs.intro': 'Cost comparison for electronic music video with neon special effects:',
    'p5.costs.stat.value': '90%',
    'p5.costs.stat.label': 'Savings compared to productions with giant LED screens (virtual production) or VFX post-production.',

    // Project 6 (Las Flamingo)
    'p6.title': 'LAS FLAMINGO — 60\'s Retro Performance',
    'p6.brief': 'Vibrant musical performance capturing the nostalgic essence of a 1960s girl band. Flawless stylistic consistency, fluid choreography, and retro costume design generated with high-fidelity AI.',
    'p6.tech.intro': 'Using pose control workflows and historical costuming to recreate 1960s television aesthetics with modern fidelity.',
    'p6.tech.step1.title': 'Sixties Era Styling',
    'p6.tech.step1.desc': 'Aesthetic modeling based on classic recordings, bouffant hairstyles, and period makeup.',
    'p6.tech.step2.title': 'Hybrid Choreography Control',
    'p6.tech.step2.desc': 'Mapping human poses to maintain synchronization and dance rhythm within the ensemble.',
    'p6.tech.step3.title': 'Fabric & Costume Fidelity',
    'p6.tech.step3.desc': 'Physical simulation of retro fabric shine and movement under studio spotlights.',
    'p6.tech.step4.title': 'Analog Lens Emulation',
    'p6.tech.step4.desc': 'Adjusting chromatic aberration and depth of field typical of vintage TV cameras.',
    'p6.costs.intro': 'Cost comparison for performance music video with multiple actresses and wardrobe:',
    'p6.costs.stat.value': '70%',
    'p6.costs.stat.label': 'Savings in designing, renting, and tailoring period costumes, as well as talent casting.',

    // Project 7 (Ice Fucking Ice)
    'p7.title': 'ICE F**KING ICE — Urban Narrative',
    'p7.brief': 'Powerful social-realism narrative clip combining intense documentary-style visual effects with dynamic music synchronization. Street urban aesthetics and subcultural protest with high-impact AI generation.',
    'p7.tech.intro': 'Agile visual generation workflow structured for hand-held style camera shots in urban exteriors with grunge texturing.',
    'p7.tech.step1.title': 'Street Style Art Direction',
    'p7.tech.step1.desc': 'Developing a cold urban palette with graffiti, concrete textures, and high-definition streetwear.',
    'p7.tech.step2.title': 'Camera Movement Simulation',
    'p7.tech.step2.desc': 'Injecting micro-vibrations and lens sweeps to emulate actual camera operator work.',
    'p7.tech.step3.title': 'Dirty Realism VFX',
    'p7.tech.step3.desc': 'Fusing analog grain and light leaks to boost the social documentary character.',
    'p7.tech.step4.title': 'Dynamic Rhythmic Editing',
    'p7.tech.step4.desc': 'Precise synchronization of scene cuts to the beat of the bass and snare drum.',
    'p7.costs.intro': 'Cost comparison for shooting music video on outdoor urban locations:',
    'p7.costs.stat.value': '65%',
    'p7.costs.stat.label': 'Savings by avoiding municipal filming permits on public streets and renting mobile crew gear.',

    // Project 8 (Avatar Digital Ropa)
    'p8.title': 'Digital Avatar for Clothing Brands',
    'p8.brief': 'We create digital avatars that personify the brand and promote products with total realism, eliminating the barriers of logistics, model hiring, and traditional photoshoots.',
    'p8.tech.intro': 'Digital fabric engineering and motion transfer for display without physical samples.',
    'p8.tech.step1.title': 'Brand Avatar Strategy',
    'p8.tech.step1.desc': 'Modeling and refining the digital model\'s features according to the brand\'s identity.',
    'p8.tech.step2.title': 'Product Fidelity (Fabrics)',
    'p8.tech.step2.desc': 'Physical simulation of texture, drape, and behavior of fabrics under different lighting conditions.',
    'p8.tech.step3.title': 'Performance and Movement',
    'p8.tech.step3.desc': 'Integration of fluid runway walks and highly natural commercial poses.',
    'p8.costs.intro': 'Cost comparison for developing a fashion catalog campaign (3 moving looks):',
    'p8.costs.stat.value': '100%',
    'p8.costs.stat.label': 'Absolute intellectual property of the avatars for infinite campaigns without royalty costs.',

    // Project 9 (Avatar Reseña Productos)
    'p9.title': 'Digital Influencer for Product Reviews',
    'p9.brief': 'High-impact corporate asset with custom virtual avatars. Nuanced dynamic expressions and clean digital layout for seamless brand communication across streaming platforms.',
    'p9.tech.intro': 'Generation of virtual presenters focused on product reviews with advanced gesturing capabilities to build empathy.',
    'p9.tech.step1.title': 'Expressive Face Development',
    'p9.tech.step1.desc': 'Detailed mapping of micro-expressions, blinking, and eye interactivity of the avatar.',
    'p9.tech.step2.title': 'Voice-Driven Lip Sync',
    'p9.tech.step2.desc': 'Using neural networks to adjust lip and mouth position based on any voice track (multilingual).',
    'p9.tech.step3.title': 'Set and Product Integration',
    'p9.tech.step3.desc': 'Composing layers of the avatar interacting realistically with the product packaging.',
    'p9.costs.intro': 'Cost comparison for producing constant product review videos:',
    'p9.costs.stat.value': '80%',
    'p9.costs.stat.label': 'Recurring savings in presenter fees, voice actors, and recording studio hours.',

    // Project 10 (Avatar Reseña Apps)
    'p10.title': 'Digital Influencer for App Reviews',
    'p10.brief': 'High-impact commercial concept for digital applications. Advanced virtual try-on technology, rapid style transitions, and visual consistency designed for organic social media conversion.',
    'p10.tech.intro': 'Dynamic content production for mobile apps integrating real interface screen captures with virtual ambassador performance.',
    'p10.tech.step1.title': 'Social-First Virtual Ambassador',
    'p10.tech.step1.desc': 'Designing a charismatic avatar tailored for quick consumption formats on TikTok/Reels.',
    'p10.tech.step2.title': 'App Interface Composition',
    'p10.tech.step2.desc': 'Interactive merging of software screenshots floating seamlessly alongside the character.',
    'p10.tech.step3.title': 'Lip Sync & Natural Acting',
    'p10.tech.step3.desc': 'Voice-over modulation matched with the model\'s facial gestures to simulate a native recommendation.',
    'p10.costs.intro': 'Cost comparison for developing ongoing app/software promotional videos:',
    'p10.costs.stat.value': '75%',
    'p10.costs.stat.label': 'Savings by avoiding hiring external UGC content creators and re-filming for UI changes.',

    // Project 11 (Spinn Radio)
    'p11.title': 'SPINN RADIO — Native Viral Content',
    'p11.brief': 'Content designed for virality in native vertical formats. Trendy aesthetics and rhythmic editing that connects with today\'s digital audiences in record time.',
    'p11.tech.intro': 'Optimized workflow for ultra-fast delivery of videos optimized for retention algorithms (TikTok, Instagram Reels, YouTube Shorts).',
    'p11.tech.step1.title': 'Retention Analysis (Hooks)',
    'p11.tech.step1.desc': 'Designing the first 3 seconds with strong visual stimuli to retain the viewer.',
    'p11.tech.step2.title': 'Agile Asset Generation',
    'p11.tech.step2.desc': 'Fast processing of styled images and sequences aligned with musical trends.',
    'p11.tech.step3.title': 'Dynamic Editing and Captions',
    'p11.tech.step3.desc': 'Automatic animated captions and quick sound effects that maintain the rhythm.',
    'p11.tech.step4.title': 'Compression Optimization',
    'p11.tech.step4.desc': 'Optimized export to ensure maximum possible clarity within social media compression.',
    'p11.costs.intro': 'Cost comparison for a monthly batch of 10 short viral videos:',
    'p11.costs.stat.value': '60%',
    'p11.costs.stat.label': 'More organic engagement at a fraction of the cost of traditional social media agencies.',

    // Project 12 (Metro Pulse)
    'p12.title': 'METRO PULSE — Metropolitan Branding',
    'p12.brief': 'Metropolitan branding concept combining fluid character interaction, modern transit texturing, and mobile application UI integration for high-impact streaming promotions.',
    'p12.tech.intro': 'Using stable workflows to combine realistic moving urban environments with floating digital branding elements.',
    'p12.tech.step1.title': 'Metropolitan Environment Modeling',
    'p12.tech.step1.desc': 'Creating realistic train interiors with natural transit reflections and lighting.',
    'p12.tech.step2.title': 'UI/UX Graphic Integration',
    'p12.tech.step2.desc': 'Overlaying mobile app interfaces simulating interactive real-time usage.',
    'p12.tech.step3.title': 'Luminous Consistency in Motion',
    'p12.tech.step3.desc': 'Adjusting character highlights and shadows coherent with the train passing through tunnels and stations.',
    'p12.costs.intro': 'Cost comparison for commercial filmed on public transportation systems:',
    'p12.costs.stat.value': '80%',
    'p12.costs.stat.label': 'Savings by avoiding renting actual train cars, government transit permits, and mobile lighting crew.',

    // Project 13 (Promo ONU)
    'p13.title': 'PROMO UN — Institutional Communication',
    'p13.brief': 'High-impact social messaging through cinematic storytelling. We transform institutional communication into a powerful audiovisual experience that builds trust.',
    'p13.tech.intro': 'Sober and polished aesthetic combining serious virtual spokespersons with high-fidelity generated infographics and historical stock footage.',
    'p13.tech.step1.title': 'Institutional Script Curation',
    'p13.tech.step1.desc': 'Adapting raw data into a rigorous and empathetic speech structure.',
    'p13.tech.step2.title': 'Clean & Premium Aesthetic',
    'p13.tech.step2.desc': 'Composing symmetrical shots with sober and corporate color palettes.',
    'p13.tech.step3.title': 'Impactful Post-production',
    'p13.tech.step3.desc': 'Subtle integration of cinematic text elements and elegant transitions.',
    'p13.tech.step4.title': 'Vocal Audio Mastering',
    'p13.tech.step4.desc': 'Polished voice-over with high-clarity EQ and corporate background music.',
    'p13.costs.intro': 'Cost comparison for a 2-minute institutional corporate video:',
    'p13.costs.stat.value': '70%',
    'p13.costs.stat.label': 'Reduction in travel expenses, staff relocation, and on-location production costs.',

    // Project 14 (Con el Corazon)
    'p14.title': 'WITH THE HEART — Emotional Storytelling',
    'p14.brief': 'Humanizing technology through emotion. A cinematic piece that connects with the human essence using AI tools to enhance organic storytelling.',
    'p14.tech.intro': 'Using emotional simulation models and micro-gestures on digital characters to convey empathy and warmth in intimate shots.',
    'p14.tech.step1.title': 'Emotional Narrative Design',
    'p14.tech.step1.desc': 'Script structure based on universal narrative archetypes that move feelings.',
    'p14.tech.step2.title': 'Empathetic Digital Twins',
    'p14.tech.step2.desc': 'Designing characters with natural eye and facial expressions in close-ups.',
    'p14.tech.step3.title': 'AI Organic Lighting',
    'p14.tech.step3.desc': 'Simulating natural golden hour sunlight to add visual warmth to the frame.',
    'p14.tech.step4.title': 'Heart Sound Design',
    'p14.tech.step4.desc': 'Fusing recorded rhythmic heartbeats with background acoustic string arrangements.',
    'p14.costs.intro': 'Cost comparison for a 1.5-minute emotional promotional short film:',
    'p14.costs.stat.value': '100%',
    'p14.costs.stat.label': 'Total ownership of the avatars for unlimited future use without royalty costs.',

    // Project 15 (Peluches en Peligro)
    'p15.title': 'Plush in Danger — Dramatic Narrative',
    'p15.brief': 'Brilliant dramatic narrative execution using plush toy characters. Exceptional texture handling, complex smoke rendering, and realistic physical interactions for a captivating narrative universe.',
    'p15.tech.intro': 'Hybrid physical animation technique emulating classic stop-motion. Advanced simulation of fabric, wool, and thread textures under dramatic lighting.',
    'p15.tech.step1.title': 'Plush Texture Fidelity',
    'p15.tech.step1.desc': 'Processing microscopic details on plush toys to simulate real materials.',
    'p15.tech.step2.title': 'Volumetric Smoke Effects',
    'p15.tech.step2.desc': 'Rendering and integrating scale smoke and fog that physically interacts with the toys.',
    'p15.tech.step3.title': 'Stop-Motion Simulation',
    'p15.tech.step3.desc': 'Deliberately limiting framerate to mimic the aesthetics of frame-by-frame animation films.',
    'p15.costs.intro': 'Cost comparison for stop-motion short development with actual physical puppets:',
    'p15.costs.stat.value': '90%',
    'p15.costs.stat.label': 'Savings by avoiding physical miniature building, articulated armatures, and months of manual shooting.',

    // Project 16 (Plastilina)
    'p16.title': 'Claymation — Character Design',
    'p16.brief': 'High-fidelity claymation animation project. Advanced physical modeling, expressive character acting, rich interior palette, and dynamic physical comedy sequences.',
    'p16.tech.intro': 'Digital 3D modeling simulating organic physical deformation and fingerprints on clay (claymation).',
    'p16.tech.step1.title': 'Organic Clay Modeling',
    'p16.tech.step1.desc': 'Injecting imperfections and ridges on digital models to mimic manual shaping.',
    'p16.tech.step2.title': 'Exaggerated Facial Acting',
    'p16.tech.step2.desc': 'Designing extreme elastic warping in eyes and mouths to simulate cartoonish gesturing.',
    'p16.tech.step3.title': 'Clay Set Design',
    'p16.tech.step3.desc': 'Creating backgrounds and props with a malleable look and saturated colors characteristic of clay.',
    'p16.costs.intro': 'Cost comparison for traditional 1-minute claymation production:',
    'p16.costs.stat.value': '80%',
    'p16.costs.stat.label': 'Savings in laborious manual processes and massive reduction in post-production times.',

    // Project 17 (Funky Bear)
    'p17.title': 'Funky Bear — Coastal Visual Showcase',
    'p17.brief': 'Sunshine-soaked coastal journey featuring dynamic character performance and consistent environmental styling. Perfect for high-engagement platforms and loopable organic content.',
    'p17.tech.intro': 'Optimized workflow for motion sequences in open outdoor spaces, controlling the consistency of direct sunlight and water reflections on sand.',
    'p17.tech.step1.title': 'Coastal Environmental Styling',
    'p17.tech.step1.desc': 'Modeling direct golden light and dynamic reflections of ocean water on the shore.',
    'p17.tech.step2.title': 'Looping Character Performance',
    'p17.tech.step2.desc': 'Generating consistent walk and dance cycles that allow infinite loops without abrupt cuts.',
    'p17.tech.step3.title': 'Fur & Wind Simulation',
    'p17.tech.step3.desc': 'Detailed physical simulation of the bear\'s fur interacting with the sea breeze.',
    'p17.costs.intro': 'Cost comparison for promotional shoot on beach/ocean locations:',
    'p17.costs.stat.value': '70%',
    'p17.costs.stat.label': 'Savings on crew travel to distant beaches, humidity protection gear, and coastal permits.',

    // Services
    'services.eyebrow': 'WE ALSO OFFER',
    'services.title': 'PROFESSIONAL SERVICES',
    'svc.tutoring.title': 'Personalized Tutoring',
    'svc.tutoring.desc': 'Hands-on training in generative AI tools for creators and video editors.',
    'svc.implementation.title': 'AI Implementation',
    'svc.implementation.desc': 'Integrating efficient AI workflows into your current production structure.',
    'svc.consulting.title': 'Creative Consulting',
    'svc.consulting.desc': 'Custom strategy, art direction, and prompt engineering for your projects.',
    'svc.apps.title': 'App Development',
    'svc.apps.desc': 'Custom mobile and web app development with direct integration of AI APIs.',
    'svc.landing.title': 'Landing Pages',
    'svc.landing.desc': 'Creating and designing high-performance landing pages optimized for business conversion.',
    'svc.automation.title': 'Automations',
    'svc.automation.desc': 'Designing automations and smart connectors to accelerate your content production.',
    'svc.cta': 'Request Service →',

    // Footer
    'footer.copyright': '© 2026 Axis Studio. All rights reserved.',
    'footer.email.label': 'Email',
    'footer.whatsapp.label': 'WhatsApp'
  }
};

const htmlTranslations = {
  es: {
    'hero.title': '<span>Donde la</span><span>Creatividad</span><span>Encuentra su Eje.</span>',
    'footer.tagline': 'Donde la Creatividad Encuentra su Eje'
  },
  en: {
    'hero.title': '<span>Where</span><span>Creativity</span><span>Finds its Axis.</span>',
    'footer.tagline': 'Where Creativity Finds its Axis'
  }
};

/* === LANGUAGE TOGGLE LOGIC === */
function initLanguageToggle() {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;

  const savedLang = localStorage.getItem('axis-lang') || 'es';
  setLanguage(savedLang);

  toggle.addEventListener('click', (e) => {
    const option = e.target.closest('.lang-toggle__option');
    if (!option) return;

    const lang = option.dataset.lang;
    if (lang) {
      setLanguage(lang);
      localStorage.setItem('axis-lang', lang);
    }
  });
}

function setLanguage(lang) {
  document.documentElement.lang = lang;

  // Toggle active class in UI
  const options = document.querySelectorAll('.lang-toggle__option');
  options.forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Translate textContent
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Translate HTML contents
  const htmlElements = document.querySelectorAll('[data-i18n-html]');
  htmlElements.forEach(el => {
    const key = el.dataset.i18nHtml || el.getAttribute('data-i18n-html');
    if (htmlTranslations[lang] && htmlTranslations[lang][key]) {
      el.innerHTML = htmlTranslations[lang][key];
    }
  });
}

/* === CONTACT SERVICE VIA WHATSAPP === */
function contactService(serviceKey) {
  const lang = document.documentElement.lang || 'es';
  const serviceNames = {
    es: {
      'tutoring': 'Tutoría Personalizada',
      'implementation': 'Implementación de IA',
      'consulting': 'Consultoría Creativa',
      'apps': 'Desarrollo de Apps',
      'landing': 'Landing Pages',
      'automation': 'Automatizaciones'
    },
    en: {
      'tutoring': 'Personalized Tutoring',
      'implementation': 'AI Implementation',
      'consulting': 'Creative Consulting',
      'apps': 'App Development',
      'landing': 'Landing Pages',
      'automation': 'Automations'
    }
  };
  
  const serviceName = serviceNames[lang][serviceKey] || serviceKey;
  let msg = '';
  if (lang === 'en') {
    msg = `Hello Axis Studio, I am interested in the "${serviceName}" service.`;
  } else {
    msg = `Hola Axis Studio, me interesa el servicio de "${serviceName}".`;
  }
  window.open(`https://wa.me/529513775879?text=${encodeURIComponent(msg)}`, '_blank');
}



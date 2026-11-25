/* =========================================================
   GABO · Marca personal como Web Page
   JavaScript sin librerías. Secciones:
   1. Datos del portafolio y render de tarjetas
   2. Ventana de caso de estudio
   3. Navegación, menú móvil y barra de progreso
   4. Animaciones: entrada, contadores, palabra rotativa, tilt
   5. Carrusel de testimonios
   6. Formulario de contacto
   7. Minijuego "Atrapa la idea"
   ========================================================= */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Datos del portafolio ---------- */
  // Arte de cada proyecto: SVG propio, sin imágenes externas.
  var arte = {
    sinfiltro:
      '<svg viewBox="0 0 400 260" role="img" aria-label="Portada de la campaña Sin filtro: botón de play sobre fondo violeta"><defs><linearGradient id="a1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a855f7"/><stop offset="1" stop-color="#c026d3"/></linearGradient></defs><rect width="400" height="260" fill="url(#a1)"/><circle cx="200" cy="130" r="58" fill="none" stroke="#fff" stroke-width="9"/><path d="M182 100v60l52-30z" fill="#fff"/></svg>',
    cafe:
      '<svg viewBox="0 0 400 260" role="img" aria-label="Portada del rebranding del café local: círculos concéntricos cian"><rect width="400" height="260" fill="#0b1020"/><g fill="none" stroke="#22d3ee" stroke-width="2.5"><circle cx="200" cy="130" r="20" opacity=".95"/><circle cx="200" cy="130" r="45" opacity=".75"/><circle cx="200" cy="130" r="72" opacity=".55"/><circle cx="200" cy="130" r="102" opacity=".35"/><circle cx="200" cy="130" r="136" opacity=".2"/></g><circle cx="200" cy="130" r="9" fill="#00e5ff"/></svg>',
    reels:
      '<svg viewBox="0 0 400 260" role="img" aria-label="Portada de la serie de reels Ideas: franjas diagonales violeta y cian"><defs><linearGradient id="a3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#00e5ff"/><stop offset="1" stop-color="#a855f7"/></linearGradient><pattern id="p3" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><rect width="13" height="26" fill="url(#a3)"/></pattern></defs><rect width="400" height="260" fill="#12122a"/><rect width="400" height="260" fill="url(#p3)" opacity=".9"/></svg>',
    app:
      '<svg viewBox="0 0 400 260" role="img" aria-label="Portada del lanzamiento de app: calendario de 30 días con puntos"><rect width="400" height="260" fill="#0d0d1b"/><g id="cal"></g><text x="200" y="236" text-anchor="middle" fill="#a9abc6" font-family="Arial" font-size="13" letter-spacing="3">PLAN · 30 DÍAS</text></svg>',
    ads:
      '<svg viewBox="0 0 400 260" role="img" aria-label="Portada de la pauta en Meta Ads: gráfico de barras ascendente"><defs><linearGradient id="a5" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#a855f7"/><stop offset="1" stop-color="#00e5ff"/></linearGradient></defs><rect width="400" height="260" fill="#0b0b18"/><g fill="url(#a5)"><rect x="50" y="170" width="38" height="60" rx="5"/><rect x="104" y="148" width="38" height="82" rx="5"/><rect x="158" y="156" width="38" height="74" rx="5"/><rect x="212" y="112" width="38" height="118" rx="5"/><rect x="266" y="84" width="38" height="146" rx="5"/><rect x="320" y="40" width="38" height="190" rx="5"/></g></svg>',
    gabo:
      '<img src="img/gabo-hero.webp" width="824" height="880" loading="lazy" alt="Retrato de Gabo usado en su sitio de marca personal">'
  };
  // Calendario de 30 puntos para el proyecto "app"
  arte.app = arte.app.replace('<g id="cal"></g>', '<g>' + (function () {
    var s = '';
    for (var i = 0; i < 30; i++) {
      var x = 70 + (i % 10) * 29, y = 50 + Math.floor(i / 10) * 50;
      s += '<circle cx="' + x + '" cy="' + y + '" r="' + (i === 29 ? 9 : 6) + '" fill="' + (i === 29 ? '#00e5ff' : (i % 3 === 0 ? '#a855f7' : '#2a2a44')) + '"/>';
    }
    return s;
  })() + '</g>');

  // Ejemplos para la clase: reemplazar por casos reales cuando existan.
  var proyectos = [
    { id: 'sin-filtro', cat: 'Social Ads · Reels', titulo: 'Campaña “Sin filtro”', rol: 'Estrategia y edición de video', res: '+180% de alcance', arte: 'sinfiltro', ancho: true,
      reto: 'Una marca de ropa joven necesitaba salir de su círculo de seguidores y llegar a gente nueva en redes.',
      estrategia: 'Reels cortos con testimonios sin guion y un mismo gancho en los primeros 2 segundos, probado en tres versiones.',
      resultado: 'El alcance subió 180% en cuatro semanas y la versión con mejor retención se convirtió en la pieza base.' },
    { id: 'cafe', cat: 'Identidad', titulo: 'Rebranding café local', rol: 'Dirección creativa', res: '+45% seguidores', arte: 'cafe',
      reto: 'Una cafetería de barrio tenía buen producto pero una imagen desordenada en redes.',
      estrategia: 'Paleta y tono de voz nuevos, plantillas para historias y una parrilla de contenido semanal.',
      resultado: 'Los seguidores crecieron 45% y los pedidos por mensaje directo se duplicaron en dos meses.' },
    { id: 'reels', cat: 'Video corto', titulo: 'Serie de reels “Ideas”', rol: 'Guion, grabación y edición', res: '62K reproducciones', arte: 'reels',
      reto: 'Crear una serie propia que mostrara mi forma de pensar la publicidad y atrajera a marcas.',
      estrategia: 'Episodios de menos de 40 segundos, un insight por video y cierre con una pregunta para activar comentarios.',
      resultado: 'La serie sumó 62K reproducciones orgánicas y varios mensajes de marcas pequeñas.' },
    { id: 'app', cat: 'Estrategia', titulo: 'Lanzamiento de app', rol: 'Estratega de contenido', res: 'Plan de 30 días', arte: 'app',
      reto: 'Dar a conocer una app nueva con presupuesto casi nulo y una comunidad todavía vacía.',
      estrategia: 'Calendario de 30 días con pilares de expectativa, demostración y prueba social, medido cada semana.',
      resultado: 'Plan entregado antes de la fecha y listo para ejecutar con un equipo de dos personas.' },
    { id: 'ads', cat: 'Publicidad digital', titulo: 'Pauta Meta Ads · tienda', rol: 'Segmentación y reportes', res: 'ROAS 3.2', arte: 'ads',
      reto: 'Una tienda online gastaba en anuncios sin saber qué público realmente compraba.',
      estrategia: 'Tres audiencias, creativos alternados y un reporte semanal con costo por compra.',
      resultado: 'El retorno sobre inversión publicitaria llegó a 3.2 y se dejó de pautar a las dos audiencias que no convertían.' },
    { id: 'gabo', cat: 'Branding + Web', titulo: 'Marca personal GABO', rol: 'Diseño y desarrollo', res: 'Este proyecto', arte: 'gabo', ancho: true,
      reto: 'Convertir mi perfil de estudiante en una marca personal clara que invite a cotizar.',
      estrategia: 'Identidad neón oscuro, promesa “Ideas que se hacen ver.” y una web de una sola página con el contacto siempre a la vista.',
      resultado: 'Este sitio: responsive, accesible y publicado como entrega del segundo parcial.' }
  ];

  var lista = $('#proyectos');
  function pintarTarjetas() {
    lista.innerHTML = proyectos.map(function (p, i) {
      return '<li class="card proyecto rv' + (p.ancho ? ' ancho' : '') + '">' +
        '<div class="proyecto-arte">' + arte[p.arte] + '</div>' +
        '<div class="proyecto-info">' +
          '<p class="proyecto-cat">' + p.cat + '</p>' +
          '<h3>' + p.titulo + '</h3>' +
          '<p class="proyecto-rol">Rol · ' + p.rol + '</p>' +
          '<div class="proyecto-res"><b>' + p.res + '</b>' +
          '<button class="ver-caso" type="button" data-i="' + i + '" aria-label="Ver el caso: ' + p.titulo + '">Ver caso →</button></div>' +
        '</div></li>';
    }).join('');
  }
  pintarTarjetas();

  /* ---------- 2. Ventana de caso de estudio ---------- */
  var dlg = $('#caso');
  var ultimoBoton = null;
  lista.addEventListener('click', function (e) {
    var b = e.target.closest('.ver-caso');
    if (!b) return;
    var p = proyectos[+b.dataset.i];
    ultimoBoton = b;
    $('#caso-arte').innerHTML = arte[p.arte];
    $('#caso-cat').textContent = p.cat;
    $('#caso-titulo').textContent = p.titulo;
    $('#caso-rol').textContent = p.rol;
    $('#caso-reto').textContent = p.reto;
    $('#caso-estrategia').textContent = p.estrategia;
    $('#caso-resultado').textContent = p.resultado;
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  });
  function cerrarCaso() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); if (ultimoBoton) ultimoBoton.focus(); }
  $('#caso-cerrar').addEventListener('click', cerrarCaso);
  $('#caso-cta').addEventListener('click', function () { if (dlg.close) dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) cerrarCaso(); });

  /* ---------- 3. Navegación ---------- */
  var menuBtn = $('.menu-boton');
  var menu = $('#menu-movil');
  function alternarMenu(abrir) {
    menu.classList.toggle('abierto', abrir);
    menuBtn.setAttribute('aria-expanded', String(abrir));
    menuBtn.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = abrir ? 'hidden' : '';
    // Con el menú cerrado sus enlaces no deben recibir foco
    $$('a', menu).forEach(function (a) { a.tabIndex = abrir ? 0 : -1; });
  }
  alternarMenu(false);
  menuBtn.addEventListener('click', function () { alternarMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { alternarMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('abierto')) { alternarMenu(false); menuBtn.focus(); }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches) alternarMenu(false); });

  // Enlace activo según la sección visible
  var secciones = $$('main section[id]');
  var enlaces = $$('.nav-lista a');
  var obsNav = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (en.isIntersecting) {
        enlaces.forEach(function (a) { a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id)); });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secciones.forEach(function (s) { obsNav.observe(s); });

  // Barra de progreso, botón subir y brillo del hero
  var progreso = $('.progreso'), subir = $('#subir');
  function alScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var f = max > 0 ? window.scrollY / max : 0;
    progreso.style.setProperty('--scroll', f.toFixed(4));
    subir.classList.toggle('visible', window.scrollY > 700);
  }
  window.addEventListener('scroll', alScroll, { passive: true });
  alScroll();
  subir.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reducir ? 'auto' : 'smooth' }); });

  /* ---------- 4. Animaciones ---------- */
  // Entrada por scroll (el contenido ya es visible; solo se desliza)
  var rvObs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); rvObs.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  $$('.rv').forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 70 + 'ms'; rvObs.observe(el); });

  // Contadores animados
  function contar(el) {
    var meta = +el.dataset.contar, pre = el.dataset.prefijo || '', suf = el.dataset.sufijo || '';
    if (reducir) { el.textContent = pre + meta + suf; return; }
    var t0 = performance.now(), dur = 1400;
    (function paso(t) {
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = pre + Math.round(meta * e) + suf;
      if (k < 1) requestAnimationFrame(paso);
    })(t0);
  }
  var cObs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) { if (en.isIntersecting) { contar(en.target); cObs.unobserve(en.target); } });
  }, { threshold: 0.6 });
  $$('[data-contar]').forEach(function (el) { cObs.observe(el); });

  // Palabra rotativa del rol
  var roles = ['Publicista y creador de contenido', 'Estratega de redes sociales', 'Editor de video corto', 'Analista de pauta digital'];
  var rota = $('.rota'), ri = 0;
  if (rota && !reducir) {
    setInterval(function () {
      rota.style.transition = 'opacity .3s, transform .3s'; rota.style.opacity = '0'; rota.style.transform = 'translateY(-0.4rem)';
      setTimeout(function () {
        ri = (ri + 1) % roles.length; rota.textContent = roles[ri];
        rota.style.transform = 'translateY(0.4rem)';
        requestAnimationFrame(function () { rota.style.opacity = '1'; rota.style.transform = 'none'; });
      }, 320);
    }, 3600);
  }

  // Paralaje suave del retrato y brillo que sigue al puntero (solo con mouse)
  var hero = $('#inicio'), retrato = $('.retrato'), brillo = $('.hero-brillo');
  if (hero && !reducir && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      retrato.style.setProperty('--px', ((x - 0.5) * 2).toFixed(2));
      retrato.style.setProperty('--py', ((y - 0.5) * 2).toFixed(2));
      brillo.style.setProperty('--mx', (x * 100) + '%');
      brillo.style.setProperty('--my', (y * 100) + '%');
    });
  }

  // Inclinación 3D en las cards de servicios
  if (!reducir && window.matchMedia('(hover: hover)').matches) {
    $$('.servicio').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--rx', (((e.clientX - r.left) / r.width - 0.5) * 8).toFixed(1) + 'deg');
        c.style.setProperty('--ry', ((0.5 - (e.clientY - r.top) / r.height) * 8).toFixed(1) + 'deg');
      });
      c.addEventListener('pointerleave', function () { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
    });
  }

  /* ---------- 5. Carrusel de testimonios ---------- */
  var car = $('#carrusel');
  function mover(dir) {
    var item = car.querySelector('.testimonio');
    car.scrollBy({ left: dir * (item.offsetWidth + 16), behavior: reducir ? 'auto' : 'smooth' });
  }
  $('#car-prev').addEventListener('click', function () { mover(-1); });
  $('#car-next').addEventListener('click', function () { mover(1); });
  car.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); mover(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); mover(-1); }
  });

  /* ---------- 6. Formulario ---------- */
  var form = $('#formulario'), estado = $('#estado-form'), gracias = $('#gracias');
  // "Saber más" en un servicio preselecciona ese servicio en el formulario
  $$('[data-servicio]').forEach(function (a) {
    a.addEventListener('click', function () { $('#f-servicio').value = a.dataset.servicio; });
  });
  $('#caso-cta').addEventListener('click', function () { $('#f-mensaje').focus({ preventScroll: true }); });

  function validar() {
    var ok = true, primero = null;
    var reglas = {
      nombre: function (v) { return v.trim().length >= 2; },
      correo: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
      servicio: function (v) { return v !== ''; },
      mensaje: function (v) { return v.trim().length >= 10; }
    };
    Object.keys(reglas).forEach(function (k) {
      var campo = $('#f-' + k), cont = campo.closest('.campo');
      var valido = reglas[k](campo.value);
      cont.dataset.error = String(!valido);
      campo.setAttribute('aria-invalid', String(!valido));
      if (!valido) { campo.setAttribute('aria-describedby', 'e-' + k); ok = false; if (!primero) primero = campo; } else { campo.removeAttribute('aria-describedby'); }
    });
    if (primero) primero.focus();
    return ok;
  }
  $$('#formulario input, #formulario select, #formulario textarea').forEach(function (c) {
    c.addEventListener('input', function () { c.closest('.campo').dataset.error = 'false'; c.setAttribute('aria-invalid', 'false'); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    estado.hidden = true;
    if (!validar()) return;
    var boton = $('#f-enviar');
    boton.disabled = true;
    var datos = new URLSearchParams(new FormData(form)).toString();
    // En Netlify Forms el POST a "/" registra el mensaje. Fuera de allí falla y se ofrece el correo.
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: datos })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); mostrarGracias(); })
      .catch(function () {
        var asunto = encodeURIComponent('Cotización: ' + $('#f-servicio').value);
        var cuerpo = encodeURIComponent($('#f-mensaje').value + '\n\n' + $('#f-nombre').value + ' · ' + $('#f-correo').value);
        estado.className = 'estado-form fallo';
        estado.innerHTML = 'No se pudo enviar desde esta página. Escríbeme a <strong>gabogarcia1829@gmail.com</strong> o <a href="mailto:gabogarcia1829@gmail.com?subject=' + asunto + '&body=' + cuerpo + '">abre tu correo con el mensaje listo</a>.';
        estado.hidden = false;
      })
      .finally(function () { boton.disabled = false; });
  });
  function mostrarGracias() { form.hidden = true; gracias.hidden = false; gracias.setAttribute('tabindex', '-1'); gracias.focus(); }
  $('#otro-mensaje').addEventListener('click', function () { form.reset(); gracias.hidden = true; form.hidden = false; $('#f-nombre').focus(); });

  /* ---------- 7. Minijuego "Atrapa la idea" ---------- */
  var lienzo = $('#lienzo'), ctx = lienzo.getContext('2d');
  var W = lienzo.width, H = lienzo.height;
  var elPuntos = $('#j-puntos'), elVidas = $('#j-vidas'), elRecord = $('#j-record'), btnJugar = $('#j-jugar'), anuncio = $('#j-anuncio');
  var record = 0;
  try { record = +(localStorage.getItem('gabo-record') || 0); } catch (e) { record = 0; }
  elRecord.textContent = record;

  var estadoJ = 'espera'; // espera | jugando | pausa | fin
  var jug, items, puntos, vidas, tiempo, ultimo, dir = 0, raf = 0, teclas = {};

  function reiniciar() {
    jug = { x: W / 2, y: H - 46, r: 26, vx: 0 };
    items = []; puntos = 0; vidas = 3; tiempo = 0; ultimo = 0;
    elPuntos.textContent = 0; elVidas.textContent = 3;
  }
  reiniciar();

  function nuevoItem() {
    var q = Math.random();
    var tipo = q < 0.6 ? 'idea' : (q < 0.72 ? 'viral' : 'ruido');
    items.push({ tipo: tipo, x: 24 + Math.random() * (W - 48), y: -20, v: 110 + Math.random() * 70 + Math.min(puntos * 2.2, 160), r: tipo === 'viral' ? 13 : 11, giro: Math.random() * 6 });
  }

  function dibujarAnillo(x, y, r) {
    var g = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
    g.addColorStop(0, '#00e5ff'); g.addColorStop(0.6, '#a855f7'); g.addColorStop(1, '#c026d3');
    ctx.save();
    ctx.shadowColor = 'rgba(0,229,255,.7)'; ctx.shadowBlur = 18;
    ctx.strokeStyle = g; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(x, y, r, -0.35, Math.PI * 2 - 1.05); ctx.stroke();
    ctx.shadowBlur = 0; ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(x - r * 0.28, y - r * 0.38); ctx.lineTo(x - r * 0.28, y + r * 0.38); ctx.lineTo(x + r * 0.4, y); ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  function dibujar() {
    ctx.clearRect(0, 0, W, H);
    // Líneas verticales de fondo
    ctx.strokeStyle = 'rgba(255,255,255,.04)'; ctx.lineWidth = 1;
    for (var x = 30; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    var gr = ctx.createRadialGradient(W / 2, H, 10, W / 2, H, 300);
    gr.addColorStop(0, 'rgba(168,85,247,.28)'); gr.addColorStop(1, 'rgba(168,85,247,0)');
    ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);

    items.forEach(function (it) {
      ctx.save(); ctx.translate(it.x, it.y); ctx.rotate(it.giro);
      if (it.tipo === 'idea') { ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 14; ctx.fillStyle = '#00e5ff'; ctx.beginPath(); ctx.arc(0, 0, it.r, 0, 7); ctx.fill(); }
      else if (it.tipo === 'viral') { ctx.shadowColor = '#a855f7'; ctx.shadowBlur = 16; ctx.fillStyle = '#a855f7'; ctx.beginPath(); for (var i = 0; i < 10; i++) { var rr = i % 2 ? it.r * 0.5 : it.r * 1.15, a = i * Math.PI / 5; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); ctx.fill(); }
      else { ctx.shadowColor = '#c026d3'; ctx.shadowBlur = 14; ctx.fillStyle = '#c026d3'; ctx.fillRect(-it.r, -it.r, it.r * 2, it.r * 2); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-5, -5); ctx.lineTo(5, 5); ctx.moveTo(5, -5); ctx.lineTo(-5, 5); ctx.stroke(); }
      ctx.restore();
    });
    dibujarAnillo(jug.x, jug.y, jug.r);

    if (estadoJ !== 'jugando') {
      ctx.fillStyle = 'rgba(7,7,13,.72)'; ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center'; ctx.fillStyle = '#f2f3fa';
      ctx.font = 'bold 34px Georgia, serif';
      var titulo = estadoJ === 'fin' ? 'Fin del juego' : (estadoJ === 'pausa' ? 'En pausa' : 'Atrapa la idea');
      ctx.fillText(titulo, W / 2, H / 2 - 12);
      ctx.font = '16px Arial, sans-serif'; ctx.fillStyle = '#a9abc6';
      ctx.fillText(estadoJ === 'fin' ? puntos + ' puntos' : 'Pulsa Jugar o la barra espaciadora', W / 2, H / 2 + 20);
    }
  }

  function bucle(t) {
    if (estadoJ !== 'jugando') return;
    var dt = Math.min(0.04, (t - (ultimo || t)) / 1000); ultimo = t; tiempo += dt;
    // Movimiento: teclado / botones
    var mov = (teclas.der || dir > 0 ? 1 : 0) - (teclas.izq || dir < 0 ? 1 : 0);
    jug.x += mov * 360 * dt;
    jug.x = Math.max(jug.r, Math.min(W - jug.r, jug.x));
    // Aparición de ítems cada vez más rápida
    if (tiempo > 0.7 - Math.min(puntos * 0.006, 0.35)) { tiempo = 0; nuevoItem(); }
    items.forEach(function (it) { it.y += it.v * dt; it.giro += dt * 2; });
    // Colisiones y salidas
    items = items.filter(function (it) {
      var dx = it.x - jug.x, dy = it.y - jug.y;
      if (Math.sqrt(dx * dx + dy * dy) < it.r + jug.r * 0.85) {
        if (it.tipo === 'idea') puntos += 1; else if (it.tipo === 'viral') puntos += 5; else vidas -= 1;
        elPuntos.textContent = puntos; elVidas.textContent = Math.max(0, vidas);
        return false;
      }
      if (it.y > H + 20) {
        if (it.tipo === 'idea') { vidas -= 1; elVidas.textContent = Math.max(0, vidas); }
        return false;
      }
      return true;
    });
    if (vidas <= 0) { terminar(); return; }
    dibujar();
    raf = requestAnimationFrame(bucle);
  }

  function terminar() {
    estadoJ = 'fin'; btnJugar.textContent = 'Jugar otra vez';
    if (puntos > record) { record = puntos; elRecord.textContent = record; try { localStorage.setItem('gabo-record', String(record)); } catch (e) {} }
    anuncio.textContent = 'Fin del juego. Hiciste ' + puntos + ' puntos.';
    dibujar();
  }
  function jugar() {
    if (estadoJ === 'jugando') { estadoJ = 'pausa'; btnJugar.textContent = 'Seguir'; cancelAnimationFrame(raf); dibujar(); return; }
    if (estadoJ === 'fin' || estadoJ === 'espera') reiniciar();
    estadoJ = 'jugando'; btnJugar.textContent = 'Pausa'; ultimo = 0; anuncio.textContent = '';
    raf = requestAnimationFrame(bucle);
  }
  btnJugar.addEventListener('click', jugar);

  // Controles: botones mantenidos, teclado y arrastre
  function sostener(id, valor) {
    var b = $(id);
    ['pointerdown'].forEach(function (ev) { b.addEventListener(ev, function (e) { e.preventDefault(); dir = valor; }); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { b.addEventListener(ev, function () { if (dir === valor) dir = 0; }); });
    b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { dir = valor; } });
    b.addEventListener('keyup', function () { if (dir === valor) dir = 0; });
  }
  sostener('#j-izq', -1); sostener('#j-der', 1);

  function aTecla(e, v) {
    var k = e.key.toLowerCase();
    if (k === 'arrowleft' || k === 'a') teclas.izq = v; else if (k === 'arrowright' || k === 'd') teclas.der = v; else return false;
    return true;
  }
  var jugando = function () { return estadoJ === 'jugando'; };
  document.addEventListener('keydown', function (e) {
    var t = e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
    if (jugando() && aTecla(e, true)) e.preventDefault();
    // La barra espaciadora controla el juego cuando el foco está en el lienzo
    if (e.key === ' ' && e.target === lienzo) { e.preventDefault(); jugar(); }
  });
  document.addEventListener('keyup', function (e) { aTecla(e, false); });
  lienzo.tabIndex = 0;
  lienzo.setAttribute('aria-describedby', 'j-anuncio');

  lienzo.addEventListener('pointermove', function (e) {
    if (!jugando()) return;
    var r = lienzo.getBoundingClientRect();
    jug.x = Math.max(jug.r, Math.min(W - jug.r, (e.clientX - r.left) * (W / r.width)));
  });
  lienzo.addEventListener('pointerdown', function (e) {
    if (estadoJ !== 'jugando') { jugar(); return; }
    var r = lienzo.getBoundingClientRect();
    jug.x = Math.max(jug.r, Math.min(W - jug.r, (e.clientX - r.left) * (W / r.width)));
  });
  // Pausa automática si el juego sale de la pantalla
  new IntersectionObserver(function (en) { if (!en[0].isIntersecting && estadoJ === 'jugando') jugar(); }, { threshold: 0.1 }).observe(lienzo);

  dibujar();
})();

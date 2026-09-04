// ==========================================
// 1. CARRUSEL DE FONDO (CROSSFADE PERFECTO)
// ==========================================
// PRO TIP: Variables sin tildes para evitar errores en servidores
const imagenesFondo = [
    'imagenes/imagen1.jpg',
    'imagenes/imagen2.jpg',
    'imagenes/imagen3.jpg'
];

const bg1 = document.getElementById('hero-bg-1');
const bg2 = document.getElementById('hero-bg-2');

if (bg1 && bg2) {
    let indiceActual = 0;
    let capaActiva = 1;
    
    // Carga inicial
    bg1.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${imagenesFondo[0]}')`;

    function cambiarFondo() {
        indiceActual = (indiceActual + 1) % imagenesFondo.length;
        const siguienteImagen = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${imagenesFondo[indiceActual]}')`;

        if (capaActiva === 1) {
            bg2.style.backgroundImage = siguienteImagen;
            bg2.classList.add('active');
            bg1.classList.remove('active');
            capaActiva = 2;
        } else {
            bg1.style.backgroundImage = siguienteImagen;
            bg1.classList.add('active');
            bg2.classList.remove('active');
            capaActiva = 1;
        }
    }
    setInterval(cambiarFondo, 4000); 
}

// ==========================================
// 2. MENÚ CELULAR Y BARRA SUPERIOR
// ==========================================
const mobileMenu = document.getElementById('mobile-menu');
const sidebar = document.getElementById('sidebar');
const navbar = document.getElementById('navbar');
const sidebarLinks = document.querySelectorAll('.sidebar-links li a');

if (mobileMenu && sidebar && navbar) {
    mobileMenu.addEventListener('click', () => {
        sidebar.classList.toggle('active');      
        navbar.classList.toggle('menu-open');    
        mobileMenu.classList.toggle('open');     
    });
}

sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (sidebar) sidebar.classList.remove('active');
        if (navbar) navbar.classList.remove('menu-open');
        if (mobileMenu) mobileMenu.classList.remove('open');
    });
});

// ==========================================
// 3. FILTROS DE ESPACIOS
// ==========================================
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const itemsEspacio = document.querySelectorAll('.item-espacio');

botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
        botonesFiltro.forEach(btn => btn.classList.remove('active'));
        boton.classList.add('active');

        const filtro = boton.getAttribute('data-filtro');

        itemsEspacio.forEach(item => {
            if (filtro === 'todos' || item.classList.contains(filtro)) {
                item.classList.remove('oculto');
            } else {
                item.classList.add('oculto');
            }
        });
    });
});

// ==========================================
// 8. LÓGICA DE LA BARRA DE PROGRESO "NOVEDADES"
// ==========================================
const carruselNovedades = document.getElementById('carrusel-novedades');
const barraProgreso = document.getElementById('barra-progreso');
const contadorNovedades = document.getElementById('contador-novedades');
const btnPrevNovedades = document.getElementById('prev-novedades');
const btnNextNovedades = document.getElementById('next-novedades');

if (carruselNovedades) {
    // Calcular el número total de tarjetas
    const totalItemsNovedades = document.querySelectorAll('.novedad-item').length;

    // Función que se ejecuta cada vez que mueves el carrusel
    carruselNovedades.addEventListener('scroll', () => {
        // ¿Cuánto podemos scrollear como máximo?
        const maxScrollLeft = carruselNovedades.scrollWidth - carruselNovedades.clientWidth;
        
        // Evitar división por cero si no hay scroll
        if (maxScrollLeft > 0) {
            // Porcentaje de 0 a 100
            const scrollPorcentaje = (carruselNovedades.scrollLeft / maxScrollLeft) * 100;
            
            // Llenar la barra negra
            if (barraProgreso) {
                // Empezamos en un % mínimo (ej. 25% para 4 items)
                const baseWidth = (1 / totalItemsNovedades) * 100;
                // La barra crece desde el baseWidth hasta el 100%
                barraProgreso.style.width = `calc(${baseWidth}% + ${(100 - baseWidth) * (scrollPorcentaje / 100)}%)`;
            }
            
            // Actualizar el número (01/04, 02/04, etc.)
            const slideActual = Math.round((carruselNovedades.scrollLeft / maxScrollLeft) * (totalItemsNovedades - 1)) + 1;
            if (contadorNovedades) {
                contadorNovedades.textContent = `0${slideActual}/0${totalItemsNovedades}`;
            }
        }
    });

    // Hacer funcionar las flechas
    if (btnNextNovedades) {
        btnNextNovedades.addEventListener('click', () => {
            // Avanza 400px a la derecha suavemente
            carruselNovedades.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }
    if (btnPrevNovedades) {
        btnPrevNovedades.addEventListener('click', () => {
            // Retrocede 400px a la izquierda suavemente
            carruselNovedades.scrollBy({ left: -400, behavior: 'smooth' });
        });
    }
}

// ==========================================
// 5. VISTA SHOWROOMS (MOSAICO / FEED)
// ==========================================
const btnVista = document.getElementById('btn-toggle-vista');
const contenedorShowrooms = document.getElementById('contenedor-showrooms');

if (btnVista && contenedorShowrooms) {
    btnVista.addEventListener('click', () => {
        if (contenedorShowrooms.classList.contains('vista-mosaico')) {
            contenedorShowrooms.classList.remove('vista-mosaico');
            contenedorShowrooms.classList.add('vista-feed');
            btnVista.innerHTML = 'Ver en modo Mosaico';
        } else {
            contenedorShowrooms.classList.remove('vista-feed');
            contenedorShowrooms.classList.add('vista-mosaico');
            btnVista.innerHTML = 'Ver en modo Feed';
        }
    });
}

// ==========================================
// 6. LÓGICA INFALIBLE DE ARRASTRE Y CLIC
// ==========================================
document.querySelectorAll('img, .textura-img').forEach(el => {
    el.addEventListener('dragstart', (e) => e.preventDefault());
});

const carruseles = [
    document.querySelector('.carrusel-texturas'),
    document.getElementById('contenedor-showrooms'),
    document.getElementById('carrusel-proyectos'),
    document.getElementById('carrusel-novedades'),
    document.getElementById('carrusel-acabados')
];

let isDragging = false; 

carruseles.forEach(carrusel => {
    if(!carrusel) return; 
    
    let isDown = false;
    let startX;
    let scrollLeft;

    carrusel.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false; 
        carrusel.style.cursor = 'grabbing';
        carrusel.style.scrollSnapType = 'none'; 
        startX = e.pageX - carrusel.offsetLeft;
        scrollLeft = carrusel.scrollLeft;
    });

    carrusel.addEventListener('mouseleave', () => {
        isDown = false;
        carrusel.style.cursor = 'grab';
        carrusel.style.scrollSnapType = 'x mandatory'; 
    });

    carrusel.addEventListener('mouseup', () => {
        isDown = false;
        carrusel.style.cursor = 'grab';
        carrusel.style.scrollSnapType = 'x mandatory'; 
    });

    carrusel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        
        const x = e.pageX - carrusel.offsetLeft;
        const walk = (x - startX) * 2; 
        
        if (Math.abs(walk) > 5) {
            isDragging = true;
        }
        
        e.preventDefault(); 
        carrusel.scrollLeft = scrollLeft - walk;
    });
});

// ==========================================
// 7. VISOR DE PANTALLA COMPLETA
// ==========================================
const modal = document.getElementById('modal-imagen');
const imgAmpliada = document.getElementById('img-ampliada');
const btnCerrarModal = document.querySelector('.cerrar-modal');
const imagenesGaleria = document.querySelectorAll('.img-galeria'); 

imagenesGaleria.forEach(img => {
    img.addEventListener('click', function(e) {
        if (isDragging) {
            e.preventDefault();
            return;
        }
        
        if(modal && imgAmpliada) {
            modal.style.display = 'block';
            imgAmpliada.src = this.src; 
        }
    });
});

if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
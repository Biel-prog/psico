document.addEventListener('DOMContentLoaded', () => {
    
    // Atualiza o ano no rodapé automaticamente para manter o site atualizado (SEO)
    const yearSpan = document.getElementById('ano-atual');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Configuração do Intersection Observer para as animações reveladoras (Scroll)
    // Isso melhora a experiência do usuário (UX) e diminui a taxa de rejeição
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1, // Elemento aparece quando 10% entra na tela
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');                
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Função para menu com scroll suave (Smooth Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Considera a altura do menu fixo
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
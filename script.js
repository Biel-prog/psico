document.addEventListener('DOMContentLoaded', () => {
    console.log("Javascript carregado com sucesso!");

    // 1. Atualiza ano no rodapé
    const yearSpan = document.getElementById('ano-atual');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Intersection Observer (Animação de Scroll)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 3. Lógica do Menu Hamburger Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const linksMobile = document.querySelectorAll('.nav-links li a');

    // Verifica se os elementos existem na tela
    if (hamburger && navLinks) {
        console.log("Menu Hamburger encontrado pelo Javascript!");

        hamburger.addEventListener('click', () => {
            console.log("Você clicou no menu hamburger!"); // Isso TEM que aparecer no console ao clicar
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        linksMobile.forEach(link => {
            link.addEventListener('click', () => {
                console.log("Você clicou em um link, fechando o menu...");
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    } else {
        console.error("ERRO: O Javascript não achou o .hamburger ou .nav-links no seu HTML.");
    }
});
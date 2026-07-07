document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Atualiza ano no rodapé
    const yearSpan = document.getElementById('ano-atual');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Animação de Scroll
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

    // 3. Menu Hamburger Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const linksMobile = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        linksMobile.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 4. LÓGICA DO ASSISTENTE VIRTUAL (CHATBOT)
    const chatbotToggler = document.querySelector('.chatbot-toggler');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const closeChat = document.querySelector('.close-chat');
    const chatBody = document.getElementById('chat-body');

    // Dados estruturados baseados no documento fornecido
    const faqData = [
        {
            q: "Onde ocorrem as sessões?",
            a: "Realizo atendimentos presenciais no meu consultório em Mogi das Cruzes, e também ofereço a modalidade de Psicoterapia Online para todo o Brasil."
        },
        {
            q: "Quais questões a terapia ajuda a tratar?",
            a: "O processo auxilia no enfrentamento de ansiedade, depressão, conflitos familiares, dificuldades nos relacionamentos, autoestima e luto."
        },
        {
            q: "Como funciona a sua abordagem?",
            a: "Trabalho com a abordagem psicanalítica. O foco é respeitar a sua história única e favorecer o autoconhecimento para lidar com os desafios da vida."
        },
        {
            q: "Você atende qual faixa etária?",
            a: "Meu atendimento psicológico é focado no acolhimento e desenvolvimento emocional de adultos."
        }
    ];

    if(chatbotToggler && chatbotWindow) {
        chatbotToggler.addEventListener('click', () => chatbotWindow.classList.toggle('show'));
        closeChat.addEventListener('click', () => chatbotWindow.classList.remove('show'));

        function showOptions() {
            const oldOptions = document.querySelector('.chat-options');
            if (oldOptions) oldOptions.remove();

            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'chat-options';

            faqData.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'chat-opt-btn';
                btn.textContent = item.q;
                btn.onclick = () => handleQuestionClick(item.q, item.a);
                optionsContainer.appendChild(btn);
            });

            // Botão Direto para o WhatsApp
            const zapBtn = document.createElement('a');
            zapBtn.href = "https://wa.me/5511983638648?text=Ol%C3%A1%2C%20estava%20no%20site%20e%20gostaria%20de%20agendar%20minha%20consulta."; 
            zapBtn.target = "_blank";
            zapBtn.className = 'chat-opt-btn chat-opt-action';
            zapBtn.textContent = "📲 Agendar consulta no WhatsApp";
            optionsContainer.appendChild(zapBtn);

            chatBody.appendChild(optionsContainer);
            setTimeout(() => chatBody.scrollTop = chatBody.scrollHeight, 100);
        }

        function handleQuestionClick(question, answer) {
            document.querySelector('.chat-options').remove();
            
            // Renderiza a pergunta
            chatBody.innerHTML += `<div class="chat-msg user-msg">${question}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;

            // Simula digitação e responde
            setTimeout(() => {
                chatBody.innerHTML += `<div class="chat-msg bot-msg">${answer}</div>`;
                showOptions();
            }, 800);
        }

        // Inicia o menu do bot
        showOptions();
    }
});
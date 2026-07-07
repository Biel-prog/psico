document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Atualiza ano no rodapé
    const yearSpan = document.getElementById('ano-atual');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Animação de Scroll (Intersection Observer)
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

    // Banco de Dados de Dúvidas (Atualizado com a opção de Reembolso/Convênio)
    const faqData = [
        {
            q: "Atende convênio ou particular?",
            a: "Os atendimentos são particulares, mas você pode usar o seu plano de saúde através do sistema de reembolso! Funciona assim: você realiza o pagamento da sessão, eu emito um recibo com o meu CRP, e você envia para o seu convênio devolver o valor para você (parcial ou total, dependendo do seu plano)."
        },
        {
            q: "Onde ocorrem as sessões?",
            a: "Realizo atendimentos presenciais em Mogi das Cruzes e também ofereço a modalidade de Psicoterapia Online."
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
            a: "Meu atendimento psicológico é focado no acolhimento e desenvolvimento emocional de jovens, adultos, casais e idosos."
        }
    ];

    if(chatbotToggler && chatbotWindow) {
        chatbotToggler.addEventListener('click', () => chatbotWindow.classList.toggle('show'));
        closeChat.addEventListener('click', () => chatbotWindow.classList.remove('show'));

        function showOptions() {
            // Remove opções antigas para não duplicar
            const oldOptions = document.querySelector('.chat-options');
            if (oldOptions) oldOptions.remove();

            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'chat-options';

            // Cria os botões de perguntas dinamicamente
            faqData.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'chat-opt-btn';
                btn.textContent = item.q;
                btn.onclick = () => handleQuestionClick(item.q, item.a);
                optionsContainer.appendChild(btn);
            });

            // Botão Direto para o WhatsApp destacado em verde
            const zapBtn = document.createElement('a');
            zapBtn.href = "https://wa.me/5511983638648?text=Ol%C3%A1%2C%20estava%20no%20site%20e%20gostaria%20de%20agendar%20minha%20consulta."; 
            zapBtn.target = "_blank";
            zapBtn.className = 'chat-opt-btn chat-opt-action';
            zapBtn.textContent = "📲 Agendar consulta no WhatsApp";
            optionsContainer.appendChild(zapBtn);

            chatBody.appendChild(optionsContainer);
            
            // Rola o chat para baixo automaticamente
            setTimeout(() => chatBody.scrollTop = chatBody.scrollHeight, 100);
        }

        function handleQuestionClick(question, answer) {
            // Remove as opções temporariamente enquanto o bot "pensa"
            document.querySelector('.chat-options').remove();
            
            // Renderiza a pergunta do usuário
            chatBody.innerHTML += `<div class="chat-msg user-msg">${question}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;

            // Simula um tempo de digitação (950 milissegundos) e lança a resposta
            setTimeout(() => {
                chatBody.innerHTML += `<div class="chat-msg bot-msg">${answer}</div>`;
                showOptions(); // Mostra as opções de novo
            }, 950);
        }

        // Inicia o menu do bot assim que o arquivo for carregado
        showOptions();
    }
});
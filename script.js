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

    // 4. LÓGICA DO ASSISTENTE VIRTUAL (CHATBOT) AVANÇADO
    const chatbotToggler = document.querySelector('.chatbot-toggler');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const closeChat = document.querySelector('.close-chat');
    const chatBody = document.getElementById('chat-body');

    // Banco de Dados com a resposta refinada e profissional sobre reembolso
    const faqData = [
        {
            q: "Atende convênio ou particular?",
            a: "Os atendimentos são realizados de forma particular, mas você pode utilizar o seu plano de saúde por meio do sistema de reembolso. Funciona assim: após o pagamento da sessão, emito um recibo oficial contendo o meu registro profissional (CRP) para que você apresente ao seu convênio e solicite a restituição. Essa devolução pode ser parcial ou total, por isso é fundamental consultar previamente as regras e condições específicas do seu plano."
        },
        {
            q: "Onde ocorrem as sesões?",
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

    if(chatbotToggler && chatbotWindow && chatBody) {
        
        // Abre o Chat
        chatbotToggler.addEventListener('click', () => {
            chatbotWindow.classList.toggle('show');
            // Se o chat estiver vazio, inicia a conversa do zero
            if(chatBody.innerHTML.trim() === '') {
                resetChat();
            }
        });

        // Fecha o Chat e zera a conversa
        closeChat.addEventListener('click', () => {
            chatbotWindow.classList.remove('show');
            // Aguarda a animação de fechar (300ms) e limpa todo o histórico
            setTimeout(() => {
                chatBody.innerHTML = '';
            }, 300);
        });

        // Função que reinicia tudo e dá as boas vindas
        function resetChat() {
            chatBody.innerHTML = `<div class="chat-msg bot-msg" id="msg-welcome">Olá! Sou o assistente virtual do Psicólogo Rogério Jefferson. Como posso te orientar hoje?</div>`;
            showOptions();
            chatBody.scrollTop = 0; // Garante que a visão comece colada no topo
        }

        // Renderiza os botões de opções
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

            const zapBtn = document.createElement('a');
            zapBtn.href = "https://wa.me/5511983638648?text=Ol%C3%A1%2C%20estava%20no%20site%20e%20gostaria%20de%20agendar%20minha%20consulta."; 
            zapBtn.target = "_blank";
            zapBtn.className = 'chat-opt-btn chat-opt-action';
            zapBtn.textContent = "📲 Agendar consulta no WhatsApp";
            optionsContainer.appendChild(zapBtn);

            chatBody.appendChild(optionsContainer);
        }

        // Fluxo: Clica na Pergunta -> Digitando -> Mostra Resposta -> Ajusta Scroll
        function handleQuestionClick(question, answer) {
            // Remove as opções de botões
            document.querySelector('.chat-options').remove();
            
            // Adiciona o balão azul com a pergunta do usuário
            chatBody.innerHTML += `<div class="chat-msg user-msg">${question}</div>`;
            
            // Adiciona o balão de "Digitando..." usando a classe do CSS
            const typingId = 'typing-' + Date.now();
            chatBody.innerHTML += `
                <div id="${typingId}" class="chat-msg bot-msg typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            `;
            
            // Desce o scroll para mostrar os pontinhos pulando
            chatBody.scrollTop = chatBody.scrollHeight;

            // Simula o tempo de digitação (1200 milissegundos)
            setTimeout(() => {
                // Remove a animação de digitação
                const typingIndicator = document.getElementById(typingId);
                if(typingIndicator) typingIndicator.remove();
                
                // Adiciona o balão com a resposta real
                const msgId = 'msg-' + Date.now();
                chatBody.innerHTML += `<div id="${msgId}" class="chat-msg bot-msg">${answer}</div>`;
                
                // Volta a mostrar as opções
                showOptions();
                
                // LÓGICA DO SCROLL: Foca exatamente no início da nova resposta
                const newMsg = document.getElementById(msgId);
                if (newMsg) {
                    chatBody.scrollTo({
                        top: newMsg.offsetTop - 15, // Dá um respiro de 15px para não colar no topo do widget
                        behavior: 'smooth'
                    });
                }
            }, 1200);
        }
    }
});
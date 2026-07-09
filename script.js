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

    // FIX: Força o navegador a medir a rolagem do ponto certo
    if(chatBody) {
        chatBody.style.position = 'relative';
    }

    const faqData = [
        {
            q: "Atende convênio ou particular?",
            a: "Os atendimentos são realizados de forma particular, mas você pode utilizar o seu plano de saúde por meio do sistema de reembolso. Funciona assim: após o pagamento da sessão, emito um recibo oficial contendo o meu registro profissional (CRP) para que você apresente ao seu convênio e solicite a restituição. Essa devolução pode ser parcial ou total, por isso é fundamental consultar previamente as regras e condições específicas do seu plano."
        },
        {
            q: "Onde ocorrem as sessões?",
            a: "Realizo atendimentos presenciais em Mogi das Cruzes e também ofereço a modalidade de Psicoterapia Online para todo o Brasil."
        },
        {
            q: "Quais questões a terapia ajuda a tratar?",
            a: "O processo auxilia no enfrentamento de ansiedade, depressão, conflitos familiares, dificuldades nos relacionamentos, autoestima, luto, entre outras demandas."
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
            if(chatBody.innerHTML.trim() === '') {
                resetChat();
            }
        });

        // Fecha o Chat
        closeChat.addEventListener('click', () => {
            chatbotWindow.classList.remove('show');
            setTimeout(() => {
                chatBody.innerHTML = '';
            }, 300);
        });

        // NOVA FUNÇÃO DE BOAS-VINDAS (COM 2 BALÕES E A FRASE ACOLHEDORA)
        function resetChat() {
            chatBody.innerHTML = `
                <div class="chat-msg bot-msg">Olá! Sou o assistente virtual do Psicólogo Rogério Jefferson.</div>
                <div class="chat-msg bot-msg">Dar o primeiro passo para cuidar da saúde emocional pode parecer difícil, mas você não precisa fazer isso sozinho(a). Estou aqui para ajudar a tornar esse processo mais simples.<br><br><strong>Como posso te orientar hoje?</strong></div>
            `;
            showOptions();
            
            // TIMEOUT VITAL: Dá 50 milissegundos para o renderizar os botões ANTES de travar a tela no topo
            setTimeout(() => {
                chatBody.scrollTop = 0;
            }, 50);
        }

        // Renderiza botões
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

        // Responde a pergunta
        function handleQuestionClick(question, answer) {
            document.querySelector('.chat-options').remove();
            
            chatBody.innerHTML += `<div class="chat-msg user-msg">${question}</div>`;
            
            const typingId = 'typing-' + Date.now();
            chatBody.innerHTML += `
                <div id="${typingId}" class="chat-msg bot-msg typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            `;
            
            // Joga pro fundo pra ver as bolinhas de digitação
            setTimeout(() => {
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 50);

            setTimeout(() => {
                const typingIndicator = document.getElementById(typingId);
                if(typingIndicator) typingIndicator.remove();
                
                const msgId = 'msg-' + Date.now();
                chatBody.innerHTML += `<div id="${msgId}" class="chat-msg bot-msg">${answer}</div>`;
                
                showOptions();
                
                // CÁLCULO MATEMÁTICO: Acha a distância exata da resposta e cola a visão nela.
                setTimeout(() => {
                    const newMsg = document.getElementById(msgId);
                    if (newMsg) {
                        chatBody.scrollTo({
                            top: newMsg.offsetTop - 15,
                            behavior: 'smooth'
                        });
                    }
                }, 50);
                
            }, 3000);
        }
    }
});
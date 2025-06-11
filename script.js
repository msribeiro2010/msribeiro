document.addEventListener('DOMContentLoaded', function() {
    // AI Neural Network Effect
    function createAIEffect() {
        const nameElement = document.getElementById('ai-name');
        const originalText = nameElement.textContent;
        
        // Palavras relacionadas à IA que aparecerão durante a animação
        const aiTerms = [
            'Neural Network', 'Deep Learning', 'Machine Learning', 'Artificial Intelligence',
            'Data Science', 'Algorithm', 'TensorFlow', 'PyTorch', 'Transformer',
            'Neural', 'Intelligence', 'Learning', 'AI Model', 'Training',
            'Prediction', 'Classification', 'Regression', 'Optimization'
        ];
        
        let currentTermIndex = 0;
        let isAnimating = false;
        
        function typewriterEffect(text, callback) {
            let i = 0;
            nameElement.textContent = '';
            nameElement.classList.add('ai-typing');
            
            const typing = setInterval(() => {
                if (i < text.length) {
                    nameElement.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    nameElement.classList.remove('ai-typing');
                    setTimeout(callback, 1000);
                }
            }, 80);
        }
        
        function eraseEffect(callback) {
            const currentText = nameElement.textContent;
            let i = currentText.length;
            nameElement.classList.add('ai-erasing');
            
            const erasing = setInterval(() => {
                if (i > 0) {
                    nameElement.textContent = currentText.substring(0, i - 1);
                    i--;
                } else {
                    clearInterval(erasing);
                    nameElement.classList.remove('ai-erasing');
                    callback();
                }
            }, 50);
        }
        
        function showAITerm() {
            const term = aiTerms[currentTermIndex];
            typewriterEffect(term, () => {
                setTimeout(() => {
                    eraseEffect(() => {
                        currentTermIndex = (currentTermIndex + 1) % aiTerms.length;
                        if (currentTermIndex === 0) {
                            // Volta para o nome original após mostrar todos os termos
                            typewriterEffect(originalText, () => {
                                setTimeout(startAIAnimation, 8000);
                            });
                        } else {
                            showAITerm();
                        }
                    });
                }, 1500);
            });
        }
        
        function startAIAnimation() {
            if (isAnimating) return;
            isAnimating = true;
            
            eraseEffect(() => {
                currentTermIndex = 0;
                showAITerm();
                isAnimating = false;
            });
        }
        
        // Adicionar efeito de partículas neurais
        function createNeuralParticles() {
            const container = nameElement.parentElement;
            container.style.position = 'relative';
            
            for (let i = 0; i < 6; i++) {
                const particle = document.createElement('div');
                particle.className = 'neural-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
                    border-radius: 50%;
                    animation: neuralFloat ${3 + Math.random() * 2}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    opacity: 0.7;
                `;
                container.appendChild(particle);
            }
        }
        
        // Iniciar animação após carregamento
        setTimeout(() => {
            createNeuralParticles();
            startAIAnimation();
        }, 3000);
    }
    
    createAIEffect();
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    });

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .project-card, .skill-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // EmailJS Configuration
    // CONFIGURE SUAS CHAVES AQUI - NÃO COMMITAR AS CHAVES REAIS
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Substitua pela sua chave
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Substitua pelo seu service ID
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Substitua pelo seu template ID
    
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Verificar se as chaves foram configuradas
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            showNotification('Configure as chaves do EmailJS primeiro!', 'error');
            return;
        }
        
        // Mostrar loading
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Enviar email via EmailJS
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
            .then(function(response) {
                console.log('Email enviado com sucesso!', response.status, response.text);
                
                // Mostrar sucesso
                showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                contactForm.reset();
                
            }, function(error) {
                console.log('Erro ao enviar email:', error);
                showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.', 'error');
            })
            .finally(function() {
                // Restaurar botão
                btnText.style.display = 'inline-block';
                btnSpinner.style.display = 'none';
                submitBtn.disabled = false;
            });
    });
    
    // Função para mostrar notificações
    function showNotification(message, type) {
        // Remover notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remover após 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Smooth scroll - CORRIGIDO para funcionar corretamente
    function initSmoothScroll() {
        // Aguardar DOM estar completamente carregado
        setTimeout(() => {
            const links = document.querySelectorAll('a[href^="#"]');
            console.log('Links encontrados:', links.length); // Debug
            
            links.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    
                    console.log('🎯 Clicou no link:', targetId);
                    console.log('🎯 Target encontrado:', target);
                    
                    if (target) {
                        const navbarHeight = 100;
                        const targetPosition = target.offsetTop - navbarHeight;
                        
                        console.log('🚀 Scrolling para posição:', targetPosition);
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Fechar menu mobile
                        const navMenu = document.querySelector('.nav-menu');
                        const hamburger = document.querySelector('.hamburger');
                        if (navMenu && hamburger) {
                            navMenu.classList.remove('active');
                            hamburger.classList.remove('active');
                        }
                    }
                });
            });
        }, 100);
    }
    
    // Inicializar scroll suave
    initSmoothScroll();

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
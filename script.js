// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialiser les animations
    initProgressBars();
    createAnimatedSphere();
    initNavInteractions();
    
    // Animation des barres de progression
    function initProgressBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        
        // Observer pour déclencher l'animation quand les barres sont visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFill = entry.target;
                    const width = progressFill.getAttribute('data-width');
                    
                    // Délai pour l'animation
                    setTimeout(() => {
                        progressFill.style.width = width + '%';
                    }, 500);
                    
                    observer.unobserve(progressFill);
                }
            });
        }, { threshold: 0.5 });
        
        progressFills.forEach(fill => {
            observer.observe(fill);
        });
    }
    
    // Créer la sphère animée avec des points
    function createAnimatedSphere() {
        const sphere = document.getElementById('animatedSphere');
        const numDots = 150;
        
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'sphere-dot';
            
            // Position aléatoire dans la sphère
            const angle1 = Math.random() * Math.PI * 2;
            const angle2 = Math.random() * Math.PI;
            const radius = Math.random() * 180 + 20;
            
            const x = Math.cos(angle1) * Math.sin(angle2) * radius + 200;
            const y = Math.sin(angle1) * Math.sin(angle2) * radius + 200;
            const z = Math.cos(angle2) * radius;
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            dot.style.zIndex = Math.floor(z);
            
            // Animation aléatoire pour chaque point
            const delay = Math.random() * 2;
            const duration = 2 + Math.random() * 3;
            
            dot.style.animationDelay = delay + 's';
            dot.style.animationDuration = duration + 's';
            
            // Couleur aléatoire entre bleu et blanc
            const colors = ['#4a90e2', '#ffffff', '#00d2d3', '#2ecc71'];
            dot.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            sphere.appendChild(dot);
        }
        
        // Animation de rotation de la sphère
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            sphere.style.transform = `rotateY(${rotation}deg)`;
        }, 50);
    }
    
    // Interactions de navigation
    function initNavInteractions() {
        const navLinks = document.querySelectorAll('.nav-link');
        const quickLinks = document.querySelectorAll('.quick-link');
        
        // Effet hover pour les liens de navigation
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Effet hover pour les liens rapides
        quickLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.paddingLeft = '20px';
                this.style.transition = 'padding-left 0.3s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.paddingLeft = '0';
            });
        });
    }
    
    // Animation d'apparition au scroll
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.hero-title, .main-stat-card, .bonus-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            observer.observe(element);
        });
    }
    
    // Initialiser les animations de scroll
    initScrollAnimations();
    
    // Animation des statistiques (compteur)
    function animateCounters() {
        const mainStatValue = document.querySelector('.main-stat-value');
        const subStatValues = document.querySelectorAll('.sub-stat-value');
        
        // Animation du compteur principal
        const targetValue = 1475898140000;
        let currentValue = 0;
        const increment = targetValue / 100;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            
            mainStatValue.textContent = '$' + Math.floor(currentValue).toLocaleString() + '.000';
        }, 50);
    }
    
    // Démarrer l'animation des compteurs après un délai
    setTimeout(animateCounters, 1000);
    
    // Effet de particules en arrière-plan
    function createBackgroundParticles() {
        const body = document.body;
        const numParticles = 50;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'rgba(74, 144, 226, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Animation de mouvement
            const duration = 10 + Math.random() * 20;
            const delay = Math.random() * 5;
            
            particle.style.animation = `floatParticle ${duration}s ${delay}s infinite linear`;
            
            body.appendChild(particle);
        }
    }
    
    // Ajouter l'animation CSS pour les particules
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Créer les particules d'arrière-plan
    createBackgroundParticles();
    
    // Gestion du redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        // Recalculer les positions si nécessaire
        const sphere = document.getElementById('animatedSphere');
        if (sphere && window.innerWidth < 768) {
            sphere.style.width = '250px';
            sphere.style.height = '250px';
        } else if (sphere) {
            sphere.style.width = '400px';
            sphere.style.height = '400px';
        }
    });
    
    // Effet de parallaxe léger
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const sphere = document.getElementById('animatedSphere');
        
        if (sphere) {
            sphere.style.transform = `translateY(${scrolled * 0.1}px) rotateY(${scrolled * 0.1}deg)`;
        }
    });
    
    console.log('SENBE-COIN Header initialized successfully!');
});

// Fonction utilitaire pour formater les nombres
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Fonction pour mettre à jour les statistiques (peut être appelée depuis l'extérieur)
function updateStats(newStats) {
    if (newStats.totalStock) {
        document.querySelector('.main-stat-value').textContent = '$' + newStats.totalStock.toLocaleString() + '.000';
    }
    
    if (newStats.progressDay) {
        const dayProgress = document.querySelector('.red-progress');
        const dayPercentage = document.querySelector('.progress-item:first-child .progress-percentage');
        dayProgress.style.width = newStats.progressDay + '%';
        dayPercentage.textContent = newStats.progressDay + '%';
    }
    
    if (newStats.progressWeek) {
        const weekProgress = document.querySelector('.green-progress');
        const weekPercentage = document.querySelector('.progress-item:last-child .progress-percentage');
        weekProgress.style.width = newStats.progressWeek + '%';
        weekPercentage.textContent = newStats.progressWeek + '%';
    }
}



// Fonctions pour la nouvelle section du diagramme de flux
function initFlowDiagram() {
    createConnectionLines();
    initCardInteractions();
    createFlowParticles();
    initCentralNodeAnimation();
}

// Créer les lignes de connexion entre les cartes et le nœud central
function createConnectionLines() {
    const centralNode = document.querySelector('.central-node');
    const cards = document.querySelectorAll('.card');
    const wrapper = document.querySelector('.flow-diagram-wrapper');
    
    if (!centralNode || !cards.length || !wrapper) return;
    
    cards.forEach((card, index) => {
        const line = document.createElement('div');
        line.className = 'connection-line';
        line.style.animationDelay = (index * 0.2) + 's';
        
        // Calculer la position et l'angle de la ligne
        updateConnectionLine(line, card, centralNode);
        
        wrapper.appendChild(line);
        
        // Mettre à jour la ligne lors du redimensionnement
        window.addEventListener('resize', () => {
            updateConnectionLine(line, card, centralNode);
        });
    });
}

// Mettre à jour la position et l'angle d'une ligne de connexion
function updateConnectionLine(line, card, centralNode) {
    const cardRect = card.getBoundingClientRect();
    const centralRect = centralNode.getBoundingClientRect();
    const wrapperRect = document.querySelector('.flow-diagram-wrapper').getBoundingClientRect();
    
    // Calculer les positions relatives au wrapper
    const cardX = cardRect.left - wrapperRect.left + cardRect.width / 2;
    const cardY = cardRect.top - wrapperRect.top + cardRect.height / 2;
    const centralX = centralRect.left - wrapperRect.left + centralRect.width / 2;
    const centralY = centralRect.top - wrapperRect.top + centralRect.height / 2;
    
    // Calculer la distance et l'angle
    const deltaX = centralX - cardX;
    const deltaY = centralY - cardY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    // Appliquer les styles
    line.style.width = distance + 'px';
    line.style.left = cardX + 'px';
    line.style.top = cardY + 'px';
    line.style.transform = `rotate(${angle}deg)`;
}

// Initialiser les interactions des cartes
function initCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const cardIcon = card.querySelector('.card-icon');
        const cardButton = card.querySelector('.card-button');
        
        // Effet hover sur la carte
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            cardIcon.style.transform = 'scale(1.1)';
            cardIcon.style.boxShadow = cardIcon.style.boxShadow.replace('0.4', '0.8');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            cardIcon.style.transform = 'scale(1)';
            cardIcon.style.boxShadow = cardIcon.style.boxShadow.replace('0.8', '0.4');
        });
        
        // Effet clic sur le bouton
        cardButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Animation de clic
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 100);
            
            // Effet de ripple
            createRippleEffect(this, e);
            
            // Simuler une action
            console.log('Bouton cliqué pour:', card.querySelector('.card-title').textContent);
        });
        
        // Clic sur la carte entière
        card.addEventListener('click', function() {
            // Animation de sélection
            this.style.borderColor = 'rgba(74, 144, 226, 0.8)';
            this.style.background = 'rgba(74, 144, 226, 0.1)';
            
            setTimeout(() => {
                this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                this.style.background = 'rgba(30, 41, 59, 0.8)';
            }, 300);
            
            console.log('Carte sélectionnée:', this.querySelector('.card-title').textContent);
        });
    });
}

// Créer l'effet de ripple sur les boutons
function createRippleEffect(button, event) {
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Créer des particules flottantes pour la section
function createFlowParticles() {
    const section = document.querySelector('.flow-diagram-section');
    if (!section) return;
    
    const numParticles = 30;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'flow-particle';
        
        const x = Math.random() * window.innerWidth;
        const delay = Math.random() * 8;
        const duration = 8 + Math.random() * 4;
        
        particle.style.left = x + 'px';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        // Couleurs variées
        const colors = [
            'rgba(74, 144, 226, 0.6)',
            'rgba(147, 51, 234, 0.6)',
            'rgba(16, 163, 127, 0.6)',
            'rgba(255, 107, 53, 0.6)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        section.appendChild(particle);
    }
}

// Animation avancée du nœud central
function initCentralNodeAnimation() {
    const centralNode = document.querySelector('.central-node');
    const centralIcon = document.querySelector('.central-icon');
    
    if (!centralNode || !centralIcon) return;
    
    // Animation de rotation continue
    let rotation = 0;
    setInterval(() => {
        rotation += 0.5;
        centralIcon.style.transform = `rotate(${rotation}deg)`;
    }, 100);
    
    // Effet de pulsation au clic
    centralNode.addEventListener('click', function() {
        this.style.transform = 'scale(1.2)';
        this.style.boxShadow = '0 0 80px rgba(74, 144, 226, 1)';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 40px rgba(74, 144, 226, 0.6)';
        }, 300);
        
        // Effet d'onde
        createWaveEffect(this);
    });
}

// Créer un effet d'onde depuis le nœud central
function createWaveEffect(centralNode) {
    const wave = document.createElement('div');
    wave.style.position = 'absolute';
    wave.style.top = '50%';
    wave.style.left = '50%';
    wave.style.width = '120px';
    wave.style.height = '120px';
    wave.style.border = '2px solid rgba(74, 144, 226, 0.8)';
    wave.style.borderRadius = '50%';
    wave.style.transform = 'translate(-50%, -50%) scale(1)';
    wave.style.opacity = '1';
    wave.style.animation = 'waveExpand 1.5s ease-out forwards';
    wave.style.pointerEvents = 'none';
    
    centralNode.style.position = 'relative';
    centralNode.appendChild(wave);
    
    setTimeout(() => {
        wave.remove();
    }, 1500);
}

// Ajouter les animations CSS pour les nouveaux effets
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes waveExpand {
        to {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
    
    .card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .card-icon {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .card-button {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .central-node {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
    }
    
    .central-icon {
        transition: transform 0.1s linear;
    }
`;
document.head.appendChild(additionalStyles);

// New Section
  // Create background particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 80;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                // Random animation delay and duration
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (4 + Math.random() * 4) + 's';
                
                // Random opacity and size
                const opacity = 0.2 + Math.random() * 0.6;
                const size = 1 + Math.random() * 2;
                particle.style.opacity = opacity;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                particlesContainer.appendChild(particle);
            }
        }

        // Add interactive hover effects
        function addHoverEffects() {
            const toolCards = document.querySelectorAll('.tool-card');
            
            toolCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    // Add ripple effect
                    const ripple = document.createElement('div');
                    ripple.style.position = 'absolute';
                    ripple.style.width = '100px';
                    ripple.style.height = '100px';
                    ripple.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)';
                    ripple.style.borderRadius = '50%';
                    ripple.style.top = '50%';
                    ripple.style.left = '50%';
                    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
                    ripple.style.animation = 'ripple 0.8s ease-out';
                    ripple.style.pointerEvents = 'none';
                    
                    card.appendChild(ripple);
                    
                    setTimeout(() => {
                        if (card.contains(ripple)) {
                            card.removeChild(ripple);
                        }
                    }, 800);
                });

                // Click effect
                card.addEventListener('click', function() {
                    card.style.transform = 'translateY(-12px) scale(1.05)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 200);
                });
            });
        }

        // Add ripple animation to CSS
        function addRippleAnimation() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        // Animate tool cards on page load
        function animateCardsOnLoad() {
            const toolCards = document.querySelectorAll('.tool-card');
            
            toolCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100 + 500);
            });
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            addRippleAnimation();
            addHoverEffects();
            animateCardsOnLoad();
        });

        // Add mouse movement effect
        document.addEventListener('mousemove', function(e) {
            const centralLogo = document.querySelector('.central-logo');
            const rect = centralLogo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const deltaX = (mouseX - centerX) * 0.01;
            const deltaY = (mouseY - centerY) * 0.01;
            
            centralLogo.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        // Animate cards on scroll
function animateStepsOnScroll() {
    const stepCards = document.querySelectorAll('.step-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    stepCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

// Add this to your existing DOMContentLoaded function
animateStepsOnScroll();



// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Animation de défilement fluide pour les liens de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    // Effet de changement de couleur de la barre de navigation en fonction du défilement
    const header = document.querySelector('header');
    const changeColorOnScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', changeColorOnScroll);

    // Effet d'apparition des sections lors du défilement
    const sections = document.querySelectorAll('section');

    const revealOnScroll = () => {
        const viewportHeight = window.innerHeight;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const revealPoint = 150;

            if (sectionTop < viewportHeight - revealPoint) {
                section.classList.add('fade-in');
            }
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Gestion de la modale
    const projectLinks = document.querySelectorAll('.project-link');
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const closeModalBtn = document.createElement('button');

    modal.classList.add('modal');
    modalContent.classList.add('modal-content');
    closeModalBtn.textContent = 'Fermer';
    closeModalBtn.classList.add('close-modal');

    modalContent.appendChild(closeModalBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = link.getAttribute('data-project');
            showModal(projectId);
        });
    });

    function showModal(projectId) {
        modalContent.innerHTML = `<button class="close-modal">Fermer</button><h2>Détails du projet ${projectId}</h2><p>Contenu du projet ${projectId}</p>`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal')) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});


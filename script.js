document.addEventListener('DOMContentLoaded', () => {
  emailjs.init('N3wNxTSbAf3AiDbBb');

  // ── Hamburger menu ──────────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu de navegação');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
      });
    });
  }

  // ── Active nav link via IntersectionObserver ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === entry.target.id);
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach(section => observer.observe(section));

  // ── Contact form ─────────────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const submitBtn   = document.getElementById('submit-btn');
  const btnText     = document.getElementById('btn-text');
  const btnSpinner  = document.getElementById('btn-spinner');
  const dateHidden  = document.getElementById('date_time');
  const formStatus  = document.getElementById('form-status');

  function setLoading(loading) {
    submitBtn.disabled = loading;
    btnText.style.display    = loading ? 'none'         : 'inline-block';
    btnSpinner.style.display = loading ? 'inline-block' : 'none';
  }

  function validate() {
    const name    = contactForm.from_name.value.trim();
    const email   = contactForm.from_email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name) {
      showNotification('Por favor, preencha seu nome.', 'error');
      contactForm.from_name.focus();
      return false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification('Por favor, informe um e-mail válido.', 'error');
      contactForm.from_email.focus();
      return false;
    }
    if (!message) {
      showNotification('Por favor, escreva sua mensagem.', 'error');
      contactForm.message.focus();
      return false;
    }
    return true;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validate()) return;

    dateHidden.value = new Date().toLocaleString('pt-BR');
    setLoading(true);

    emailjs.sendForm('service_i6xu6r1', 'template_63xjy0t', contactForm)
      .then(() => {
        showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
        contactForm.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        const detail = error?.text || error?.message || JSON.stringify(error);
        showNotification(`Erro ao enviar mensagem. Tente novamente. (${detail})`, 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  });

  function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Update aria-live region for screen readers
    if (formStatus) formStatus.textContent = message;

    const div = document.createElement('div');
    div.className = `notification notification-${type}`;
    div.setAttribute('role', 'alert');
    div.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}" aria-hidden="true"></i>
        <span>${message}</span>
        <button class="notification-close" aria-label="Fechar notificação" onclick="this.closest('.notification').remove()">
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>`;
    document.body.appendChild(div);

    setTimeout(() => { if (div.isConnected) div.remove(); }, 6000);
  }
});

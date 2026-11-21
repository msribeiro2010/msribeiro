document.addEventListener('DOMContentLoaded', () => {
  if (window.emailjs) {
    emailjs.init('K7F_DE0sdVjTwV0P5');
  }

  const toggle = document.querySelector('.menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  function setMenu(open) {
    if (!toggle || !navMenu) return;
    navMenu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu de navegação');
  }

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const current = link.dataset.section === entry.target.id;
          if (current) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const dateHidden = document.getElementById('date_time');
  const formStatus = document.getElementById('form-status');

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.setAttribute('aria-busy', String(loading));
    btnText.textContent = loading ? 'Enviando…' : 'Enviar mensagem';
  }

  function setFieldError(input, message) {
    const error = document.getElementById(`${input.id}-error`);
    if (!error) return;
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      error.hidden = false;
      error.textContent = message;
    } else {
      input.removeAttribute('aria-invalid');
      error.hidden = true;
      error.textContent = '';
    }
  }

  function clearErrors() {
    ['name', 'from_email', 'title'].forEach((id) => {
      const field = contactForm.elements[id];
      if (field) setFieldError(field, '');
    });
  }

  function validate() {
    clearErrors();
    const name = contactForm.name.value.trim();
    const email = contactForm.from_email.value.trim();
    const message = contactForm.title.value.trim();

    if (!name) {
      setFieldError(contactForm.name, 'Informe seu nome.');
      contactForm.name.focus();
      return false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError(contactForm.from_email, 'Informe um e-mail válido.');
      contactForm.from_email.focus();
      return false;
    }
    if (!message) {
      setFieldError(contactForm.title, 'Escreva sua mensagem.');
      contactForm.title.focus();
      return false;
    }
    return true;
  }

  function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    if (formStatus) formStatus.textContent = message;

    const div = document.createElement('div');
    div.className = `notification notification-${type}`;
    div.setAttribute('role', 'alert');

    const content = document.createElement('div');
    content.className = 'notification-content';

    const text = document.createElement('p');
    text.textContent = message;

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'notification-close';
    close.setAttribute('aria-label', 'Fechar notificação');
    close.textContent = '×';
    close.addEventListener('click', () => div.remove());

    content.append(text, close);
    div.append(content);
    document.body.appendChild(div);

    window.setTimeout(() => {
      if (div.isConnected) div.remove();
    }, 6000);
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate()) return;

    if (!window.emailjs) {
      showNotification('Não foi possível enviar agora. Escreva para msribeiro2010@gmail.com.', 'error');
      return;
    }

    dateHidden.value = new Date().toLocaleString('pt-BR');
    setLoading(true);

    emailjs
      .sendForm('service_mh1iza9', 'template_pj3lwlp', contactForm)
      .then(() => {
        showNotification('Mensagem enviada com sucesso. Entrarei em contato em breve.', 'success');
        contactForm.reset();
        clearErrors();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        showNotification('Não foi possível enviar a mensagem. Tente de novo ou use o e-mail.', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  });
});

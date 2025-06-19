/*  script.js – completa a UI + animações + EmailJS  */
document.addEventListener('DOMContentLoaded', () => {

  /* ========= NAVBAR, ANIMAÇÕES, SCROLL SUAVE (código existente) ===== */
  // ... deixe aqui todo o bloco de animações e interações já presente ...

  /* ========= EmailJS =============================================== */
  emailjs.init('N3wNxTSbAf3AiDbBb');             // substitua pela sua Public Key

  const contactForm = document.getElementById('contact-form');
  const submitBtn   = document.getElementById('submit-btn');
  const btnText     = document.getElementById('btn-text');
  const btnSpinner  = document.getElementById('btn-spinner');
  const dateHidden  = document.getElementById('date_time');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    /* 1. Preenche o campo oculto com a data/hora atual */
    dateHidden.value = new Date().toLocaleString('pt-BR');

    /* 2. UI → loading */
    btnText.style.display   = 'none';
    btnSpinner.style.display = 'inline-block';
    submitBtn.disabled       = true;

    /* 3. Envia o formulário */
    emailjs.sendForm(
      'service_i6xu6r1',     // Service ID
      'template_63xjy0t',    // Template ID (usa {{from_name}}, {{from_email}}, {{message}}, {{date_time}})
      contactForm
    )
    .then(() => {
      showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
      contactForm.reset();
    })
    .catch((error) => {
      console.error('Erro ao enviar email:', error);
      showNotification('Erro ao enviar mensagem. Tente novamente ou contate-me diretamente.', 'error');
    })
    .finally(() => {
      btnText.style.display   = 'inline-block';
      btnSpinner.style.display = 'none';
      submitBtn.disabled       = false;
    });
  });

  /* ========= Notificações (já existente ou adapte) ================== */
  function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.className = `notification notification-${type}`;
    div.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>`;
    document.body.appendChild(div);

    setTimeout(() => div.remove(), 5000);
  }
});

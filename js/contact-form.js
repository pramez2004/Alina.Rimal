// ===========================================================
// CONTACT FORM — frontend validation + UI states, delivered
// via FormSubmit (https://formsubmit.co) — no backend/account
// needed. Submissions are emailed to alinarimal38@gmail.com.
//
// IMPORTANT (one-time step): the FIRST submission from this
// site will make FormSubmit send a confirmation email to
// alinarimal38@gmail.com asking to activate this form. Until
// that link is clicked, submissions won't be delivered. After
// that one click, every future submission arrives normally —
// no further setup needed.
// ===========================================================

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/alinarimal38@gmail.com';

function sendMessage(formData) {
  return fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData,
  }).then((res) => {
    if (!res.ok) throw new Error('Send failed');
    return { ok: true };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');

  const validators = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email.'),
    category: (v) => (v ? '' : 'Please choose a collaboration type.'),
    message: (v) => (v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'),
  };

  function setFieldError(field, message) {
    const wrap = field.closest('.field');
    const errorEl = wrap.querySelector('.field-error');
    wrap.classList.toggle('has-error', Boolean(message));
    if (errorEl) errorEl.textContent = message;
  }

  function validateField(field) {
    const validator = validators[field.name];
    if (!validator) return true;
    const message = validator(field.value);
    setFieldError(field, message);
    return !message;
  }

  Array.from(form.elements).forEach((field) => {
    if (validators[field.name]) {
      field.addEventListener('blur', () => validateField(field));
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = Array.from(form.elements).filter((f) => validators[f.name]);
    const allValid = fields.map(validateField).every(Boolean);

    status.className = 'form-status';
    status.textContent = '';

    if (!allValid) {
      status.textContent = 'Please fix the highlighted fields above.';
      status.classList.add('show', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const formData = new FormData(form);
      const result = await sendMessage(formData);
      if (result.ok) {
        status.textContent = "Thank you! Your message has been noted — I'll get back to you soon.";
        status.classList.add('show', 'success');
        form.reset();
      } else {
        throw new Error('Send failed');
      }
    } catch (err) {
      status.textContent = 'Something went wrong sending your message. Please try again or email directly.';
      status.classList.add('show', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
});

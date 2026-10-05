/* ==========================================================================
   Curso Funcional Odoo 20 Localización Peruana - Interactive App Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
initAccordion();
  initRoiCalculator();
  initModal();
});

/* --------------------------------------------------------------------------
   1. Syllabus Accordion Logic
   -------------------------------------------------------------------------- */
function initAccordion() {
  const moduleHeaders = document.querySelectorAll('.module-header');

  moduleHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.parentElement;
      const isActive = card.classList.contains('active');

      // Close all other cards
      document.querySelectorAll('.module-card').forEach(c => c.classList.remove('active'));

      if (!isActive) {
        card.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. ROI & Time Savings Calculator
   -------------------------------------------------------------------------- */
function initRoiCalculator() {
  const invoiceSlider = document.getElementById('roi-slider');
  const invoiceCountLabel = document.getElementById('roi-invoice-count');
  const hoursSavedLabel = document.getElementById('roi-hours-saved');
  const moneySavedLabel = document.getElementById('roi-money-saved');

  if (!invoiceSlider) return;

  invoiceSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    invoiceCountLabel.textContent = `${val} comprobantes/mes`;

    // Estimate 15 mins saved per invoice in SIRE & SUNAT validation
    const hoursSaved = Math.round((val * 15) / 60);
    // Estimate S/ 35 per hour of accounting work + multas avoided
    const moneySaved = Math.round(hoursSaved * 45 + (val > 100 ? 1500 : 500));

    hoursSavedLabel.textContent = `${hoursSaved} hrs/mes`;
    moneySavedLabel.textContent = `S/ ${moneySaved.toLocaleString('es-PE')}`;
  });
}

/* --------------------------------------------------------------------------
   3. Modal Registration Form Logic
   -------------------------------------------------------------------------- */
function initModal() {
  const modal = document.getElementById('enroll-modal');
  const btnOpenList = document.querySelectorAll('.btn-enroll');
  const btnClose = document.getElementById('close-modal');
  const form = document.getElementById('enroll-form');

  if (!modal) return;

  btnOpenList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por tu interés en Gemastic Academy! Un asesor se pondrá en contacto contigo para orientarte sobre cursos y membresías.');
      modal.classList.remove('active');
    });
  }
}

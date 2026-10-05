/* ==========================================================================
   Curso Funcional Odoo 20 Localización Peruana - Interactive App Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSimulator();
  initAccordion();
  initRoiCalculator();
  initModal();
});

/* --------------------------------------------------------------------------
   1. Interactive SUNAT & Odoo 20 Comprobante Simulator
   -------------------------------------------------------------------------- */
function initSimulator() {
  const docTypeSelect = document.getElementById('sim-doc-type');
  const rucInput = document.getElementById('sim-ruc');
  const amountInput = document.getElementById('sim-amount');
  const detractionCheck = document.getElementById('sim-detraction');
  const btnSimulate = document.getElementById('btn-simulate');
  const outputBox = document.getElementById('sim-output-text');

  if (!btnSimulate || !outputBox) return;

  btnSimulate.addEventListener('click', () => {
    const docType = docTypeSelect.value;
    const ruc = rucInput.value || '20601234567';
    const amount = parseFloat(amountInput.value) || 1180.00;
    const isDetraction = detractionCheck.checked;

    // Calculation SUNAT IGV 18%
    const baseAmount = (amount / 1.18).toFixed(2);
    const igvAmount = (amount - baseAmount).toFixed(2);
    const detractionAmount = isDetraction ? (amount * 0.12).toFixed(2) : 0;

    let docName = 'FACTURA ELECTRÓNICA';
    let docSerie = 'F001-00004521';
    let accountDebt = '12121 - Facturas Emitidas en Cartera (PEN)';

    if (docType === '03') {
      docName = 'BOLETA DE VENTA ELECTRÓNICA';
      docSerie = 'B001-00008912';
    } else if (docType === '07') {
      docName = 'NOTA DE CRÉDITO ELECTRÓNICA';
      docSerie = 'FC01-00000341';
      accountDebt = '12129 - Notas de Crédito por Aplicar (PEN)';
    } else if (docType === '09') {
      docName = 'GUÍA DE REMISIÓN ELECTRÓNICA REMITENTE (GRE)';
      docSerie = 'EG01-00001209';
    }

    outputBox.innerHTML = `<span style="color: #6EE7B7;">⚡ [ODOO 20 LOCALIZACIÓN PERUANA] PROCESANDO CON SUNAT OSE...</span>\n` +
      `------------------------------------------------------------\n` +
      `• ESTADO SUNAT: <span style="color: #34D399; font-weight: bold;">[ACEPTADO] ✅ (CDR Recibido de SUNAT)</span>\n` +
      `• TIPO COMPROBANTE: ${docName} (${docSerie})\n` +
      `• ADQUIRIENTE / RUC: ${ruc} - RAZÓN SOCIAL VALIDADA RUC AL DÍA\n` +
      `------------------------------------------------------------\n` +
      `• MONTO GRAVADO: S/ ${baseAmount}\n` +
      `• IGV (18% SUNAT): S/ ${igvAmount}\n` +
      `• IMPORTE TOTAL: S/ ${amount.toFixed(2)}\n` +
      (isDetraction ? `• DETRACCIÓN SPOT (12%): S/ ${detractionAmount} (Archivo BN Masivo Generado)\n` : '') +
      `------------------------------------------------------------\n` +
      `• ASIENTO CONTABLE AUTOMÁTICO PCGE EN ODOO 20:\n` +
      `   [DEBE]  ${accountDebt}: S/ ${amount.toFixed(2)}\n` +
      `   [HABER] 70111 - Venta Mercaderías Manufacturadas: S/ ${baseAmount}\n` +
      `   [HABER] 40111 - IGV Cuenta Propia (SUNAT): S/ ${igvAmount}\n` +
      `------------------------------------------------------------\n` +
      `• FIRMA DIGITAL XML UBL 2.1: SHA-256 Validado OK\n` +
      `• CÓDIGO QR SUNAT: Generado e impreso en el PDF nativo`;
  });
}

/* --------------------------------------------------------------------------
   2. Syllabus Accordion Logic
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
   3. ROI & Time Savings Calculator
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
   4. Modal Registration Form Logic
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

function $(sel, root=document){return root.querySelector(sel)}
function $all(sel, root=document){return Array.from(root.querySelectorAll(sel))}

// Smooth anchor scroll
$all('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    const target = $(id);
    if (target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// Year in footer
$('#year').textContent = new Date().getFullYear();

// UTM capture
const params = new URLSearchParams(window.location.search);
['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach((k)=>{
  const v = params.get(k) || '';
  const el = document.getElementById(k);
  if (el) el.value = v;
});

// Plan selection from pricing buttons
$all('.select-plan').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const plan = btn.dataset.plan;
    const select = $('#plan');
    if (select){
      select.value = plan;
      $('#form').scrollIntoView({behavior:'smooth'});
    }
  });
});

// Lead form submit
const form = $('#lead-form');
const submitBtn = $('#submit-btn');
const successModal = $('#success-modal');

function toggleModal(show){
  successModal?.setAttribute('aria-hidden', show ? 'false' : 'true');
}
$all('[data-close]').forEach(el=>el.addEventListener('click',()=>toggleModal(false)));

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  if (!form.reportValidity()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok || !json.success){
      throw new Error(json.error || 'Falha ao enviar');
    }

    // Success
    form.reset();
    toggleModal(true);
  } catch (err){
    alert(err.message || 'Não foi possível enviar. Tente novamente.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Quero mais clientes';
  }
});
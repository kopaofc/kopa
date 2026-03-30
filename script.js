const WHATSAPP_NUMBER = '5554996472916';

const doses = [
  {id:'jackdaniels',name:'Jack Daniel\'s',price:15,image:'images/jackdaniels.jpg',popular:true},
  {id:'raiska',name:'Raíska',price:10,image:'images/raiska.jpg'},
  {id:'absolut',name:'Absolut Vodka',price:12,image:'images/absolut.jpg'},
  {id:'tanqueray',name:'Tanqueray Gin',price:14,image:'images/tanqueray.jpg'},
  {id:'tequila',name:'Tequila José Cuervo',price:13,image:'images/tequila.jpg'},
  {id:'sake',name:'Saquê',price:16,image:'images/sake.jpg'}
];

const energeticos = [
  {id:'redbull_473',name:'Red Bull 473ml',price:18,image:'images/redbull/redbull-473.png',popular:true},
  {id:'redbull_355',name:'Red Bull 355ml',price:16,image:'images/redbull/redbull-355.png'},

  {id:'monster_original',name:'Monster Original 473ml',price:9,image:'images/monster/monster_original-473.png'},
  {id:'monster_absolutely_zero',name:'Monster Absolutely Zero 473ml',price:9,image:'images/monster/monster_absolutelyzero-473.png'},
  {id:'monster_ultra_white',name:'Monster Ultra White 473ml',price:9,image:'images/monster/monster_ultrawhite-473.png'},
  {id:'monster_mango_loco',name:'Monster Juice Mango Loco 473ml',price:9,image:'images/monster/monster_mangoloco-473.png'},

  {id:'baly_tradicional',name:'Baly Tradicional 473ml',price:8,image:'images/baly/baly_tradicional-473.png'},
  {id:'baly_tropical',name:'Baly Tropical 473ml',price:8,image:'images/baly/baly_tropical-473.png'},
  {id:'baly_maca_verde',name:'Baly Maçã Verde 473ml',price:8,image:'images/baly/baly_macaverde-473.png'},
  {id:'baly_melancia',name:'Baly Melancia 473ml',price:8,image:'images/baly/baly_melancia-473.png'},
  {id:'baly_morango_pessego',name:'Baly Morango e Pêssego 473ml',price:8,image:'images/baly/baly_morangopessego-473.png'},
  {id:'baly_abacaxi_hortela',name:'Baly Abacaxi com Hortelã 473ml',price:8,image:'images/baly/baly_abacaxihortela-473.png'},
];

const iceFlavors = [
  {id:'limao',name:'Limão',price:7,image:'images/limao.jpg'},
  {id:'morango',name:'Morango', price:7,image:'images/morango.jpg'},
  {id:'maracuja',name:'Maracujá', price:7,image:'images/maracuja.jpg'},
  {id:'abacaxi',name:'Abacaxi',price:7,image:'images/abacaxi.jpg'},
  {id:'hortela',name:'Hortelã',price:7,image:'images/hortela.jpg'},
  {id:'sem',name:'Sem gelo',price:0,image:'images/sem.jpg'}
];

const predefinedCombos = [
  {
    id:'combo1',
    name:'Combo Clássico',
    image:'images/combo1.jpg',
    doses:{jackdaniels:1},
    energeticos:{redbull:1},
  },
  {
    id:'combo2',
    name:'Combo Tropical',
    image:'images/combo2.jpg',
    doses:{raiska:1, absolut:1},
    energeticos:{redbull:1, monster:1},
    ice:{maracuja:1, abacaxi:1}
  },
  {
    id:'combo3',
    name:'Combo Premium',
    image:'images/combo3.jpg',
    doses:{tanqueray:1, tequila:1},
    energeticos:{fusion:2},
    ice:{limao:1, hortela:1}
  }
];

const state = {doses:{},energeticos:{},ice:{}};
const steps = ['doses-section', 'energeticos-section', 'ice-section', ['summary-container', 'upsell-container', 'form-section']];
let currentStep = 0;

function showToast(msg){
  const t=document.getElementById('toast');
  if (!t) return;
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

function showStep(step){
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  // Sempre mostrar o carrinho
  const cartSec = document.getElementById('cart-section');
  if(cartSec) cartSec.style.display = 'block';
  const stepSections = steps[step];
  if(Array.isArray(stepSections)){
    stepSections.forEach(id => {
      const el = document.getElementById(id);
      if(el) el.style.display = 'block';
    });
  } else {
    const el = document.getElementById(stepSections);
    if(el) el.style.display = 'block';
  }
  const indicator = document.getElementById('step-indicator');
  if(indicator) indicator.textContent = `Passo ${step+1} de 4`;
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if(prevBtn) prevBtn.disabled = step === 0;
  if(nextBtn) nextBtn.disabled = step === 3;
}

function renderProducts(containerId,title,icon,products,stateKey){
  const sec=document.getElementById(containerId);
  if (!sec) return;
  let html = `<h2 class="section-title"><span>${icon}</span> ${title}</h2>`;
  if(stateKey === 'doses'){
    html += `<div class="grid">`;
    predefinedCombos.forEach(c=>{
      html += `
        <div class="item-card combo-card">
          <img src="${c.image}" alt="${c.name}" class="product-img">
          <div class="name">${c.name}</div>
        </div>
      `;
    });
    html += `</div><h3 style="margin-top:1rem;">Ou monte seu combo personalizado:</h3><br>`;
  }
  html += `<div class="grid" id="${containerId}-grid"></div>`;
  sec.innerHTML = html;
  // Adicionar event listeners para combos
  if(stateKey === 'doses'){
    const comboCards = sec.querySelectorAll('.combo-card');
    comboCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        const c = predefinedCombos[index];
        state.doses = {...c.doses};
        state.energeticos = {...c.energeticos};
        state.ice = {};
        for(const id in c.ice) state.ice[id] = c.ice[id];
        currentStep = 2; // ir para etapa de gelo
        update();
      });
    });
  }
  const grid=document.getElementById(`${containerId}-grid`);
  if (!grid) return;
  products.forEach(p=>{
    const qty=state[stateKey][p.id]||0;
    const card=document.createElement('div');
    card.className='item-card'+(qty>0?' selected':'');
    card.innerHTML=`
      ${p.popular?'<span class="badge-popular">🔥 Top</span>':''}
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <div class="name">${p.name}</div>
      <div class="price">R$ ${p.price.toFixed(2)}</div>
      ${qty>0?`<div class="qty-controls">
        <button class="qty-btn" data-id="${p.id}" data-action="dec">−</button>
        <span class="qty-val">${qty}</span>
        <button class="qty-btn" data-id="${p.id}" data-action="inc">+</button>
      </div>`:''}
    `;
    card.addEventListener('click',e=>{
      if(e.target.closest('.qty-btn'))return;
      if(qty===0){
        state[stateKey][p.id]=1;
        update();
      } else {
        delete state[stateKey][p.id];
        update();
      }
    });
    const qtyBtns = card.querySelectorAll('.qty-btn');
    qtyBtns.forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        const id=btn.dataset.id,action=btn.dataset.action;
        if(action==='inc')state[stateKey][id]++;
        else{state[stateKey][id]--;if(state[stateKey][id]<=0)delete state[stateKey][id];}
        update();
      });
    });
    grid.appendChild(card);
  });
}

function renderIce(){
  if(currentStep !== 2) return;
  const sec=document.getElementById('ice-section');
  if (!sec) return;
  const totalDoses = getTotalDoses();
  sec.innerHTML=`<h2 class="section-title"><span>🧊</span> Escolha os gelos (mínimo ${totalDoses})</h2><div class="grid" id="ice-grid"></div>`;
  const grid=document.getElementById('ice-grid');
  if (!grid) return;
  iceFlavors.forEach(f=>{
    const qty=state.ice[f.id]||0;
    const card=document.createElement('div');
    card.className='item-card'+(qty>0?' selected':'');
    card.innerHTML=`
      <img src="${f.image}" alt="${f.name}" class="product-img">
      <div class="name">${f.name}</div>
      <div class="price">R$ ${f.price.toFixed(2)}</div>
      ${qty>0?`<div class="qty-controls">
        <button class="qty-btn" data-id="${f.id}" data-action="dec">−</button>
        <span class="qty-val">${qty}</span>
        <button class="qty-btn" data-id="${f.id}" data-action="inc">+</button>
      </div>`:''}
    `;
    card.addEventListener('click',e=>{
      if(e.target.closest('.qty-btn'))return;
      if(qty===0){
        state.ice[f.id]=1;
        update();
      } else {
        delete state.ice[f.id];
        update();
      }
    });
    const qtyBtns = card.querySelectorAll('.qty-btn');
    qtyBtns.forEach(btn=>{
      btn.addEventListener('click',e=>{
        e.stopPropagation();
        const id=btn.dataset.id,action=btn.dataset.action;
        if(action==='inc')state.ice[id]++;
        else{state.ice[id]--;if(state.ice[id]<=0)delete state.ice[id];}
        update();
      });
    });
    grid.appendChild(card);
  });
}

function renderUpsell(){
  if(currentStep !== 3) return;
  const c=document.getElementById('upsell-container');
  if (!c) return;
  const hasDose=Object.values(state.doses).some(q=>q>0);
  const hasEn=Object.values(state.energeticos).some(q=>q>0);
  if(hasDose&&!hasEn){
    c.innerHTML=`<div class="upsell" id="upsell-btn">✨ <span>Clientes também adicionam <strong>+1 energético</strong></span></div>`;
    const upsellBtn = document.getElementById('upsell-btn');
    if (upsellBtn) {
      upsellBtn.addEventListener('click',()=>{
        const pop=energeticos.find(e=>e.popular);
        if(pop){state.energeticos[pop.id]=(state.energeticos[pop.id]||0)+1;update();}
      });
    }
  } else c.innerHTML='';
}

function getTotal(){
  let sum=0;
  for(const[id,qty]of Object.entries(state.doses)){const p=doses.find(d=>d.id===id);if(p)sum+=p.price*qty;}
  for(const[id,qty]of Object.entries(state.energeticos)){const p=energeticos.find(d=>d.id===id);if(p)sum+=p.price*qty;}
  for(const[id,qty]of Object.entries(state.ice)){const p=iceFlavors.find(f=>f.id===id);if(p)sum+=p.price*qty;}
  return sum;
}

function getTotalDoses(){
  return Object.values(state.doses).reduce((a,b)=>a+b,0);
}

function renderCart(){
  const c=document.getElementById('cart-section');
  if (!c) return;
  const hasDoses=Object.values(state.doses).some(q=>q>0);
  const hasEn=Object.values(state.energeticos).some(q=>q>0);
  const hasIce=Object.values(state.ice).some(q=>q>0);
  if(!hasDoses&&!hasEn&&!hasIce){
    c.innerHTML='<div class="cart-empty">Carrinho vazio</div>';
    return;
  }
  let rows='';
  for(const[id,qty]of Object.entries(state.doses)){if(qty>0){const p=doses.find(d=>d.id===id);if(p)rows+=`<div class="summary-row"><span>${qty}x ${p.name}</span><span class="amt">R$ ${(p.price*qty).toFixed(2)}</span></div>`;}}
  for(const[id,qty]of Object.entries(state.energeticos)){if(qty>0){const p=energeticos.find(d=>d.id===id);if(p)rows+=`<div class="summary-row"><span>${qty}x ${p.name}</span><span class="amt">R$ ${(p.price*qty).toFixed(2)}</span></div>`;}}
  for(const[id,qty]of Object.entries(state.ice)){if(qty>0){const p=iceFlavors.find(f=>f.id===id);if(p)rows+=`<div class="summary-row"><span>${qty}x ${p.name}</span><span class="amt">R$ ${(p.price*qty).toFixed(2)}</span></div>`;}}
  c.innerHTML=`<div class="cart">
    <h3 class="cart-title">No seu Copão atual</h3>
    ${rows}
    <div class="summary-total"><span>Total</span><span class="val">R$ ${getTotal().toFixed(2)}</span></div>
  </div>`;
}

function renderSummary(){
  if(currentStep !== 3) return;
  const c=document.getElementById('summary-container');
  if (!c) return;
  const hasDoses=Object.values(state.doses).some(q=>q>0);
  const hasEn=Object.values(state.energeticos).some(q=>q>0);
  const hasIce=Object.values(state.ice).some(q=>q>0);
  if(!hasDoses&&!hasEn&&!hasIce){c.innerHTML='';return;}
  let rows='';
  for(const[id,qty]of Object.entries(state.doses)){if(qty>0){const p=doses.find(d=>d.id===id);if(p)rows+=`<div class="summary-row"><span>${qty}x ${p.name}</span><span class="amt">R$ ${(p.price*qty).toFixed(2)}</span></div>`;}}
  for(const[id,qty]of Object.entries(state.energeticos)){if(qty>0){const p=energeticos.find(d=>d.id===id);if(p)rows+=`<div class="summary-row"><span>${qty}x ${p.name}</span><span class="amt">R$ ${(p.price*qty).toFixed(2)}</span></div>`;}}
  for(const[id,qty]of Object.entries(state.ice)){if(qty>0){const p=iceFlavors.find(f=>f.id===id);if(p)rows+=`<div class="summary-row"><span>${qty}x ${p.name}</span><span class="amt">R$ ${(p.price*qty).toFixed(2)}</span></div>`;}}
  c.innerHTML=`<div class="summary">
    <h2 class="section-title" style="margin-bottom:.75rem"><span>📋</span> Seu combo</h2>
    ${rows}
    <div class="summary-total"><span>Total</span><span class="val">R$ ${getTotal().toFixed(2)}</span></div>
  </div>`;
}

function updateButton(){
  if(currentStep !== 3) return;
  const waBtn = document.getElementById('wa-btn');
  if (!waBtn) return;
  const hasDoses=Object.values(state.doses).some(q=>q>0);
  const hasEn=Object.values(state.energeticos).some(q=>q>0);
  const hasIce=Object.values(state.ice).some(q=>q>0);
  waBtn.disabled=!(hasDoses||hasEn||hasIce);
}

function update(){
  renderProducts('doses-section','Combos prontos ou doses individuais','🍸',doses,'doses');
  renderProducts('energeticos-section','Escolha o energético','⚡',energeticos,'energeticos');
  renderIce();
  renderUpsell();
  renderSummary();
  renderCart();
  updateButton();
  showStep(currentStep);
}

document.addEventListener('DOMContentLoaded', function() {
  const locationBtn = document.getElementById('location-btn');
  if (locationBtn) {
    locationBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        showToast('Geolocalização não suportada pelo navegador');
        return;
      }
      locationBtn.disabled = true;
      locationBtn.textContent = 'Obtendo localização...';
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
          const data = await response.json();
          const address = data.address;
          const bairro = address.suburb || address.neighbourhood || address.city_district || address.town || address.city || 'Localização obtida';
          document.getElementById('inp-bairro').value = bairro;
          showToast('Localização obtida com sucesso!');
        } catch (error) {
          showToast('Erro ao obter endereço. Tente novamente.');
        } finally {
          locationBtn.disabled = false;
          locationBtn.textContent = '📍 Usar minha localização';
        }
      }, (error) => {
        let msg = 'Erro ao obter localização.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = 'Permissão de localização negada.';
            break;
          case error.POSITION_UNAVAILABLE:
            msg = 'Localização indisponível.';
            break;
          case error.TIMEOUT:
            msg = 'Timeout na obtenção da localização.';
            break;
        }
        showToast(msg);
        locationBtn.disabled = false;
        locationBtn.textContent = '📍 Usar minha localização';
      });
    });
  }

  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        update();
      }
    });
  }

const nextBtn = document.getElementById('next-btn');

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (currentStep < 3) {
      const totalDoses = getTotalDoses();

      if (currentStep === 0 && totalDoses === 0) {
        showToast('Selecione pelo menos uma dose');
        return;
      }

      if (currentStep === 1) {
        const totalEn = Object.values(state.energeticos)
          .reduce((a, b) => a + b, 0);

        if (totalEn < totalDoses) {
          showToast(`Selecione pelo menos ${totalDoses} energético(s)`);
          return;
        }
      }

      if (currentStep === 2) {
        const totalIce = Object.entries(state.ice)
          .filter(([key]) => key !== 'sem') // ignora "sem gelo"
          .reduce((acc, [, val]) => acc + val, 0);

        const semGelo = state.ice['sem'] > 0;

        if (totalIce === 0 && !semGelo) {
          showToast('Selecione pelo menos 1 gelo saborizado ou "Sem gelo"');
          return;
        }
      }

      currentStep++;
      update();
    }
  });
}

const waBtn = document.getElementById('wa-btn');

if (waBtn) {
  waBtn.addEventListener('click', () => {
    const name = document.getElementById('inp-name').value.trim();
    const address = document.getElementById('inp-bairro').value.trim();

    if (!name || !address) {
      showToast('Preencha seu nome e endereço');
      return;
    }

    const orderId = Date.now().toString().slice(-4);
    let msg = `📋 *KOPA - PEDIDO #${orderId}*\n\n`;

    msg += `🧾 *Itens do pedido:*\n`;

    // Doses
    for (const [id, qty] of Object.entries(state.doses)) {
      if (qty > 0) {
        const p = doses.find(d => d.id === id);
        if (p) {
          msg += `• ${qty}x ${p.name} — R$ ${(p.price * qty).toFixed(2)}\n`;
        }
      }
    }

    // Energéticos
    for (const [id, qty] of Object.entries(state.energeticos)) {
      if (qty > 0) {
        const p = energeticos.find(d => d.id === id);
        if (p) {
          msg += `• ${qty}x ${p.name} — R$ ${(p.price * qty).toFixed(2)}\n`;
        }
      }
    }

    // Gelo
    for (const [id, qty] of Object.entries(state.ice)) {
      if (qty > 0) {
        const p = iceFlavors.find(f => f.id === id);
        if (p) {
          msg += `• ${qty}x ${p.name} — R$ ${(p.price * qty).toFixed(2)}\n`;
        }
      }
    }

    msg += `\n💰 *Total:* R$ ${getTotal().toFixed(2)}\n\n`;

    msg += `👤 *Dados do cliente:*\n`;
    msg += `Nome: ${name}\n`;
    msg += `Endereço: ${address}`;

    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}&type=phone_number&app_absent=0`;
    window.open(url, '_blank');
  });
}

  update();
});
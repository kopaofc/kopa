const WHATSAPP_NUMBER = '5554996472916';

const doses = [
  {id:'jackdaniels',name:'Jack Daniel\'s 50ml',price:14.00,image:'images/doses/jackdaniels-50.png',popular:true,active:true},
  {id:'jackdaniels_macaverde',name:'Jack Daniel\'s Apple 50ml',price:14.50,image:'images/doses/jackdaniels_macaverde-50.png',active:false},
  {id:'jackdaniels_fire',name:'Jack Daniel\'s Fire 50ml',price:14.70,image:'images/doses/jackdaniels_fire-50.png',active:false},
  {id:'jackdaniels_honey',name:'Jack Daniel\'s Honey 50ml',price:15.30,image:'images/doses/jackdaniels_honey-50.png',active:false},
  
  {id:'jw_redlabel',name:'Johnnie Walker Red Label 50ml',price:11.75,image:'images/doses/jw_redlabel-50.png',active:true},
  {id:'jw_blacklabel',name:'Johnnie Walker Black Label 50ml',price:18.50,image:'images/doses/jw_blacklabel-50.png',active:false},  

  {id:'absolut',name:'Absolut Vodka 50ml',price:13.20,image:'images/doses/absolut-50.png',active:false},
  {id:'rajska',name:'Rajska 50ml',price:5.90,image:'images/doses/rajska-50.png',active:true},
];

const energeticos = [
  {id:'redbull_250',name:'Red Bull 250ml',price:13,image:'images/redbull/redbull-250.png',popular:true,active:true},
  {id:'monster_original',name:'Monster Original 473ml',price:11.50,image:'images/monster/monster_original-473.png',active:true},
  {id:'baly_tropical',name:'Baly Tropical 473ml',price:9.50,image:'images/baly/baly_tropical-473.png',active:true},
  {id:'baly_melancia',name:'Baly Melancia 473ml',price:9.50,image:'images/baly/baly_melancia-473.png',active:true},
  {id:'baly_morango_pessego',name:'Baly Morango e Pêssego 473ml',price:9.50,image:'images/baly/baly_morangopessego-473.png',active:true},
  {id:'baly_freegells',name:'Baly Freegells Cereja 473ml',price:9.50,image:'images/baly/baly_freegells-473.png',active:true},
  {id:'baly_tadala',name:'Baly Tadala 473ml',price:10.00,image:'images/baly/baly_tadala-473.png',active:true},

  {id:'redbull_473',name:'Red Bull 473ml',price:22,image:'images/redbull/redbull-473.png',popular:true,active:false},
  {id:'redbull_355',name:'Red Bull 355ml',price:14,image:'images/redbull/redbull-355.png',active:false},

  {id:'monster_absolutely_zero',name:'Monster Absolutely Zero 473ml',price:13,image:'images/monster/monster_absolutelyzero-473.png',active:false},
  {id:'monster_ultra_white',name:'Monster Ultra White 473ml',price:13,image:'images/monster/monster_ultrawhite-473.png',active:false},
  {id:'monster_mango_loco',name:'Monster Juice Mango Loco 473ml',price:13,image:'images/monster/monster_mangoloco-473.png',active:false},

  {id:'baly_tradicional',name:'Baly Tradicional 473ml',price:10.50,image:'images/baly/baly_tradicional-473.png',active:false},
  {id:'baly_maca_verde',name:'Baly Maçã Verde 473ml',price:10.50,image:'images/baly/baly_macaverde-473.png',active:false},
  {id:'baly_abacaxi_hortela',name:'Baly Abacaxi com Hortelã 473ml',price:10.50,image:'images/baly/baly_abacaxihortela-473.png',active:false},
];

const iceFlavors = [
  {id:'vgelo_aguacoco',name:'VGELO Água de Coco',price:5,image:'images/gelos/vgelo/vgelo-aguacoco.png',active:true},
  {id:'vgelo_maracuja',name:'VGELO Maracujá', price:5,image:'images/gelos/vgelo/vgelo-maracuja.png',active:true},
  {id:'vgelo_morango',name:'VGELO Morango', price:5,image:'images/gelos/vgelo/vgelo-morango.png',active:true},
  {id:'vgelo_limao',name:'GELO Limão',price:5,image:'images/gelos/vgelo/gelo-limao.png',active:true},
  {id:'vgelo_melancia',name:'VGELO Melancia',price:5,image:'images/gelos/vgelo/vgelo-melancia.png',active:true},
  {id:'vgelo_macaverde',name:'VGELO Maçã Verde',price:5,image:'images/gelos/vgelo/vgelo-macaverde.png',active:true},
  {id:'sem',name:'Sem gelo',price:0,image:'images/gelos/semgelo.png',active:true}
];

const predefinedCombos = [
  { id:'combo1', name:'Combo Jack + Red Bull + Gelo de Coco', image:'images/combos/combo1.png', 
    doses:{jackdaniels:1}, energeticos:{redbull_250:1}, iceFlavors:{vgelo_aguacoco:1},
    active:true
  },
  {
    id:'combo2', name:'Combo Tropical', image:'images/combo2.jpg', 
    doses:{rajska:1, absolut:1}, energeticos:{redbull_250:1, monster_original:1}, iceFlavors:{vgelo_maracuja:1, vgelo_morango:1},
    active:false
  },
  {
    id:'combo3', name:'Combo Premium', image:'images/combo3.jpg', 
    doses:{jw_redlabel:1, jackdaniels_fire:1}, energeticos:{monster_mango_loco:2}, iceFlavors:{vgelo_limao:1, vgelo_hortela:1},
    active:false
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
  if(stateKey === 'doses'){
    const activeCombos = predefinedCombos.filter(c => c.active);
    title = activeCombos.length > 0 ? 'Combos prontos ou doses individuais' : 'Doses individuais';
  }
  let html = `<h2 class="section-title"><span>${icon}</span> ${title}</h2>`;
  if(stateKey === 'doses'){
    const activeCombos = predefinedCombos.filter(c => c.active);
    if(activeCombos.length > 0){
      html += `<div class="grid">`;
      activeCombos.forEach(c=>{
        html += `
          <div class="item-card combo-card" data-id="${c.id}">
            <img src="${c.image}" alt="${c.name}" class="product-img">
            <div class="name">${c.name}</div>
          </div>
        `;
      });
      html += `</div><h3 style="margin-top:1rem;">Ou monte seu combo personalizado:</h3><br>`;
    } else {
      html += `<h3>Monte seu combo personalizado:</h3><br>`;
    }
  }
  html += `<div class="grid" id="${containerId}-grid"></div>`;
  sec.innerHTML = html;
  // Adicionar event listeners para combos
  if(stateKey === 'doses'){
    const activeCombos = predefinedCombos.filter(c => c.active);
    if(activeCombos.length > 0){
      const comboCards = sec.querySelectorAll('.combo-card');
      comboCards.forEach((card) => {
        card.addEventListener('click', () => {
          const id = card.dataset.id;
          const c = predefinedCombos.find(combo => combo.id === id);
          if (c) {
            state.doses = {...c.doses};
            state.energeticos = {...c.energeticos};
            state.ice = {};
            for(const iceId in c.iceFlavors) state.ice[iceId] = c.iceFlavors[iceId];
            currentStep = 3; // ir para etapa de infos
            update();
          }
        });
      });
      const toggleComboBtns = sec.querySelectorAll('.toggle-combo-btn');
      toggleComboBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.dataset.id;
          const combo = predefinedCombos.find(c => c.id === id);
          if (combo) {
            combo.active = !combo.active;
            update();
          }
        });
      });
    }
  }
  const grid=document.getElementById(`${containerId}-grid`);
  if (!grid) return;
  const totalDoses = getTotalDoses();
  const totalEn = Object.values(state.energeticos).reduce((a,b)=>a+b,0);
  products.filter(p => p.active).forEach(p=>{
    const qty=state[stateKey][p.id]||0;
    const canInc = stateKey === 'energeticos' ? totalEn < totalDoses : true;
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
        <button class="qty-btn" data-id="${p.id}" data-action="inc" ${!canInc ? 'disabled' : ''}>+</button>
      </div>`:''}
    `;
    card.addEventListener('click',e=>{
      if(e.target.closest('.qty-btn'))return;
      if(qty===0){
        if(stateKey === 'energeticos' && totalEn >= totalDoses) return;
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
        if(action==='inc'){
          if(stateKey === 'energeticos' && totalEn >= totalDoses) return;
          state[stateKey][id]++;
        } else{
          state[stateKey][id]--;
          if(state[stateKey][id]<=0)delete state[stateKey][id];
        }
        update();
      });
    });
    grid.appendChild(card);
    const toggleBtn = card.querySelector('.toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = toggleBtn.dataset.id;
        const type = toggleBtn.dataset.type;
        let arr;
        if (type === 'doses') arr = doses;
        else if (type === 'energeticos') arr = energeticos;
        const prod = arr.find(p => p.id === id);
        if (prod) {
          prod.active = !prod.active;
          update();
        }
      });
    }
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
  const totalIce = Object.entries(state.ice).filter(([key]) => key !== 'sem').reduce((acc, [, val]) => acc + val, 0);
  iceFlavors.filter(f => f.active).forEach(f=>{
    const qty=state.ice[f.id]||0;
    const canInc = totalIce < totalDoses;
    const card=document.createElement('div');
    card.className='item-card'+(qty>0?' selected':'');
    card.innerHTML=`
      <img src="${f.image}" alt="${f.name}" class="product-img">
      <div class="name">${f.name}</div>
      <div class="price">R$ ${f.price.toFixed(2)}</div>
      ${qty>0?`<div class="qty-controls">
        <button class="qty-btn" data-id="${f.id}" data-action="dec">−</button>
        <span class="qty-val">${qty}</span>
        <button class="qty-btn" data-id="${f.id}" data-action="inc" ${!canInc ? 'disabled' : ''}>+</button>
      </div>`:''}
    `;
    card.addEventListener('click',e=>{
      if(e.target.closest('.qty-btn'))return;
      if(qty===0){
        if(f.id === 'sem'){
          state.ice = {'sem':1};
        } else {
          if(state.ice['sem']){
            delete state.ice['sem'];
          }
          if(totalIce >= totalDoses) return;
          state.ice[f.id]=1;
        }
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
        if(action==='inc'){
          if(totalIce >= totalDoses) return;
          state.ice[id]++;
        } else{
          state.ice[id]--;
          if(state.ice[id]<=0)delete state.ice[id];
        }
        update();
      });
    });
    grid.appendChild(card);
    const toggleBtn = card.querySelector('.toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = toggleBtn.dataset.id;
        const prod = iceFlavors.find(f => f.id === id);
        if (prod) {
          prod.active = !prod.active;
          update();
        }
      });
    }
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

        if (totalEn > totalDoses) {
          showToast(`Selecione no máximo ${totalDoses} energético(s)`);
          return;
        }
      }

      if (currentStep === 2) {
        const totalIce = Object.entries(state.ice)
          .filter(([key]) => key !== 'sem') // ignora "sem gelo"
          .reduce((acc, [, val]) => acc + val, 0);

        const semGelo = state.ice['sem'] > 0;

        if (totalIce > totalDoses) {
          showToast(`Selecione no máximo ${totalDoses} gelo(s) saborizado(s)`);
          return;
        }

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
window.__initApp = function(){
  // Year
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
  // Reveal on scroll
  const io=new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } }) },{threshold:.14});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  // Project hover previews
  document.querySelectorAll('.project').forEach(card=>{
    const v=card.querySelector('video.thumb'), p=card.querySelector('img.poster');
    if(!v||!p) return;
    card.addEventListener('mouseenter',()=>{ p.style.opacity=0; v.currentTime=0; v.play(); });
    card.addEventListener('mouseleave',()=>{ p.style.opacity=1; v.pause(); });
  });
  // Modals
  function openM(sel){ const m=document.querySelector(sel); if(!m) return; m.classList.add('open'); }
  function closeM(m){ m.classList.remove('open'); const ifr=m.querySelector('iframe'); if(ifr){ const s=ifr.src; ifr.src=''; setTimeout(()=>ifr.src=s,0); } const vd=m.querySelector('video'); if(vd){ vd.pause(); } }
  document.querySelectorAll('[data-open-modal]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const sel=btn.getAttribute('data-open-modal');
      if(sel==='#projectModal'){ const key=btn.getAttribute('data-project'); const data={
        biomed:{title:'Biomedic Segmentation on Low-End Devices',desc:'Optimized AI segmentation to run on constrained hardware (Raspberry Pi class).',src:'assets/thumbs/biomed.mp4'},
        kinova:{title:'Kinova Arm — Realtime Segmentation & Automation',desc:'Closed-loop vision segmentation driving Kinova robotic arm motions.',src:'assets/thumbs/kinova.mp4'},
        unitylab:{title:'Realtime Laboratory Simulation in Unity3D',desc:'Unity3D workcell simulations; multi-robot synchronization.',src:'assets/thumbs/unitylab.mp4'},
        moto:{title:'Segmentation of Moto Rider’s Front View',desc:'Semantic segmentation for rider path recognition.',src:'assets/thumbs/moto.mp4'},
        arvr:{title:'Interactive Social Platform for Animation & Games',desc:'AR/VR platform for interactive media sharing.',src:'assets/thumbs/arvr.mp4'},
        chain:{title:'Blockchain-Based Decentralized Car Ownership',desc:'Private chain for decentralized vehicle ownership.',src:'assets/thumbs/chain.mp4'},
        revenue:{title:'Distribution Prediction for Maximum Revenue',desc:'XGBoost-driven product distribution optimization.',src:'assets/thumbs/revenue.mp4'}
      }[key]; if(data){ document.getElementById('pmTitle').textContent=data.title; document.getElementById('pmDesc').textContent=data.desc; const v=document.getElementById('pmVideo'); v.src=data.src; v.load(); v.play(); } }
      openM(sel);
    });
  });
  document.querySelectorAll('.modal').forEach(m=>{
    m.addEventListener('click',(e)=>{ if(e.target.classList.contains('modal')) closeM(m); });
    m.querySelector('.close')?.addEventListener('click',()=>closeM(m));
  });
  // Filters (gallery)
  const tabs=document.querySelectorAll('.tab'), items=document.querySelectorAll('.gallery');
  tabs.forEach(t=>t.addEventListener('click',()=>{ const f=t.dataset.filter; tabs.forEach(x=>x.classList.remove('ring-2','ring-cyan-400')); t.classList.add('ring-2','ring-cyan-400'); items.forEach(it=>{ it.style.display=(f==='all'||it.dataset.cat===f)?'':'none'; }); }));
  // Copy citation
  document.querySelectorAll('.copy-cite').forEach(b=>b.addEventListener('click', async ()=>{ try{ await navigator.clipboard.writeText(b.dataset.citation); b.textContent='Copied!'; setTimeout(()=>b.textContent='Copy citation',1200);}catch(e){ b.textContent='Copy failed'; setTimeout(()=>b.textContent='Copy citation',1200);} }));
  // Expand abstract
  document.querySelectorAll('.expand').forEach(b=>b.addEventListener('click',()=>{ const el=document.querySelector(b.dataset.expand); if(el) el.classList.toggle('hidden'); }));
  // Contact form
  window.validateForm=function(ev){ ev.preventDefault(); const f=ev.target, msg=document.getElementById('formMsg'); if(!f.name.value||!f.email.value||!f.message.value){ msg.textContent='Please fill out all fields.'; msg.className='text-red-300'; return false;} msg.textContent='Thanks! Your email client will open.'; msg.className='text-green-300'; window.location.href=`mailto:${f.getAttribute('action').replace('mailto:','')}?subject=Portfolio%20Contact%20from%20${encodeURIComponent(f.name.value)}&body=${encodeURIComponent(f.message.value)}%0A%0AFrom:%20${encodeURIComponent(f.email.value)}`; f.reset(); return false; }
};
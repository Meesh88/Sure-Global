(function(){
'use strict';

// Nav active state
var path=location.pathname;
document.querySelectorAll('[data-nav]').forEach(function(link){
  var nav=link.getAttribute('data-nav');
  if(path==='/solutions'&&(nav==='solutions'||nav==='platforms')){link.classList.add('active');}
  else if((path==='/privacy'||path==='/terms'||path==='/security')&&nav===path.slice(1)){link.classList.add('active');}
});

// Mobile nav toggle
var toggle=document.getElementById('sg-nav-toggle');
var navLinks=document.getElementById('sg-nav-links');
if(toggle&&navLinks){
  toggle.addEventListener('click',function(){navLinks.classList.toggle('open');});
  document.addEventListener('click',function(e){
    if(!toggle.contains(e.target)&&!navLinks.contains(e.target)){navLinks.classList.remove('open');}
  });
}

// Platform banner (briefing page)
var banner=document.getElementById('sgb-plat-banner');
if(banner){
  var platParam=(new URLSearchParams(location.search)).get('platform')||'';
  var platNames={'sure-cyber-intel':'Sure Cyber Intel','sure-mineral-intel':'Sure Mineral Intelligence','sure-agentic-ai':'Sure Agentic AI'};
  var name=platNames[platParam];
  if(name){
    banner.innerHTML='<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Requesting briefing for <strong>'+name+'</strong>';
    banner.style.display='flex';
  }
}

// Form validation (briefing page)
var form=document.getElementById('sgb-form');
if(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var ok=true;
    document.querySelectorAll('.sgb-r').forEach(function(el){
      var v=el.value.trim();
      var err=document.getElementById('e-'+el.id);
      if(!v){el.classList.add('serr');if(err)err.style.display='block';ok=false;}
      else{el.classList.remove('serr');if(err)err.style.display='none';}
    });
    var em=document.getElementById('f-email');
    if(em&&em.value&&!/\S+@\S+\.\S+/.test(em.value)){
      em.classList.add('serr');
      var ee=document.getElementById('e-f-email');
      if(ee){ee.textContent='Enter a valid email.';ee.style.display='block';}
      ok=false;
    }
    if(!ok)return;
    var btn=document.getElementById('sgb-btn');
    if(btn){btn.disabled=true;btn.textContent='Submitting...';}
    setTimeout(function(){
      var fw=document.getElementById('sgb-fw');
      var sc=document.getElementById('sgb-suc');
      if(fw)fw.style.display='none';
      if(sc)sc.style.display='block';
    },1500);
  });
}

})();

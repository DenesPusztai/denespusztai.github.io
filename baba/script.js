const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));const stars=document.querySelector('.stars');if(stars){for(let i=0;i<55;i++){let s=document.createElement('i');s.style.left=Math.random()*100+'%';s.style.animationDuration=10+Math.random()*18+'s';s.style.animationDelay=-Math.random()*18+'s';stars.appendChild(s)}}document.querySelectorAll('.card').forEach(c=>c.addEventListener('click',()=>c.classList.toggle('open')));document.querySelectorAll('.masonry img').forEach(img=>img.addEventListener('click',()=>{const b=document.createElement('div');b.style='position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:grid;place-items:center;padding:25px;cursor:pointer';b.innerHTML='<img src="'+img.src+'" style="max-width:95vw;max-height:92vh;object-fit:contain">';b.onclick=()=>b.remove();document.body.appendChild(b)}));function timer(){const now=new Date();let next=new Date(now.getFullYear(),7,28);if(next<=now)next.setFullYear(next.getFullYear()+1);let diff=next-now;let vals=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60],ids=['d','h','m','s'];ids.forEach((id,i)=>{let e=document.getElementById(id),w=e?.parentElement;if(e&&e.textContent!=vals[i]){e.textContent=vals[i];w.classList.remove('changed');void w.offsetWidth;w.classList.add('changed')}})}if(document.getElementById('d')){timer();setInterval(timer,1000)}
/* Cinematic page transitions */
document.addEventListener('DOMContentLoaded',()=>{
  const bar=document.createElement('div');bar.className='scroll-line';document.body.appendChild(bar);
  const updateScroll=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?(scrollY/h)*100:0)+'%'};
  addEventListener('scroll',updateScroll,{passive:true});updateScroll();

  document.querySelectorAll('a[href$=".html"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(!href || href.startsWith('#') || a.target==='_blank') return;
      e.preventDefault();
      document.body.classList.add('page-leaving');
      const curtain=document.createElement('div');curtain.className='page-transition';document.body.appendChild(curtain);
      setTimeout(()=>location.href=href,520);
    });
  });

  document.querySelectorAll('.zoom-frame').forEach(el=>obs.observe(el));

  // Subtle mouse parallax on designated images.
  document.querySelectorAll('.parallax-img').forEach(img=>{
    img.parentElement?.addEventListener('mousemove',e=>{
      const r=img.parentElement.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      img.style.transform=`translate(${x*12}px,${y*12}px) scale(1.04)`;
    });
    img.parentElement?.addEventListener('mouseleave',()=>img.style.transform='');
  });

  // Gentle 3D card tilt.
  document.querySelectorAll('.tilt-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=e.clientX-r.left, y=e.clientY-r.top;
      card.style.transform=`perspective(900px) rotateX(${(y/r.height-.5)*-7}deg) rotateY(${(x/r.width-.5)*7}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });

  // Scroll-linked parallax for story images.
  const parallaxScroll=()=>{
    document.querySelectorAll('.scroll-parallax').forEach(el=>{
      const r=el.getBoundingClientRect(), offset=(innerHeight/2-(r.top+r.height/2))*0.035;
      el.style.transform=`translateY(${offset}px)`;
    });
  };
  addEventListener('scroll',parallaxScroll,{passive:true});parallaxScroll();
});

if(document.querySelector('.final')){
  setTimeout(()=>{
    document.querySelector('.final-reveal')?.classList.add('on');
    document.querySelector('.final-content')?.classList.add('on');
  },250);
}

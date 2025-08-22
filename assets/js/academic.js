
// Smooth scroll + active nav
(function(){
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  links.forEach(a => {
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Active highlight on scroll
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const nav = document.querySelector('.nav-links');
  function onScroll() {
    const y = window.scrollY + 100;
    let current = sections[0]?.id;
    sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
    nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+current));
  }
  document.addEventListener('scroll', onScroll);
  onScroll();

  // Back-to-top
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=>{
    if (window.scrollY > 300) btn.classList.add('show'); else btn.classList.remove('show');
  });
  btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
})();

// Publications render (inline JSON fallback)
(async function(){
  let all = [];
  const inline = document.getElementById('pubdata');
  try {
    if (inline && inline.textContent.trim()) {
      all = JSON.parse(inline.textContent);
    } else {
      const res = await fetch('/data/publications.json');
      all = await res.json();
    }
  } catch(e) {
    all = [];
  }

  const list = document.getElementById('pub-list');
  if (!list) return;

  const q = document.getElementById('q');
  const chips = document.querySelectorAll('.chip');
  let activeType = 'all';

  function render(items) {
    if (!items.length) {
      list.innerHTML = '<div class="muted">No results.</div>';
      return;
    }
    list.innerHTML = items.map(p=>{
      const authors = (p.authors||[]).join(', ');
      const badge = `<span class="badge">${p.type}</span>`;
      const link = p.url ? `<a class="btn small" href="${p.url}" target="_blank" rel="noopener">Open</a>` : '';
      return `<div class="pub-item">
        <div>
          <div><strong>${p.title}</strong> ${badge}</div>
          <div class="small muted">${authors} • ${p.venue} • ${p.year}</div>
          ${p.tags? `<div class="small muted">${p.tags.map(t=>'#'+t).join(' ')}</div>`: ''}
        </div>
        <div>${link}</div>
      </div>`;
    }).join('');
  }

  function apply() {
    const term = (q.value||'').toLowerCase();
    const filtered = all.filter(p=>{
      const matchesType = activeType==='all' || p.type===activeType;
      const blob = [p.title, p.venue, (p.authors||[]).join(' '), (p.tags||[]).join(' ')].join(' ').toLowerCase();
      const matchesText = !term || blob.includes(term);
      return matchesType && matchesText;
    }).sort((a,b)=> b.year - a.year);
    render(filtered);
  }

  chips.forEach(ch=> ch.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('active'));
    ch.classList.add('active');
    activeType = ch.dataset.filter;
    apply();
  }));
  q.addEventListener('input', apply);

  apply();
})();

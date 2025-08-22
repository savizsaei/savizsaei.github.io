// Minimal animated network for the hero banner
(function(){
  const canvas = document.getElementById('mesh');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, dpr, points, raf;

  function resize(){
    const rect = canvas.getBoundingClientRect();
    w = Math.max(1, rect.width);
    h = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    init();
  }

  function init(){
    const count = Math.max(40, Math.floor((w*h) / 22000));
    points = Array.from({length: count}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - .5) * 0.4,
      vy: (Math.random() - .5) * 0.4,
      r: Math.random() * 1.6 + .6
    }));
  }

  function step(){
    ctx.clearRect(0, 0, w, h);
    for (const p of points){
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = w+10; if (p.x > w+10) p.x = -10;
      if (p.y < -10) p.y = h+10; if (p.y > h+10) p.y = -10;
    }
    for (let i=0; i<points.length; i++){
      for (let j=i+1; j<points.length; j++){
        const a = points[i], b = points[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx*dx + dy*dy;
        if (d2 < 120*120){
          const alpha = 1 - Math.sqrt(d2)/120;
          ctx.strokeStyle = `rgba(140,227,255,${alpha*0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (const p of points){
      ctx.fillStyle = "rgba(255,255,255,.65)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    raf = requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  step();

  window.addEventListener('beforeunload', ()=> cancelAnimationFrame(raf));
})();

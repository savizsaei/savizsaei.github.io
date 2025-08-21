// assets/js/network.js
(function(){
  const canvas = document.getElementById('mesh');
  if (!canvas) return; // safety: if the banner isn't on the page

  const ctx = canvas.getContext('2d');
  let w, h, dpr, points, raf;

  function resize(){
    // Size the canvas to the *displayed* banner area
    const r = canvas.getBoundingClientRect();
    w = Math.max(1, r.width);
    h = Math.max(1, r.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width  = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    init();
  }

  function init(){
    // Point count scales with area; tweak divisor for density
    const count = Math.max(40, Math.floor((w * h) / 22000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,  // speed: change 0.4 to taste
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function frame(){
    ctx.clearRect(0, 0, w, h);

    // Move points with wrap-around
    for (const p of points){
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
    }

    // Draw connections
    const maxDist = 120;
    const maxDist2 = maxDist * maxDist;
    for (let i = 0; i < points.length; i++){
      for (let j = i + 1; j < points.length; j++){
        const a = points[i], b = points[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < maxDist2){
          const alpha = 1 - Math.sqrt(d2) / maxDist;
          ctx.strokeStyle = `rgba(140,227,255,${alpha * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw points
    for (const p of points){
      ctx.fillStyle = 'rgba(255,255,255,.65)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(frame);
  }

  // Init + draw
  window.addEventListener('resize', resize, { passive: true });
  resize();
  frame();

  // Cleanup (if needed on nav away)
  window.addEventListener('beforeunload', () => cancelAnimationFrame(raf));
})();

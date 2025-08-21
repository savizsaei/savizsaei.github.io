/* ===== Variables / Base ===== */
:root{
  --bg: #0b0d10;
  --bg-alt: #0f1217;
  --ink: #0f172a;
  --muted: #6b7280;
  --brand: #4f46e5;
  --border: #e5e7eb;
  --radius: 12px;
  --shadow: 0 8px 26px rgba(0,0,0,.12);
  --container: 1100px;
  --hero-banner-height: 260px; /* tweak this to change banner space */
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
}

*{ box-sizing: border-box; }
html,body{ height: 100%; }
body{
  margin:0;
  color: var(--ink);
  background: #ffffff;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img{ max-width:100%; display:block; }
a{ color: var(--brand); text-decoration: none; }
a:hover{ text-decoration: underline; }
h1,h2,h3{ margin: 0 0 .35rem; line-height: 1.2; }
p{ margin: .2rem 0 1rem; }
.small{ font-size: .9rem; }
.muted{ color: var(--muted); }

/* ===== Layout ===== */
.container{
  width: min(100% - 32px, var(--container));
  margin-inline: auto;
}

/* ===== Navbar ===== */
.navbar{
  position: sticky; top:0; z-index: 10;
  background: #fff;
  border-bottom: 1px solid var(--border);
}
.nav{
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 0;
}
.brand{
  font-weight: 700; color: var(--ink); text-decoration: none;
}
.nav-links a{
  margin-left: 16px; color: var(--ink); opacity: .85;
}
.nav-links a:hover{ opacity:1; }

/* ===== Hero / Banner ===== */
.hero{ position: relative; background: #fff; }

.hero .banner{
  position: relative;
  width: 100%;
  height: var(--hero-banner-height);
  overflow: hidden;
  border-bottom: 4px solid #dbeafe;
  /* Fallback visual if JS/canvas not available: */
  background: var(--bg) url('../img/banner.svg') center/cover no-repeat fixed;
}

/* Turned network canvas */
.hero .banner #mesh{
  position: absolute;
  /* bleed beyond edges so rotation doesn't show corners */
  inset: -6% -2%;
  width: 104%;
  height: 112%;
  pointer-events: none;

  /* the “turned” look */
  transform: rotate(-8deg) scale(1.02);
  transform-origin: 50% 50%;

  /* visual treatment */
  mix-blend-mode: screen;
  opacity: .85;
  filter: contrast(100%) brightness(110%);
}

/* Profile card overlaps the banner a bit */
.hero .profile{
  position: relative;
  transform: translateY(-60px);
}

.hero .profile .card{
  display: flex; align-items: center; gap: 22px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 18px 20px;
}

.hero .portrait{
  width: 120px; height: 120px; border-radius: 50%;
  border: 6px solid #fff; box-shadow: 0 8px 26px rgba(0,0,0,.15);
  overflow: hidden; flex: 0 0 auto;
}

/* Icons */
.icon-btn{
  display:inline-flex; align-items:center; justify-content:center;
  width: 36px; height: 36px; border-radius: 10px;
  border: 1px solid var(--border);
  color: var(--ink);
  background: #fff;
  text-decoration: none;
  margin-right: 8px;
}
.icon-btn:hover{ border-color: #c7d2fe; }

/* ===== Sections ===== */
.section{ padding: 16px 0 38px; }
.section.alt{ background: #f8fafc; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.section h2{ margin: 0 0 6px; font-size: 1.5rem; }
.section .lead{ color: var(--muted); margin-top: 0; }

/* Cards & grids */
.card{ background: #fff; border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; box-shadow: var(--shadow); }
.grid-2{ display: grid; gap: 16px; grid-template-columns: 1fr 1fr; }
.grid-3{ display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
@media (max-width: 900px){
  .grid-3{ grid-template-columns: 1fr; }
  .grid-2{ grid-template-columns: 1fr; }
  .hero .profile{ transform: translateY(-30px); }
}

/* Footer */
.footer{ padding: 28px 0; border-top: 1px solid var(--border); background:#fff; }

/* Optional: respect OS reduced motion (comment out if you always want animation) */
/*
@media (prefers-reduced-motion: reduce){
  .hero .banner #mesh{ display: none; }
}
*/

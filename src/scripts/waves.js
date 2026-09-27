// Hero waves. Default = WebGL fragment shader: the lines, their depth blur and
// glow are all computed per pixel on the GPU, so they stay crisp at any DPR
// and cost one draw call per frame. Falls back to the original Canvas 2D
// version when WebGL is unavailable; `?waves=classic` forces it (comparison).
//
// Lifecycle shared by both: rAF runs only while the hero is in view
// (scrollY < 300, the canvas is faded out past that) and the tab is visible.

const FADE_END = 300;

export function initWaves() {
  const canvas = document.getElementById('waveCanvas');
  if (!canvas) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const forceClassic = new URLSearchParams(location.search).get('waves') === 'classic';

  if (!forceClassic && shaderWaves(canvas, reduced)) return;
  if (!reduced) classicWaves(canvas);
}

function runLoop(frame) {
  let running = false;
  let id;
  const tick = (now) => {
    frame(now);
    id = requestAnimationFrame(tick);
  };
  const start = () => {
    if (running || document.hidden) return;
    running = true;
    id = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(id);
  };
  const sync = () => (window.scrollY >= FADE_END ? stop() : start());
  sync();
  window.addEventListener('scroll', sync, { passive: true });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : sync()));
}

// ---------------------------------------------------------------------------
// WebGL version

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Coordinates are CSS px from the top-left, so every size below reads as px.
const FRAG = `
precision highp float;

uniform vec2  u_res;       // CSS px
uniform float u_dpr;       // backing pixels per CSS px
uniform float u_time;      // s
uniform float u_intro;     // 0..1 draw-in progress
uniform float u_calm;      // 0..1 scroll progress: waves settle as you scroll
uniform float u_amp;       // amplitude scale (bigger on desktop)
uniform vec3  u_mouse;     // x, y, strength 0..1
uniform vec3  u_rip[3];    // x, y, start time (s; negative = unused)

const int   LINES = 8;
const float TAU = 6.2831853;
const vec3  AMBER = vec3(0.910, 0.710, 0.278);
const vec3  MINT  = vec3(0.239, 0.839, 0.549);

float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }

// Centre-line height of wave i at x. Three harmonics (as in the original)
// plus a slow counter-travelling swell so the pattern never visibly loops.
float lineY(float x, float fi, float base, float amp, float k, float ph, float t) {
  float y = sin(x * k + ph)
          + 0.30 * sin(x * k / 1.5 + ph * 1.02)
          + 0.15 * sin(x * k / 2.0 + ph * 0.98)
          + 0.25 * sin(x * k * 0.37 - t * 0.05 + fi * 2.3);
  y *= amp * (0.85 + 0.15 * sin(t * 0.13 + fi * 1.7));

  // Pointer: lines part around the cursor like a finger through water.
  float dy = base - u_mouse.y;
  float dx = x - u_mouse.x;
  y += u_mouse.z * 70.0 * (dy / 110.0) * exp(-0.5 * (dy * dy) / (110.0 * 110.0))
       * exp(-0.5 * (dx * dx) / (170.0 * 170.0));

  // Tap/click ripples: an expanding, decaying ring.
  for (int r = 0; r < 3; r++) {
    float age = u_time - u_rip[r].z;
    if (u_rip[r].z < 0.0 || age > 3.0) continue;
    float dist = length(vec2(x, base) - u_rip[r].xy);
    float off = dist - age * 380.0;
    y += 26.0 * sin(off * 0.07) * exp(-(off * off) / (2.0 * 70.0 * 70.0)) * exp(-age * 1.4);
  }
  return base + y;
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, u_res.y * u_dpr - gl_FragCoord.y) / u_dpr;
  float t = u_time;
  float xn = p.x / u_res.x;
  float aa = 1.0 / u_dpr;
  vec3 acc = vec3(0.0);

  for (int i = 0; i < LINES; i++) {
    float fi = float(i);
    float relY = 0.1 + fi * 0.11;
    float depth = abs(relY - 0.5) / 0.4;           // 0 = far (centre), 1 = near (edges)
    float base = u_res.y * relY;
    float amp = (20.0 + hash(fi + 1.0) * 30.0) * u_amp * (1.0 - 0.55 * u_calm);
    float k = TAU / (400.0 + hash(fi + 2.0) * 500.0);
    float ph = hash(fi + 3.0) * TAU + t * (0.07 + depth * 0.07);

    // Distance to the curve, corrected for slope so steep parts don't thin out.
    float y0 = lineY(p.x, fi, base, amp, k, ph, t);
    float y1 = lineY(p.x + 1.0, fi, base, amp, k, ph, t);
    float d = abs(p.y - y0) / sqrt(1.0 + (y1 - y0) * (y1 - y0));

    // Near lines: sharp thin stroke. Far lines: wider, gaussian-soft, brighter.
    float halfW = 0.5 * (0.6 + (1.0 - depth) * 1.6);
    float sharp = 1.0 - smoothstep(halfW - aa, halfW + aa, d);
    float sigma = 0.6 + (1.0 - depth) * 3.0;
    float soft = exp(-0.5 * d * d / (sigma * sigma)) * min(1.0, 1.8 * halfW / sigma + 0.25);
    float stroke = mix(sharp, soft, 1.0 - depth);
    float glow = exp(-d / 22.0) * 0.07 * (1.0 - 0.5 * depth);
    float opacity = 0.7 - depth * 0.45;

    // Leads: sparse bright points drifting along each line.
    float spacing = 150.0 + hash(fi + 4.0) * 90.0;
    float u = p.x / spacing - t * (0.18 + hash(fi + 5.0) * 0.3);
    float cell = floor(u);
    float f = (fract(u) - 0.5) * spacing;
    float on = step(0.66, hash(cell * 1.37 + fi * 31.0));
    float spark = on * exp(-0.5 * f * f / 9.0) * exp(-0.5 * d * d / (2.2 * 2.2)) * (1.3 - 0.5 * depth);

    // Intro: each line draws in left-to-right with a bright leading tip.
    float head = (u_intro * 1.35 - hash(fi + 6.0) * 0.35) * (u_res.x + 200.0);
    float vis = 1.0 - smoothstep(head - 50.0, head, p.x);
    float tq = (p.x - head) / 26.0;
    float tip = exp(-0.5 * tq * tq) * exp(-0.5 * d * d / 9.0) * (1.0 - u_intro);

    float shift = 0.22 * sin(t * 0.1 + hash(fi + 7.0) * 60.0);
    vec3 col = mix(AMBER, MINT, smoothstep(0.0, 1.0, clamp(xn + shift, 0.0, 1.0)));
    col += 0.12 * (1.0 - abs(2.0 * xn - 1.0));

    acc += col * ((stroke + glow) * opacity + spark) * vis;
    acc += mix(col, vec3(1.0), 0.5) * tip * 1.5;
  }

  // Quiet zone behind the headline so the lines never fight the type.
  vec2 q = (p - u_res * vec2(0.5, 0.47)) / (u_res * vec2(0.32, 0.16));
  acc *= 1.0 - 0.55 * exp(-dot(q, q));

  vec3 rgb = 1.0 - exp(-acc * 0.85);               // soft tone-map, no clipping
  float a = max(rgb.r, max(rgb.g, rgb.b));
  gl_FragColor = vec4(rgb, a);                     // premultiplied
}
`;

function shaderWaves(canvas, reduced) {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  });
  if (!gl) return false;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[waves]', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return false;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
  gl.useProgram(prog);

  // One oversized triangle covers the viewport.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const U = {};
  ['u_res', 'u_dpr', 'u_time', 'u_intro', 'u_calm', 'u_amp', 'u_mouse', 'u_rip'].forEach(
    (n) => (U[n] = gl.getUniformLocation(prog, n)),
  );

  canvas.classList.add('is-gl');

  // Resolution: DPR capped at 2 and total pixels capped, so a 5K display or a
  // 3x phone doesn't shade 15M pixels. `quality` drops if frames run slow.
  const MAX_PIXELS = 3.2e6;
  let quality = 1;
  let w = 0, h = 0, dpr = 1;
  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2) * quality;
    if (w * h * dpr * dpr > MAX_PIXELS) dpr = Math.sqrt(MAX_PIXELS / (w * h));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  // Pointer: smoothed position + a strength that fades when idle.
  const mouse = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, s: 0, active: 0 };
  const rip = new Float32Array([0, 0, -1, 0, 0, -1, 0, 0, -1]);
  let ripIdx = 0;
  const t0 = performance.now();
  const now = () => (performance.now() - t0) / 1000;

  if (!reduced) {
    const inHero = () => window.scrollY < FADE_END;
    window.addEventListener('pointermove', (e) => {
      if (!inHero()) return;
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      if (mouse.x < -1e3) { mouse.x = e.clientX; mouse.y = e.clientY; }
      mouse.active = now();
    }, { passive: true });
    window.addEventListener('pointerdown', (e) => {
      if (!inHero()) return;
      rip.set([e.clientX, e.clientY, now()], ripIdx * 3);
      ripIdx = (ripIdx + 1) % 3;
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => (mouse.active = -10));
  }

  const INTRO = 2.4;
  const easeOut = (x) => 1 - Math.pow(1 - Math.min(1, x), 3);
  let last = 0, slow = 0, frames = 0;

  function draw(time, intro) {
    const idle = time - mouse.active > 1.5;
    mouse.s += ((idle ? 0 : 1) - mouse.s) * 0.04;
    mouse.x += (mouse.tx - mouse.x) * 0.12;
    mouse.y += (mouse.ty - mouse.y) * 0.12;

    gl.uniform2f(U.u_res, w, h);
    gl.uniform1f(U.u_dpr, canvas.width / w);
    gl.uniform1f(U.u_time, time);
    gl.uniform1f(U.u_intro, intro);
    gl.uniform1f(U.u_calm, Math.min(1, window.scrollY / FADE_END));
    gl.uniform1f(U.u_amp, w > 768 ? 1.6 : 1);
    gl.uniform3f(U.u_mouse, mouse.x, mouse.y, mouse.s);
    gl.uniform3fv(U.u_rip, rip);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  if (reduced) {
    // Still frame instead of nothing: the hero keeps its identity.
    draw(12, 1);
    new ResizeObserver(() => draw(12, 1)).observe(canvas);
    return true;
  }

  canvas.addEventListener('webglcontextlost', (e) => e.preventDefault());

  runLoop((ms) => {
    const time = now();
    // Adaptive quality: after the intro, if frames average >22ms, render
    // fewer pixels (down to 60% linear) rather than stutter.
    if (last && time > INTRO) {
      frames++;
      slow += time - last > 0.022 ? 1 : 0;
      if (frames === 60) {
        if (slow > 30 && quality > 0.6) { quality = Math.max(0.6, quality * 0.8); resize(); }
        frames = slow = 0;
      }
    }
    last = time;
    draw(time, easeOut(time / INTRO));
  });
  return true;
}

// ---------------------------------------------------------------------------
// Canvas 2D version (original, kept as fallback)

function classicWaves(canvas) {
  const ctx = canvas.getContext('2d', { alpha: true });
  const waves = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    waves.forEach(w => { w.yOffset = canvas.height * w.relY; });
  }
  window.addEventListener('resize', resize);

  // 8 waves: center=far (bright, blurry), top/bottom=near (darker, sharp)
  for (let i = 0; i < 8; i++) {
    const relY = 0.1 + i * 0.11;
    const depth = Math.abs(relY - 0.5) / 0.4;
    const ampScale = window.innerWidth > 768 ? 1.6 : 1;
    const amp = (20 + Math.random() * 30) * ampScale;
    waves.push({
      relY,
      amplitude: amp,
      targetAmplitude: amp,
      baseAmp: amp,
      wavelength: 400 + Math.random() * 500,
      speed: 0.001 + depth * 0.001,
      phase: Math.random() * Math.PI * 2,
      yOffset: window.innerHeight * relY,
      opacity: 0.65 - depth * 0.45,
      lineWidth: 0.5 + (1 - depth) * 1.5,
      blur: (1 - depth) * 4,
      colorShift: Math.random() * 60,
    });
  }

  function drawWave(wave) {
    ctx.save();
    if (wave.blur > 0.1) ctx.filter = `blur(${wave.blur.toFixed(1)}px)`;
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 2) {
      const primaryWave = Math.sin(x * (2 * Math.PI / wave.wavelength) + wave.phase) * wave.amplitude;
      const secondaryWave = Math.sin(x * (2 * Math.PI / (wave.wavelength * 1.5)) + wave.phase * 1.02) * wave.amplitude * 0.3;
      const tertiaryWave = Math.sin(x * (2 * Math.PI / (wave.wavelength * 2.0)) + wave.phase * 0.98) * wave.amplitude * 0.15;
      const y = wave.yOffset + primaryWave + secondaryWave + tertiaryWave;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    const time = Date.now() * 0.0001;
    const hue1 = 45 + Math.sin(time + wave.colorShift) * 15;
    const hue2 = 120 + Math.sin(time * 0.7 + wave.colorShift) * 25;
    gradient.addColorStop(0, `hsla(${hue1}, 100%, 70%, ${wave.opacity})`);
    gradient.addColorStop(0.5, `hsla(${(hue1 + hue2) / 2}, 90%, 75%, ${wave.opacity})`);
    gradient.addColorStop(1, `hsla(${hue2}, 95%, 65%, ${wave.opacity})`);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = wave.lineWidth;
    ctx.stroke();
    ctx.restore();
  }

  resize();
  runLoop(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    waves.forEach(wave => {
      drawWave(wave);
      wave.phase += wave.speed;
      wave.amplitude += (wave.targetAmplitude - wave.amplitude) * 0.02;
      if (Math.random() < 0.002) {
        wave.targetAmplitude = wave.baseAmp + (Math.random() - 0.5) * wave.baseAmp * 0.3;
      }
      wave.wavelength += Math.sin(wave.phase * 0.1) * 0.5;
      wave.wavelength = Math.max(300, Math.min(900, wave.wavelength));
    });
  });
}

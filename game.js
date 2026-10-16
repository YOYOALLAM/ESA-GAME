const app = document.getElementById('app');

const SAVE_KEY = 'esa_game_save_v1';

let save = {
  name: '',
  lang: 'ar',
  points: 0,
  coins: 500000,
  training: 0,
  team: 'ESA FC',
  tracking: {
    club: '',
    national: '',
    player: '',
    league: ''
  }
};

try {
  save = {
    ...save,
    ...JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')
  };
} catch (e) {}

let mode = '';

function persist() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch (e) {}
}

function T(ar, en) {
  return save.lang === 'ar' ? ar : en;
}

function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

function layout(body) {
  app.innerHTML = `
    <main class="shell">
      <header class="center">
        <h1 class="logo">E S A .. GAME</h1>
        <p class="muted">FOOTBALL UNIVERSE • STARTER EDITION</p>
      </header>
      ${body}
    </main>
  `;
}

function btn(text, action, cls = '') {
  return `<button class="${cls}" onclick="${action}">${text}</button>`;
}

function topbar() {
  return `
    <div class="row">
      ${btn(T('الرئيسية', 'Home'), 'home()', 'secondary')}
      <span class="tag">${esc(save.name || 'Player')}</span>
    </div>
  `;
}

function home() {
  mode = '';

  layout(`
    <section class="panel center">
      <h2>${T('ادخل رمز اللعبة', 'Enter game code')}</h2>

      <input
        id="pass"
        type="password"
        inputmode="numeric"
        placeholder="•••••"
        maxlength="5"
      >

      <p id="error" class="error"></p>

      ${btn(T('دخول', 'Enter'), 'enterGame()')}

      <hr>

      <label>
        ${T('الاسم', 'Name')}
        <input
          id="username"
          maxlength="28"
          value="${esc(save.name)}"
        >
      </label>

      <p>
        ${btn('العربية / English', 'toggleLang()', 'secondary')}
      </p>

      <p class="muted">
        13579 • 3D |
        24680 • Manager |
        23456 • Live
      </p>
    </section>
  `);

  const username = document.getElementById('username');

  if (username) {
    username.addEventListener('change', e => {
      save.name = e.target.value;
      persist();
    });
  }
}

function toggleLang() {
  save.lang = save.lang === 'ar' ? 'en' : 'ar';
  persist();
  home();
}

function enterGame() {
  const pass = document.getElementById('pass').value;

  if (pass === '13579') {
    mode = '3d';

    if (typeof football3D === 'function') {
      football3D();
    } else {
      footballFallback();
    }

    return;
  }

  if (pass === '24680') {
    mode = 'manager';
    manager();
    return;
  }

  if (pass === '23456') {
    mode = 'live';
    live();
    return;
  }

  document.getElementById('error').textContent =
    T('رمز غير صحيح', 'Invalid code');
}

function footballFallback() {
  layout(`
    ${topbar()}

    <section class="panel center">
      <h2>
        ⚽ ${T('تجربة كرة القدم', 'Football Prototype')}
      </h2>

      <p>
        ${T(
          'وضع 3D لم يكتمل تحميله، لكن اللعبة الأساسية تعمل.',
          '3D mode did not load, but the base game is working.'
        )}
      </p>

      <div class="pitch">
        <span
          class="ball"
          style="left:50%;top:50%"
        ></span>
      </div>
    </section>
  `);
}

function manager() {
  layout(`
    ${topbar()}

    <section class="panel">
      <h2>
        🧠 ${T('المدير الفني', 'Football Manager')}
      </h2>

      <div class="grid">
        <div class="stat">
          ${T('النادي', 'Club')}: ${esc(save.team)}
        </div>

        <div class="stat">
          ${T('الميزانية', 'Budget')}:
          ${Number(save.coins).toLocaleString()}
        </div>

        <div class="stat">
          ${T('التدريب', 'Training')}:
          ${save.training}
        </div>
      </div>

      <h3>${T('الخطة', 'Formation')}</h3>

      <select>
        <option>4-3-3</option>
        <option>4-4-2</option>
        <option>3-5-2</option>
      </select>

      <p class="row">
        ${btn(T('تدريب', 'Train'), 'train()')}
        ${btn(T('محاكاة مباراة', 'Simulate match'), 'simulate()')}
      </p>

      <p id="manager-result" class="muted"></p>
    </section>
  `);
}

function train() {
  if (save.coins < 1000) {
    alert(T('الميزانية غير كافية', 'Not enough funds'));
    return;
  }

  save.coins -= 1000;
  save.training += 1;

  persist();
  manager();
}

function simulate() {
  const a = Math.floor(Math.random() * 5);
  const b = Math.floor(Math.random() * 5);

  save.points += a > b ? 3 : a === b ? 1 : 0;

  persist();

  const result = document.getElementById('manager-result');

  if (result) {
    result.textContent =
      `ESA FC ${a} - ${b} RIVALS | ` +
      `${T('نقاطك', 'Your points')}: ${save.points}`;
  }
}

function live() {
  const tr = save.tracking || {};

  layout(`
    ${topbar()}

    <section class="panel">
      <h2>
        📺 ${T(
          'المباريات الحقيقية والمتابعة',
          'Live Football & Tracking'
        )}
      </h2>

      <p class="muted">
        ${T(
          'نسخة تجريبية — سيتم ربط البيانات الحقيقية لاحقًا.',
          'Prototype — real data will be connected later.'
        )}
      </p>

      <div class="grid">

        <label>
          ${T('النادي', 'Club')}
          <input
            id="club"
            value="${esc(tr.club)}"
          >
        </label>

        <label>
          ${T('المنتخب', 'National team')}
          <input
            id="national"
            value="${esc(tr.national)}"
          >
        </label>

        <label>
          ${T('اللاعب', 'Player')}
          <input
            id="player"
            value="${esc(tr.player)}"
          >
        </label>

        <label>
          ${T('الدوري', 'League')}
          <input
            id="league"
            value="${esc(tr.league)}"
          >
        </label>

      </div>

      <p>
        ${btn(T('حفظ', 'Save'), 'saveTracking()')}
      </p>

      <p id="tracking-status" class="muted"></p>
    </section>
  `);
}

function saveTracking() {
  save.tracking = {
    club:
      document.getElementById('club').value.trim(),

    national:
      document.getElementById('national').value.trim(),

    player:
      document.getElementById('player').value.trim(),

    league:
      document.getElementById('league').value.trim()
  };

  persist();

  document.getElementById('tracking-status').textContent =
    T('تم الحفظ', 'Saved');
}

window.home = home;
window.toggleLang = toggleLang;
window.enterGame = enterGame;
window.manager = manager;
window.train = train;
window.simulate = simulate;
window.live = live;
window.saveTracking = saveTracking;
window.footballFallback = footballFallback;

home();

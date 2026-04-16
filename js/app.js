/**
 * 考研英语词汇大师 - 主应用
 */

// 示例词汇数据
const SAMPLE_WORDS = [
  {
    id: 'word_001',
    word: 'abandon',
    phonetic: '/əˈbændən/',
    libraryId: 'hongbaoshu',
    definitions: [
      { part: 'v.', meaning: '放弃；遗弃' },
      { part: 'n.', meaning: '放任；放纵' }
    ],
    examples: [
      { sentence: 'They had to abandon the ship.', translation: '他们只得放弃那艘船。' }
    ],
    roots: 'ab (远离) + andon (给) → 给出去 → 放弃',
    tags: ['红宝书', '核心词'],
    masterLevel: 0
  },
  {
    id: 'word_002',
    word: 'ability',
    phonetic: '/əˈbɪləti/',
    libraryId: 'hongbaoshu',
    definitions: [
      { part: 'n.', meaning: '能力；才能' }
    ],
    examples: [
      { sentence: 'She has the ability to speak French.', translation: '她有说法语的能力。' }
    ],
    roots: 'able (能) + ity (名词后缀)',
    tags: ['红宝书', '核心词'],
    masterLevel: 0
  },
  {
    id: 'word_003',
    word: 'able',
    phonetic: '/ˈeɪbl/',
    libraryId: 'hongbaoshu',
    definitions: [
      { part: 'adj.', meaning: '能够的；有能力的' }
    ],
    examples: [
      { sentence: 'He is able to swim.', translation: '他会游泳。' }
    ],
    roots: '',
    tags: ['红宝书', '基础词'],
    masterLevel: 0
  },
  {
    id: 'word_004',
    word: 'about',
    phonetic: '/əˈbaʊt/',
    libraryId: 'hongbaoshu',
    definitions: [
      { part: 'prep.', meaning: '关于；大约' },
      { part: 'adv.', meaning: '大约；到处' }
    ],
    examples: [
      { sentence: 'What is the book about?', translation: '这本书是关于什么的？' }
    ],
    roots: '',
    tags: ['红宝书', '基础词'],
    masterLevel: 0
  },
  {
    id: 'word_005',
    word: 'above',
    phonetic: '/əˈbʌv/',
    libraryId: 'hongbaoshu',
    definitions: [
      { part: 'prep.', meaning: '在...上面；超过' },
      { part: 'adv.', meaning: '在上面；以上' }
    ],
    examples: [
      { sentence: 'The birds flew above the clouds.', translation: '鸟儿在云层之上飞翔。' }
    ],
    roots: 'a (在) + bove (在上面)',
    tags: ['红宝书', '基础词'],
    masterLevel: 0
  },
  {
    id: 'word_006',
    word: 'abroad',
    phonetic: '/əˈbrɔːd/',
    libraryId: 'hongbaoshu',
    definitions: [
      { part: 'adv.', meaning: '到国外；在海外' }
    ],
    examples: [
      { sentence: 'She went abroad to study.', translation: '她出国读书了。' }
    ],
    roots: 'ab (离开) + road (路) → 离开路 → 在海外',
    tags: ['红宝书', '核心词'],
    masterLevel: 0
  },
  {
    id: 'word_007',
    word: 'absence',
    phonetic: '/ˈæbsəns/',
    libraryId: 'hongbaoshu',
    definitions: [
      { part: 'n.', meaning: '缺席；缺乏' }
    ],
    examples: [
      { sentence: 'His absence was noted.', translation: '他的缺席被注意到了。' }
    ],
    roots: 'ab (离开) + sence (存在) → 不在',
    tags: ['红宝书', '核心词'],
    masterLevel: 0
  },
  {
    id: 'word_008',
    word: 'absolute',
    phonetic: '/ˈæbsəluːt/',
    libraryId: 'hongbaoshu',
    definitions: [
      { part: 'adj.', meaning: '绝对的；完全的' }
    ],
    examples: [
      { sentence: 'I have absolute confidence in him.', translation: '我对他绝对信任。' }
    ],
    roots: 'ab (离开) + solute (溶解) → 不溶解的 → 绝对的',
    tags: ['红宝书', '核心词'],
    masterLevel: 0
  },
  {
    id: 'word_009',
    word: 'absorb',
    phonetic: '/əbˈzɔːrb/',
    libraryId: 'hongbaoshu',
    definitions: [
      { part: 'v.', meaning: '吸收；吸引' }
    ],
    examples: [
      { sentence: 'Plants absorb water.', translation: '植物吸收水分。' }
    ],
    roots: 'ab ( away) + sorb (喝) → 喝掉 → 吸收',
    tags: ['红宝书', '核心词'],
    masterLevel: 0
  },
  {
    id: 'word_010',
    word: 'abstract',
    phonetic: '/ˈæbstrækt/',
    libraryId: 'hongbaoshu',
    definitions: [
      { part: 'adj.', meaning: '抽象的；理论的' },
      { part: 'n.', meaning: '摘要；抽象' }
    ],
    examples: [
      { sentence: 'The concept is too abstract.', translation: '这个概念太抽象了。' }
    ],
    roots: 'ab ( from) + tract (拉) → 抽取出来',
    tags: ['红宝书', '核心词'],
    masterLevel: 0
  }
];

// 应用类
class App {
  constructor() {
    this.pages = {};
    this.init();
  }

  async init() {
    await DB.init();
    await this.loadSampleData();
    this.bindEvents();
    this.navigateTo('home');
    AppState.subscribe(() => this.onStateChange());
    this.registerServiceWorker();
    console.log('App initialized');
  }

  async loadSampleData() {
    const words = await DB.getAllWords();
    if (words.length === 0) {
      await DB.addWords(SAMPLE_WORDS);
      console.log('Sample data loaded');
    }
  }

  bindEvents() {
    document.querySelectorAll('.dock__item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        this.navigateTo(page);
      });
    });

    document.getElementById('settingsBtn')?.addEventListener('click', () => {
      this.navigateTo('profile');
    });

    document.getElementById('modalOverlay')?.addEventListener('click', hideModal);
  }

  navigateTo(page) {
    AppState.setPage(page);
    document.querySelectorAll('.dock__item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });

    const titles = {
      home: '首页',
      library: '词库',
      learn: '学习',
      profile: '我的'
    };
    document.getElementById('titleBarTitle').textContent = titles[page] || '考研英语词汇大师';
    this.renderPage(page);
  }

  renderPage(page) {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    switch (page) {
      case 'home':
        mainContent.innerHTML = this.renderHomePage();
        this.initHomePage();
        break;
      case 'library':
        mainContent.innerHTML = this.renderLibraryPage();
        this.initLibraryPage();
        break;
      case 'learn':
        mainContent.innerHTML = this.renderLearnPage();
        this.initLearnPage();
        break;
      case 'profile':
        mainContent.innerHTML = this.renderProfilePage();
        this.initProfilePage();
        break;
      case 'quiz':
        mainContent.innerHTML = this.renderQuizPage();
        this.initQuizPage();
        break;
      default:
        mainContent.innerHTML = '<div class="page"><p>页面不存在</p></div>';
    }
  }

  onStateChange() {}

  // 首页
  renderHomePage() {
    const { user } = AppState;
    const progress = getCircleProgress(user.todayLearned, user.dailyGoal);
    const circumference = 2 * Math.PI * 42;
    const dashLength = (progress / 100) * circumference;

    return `
      <div class="page animate-fade-in">
        <div class="home-hero">
          <div class="hero-card">
            <div class="hero-card__title">今日学习目标</div>
            <div class="hero-card__progress">
              <div class="hero-card__circle">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle class="hero-card__circle-bg" cx="50" cy="50" r="42" />
                  <circle class="hero-card__circle-progress" cx="50" cy="50" r="42"
                    stroke-dasharray="${dashLength} ${circumference}" stroke-dashoffset="0" />
                </svg>
                <div class="hero-card__circle-text">
                  <span class="hero-card__circle-value">${user.todayLearned}</span>
                  <span class="hero-card__circle-label">/ ${user.dailyGoal} 词</span>
                </div>
              </div>
              <div class="hero-card__stats">
                <div class="hero-card__stat">
                  <div class="hero-card__stat-value">${user.totalLearned}</div>
                  <div class="hero-card__stat-label">已学总词数</div>
                </div>
                <div class="hero-card__stat">
                  <div class="hero-card__stat-value">${user.dailyGoal - user.todayLearned}</div>
                  <div class="hero-card__stat-label">剩余任务</div>
                </div>
              </div>
            </div>
            <div class="hero-card__streak">
              <span>🔥</span> 已连续学习 ${user.streak} 天
            </div>
          </div>
        </div>

        <div class="quick-actions">
          <div class="quick-action" id="continueLearn">
            <div class="quick-action__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div>
              <div class="quick-action__text">继续学习</div>
              <div class="quick-action__sub">Unit 1 · 红宝书</div>
            </div>
          </div>
          <div class="quick-action" id="startQuiz">
            <div class="quick-action__icon quick-action__icon--secondary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <div>
              <div class="quick-action__text">开始测验</div>
              <div class="quick-action__sub">10题随机抽查</div>
            </div>
          </div>
        </div>

        <div class="section-header">
          <h2 class="section-title">
            <span class="section-title__icon">📖</span>
            最近学习
          </h2>
        </div>

        <div class="recent-units card-stagger">
          <div class="unit-card" data-unit="1">
            <div class="unit-card__name">Unit 1</div>
            <div class="unit-card__source">红宝书</div>
            <div class="unit-card__progress">28/50 词</div>
            <div class="unit-card__progress-bar">
              <div class="unit-card__progress-fill" style="width: 56%"></div>
            </div>
          </div>
          <div class="unit-card" data-unit="2">
            <div class="unit-card__name">Unit 2</div>
            <div class="unit-card__source">红宝书</div>
            <div class="unit-card__progress">15/50 词</div>
            <div class="unit-card__progress-bar">
              <div class="unit-card__progress-fill" style="width: 30%"></div>
            </div>
          </div>
          <div class="unit-card unit-card--completed" data-unit="3">
            <div class="unit-card__name">Unit 3</div>
            <div class="unit-card__source">红宝书</div>
            <div class="unit-card__progress">已完成</div>
            <div class="unit-card__progress-bar">
              <div class="unit-card__progress-fill" style="width: 100%"></div>
            </div>
          </div>
        </div>

        <div class="reminder-card">
          <div class="reminder-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <div class="reminder-card__text">
            <div class="reminder-card__title">今日任务提醒</div>
            <div class="reminder-card__subtitle">剩余 ${user.dailyGoal - user.todayLearned} 个单词待学习</div>
          </div>
        </div>
      </div>
    `;
  }

  initHomePage() {
    document.getElementById('continueLearn')?.addEventListener('click', () => {
      this.navigateTo('learn');
    });

    document.getElementById('startQuiz')?.addEventListener('click', () => {
      this.startQuiz();
    });

    document.querySelectorAll('.unit-card').forEach(card => {
      card.addEventListener('click', () => {
        this.navigateTo('learn');
      });
    });
  }

  // 词库页面
  renderLibraryPage() {
    return `
      <div class="page animate-fade-in">
        <div class="search-container">
          <input type="text" class="input input--search" placeholder="搜索单词或词库..." id="searchInput">
        </div>

        <div class="library-tabs">
          <div class="tabs">
            <button class="tab active" data-tab="all">全部</button>
            <button class="tab" data-tab="hongbaoshu">红宝书</button>
            <button class="tab" data-tab="custom">自定义</button>
          </div>
        </div>

        <div class="library-list" id="libraryList"></div>

        <button class="fab" id="addWordBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    `;
  }

  async initLibraryPage() {
    await this.renderLibraryList();

    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderLibraryList();
      });
    });

    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('input', debounce(async (e) => {
      const query = e.target.value.trim();
      if (query) {
        const results = await DB.searchWords(query);
        this.renderSearchResults(results);
      } else {
        await this.renderLibraryList();
      }
    }, 300));

    document.getElementById('addWordBtn')?.addEventListener('click', () => {
      this.showAddWordModal();
    });
  }

  async renderLibraryList() {
    const container = document.getElementById('libraryList');
    if (!container) return;

    const libraries = await DB.getLibraries();

    container.innerHTML = libraries.map(lib => `
      <div class="library-card" data-id="${lib.id}">
        <div class="library-card__header">
          <div class="library-card__dots">
            <span class="library-card__dot"></span>
            <span class="library-card__dot"></span>
            <span class="library-card__dot"></span>
          </div>
          <span class="library-card__title">${lib.name}</span>
        </div>
        <div class="library-card__body">
          <div class="library-card__meta">
            <span class="library-card__stat">
              <svg class="library-card__stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              ${lib.wordCount || 0} 词
            </span>
            <span class="library-card__stat">
              <svg class="library-card__stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              已学 0
            </span>
          </div>
          <div class="library-card__progress">
            <div class="progress">
              <div class="progress__bar" style="width: 0%"></div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.library-card').forEach(card => {
      card.addEventListener('click', () => {
        this.showLibraryDetail(card.dataset.id);
      });
    });
  }

  renderSearchResults(words) {
    const container = document.getElementById('libraryList');
    if (!container) return;

    if (words.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          <h3 class="empty-state__title">未找到相关单词</h3>
          <p class="empty-state__description">尝试搜索其他关键词</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="word-list">
        ${words.slice(0, 20).map(word => `
          <div class="word-item" data-id="${word.id}">
            <span class="word-item__word">${word.word}</span>
            <span class="word-item__phonetic">${word.phonetic}</span>
            <span class="word-item__status ${word.masterLevel >= 3 ? 'mastered' : word.masterLevel >= 1 ? 'learned' : ''}"></span>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.word-item').forEach(item => {
      item.addEventListener('click', () => {
        this.showWordDetail(item.dataset.id);
      });
    });
  }

  showAddWordModal() {
    showModal({
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
      title: '添加单词',
      body: '请输入单词信息',
      buttons: [
        { text: '取消', class: 'btn--secondary' },
        { text: '添加', class: 'btn--primary', onClick: () => this.addNewWord() }
      ]
    });

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
      <div style="text-align: left;">
        <input type="text" class="input" placeholder="单词" id="newWord" style="margin-bottom: 12px;">
        <input type="text" class="input" placeholder="音标 (如 /test/)" id="newPhonetic" style="margin-bottom: 12px;">
        <input type="text" class="input" placeholder="释义" id="newMeaning">
      </div>
    `;
  }

  async addNewWord() {
    const word = document.getElementById('newWord')?.value.trim();
    const phonetic = document.getElementById('newPhonetic')?.value.trim();
    const meaning = document.getElementById('newMeaning')?.value.trim();

    if (!word || !meaning) {
      showToast('请填写单词和释义');
      return;
    }

    const newWord = {
      id: generateId(),
      word,
      phonetic: phonetic || '',
      libraryId: 'hongbaoshu',
      definitions: [{ part: 'n.', meaning }],
      examples: [],
      roots: '',
      tags: ['自定义'],
      masterLevel: 0
    };

    await DB.addWord(newWord);
    showToast('单词添加成功');
    await this.renderLibraryList();
  }

  async showLibraryDetail(libId) {
    const words = await DB.getWordsByLibrary(libId);
    const library = await DB.getLibrary(libId);

    const container = document.getElementById('mainContent');
    container.innerHTML = `
      <div class="page animate-fade-in">
        <div class="mac-window">
          <div class="mac-window__header">
            <div class="mac-window__controls">
              <span class="mac-window__dot mac-window__dot--close"></span>
              <span class="mac-window__dot mac-window__dot--minimize"></span>
              <span class="mac-window__dot mac-window__dot--maximize"></span>
            </div>
            <span class="mac-window__title">${library?.name || '词库'}</span>
          </div>
          <div class="mac-window__content">
            <div class="word-list">
              ${words.slice(0, 50).map(word => `
                <div class="word-item" data-id="${word.id}">
                  <span class="word-item__word">${word.word}</span>
                  <span class="word-item__phonetic">${word.phonetic}</span>
                  <span class="word-item__status ${word.masterLevel >= 3 ? 'mastered' : word.masterLevel >= 1 ? 'learned' : ''}"></span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <button class="btn btn--primary btn--block" style="margin-top: 24px;" id="startLearnBtn">
          开始学习
        </button>
      </div>
    `;

    document.querySelector('.mac-window__header')?.addEventListener('click', () => {
      this.navigateTo('library');
    });

    container.querySelectorAll('.word-item').forEach(item => {
      item.addEventListener('click', () => {
        this.showWordDetail(item.dataset.id);
      });
    });

    document.getElementById('startLearnBtn')?.addEventListener('click', () => {
      AppState.setLearning(libId, words);
      this.navigateTo('learn');
    });
  }

  async showWordDetail(wordId) {
    const word = await DB.getWord(wordId);
    if (!word) return;

    const container = document.getElementById('mainContent');
    const firstDef = word.definitions?.[0] || { part: '', meaning: '暂无释义' };
    const firstExample = word.examples?.[0] || { sentence: '', translation: '' };

    container.innerHTML = `
      <div class="page animate-fade-in">
        <div class="mac-window">
          <div class="mac-window__header">
            <div class="mac-window__controls">
              <span class="mac-window__dot mac-window__dot--close"></span>
              <span class="mac-window__dot mac-window__dot--minimize"></span>
              <span class="mac-window__dot mac-window__dot--maximize"></span>
            </div>
            <span class="mac-window__title">单词详情</span>
          </div>
          <div class="mac-window__content" style="text-align: center;">
            <div style="font-size: 36px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
              ${word.word}
            </div>
            <div style="font-size: 18px; color: var(--text-secondary); font-family: var(--font-mono); margin-bottom: 24px;">
              ${word.phonetic}
            </div>
            <button class="btn btn--ghost" id="playAudioBtn" style="margin-bottom: 24px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              发音
            </button>

            <div style="text-align: left;">
              <div class="divider__text" style="margin-bottom: 12px;">释义</div>
              ${word.definitions?.map(d => `
                <div style="margin-bottom: 12px;">
                  <span class="tag" style="margin-right: 8px;">${d.part}</span>
                  <span>${d.meaning}</span>
                </div>
              `).join('') || ''}

              ${word.roots ? `
                <div class="divider__text" style="margin: 24px 0 12px;">词根词缀</div>
                <div style="padding: 12px; background: var(--bg-tertiary); border-radius: 8px; font-size: 14px; color: var(--text-secondary);">
                  ${word.roots}
                </div>
              ` : ''}

              ${firstExample.sentence ? `
                <div class="divider__text" style="margin: 24px 0 12px;">例句</div>
                <div style="margin-bottom: 16px; padding-left: 12px; border-left: 3px solid var(--accent);">
                  <div style="font-style: italic; color: var(--text-primary);">${firstExample.sentence}</div>
                  <div style="font-size: 14px; color: var(--text-tertiary); margin-top: 4px;">${firstExample.translation}</div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
        <button class="btn btn--secondary btn--block" style="margin-top: 24px;" id="backBtn">返回</button>
      </div>
    `;

    document.getElementById('backBtn')?.addEventListener('click', () => {
      this.navigateTo('library');
    });

    document.getElementById('playAudioBtn')?.addEventListener('click', () => {
      playAudio(word.word);
    });
  }

  // 学习页面
  renderLearnPage() {
    const { learning } = AppState;
    const currentWord = learning.words[learning.wordIndex];
    const progress = getCircleProgress(learning.wordIndex + 1, learning.words.length);

    if (!currentWord) {
      return `
        <div class="page animate-fade-in">
          <div class="empty-state">
            <div class="empty-state__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 class="empty-state__title">暂无学习内容</h3>
            <p class="empty-state__description">请先选择词库开始学习</p>
            <button class="btn btn--primary" style="margin-top: 24px;" onclick="app.navigateTo('library')">选择词库</button>
          </div>
        </div>
      `;
    }

    const firstDef = currentWord.definitions?.[0] || { part: '', meaning: '暂无释义' };
    const firstExample = currentWord.examples?.[0] || { sentence: '', translation: '' };

    return `
      <div class="page animate-fade-in">
        <div class="learn-header">
          <div class="learn-progress">
            <span class="learn-progress__text">${learning.wordIndex + 1}/${learning.words.length}</span>
            <div class="learn-progress__bar">
              <div class="learn-progress__fill" style="width: ${progress}%"></div>
            </div>
            <span class="learn-progress__text">Unit 1</span>
          </div>
        </div>

        <div class="learn-card-container">
          <div class="learn-card ${learning.isFlipped ? 'flipped' : ''}" id="learnCard">
            <div class="learn-card__face">
              <div class="learn-card__window">
                <span class="learn-card__dot"></span>
                <span class="learn-card__dot"></span>
                <span class="learn-card__dot"></span>
              </div>
              <div class="learn-card__word">${currentWord.word}</div>
              <div class="learn-card__phonetic">${currentWord.phonetic}</div>
              <button class="learn-card__audio" id="playAudio">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              </button>
              <div class="learn-card__hint">点击卡片显示释义</div>
            </div>
            <div class="learn-card__face learn-card__face--back">
              <div class="learn-card__window">
                <span class="learn-card__dot"></span>
                <span class="learn-card__dot"></span>
                <span class="learn-card__dot"></span>
              </div>
              <div class="learn-card__definition">
                <span class="learn-card__part">${firstDef.part}</span>
                <div class="learn-card__meaning">${firstDef.meaning}</div>
              </div>
              ${firstExample.sentence ? `
                <div class="learn-card__example">${firstExample.sentence}</div>
                <div class="learn-card__translation">${firstExample.translation}</div>
              ` : ''}
              ${currentWord.roots ? `
                <div class="learn-card__roots">
                  <strong>词根：</strong>${currentWord.roots}
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <div class="learn-actions">
          <div class="learn-btn learn-btn--error" id="btnUnknown">
            <div class="learn-btn__icon">❌</div>
            <div class="learn-btn__text">不认识</div>
            <div class="learn-btn__sub">再来一次</div>
          </div>
          <div class="learn-btn learn-btn--warning" id="btnFuzzy">
            <div class="learn-btn__icon">🟡</div>
            <div class="learn-btn__text">模糊</div>
            <div class="learn-btn__sub">需要复习</div>
          </div>
          <div class="learn-btn learn-btn--success" id="btnKnown">
            <div class="learn-btn__icon">✅</div>
            <div class="learn-btn__text">认识</div>
            <div class="learn-btn__sub">已掌握</div>
          </div>
        </div>
      </div>
    `;
  }

  initLearnPage() {
    const { learning } = AppState;

    const card = document.getElementById('learnCard');
    card?.addEventListener('click', () => {
      AppState.flipCard();
      this.renderLearnPage();
    });

    document.getElementById('playAudio')?.addEventListener('click', (e) => {
      e.stopPropagation();
      playAudio(learning.words[learning.wordIndex]?.word);
    });

    document.getElementById('btnUnknown')?.addEventListener('click', async () => {
      const word = learning.words[learning.wordIndex];
      if (word) {
        await DB.updateRecord(word.id, { status: 'learning', wrongCount: 1 });
      }
      AppState.nextWord();
      this.renderLearnPage();
    });

    document.getElementById('btnFuzzy')?.addEventListener('click', async () => {
      const word = learning.words[learning.wordIndex];
      if (word) {
        await DB.updateRecord(word.id, { status: 'reviewing' });
      }
      AppState.nextWord();
      this.renderLearnPage();
    });

    document.getElementById('btnKnown')?.addEventListener('click', async () => {
      const word = learning.words[learning.wordIndex];
      if (word) {
        await DB.updateRecord(word.id, { status: 'mastered', correctCount: 1 });
        AppState.user.todayLearned++;
        AppState.notify();
      }

      if (!AppState.nextWord()) {
        this.showLearnCompleteModal();
      }
      this.renderLearnPage();
    });
  }

  showLearnCompleteModal() {
    showModal({
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
      title: '🎉 本章学习完成！',
      body: '恭喜完成 Unit 1 的学习，是否进行随机测验巩固记忆？',
      buttons: [
        { text: '稍后再说', class: 'btn--secondary' },
        { text: '开始测验', class: 'btn--primary', onClick: () => this.startQuiz() }
      ]
    });
  }

  // 测验
  async startQuiz() {
    const words = await DB.getAllWords();
    const questions = this.generateQuizQuestions(words.slice(0, 30));

    if (questions.length === 0) {
      showToast('暂无足够的单词进行测验');
      return;
    }

    AppState.startQuiz(questions);
    this.navigateTo('quiz');
  }

  generateQuizQuestions(words) {
    return shuffle(words).slice(0, 10).map(word => {
      const correctDef = word.definitions?.[0]?.meaning || '正确';
      const wrongDefs = words
        .filter(w => w.id !== word.id)
        .slice(0, 3)
        .map(w => w.definitions?.[0]?.meaning || '错误');

      const options = shuffle([correctDef, ...wrongDefs.slice(0, 3)]);

      return {
        word: word.word,
        phonetic: word.phonetic,
        options,
        correct: correctDef,
        wordId: word.id
      };
    });
  }

  renderQuizPage() {
    const { quiz } = AppState;

    if (!quiz.isActive || quiz.questions.length === 0) {
      return `
        <div class="page animate-fade-in">
          <div class="empty-state">
            <div class="empty-state__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <h3 class="empty-state__title">测验已完成</h3>
            <button class="btn btn--primary" style="margin-top: 24px;" onclick="app.navigateTo('home')">返回首页</button>
          </div>
        </div>
      `;
    }

    const question = quiz.questions[quiz.currentIndex];
    const progress = getCircleProgress(quiz.currentIndex + 1, quiz.questions.length);

    return `
      <div class="page animate-fade-in">
        <div class="quiz-header">
          <div class="quiz-progress">
            <span>第 ${quiz.currentIndex + 1}/${quiz.questions.length} 题</span>
            <div class="quiz-progress__bar">
              <div class="quiz-progress__fill" style="width: ${progress}%"></div>
            </div>
          </div>
        </div>

        <div class="quiz-card">
          <div class="quiz-card__word">${question.word}</div>
          <div class="quiz-card__phonetic">${question.phonetic}</div>
        </div>

        <div class="quiz-options" id="quizOptions">
          ${question.options.map((opt, i) => `
            <div class="quiz-option" data-answer="${opt}">
              <span class="quiz-option__marker">${String.fromCharCode(65 + i)}</span>
              <span class="quiz-option__text">${opt}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  initQuizPage() {
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', () => this.handleQuizAnswer(option));
    });
  }

  handleQuizAnswer(optionEl) {
    const answer = optionEl.dataset.answer;
    const isCorrect = AppState.answerQuestion(answer);

    document.querySelectorAll('.quiz-option').forEach(opt => {
      opt.style.pointerEvents = 'none';
      if (opt.dataset.answer === answer) {
        opt.classList.add(isCorrect ? 'correct' : 'wrong');
      }
      if (opt.dataset.answer === AppState.quiz.questions[AppState.quiz.currentIndex].correct) {
        opt.classList.add('correct');
      }
    });

    setTimeout(() => {
      if (!AppState.nextQuestion()) {
        this.showQuizResult();
      } else {
        this.renderQuizPage();
        this.initQuizPage();
      }
    }, 1000);
  }

  showQuizResult() {
    const { quiz } = AppState;
    const total = quiz.questions.length;
    const score = quiz.score;
    const percentage = Math.round((score / total) * 100);

    const mainContent = document.getElementById('mainContent');
    const circumference = 2 * Math.PI * 70;
    const dashLength = (percentage / 100) * circumference;

    mainContent.innerHTML = `
      <div class="page animate-fade-in">
        <div class="quiz-result">
          <div class="quiz-result__circle">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle class="quiz-result__circle-bg" cx="80" cy="80" r="70" />
              <circle class="quiz-result__circle-fill ${percentage >= 80 ? 'success' : ''}"
                cx="80" cy="80" r="70"
                stroke-dasharray="${dashLength} ${circumference}"
                stroke-dashoffset="0" />
            </svg>
            <div class="quiz-result__text">
              <span class="quiz-result__score">${percentage}%</span>
              <span class="quiz-result__label">正确率</span>
            </div>
          </div>

          <div class="quiz-result__stats">
            <div class="quiz-result__stat">
              <div class="quiz-result__stat-value correct">${score}</div>
              <div class="quiz-result__stat-label">答对</div>
            </div>
            <div class="quiz-result__stat">
              <div class="quiz-result__stat-value wrong">${total - score}</div>
              <div class="quiz-result__stat-label">答错</div>
            </div>
          </div>

          <button class="btn btn--primary btn--block" style="margin-bottom: 16px;" id="replayQuiz">
            重新测验
          </button>
          <button class="btn btn--secondary btn--block" id="backHome">
            返回首页
          </button>
        </div>
      </div>
    `;

    document.getElementById('replayQuiz')?.addEventListener('click', () => {
      this.startQuiz();
    });

    document.getElementById('backHome')?.addEventListener('click', () => {
      AppState.resetQuiz();
      this.navigateTo('home');
    });
  }

  // 我的页面
  renderProfilePage() {
    const { user } = AppState;

    return `
      <div class="page animate-fade-in">
        <div class="profile-header">
          <div class="profile-avatar">${user.name.charAt(0)}</div>
          <div class="profile-name">${user.name}</div>
          <div class="profile-stats">
            <div class="profile-stat">
              <div class="profile-stat__value">${user.totalLearned}</div>
              <div class="profile-stat__label">已学单词</div>
            </div>
            <div class="profile-stat">
              <div class="profile-stat__value">${user.streak}</div>
              <div class="profile-stat__label">连续天数</div>
            </div>
            <div class="profile-stat">
              <div class="profile-stat__value">${user.dailyGoal}</div>
              <div class="profile-stat__label">每日目标</div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section__title">学习设置</div>
          <div class="settings-list">
            <div class="settings-item" id="dailyGoalSetting">
              <div class="settings-item__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div class="settings-item__content">
                <div class="settings-item__title">每日目标</div>
                <div class="settings-item__subtitle">每天学习 ${user.dailyGoal} 个单词</div>
              </div>
              <span class="settings-item__action">›</span>
            </div>
            <div class="settings-item" id="reminderSetting">
              <div class="settings-item__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <div class="settings-item__content">
                <div class="settings-item__title">学习提醒</div>
                <div class="settings-item__subtitle">每天 08:00 提醒</div>
              </div>
              <span class="settings-item__action">›</span>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section__title">界面设置</div>
          <div class="settings-list">
            <div class="settings-item" id="themeToggle">
              <div class="settings-item__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
              <div class="settings-item__content">
                <div class="settings-item__title">深色模式</div>
                <div class="settings-item__subtitle">切换明暗主题</div>
              </div>
              <div class="toggle" id="darkModeToggle">
                <div class="toggle__knob"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section__title">数据管理</div>
          <div class="settings-list">
            <div class="settings-item" id="exportData">
              <div class="settings-item__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
              <div class="settings-item__content">
                <div class="settings-item__title">导出学习记录</div>
                <div class="settings-item__subtitle">备份你的学习数据</div>
              </div>
              <span class="settings-item__action">›</span>
            </div>
            <div class="settings-item" id="clearData">
              <div class="settings-item__icon" style="background: var(--error-light); color: var(--error);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </div>
              <div class="settings-item__content">
                <div class="settings-item__title" style="color: var(--error);">清除学习进度</div>
                <div class="settings-item__subtitle">重置所有学习数据</div>
              </div>
              <span class="settings-item__action">›</span>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-section__title">关于</div>
          <div class="settings-list">
            <div class="settings-item">
              <div class="settings-item__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div class="settings-item__content">
                <div class="settings-item__title">版本信息</div>
                <div class="settings-item__subtitle">v1.0.0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initProfilePage() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    darkModeToggle?.classList.toggle('active', isDark);

    darkModeToggle?.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      darkModeToggle.classList.toggle('active', !isDark);
      Utils.Storage.set('theme', isDark ? 'light' : 'dark');
    });

    document.getElementById('clearData')?.addEventListener('click', () => {
      showModal({
        icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        title: '确认清除',
        body: '确定要清除所有学习进度吗？此操作不可恢复。',
        buttons: [
          { text: '取消', class: 'btn--secondary' },
          { text: '确认清除', class: 'btn--error', onClick: async () => {
            await store.set('records', {});
            AppState.user.todayLearned = 0;
            AppState.user.totalLearned = 0;
            showToast('学习进度已清除');
          }}
        ]
      });
    });

    document.getElementById('exportData')?.addEventListener('click', async () => {
      const records = await DB.getRecords();
      const dataStr = JSON.stringify(records, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vocab_records.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('导出成功');
    });

    document.getElementById('dailyGoalSetting')?.addEventListener('click', () => {
      showModal({
        icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>',
        title: '设置每日目标',
        body: '设置每天的学习单词数量',
        buttons: [
          { text: '取消', class: 'btn--secondary' },
          { text: '保存', class: 'btn--primary', onClick: () => {
            showToast('设置已保存');
          }}
        ]
      });

      const modalBody = document.getElementById('modalBody');
      modalBody.innerHTML = `
        <div style="text-align: center;">
          <input type="range" min="10" max="100" step="5" value="30"
            style="width: 100%;" id="goalSlider">
          <div style="font-size: 32px; font-weight: 700; color: var(--accent); margin-top: 16px;">
            <span id="goalValue">30</span> 词/天
          </div>
        </div>
      `;

      const slider = document.getElementById('goalSlider');
      const valueDisplay = document.getElementById('goalValue');
      slider?.addEventListener('input', (e) => {
        valueDisplay.textContent = e.target.value;
        AppState.user.dailyGoal = parseInt(e.target.value);
      });
    });
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('SW registered:', reg))
        .catch(err => console.log('SW registration failed:', err));
    }
  }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new App();
  window.app = app;
});

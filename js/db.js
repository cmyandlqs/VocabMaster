/**
 * IndexedDB 数据库操作模块
 * 使用 localforage 实现便捷的本地存储
 */

const DB = {
  // 词库相关
  WORDS: 'words',
  LIBRARIES: 'libraries',
  RECORDS: 'records',
  PLAN: 'plan',
  SETTINGS: 'settings',

  // 初始化
  async init() {
    try {
      await this.initWords();
      await this.initLibraries();
      await this.initRecords();
      await this.initSettings();
      console.log('Database initialized');
    } catch (e) {
      console.error('Database init error:', e);
    }
  },

  // 初始化词库表
  async initWords() {
    const existing = await store.get(this.WORDS);
    if (!existing) {
      await store.set(this.WORDS, []);
    }
  },

  // 初始化词库分类表
  async initLibraries() {
    const existing = await store.get(this.LIBRARIES);
    if (!existing) {
      // 创建默认红宝书词库
      const defaultLibrary = {
        id: 'hongbaoshu',
        name: '考研英语红宝书',
        description: '考研英语核心词汇',
        wordCount: 0,
        wordIds: [],
        source: 'builtin',
        createdAt: Date.now()
      };
      await store.set(this.LIBRARIES, [defaultLibrary]);
    }
  },

  // 初始化学习记录表
  async initRecords() {
    const existing = await store.get(this.RECORDS);
    if (!existing) {
      await store.set(this.RECORDS, {});
    }
  },

  // 初始化设置表
  async initSettings() {
    const existing = await store.get(this.SETTINGS);
    if (!existing) {
      await store.set(this.SETTINGS, {
        theme: 'light',
        dailyGoal: 30,
        reminderTime: '08:00',
        autoPlay: false
      });
    }
  },

  // ===== 词库操作 =====

  // 获取所有词库
  async getLibraries() {
    return await store.get(this.LIBRARIES) || [];
  },

  // 获取词库详情
  async getLibrary(id) {
    const libs = await this.getLibraries();
    return libs.find(lib => lib.id === id);
  },

  // 添加词库
  async addLibrary(library) {
    const libs = await this.getLibraries();
    libs.push(library);
    await store.set(this.LIBRARIES, libs);
    return library;
  },

  // 获取词库中的单词
  async getWordsByLibrary(libraryId) {
    const allWords = await store.get(this.WORDS) || [];
    return allWords.filter(w => w.libraryId === libraryId);
  },

  // 获取所有单词
  async getAllWords() {
    return await store.get(this.WORDS) || [];
  },

  // 添加单词
  async addWord(word) {
    const words = await store.get(this.WORDS) || [];
    words.push(word);
    await store.set(this.WORDS, words);
    return word;
  },

  // 批量添加单词
  async addWords(newWords) {
    const words = await store.get(this.WORDS) || [];
    words.push(...newWords);
    await store.set(this.WORDS, words);
    return newWords;
  },

  // 获取单词
  async getWord(id) {
    const words = await store.get(this.WORDS) || [];
    return words.find(w => w.id === id);
  },

  // 更新单词
  async updateWord(id, updates) {
    const words = await store.get(this.WORDS) || [];
    const index = words.findIndex(w => w.id === id);
    if (index !== -1) {
      words[index] = { ...words[index], ...updates };
      await store.set(this.WORDS, words);
      return words[index];
    }
    return null;
  },

  // 删除单词
  async deleteWord(id) {
    const words = await store.get(this.WORDS) || [];
    const filtered = words.filter(w => w.id !== id);
    await store.set(this.WORDS, filtered);
  },

  // 搜索单词
  async searchWords(query) {
    const words = await store.get(this.WORDS) || [];
    const q = query.toLowerCase();
    return words.filter(w =>
      w.word.toLowerCase().includes(q) ||
      w.definitions?.some(d => d.meaning.toLowerCase().includes(q))
    );
  },

  // ===== 学习记录操作 =====

  // 获取学习记录
  async getRecords() {
    return await store.get(this.RECORDS) || {};
  },

  // 获取单词学习记录
  async getRecord(wordId) {
    const records = await this.getRecords();
    return records[wordId];
  },

  // 更新学习记录
  async updateRecord(wordId, updates) {
    const records = await this.getRecords();
    records[wordId] = {
      ...records[wordId],
      ...updates,
      lastReview: Date.now()
    };
    await store.set(this.RECORDS, records);
    return records[wordId];
  },

  // 获取今日学习统计
  async getTodayStats() {
    const records = await this.getRecords();
    const today = new Date().setHours(0, 0, 0, 0);

    let learned = 0;
    let mastered = 0;

    Object.values(records).forEach(record => {
      if (record.lastReview >= today) {
        learned++;
        if (record.status === 'mastered') {
          mastered++;
        }
      }
    });

    return { learned, mastered, total: Object.keys(records).length };
  },

  // ===== 设置操作 =====

  // 获取设置
  async getSettings() {
    return await store.get(this.SETTINGS) || {};
  },

  // 更新设置
  async updateSettings(updates) {
    const settings = await this.getSettings();
    const merged = { ...settings, ...updates };
    await store.set(this.SETTINGS, merged);
    return merged;
  },

  // ===== 学习计划操作 =====

  // 获取计划
  async getPlan() {
    return await store.get(this.PLAN) || null;
  },

  // 保存计划
  async savePlan(plan) {
    await store.set(this.PLAN, plan);
    return plan;
  },

  // 清除计划
  async clearPlan() {
    await store.set(this.PLAN, null);
  }
};

// 简化的 store 实现（基于 localStorage）
const store = {
  prefix: 'vocab_master_',

  async get(key) {
    try {
      const data = localStorage.getItem(this.prefix + key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Store get error:', e);
      return null;
    }
  },

  async set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return value;
    } catch (e) {
      console.error('Store set error:', e);
      return null;
    }
  },

  async remove(key) {
    localStorage.removeItem(this.prefix + key);
  }
};

// 如果支持 localforage，可以使用它获得更好的性能
if (typeof localforage !== 'undefined') {
  // 使用 localforage
}

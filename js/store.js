/**
 * 状态管理模块
 * 简单的状态管理解决方案
 */

const AppState = {
  // 当前页面
  currentPage: 'home',

  // 用户数据
  user: {
    name: '考研战士',
    streak: 12,
    totalLearned: 342,
    todayLearned: 25,
    dailyGoal: 30
  },

  // 当前学习
  learning: {
    libraryId: null,
    chapterIndex: 0,
    wordIndex: 0,
    words: [],
    isFlipped: false
  },

  // 测验状态
  quiz: {
    isActive: false,
    questions: [],
    currentIndex: 0,
    answers: [],
    score: 0
  },

  // 订阅者
  subscribers: [],

  // 订阅状态变化
  subscribe(fn) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== fn);
    };
  },

  // 通知订阅者
  notify() {
    this.subscribers.forEach(fn => fn(this));
  },

  // 设置当前页面
  setPage(page) {
    this.currentPage = page;
    this.notify();
  },

  // 设置用户数据
  setUser(user) {
    this.user = { ...this.user, ...user };
    this.notify();
  },

  // 更新今日学习
  updateTodayLearned(count) {
    this.user.todayLearned = count;
    this.notify();
  },

  // 设置学习内容
  setLearning(libraryId, words) {
    this.learning = {
      libraryId,
      chapterIndex: 0,
      wordIndex: 0,
      words,
      isFlipped: false
    };
    this.notify();
  },

  // 设置当前单词索引
  setWordIndex(index) {
    this.learning.wordIndex = index;
    this.learning.isFlipped = false;
    this.notify();
  },

  // 翻转卡片
  flipCard() {
    this.learning.isFlipped = !this.learning.isFlipped;
    this.notify();
  },

  // 下一词
  nextWord() {
    const { wordIndex, words } = this.learning;
    if (wordIndex < words.length - 1) {
      this.learning.wordIndex = wordIndex + 1;
      this.learning.isFlipped = false;
      this.notify();
    }
    return wordIndex < words.length - 1;
  },

  // 上一词
  prevWord() {
    const { wordIndex } = this.learning;
    if (wordIndex > 0) {
      this.learning.wordIndex = wordIndex - 1;
      this.learning.isFlipped = false;
      this.notify();
    }
    return wordIndex > 0;
  },

  // 开始测验
  startQuiz(questions) {
    this.quiz = {
      isActive: true,
      questions,
      currentIndex: 0,
      answers: [],
      score: 0
    };
    this.notify();
  },

  // 回答问题
  answerQuestion(answer) {
    const { currentIndex, questions, answers } = this.quiz;
    const isCorrect = answer === questions[currentIndex].correct;

    answers.push({ questionIndex: currentIndex, answer, isCorrect });

    if (isCorrect) {
      this.quiz.score++;
    }

    this.notify();
    return isCorrect;
  },

  // 下一题
  nextQuestion() {
    const { currentIndex, questions } = this.quiz;
    if (currentIndex < questions.length - 1) {
      this.quiz.currentIndex = currentIndex + 1;
      this.notify();
      return true;
    }
    return false;
  },

  // 结束测验
  endQuiz() {
    this.quiz.isActive = false;
    this.notify();
  },

  // 重置测验
  resetQuiz() {
    this.quiz = {
      isActive: false,
      questions: [],
      currentIndex: 0,
      answers: [],
      score: 0
    };
    this.notify();
  }
};

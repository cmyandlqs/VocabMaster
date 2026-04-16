/**
 * 工具函数模块
 */

// 生成唯一 ID
function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// 格式化日期
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;

  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
  if (diff < 172800000) return '昨天';
  if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';

  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 格式化日期为 YYYY-MM-DD
function formatDateISO(timestamp) {
  const date = new Date(timestamp);
  return date.toISOString().split('T')[0];
}

// 获取今天剩余秒数
function getSecondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight - now) / 1000);
}

// 洗牌算法（随机排序）
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 随机选取 n 个元素
function randomPick(array, n) {
  const shuffled = shuffle(array);
  return shuffled.slice(0, n);
}

// 显示 Toast 提示
function showToast(message, duration = 2000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, duration);
}

// 显示模态框
function showModal({ icon, title, body, buttons = [] }) {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalFooter = document.getElementById('modalFooter');

  if (!overlay || !modal) return;

  modalIcon.innerHTML = icon || '';
  modalTitle.textContent = title || '';
  modalBody.textContent = body || '';

  // 渲染按钮
  modalFooter.innerHTML = '';
  buttons.forEach(btn => {
    const button = document.createElement('button');
    button.className = `btn ${btn.class || 'btn--secondary'}`;
    button.textContent = btn.text;
    button.onclick = () => {
      if (btn.onClick) btn.onClick();
      hideModal();
    };
    modalFooter.appendChild(button);
  });

  overlay.classList.add('visible');
  modal.classList.add('visible');
}

// 隐藏模态框
function hideModal() {
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modal');

  if (overlay) overlay.classList.remove('visible');
  if (modal) modal.classList.remove('visible');
}

// 播放发音
function playAudio(word) {
  if ('speechSynthesis' in window) {
    // 取消之前的发音
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // 尝试获取美式发音
    const voices = speechSynthesis.getVoices();
    const usVoice = voices.find(v => v.lang.includes('en') && v.name.includes('US'));
    if (usVoice) {
      utterance.voice = usVoice;
    }

    speechSynthesis.speak(utterance);
  }
}

// 计算环形进度百分比
function getCircleProgress(current, total) {
  if (total === 0) return 0;
  return Math.min((current / total) * 100, 100);
}

// 获取圆环 SVG 的 stroke-dasharray 和 stroke-dashoffset
function getCircleDashArray(radius, percentage) {
  const circumference = 2 * Math.PI * radius;
  const dashLength = (percentage / 100) * circumference;
  return {
    circumference,
    dashArray: `${dashLength} ${circumference}`,
    dashOffset: 0
  };
}

// 防抖函数
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流函数
function throttle(fn, delay = 300) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 本地存储封装
const Storage = {
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};

// 导出工具函数
window.Utils = {
  generateId,
  formatDate,
  formatDateISO,
  getSecondsUntilMidnight,
  shuffle,
  randomPick,
  showToast,
  showModal,
  hideModal,
  playAudio,
  getCircleProgress,
  getCircleDashArray,
  debounce,
  throttle,
  Storage
};

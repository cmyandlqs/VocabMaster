/**
 * Service Worker for 考研英语词汇大师 PWA
 */

const CACHE_NAME = 'vocab-master-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/variables.css',
  '/css/reset.css',
  '/css/glass.css',
  '/css/components.css',
  '/css/pages.css',
  '/js/db.js',
  '/js/store.js',
  '/js/utils.js',
  '/js/app.js',
  '/manifest.json'
];

// 安装事件 - 缓存资源
self.addEventListener('install', event => {
  console.log('[SW] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[SW] Install failed:', err);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// 请求拦截 - 缓存优先策略
self.addEventListener('fetch', event => {
  // 只处理同源请求
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // 对于 GET 请求，使用缓存优先策略
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // 返回缓存，同时更新缓存（后台更新）
            event.waitUntil(
              fetch(event.request)
                .then(response => {
                  if (response.ok) {
                    caches.open(CACHE_NAME)
                      .then(cache => cache.put(event.request, response));
                  }
                })
                .catch(() => {})
            );
            return cachedResponse;
          }

          // 缓存不存在，请求网络
          return fetch(event.request)
            .then(response => {
              // 如果请求成功，缓存响应
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, responseClone));
              }
              return response;
            })
            .catch(() => {
              // 网络请求失败，返回离线页面（如果有）
              return caches.match('/index.html');
            });
        })
    );
  }

  // 对于 POST 请求，直接发送网络请求
  if (event.request.method === 'POST') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // 可以返回自定义的离线响应
          return new Response(
            JSON.stringify({ error: 'offline', message: '网络不可用' }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
    );
  }
});

// 推送通知（可选功能）
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body || '该学习了！',
    icon: '/assets/icon-192.png',
    badge: '/assets/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '考研英语词汇大师', options)
  );
});

// 通知点击事件
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // 如果已有窗口，打开它
        for (const client of clientList) {
          if (client.url.includes('index.html') && 'focus' in client) {
            return client.focus();
          }
        }
        // 否则打开新窗口
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url || '/');
        }
      })
  );
});

// 后台同步（可选功能）
self.addEventListener('sync', event => {
  if (event.tag === 'sync-records') {
    event.waitUntil(syncLearningRecords());
  }
});

// 同步学习记录
async function syncLearningRecords() {
  // 这里可以实现将本地数据同步到服务器的功能
  console.log('[SW] Syncing records...');
}

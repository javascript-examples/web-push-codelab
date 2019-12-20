'use strict';

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'TITLE';
  const options = {
    title: 'options title',
    body: `${event.data.text()}`,
    icon: 'images/icon.png',
    badge: 'images/badge.png',
//    vibrate: [300,100,400,100,400,100,400],
    data: {
      url_1:'http://www.marcuschiu.com',
      url_2: 'http://confluence.marcuschiu.com'
    },
    actions: [
      {action: "open_url_1", title: "options action 1"},
      {action: "open_url_2", title: "options action 2"}
    ]
  };

  const notificationPromise = self.registration.showNotification(title, options);

  // event.waitUntil(). This method takes a promise to enable the browser to keep
  // your service worker alive and running until the promise passed in has been resolved
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click received.');

  // close the notification that was clicked
  event.notification.close();

  let promiseOpenWindow;
  switch(event.action){
      case 'open_url_1':
        promiseOpenWindow = clients.openWindow(event.notification.data.url_1); // which we got from above
      break;
      case 'open_url_2':
        promiseOpenWindow = clients.openWindow(event.notification.data.url_2); // which we got from above
      break;
      case 'any_other_action':
        promiseOpenWindow = clients.openWindow("https://www.example.com");
      break;
  }

  event.waitUntil(promiseOpenWindow);
});
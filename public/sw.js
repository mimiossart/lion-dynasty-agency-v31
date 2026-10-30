const CACHE = 'hellbound-family-v37';
const STATIC = ['/','/index.html','/app.js','/style.css','/manifest.json','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/')||url.pathname.startsWith('/ws'))return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).catch(()=>caches.match('/index.html')));
    return;
  }
  event.respondWith(fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
    return response;
  }).catch(()=>caches.match(event.request)));
});

self.addEventListener('push',event=>{
 let data={};try{data=event.data?.json()||{}}catch{}
 const title=String(data.title||'Hellbound Family');
 event.waitUntil(self.registration.showNotification(title,{body:String(data.body||''),icon:'/icons/icon-192.png',badge:'/icons/icon-192.png',tag:data.tag||'hellbound',data:{url:String(data.url||'/')}}));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const target=new URL(event.notification.data?.url||'/',self.location.origin);
 if(target.origin!==self.location.origin)return;
 event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(async windows=>{
  for(const client of windows){if(new URL(client.url).origin===target.origin){await client.focus();await client.navigate(target.href);return;}}
  await clients.openWindow(target.href);
 }));
});

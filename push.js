var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BGIojv4q61I8eDDuxajM1T6YUFuPAiL_ywsPnG3PmGoawKBXiSpWDjv-esVrcnQn2rcQr3W7tCmJqzsxnRGorks",
   "privateKey": "Zx3eEjl0dnnkNUJiyKq3svITg-0rOcHB0LEpGXCS5dQ"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/doLRUwt8rEE:APA91bGarBXE2q9s5tYNdu-78yo5CF78mt1nueCxU9HXhoU2Rkvv3w_cZHqLQT4bsi1skLKHPqfXfi5h0G6bkBoF0xyQA1Bo-_LcNPw3pCPu2f7of31JurR7X4c3Qt-jA-F-WR35Vdhn",
   "keys": {
       "p256dh": "BO/D8TR2Xrghl3hrxm0pUEpn9Tc0rkwGjXKn4PSaFVtCUmd1BHB5BHdpJxtOnS15zUHRRoG62f7qu6ibIK9lOjs=",
       "auth": "zab+twvLiMs7FwzVz193AQ=="
   }
};
var payload = 'Push Notifikasi Aplikasi Football';
 
var options = {
   gcmAPIKey: '839128214781',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
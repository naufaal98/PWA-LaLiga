var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BKu1oQOlUI0Rn0vsT0syn-05VmBBuCeysHPyanTI_vHkVGKy1bkHxt6XghVBS8qyuzztO0gaLXPZFYaJQdJ-wtg",
   "privateKey": "MRuVSbydTG0eN9EPcbbcRgL2kcfH_wctnZP7NEJNiDw"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fNlWp9Hjlk8:APA91bGssXCcqlPALTCdj-Hpnmfa33lZ07eSe-EKDHzJbXsT-6S8yTJCsXjTG5Pq7QYHILyHBPMrCLeQ9itbihwfK4A6XRH1qGkj3v5U7o_YWajWntNTY4WSVjh2f638M6xfuOKsg4W5",
   "keys": {
       "p256dh": "BH40d8BGjW+xcAsNubLTep4IMX9Ma1pGFHoKhHv01CBdIiyP1AUimUUVIC6gMPugBKECu9h3o7EkffckWxbRVdQ=",
       "auth": "lHa+te/3Q/D6kd54eiLebg=="
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
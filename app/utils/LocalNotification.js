import { AppState, PushNotificationIOS } from 'react-native';

import PushNotification from 'react-native-push-notification';

function _unRegisterAllLocalNotification() {
  PushNotification.setApplicationIconBadgeNumber(0);
  PushNotification.cancelAllLocalNotifications();
}

function _handleAppStateChange(nextAppState, callback) {
  if (nextAppState === 'active') { // 앱이 foreground에서 실행되고 있다면
    callback();
  }
};

function triggerOneTimeLocalNotification(message, title, ringAfterInSecond = 20) {
  PushNotification.localNotificationSchedule({
    /* Android Only Properties */
    vibrate: true,
    vibration: 300,
    priority: 'hight',
    visibility: 'public',
    importance: 'hight',

    /* iOS and Android properties */
    title,
    message,
    playSound: false,
    number: 1,
    actions: '["OK"]',

    date: new Date(Date.now() + ringAfterInSecond * 1000),
  });

  register();
}



function triggerOneTimeLocalNotificationDate(id, message, title, date) {
  PushNotification.localNotificationSchedule({
    /* Android Only Properties */
    vibrate: true,
    vibration: 300,
    priority: 'hight',
    visibility: 'public',
    importance: 'hight',

    /* iOS and Android properties */
    title,
    message,
    playSound: false,
    number: 1,
    actions: '["OK"]',
    id,
    date
  });

  register();
}


function triggerRepeatedLocalNotification(message, title, cycleStartsFrom = new Date(), repeatTime = 2000, repeatType = "time",) {
  PushNotification.localNotificationSchedule({
    /* Android Only Properties */
    vibrate: true,
    vibration: 300,
    priority: 'hight',
    visibility: 'public',
    importance: 'hight',

    /* iOS and Android properties */
    title,
    message,
    playSound: false,
    number: 1,
    actions: '["OK"]',

    repeatType,
    repeatTime,
    date: cycleStartsFrom,
  });

  register();
}



async function register() {
  PushNotification.configure({
    onNotification: function (notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    requestPermissions: Platform.OS === 'ios',
    popInitialNotification: true,
  });

}

export default {
  _unRegisterAllLocalNotification,
  triggerOneTimeLocalNotification,
  triggerRepeatedLocalNotification, register,
  triggerOneTimeLocalNotificationDate
};

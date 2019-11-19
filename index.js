/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import { registerScreens } from './src/screens';
//import App from './src/App';

registerScreens();
//Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);

/*Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.playground.WelcomeScreen"
      }
    }
  });
});*/


Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'Amble.Initialising'
        }
      },
    });
    /*
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Amble.Home'
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    text: 'Amble',
                    icon: require('./src/assets/images/logo.png'),
                    fontSize: 10,
                    //testID: testIDs.LAYOUTS_TAB
                  }
                }
              }
            },

            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Amble.Profile'
                    }
                  }
                ],
                options: {
                  topBar: {
                    title: {
                      text: 'Profile'
                    }
                  },
                  bottomTab: {
                    text: 'Profile',
                    icon: require('./src/assets/images/logo.png'),
                    fontSize: 10,
                    //testID: testIDs.OPTIONS_TAB
                  }
                }
              }
            },

            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'Amble.Help'
                    }
                  }
                ],
                options: {
                  topBar: {
                    title: {
                      text: 'Help'
                    }
                  },
                  bottomTab: {
                    text: 'Options',
                    icon: require('./src/assets/images/logo.png'),
                    fontSize: 10,
                    //testID: testIDs.OPTIONS_TAB
                  }
                }
              }
            },
            
          ]
        }
      }
    });*/

});
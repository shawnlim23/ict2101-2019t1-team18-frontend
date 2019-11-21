// navigation.js
import { Navigation } from 'react-native-navigation'


export const goHome = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          component: {
            name: 'Amble.Home',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Home',
                icon: require('../assets/images/material-home.png')
              }
            }
          },
        },
        {
          component: {
            name: 'Amble.Map',
            options: {
              bottomTab: {
                text: 'Map',
                fontSize: 12,
                icon: require('../assets/images/material-map.png')
              }
            }
          },
        },
        {
          component: {
            name: 'Amble.Leaderboard',
            options: {
              bottomTab: {
                text: 'Leaderboard',
                fontSize: 12,
                icon: require('../assets/images/material-leaderboard.png')
              }
            }
          },
        },
        {
          component: {
            name: 'Amble.Canvas',
            options: {
              bottomTab: {
                text: 'Canvas',
                fontSize: 12,
                icon: require('../assets/images/material-canvas.png')
              }
            }
          },
        },
        {
          component: {
            name: 'Amble.Profile',
            options: {
              bottomTab: {
                text: 'Profile',
                fontSize: 12,
                icon: require('../assets/images/material-profile.png')
              }
            }
          },
        },
      ],
    }
  }
});

export const signIn = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'Amble.SignIn',
          }
        },

      ],
      options: {
        topBar: { visible: false, }
      }
    }
  }
})

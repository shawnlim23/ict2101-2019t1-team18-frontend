import {Navigation} from 'react-native-navigation';

export function registerScreens() {

	Navigation.registerComponent('Amble.PostsList', () => require('./PostsList').default);
	Navigation.registerComponent('Amble.AddPost', () => require('./AddPost').default);
	Navigation.registerComponent('Amble.ViewPost', () => require('./ViewPost').default);

	Navigation.registerComponent('Amble.Home', () => require('./Home').default);
	Navigation.registerComponent('Amble.Map', () => require('./Map').default);
	Navigation.registerComponent('Amble.Leaderboard', () => require('./Leaderboard').default);
	Navigation.registerComponent('Amble.Canvas', () => require('./Canvas').default);
	Navigation.registerComponent('Amble.Profile', () => require('./Profile').default);

	Navigation.registerComponent('Amble.Initialising', (sc) => require('./Initialising').default);
	Navigation.registerComponent('Amble.SignIn', () => require('./SignIn').default);
	Navigation.registerComponent('Amble.SignUp', () => require('./SignUp').default);

	Navigation.registerComponent('Amble.Screen2', () => require('./Screen2').default);
}
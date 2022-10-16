import { ref, Ref } from 'vue';
import { Link } from '../navigation.types';

export const useNavigation = () => {
	const links: Ref<Link[]> = ref([
		{
			name: 'Home',
			label: 'home'
		},
		{
			name: 'Login',
			label: 'login'
		},
		{
			name: 'Register',
			label: 'register'
		},
	])

	const profileLinks: Ref<Link[]> = ref([
		{
			name: 'Login',
			label: 'profile'
		},
		{
			name: 'Settings',
			label: 'settings'
		},
		{
			name: 'Register',
			label: 'Lorem ipsum'
		}
	])

	return {
		links,
		profileLinks
	}
}

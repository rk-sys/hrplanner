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
			name: 'Registration',
			label: 'Registration'
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
			name: 'Registration',
			label: 'Lorem ipsum'
		}
	])

	return {
		links,
		profileLinks
	}
}

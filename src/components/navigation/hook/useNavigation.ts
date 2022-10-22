import { ref, Ref } from 'vue';
import { Link } from '../navigation.types';

export const useNavigation = () => {
	const links: Ref<Link[]> = ref([
		{
			name: 'Home',
			label: 'home'
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
	])

	return {
		links,
		profileLinks
	}
}

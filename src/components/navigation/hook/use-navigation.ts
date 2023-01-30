import { ref, Ref } from 'vue';
import { Link } from '../navigation.types';

export const useNavigation = () => {
	const links: Ref<Link[]> = ref([
		{
			name: 'Home',
			label: 'HOME'
		},
		{
			name: 'Home',
			label: 'EMPLOYEES'
		},
		{
			name: 'Home',
			label: 'PROJECTS'
		},
		{
			name: 'Home',
			label: 'CALENDAR'
		},
	])

	const profileLinks: Ref<Link[]> = ref([
		{
			name: 'Login',
			label: 'PROFILE'
		},
		{
			name: 'Configurations',
			label: 'TAGS'
		},
		{
			name: 'Settings my users',
			label: 'USERS'
		},
	])

	return {
		links,
		profileLinks
	}
}

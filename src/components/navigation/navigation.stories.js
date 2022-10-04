import cNavigation from './navigation.component.vue'

export default {
	title: 'Components/Navigation',
	component: cNavigation
}

export const Default = () => ({
	components: { cNavigation },
	template: `<c-navigation />`
})

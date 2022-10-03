import cCardAnimation from './card-animation.component.vue'
import '../../style.css'

export default {
	title: 'Components/cCardAnimation',
	components: cCardAnimation,
}

export const Default = () => ( {
	components: { cCardAnimation },
	template: `
    <c-card-animation/>`
} )

import cCardAnimation from './card-animation.component.vue'
import '../../style.css'

export default {
	title: 'Components/CardAnimation',
	components: cCardAnimation,
}

export const Default = () => ( {
	components: { cCardAnimation },
	template: `
    <c-card-animation/>`
} )

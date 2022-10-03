import cButton from './button.component.vue'
import '../../../style.css'

export default {
	title: 'Components/Form/cButton',
	components: cButton,
	argTypes: {
		disabled: {
			control: { type: 'boolean' }
		},
		buttonState: {
			options: ['primary', 'secondary', 'danger', 'success'],
			control: { type: 'radio' }
		},
		buttonType: {
			options: ['filled', 'ghost', 'borderless'],
			control: { type: 'radio' }
		}
	}
}

export const Default = (args) => ( {
	components: { cButton },
	setup() {
		return { args }
	},
	template: `
    <c-button v-bind="args">Click Me</c-button>
	`
} )

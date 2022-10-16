import cInput from './input.component.vue'
import '../../../style.css'

export default {
	title: 'Components/Form/Input',
	components: cInput
}

//TODO add v-modal and try use validation

export const Default = () => ( {
	components: { cInput },
	template: `
    <c-input placeholder="placeholder"/>`
} )

export const DefaultWithParams = Default.bind({});
DefaultWithParams.args = { errorMsg: 'My error msg', placeholder: 'myPlaceholder', disabled: true };

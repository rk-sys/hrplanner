import cWrapper from './wrapper.component.vue'
import '../../style.css'

export default {
	title: 'Components/Wrapper',
	component: cWrapper
}

export const Default = () => ( {
	components: { cWrapper },
	template: `
    <div>
    <c-wrapper><h1 class="text-black">Custom wrapper</h1></c-wrapper>
    </div>`
} )

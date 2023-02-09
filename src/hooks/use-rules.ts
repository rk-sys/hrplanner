export const isRequired = (value: string | undefined): boolean => {
	return !!value && !!value.trim()
}

export const rulesSettingsChars = (value: string, min: number): boolean => {
	return value.length < min
}

export const validateEmail = (email: string): boolean => {
	const validRegex = /^[a-zA-Z_0-9]+[.]?[a-zA-Z_0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	return !email.match(validRegex)
};

export const validateField = (field: string, newValue: string | undefined, min: number): string => {
	if(!newValue) {
		return `validation.FIELD_IS_REQUIRED`
	} else if (newValue.length < min) {
		return `validation.FIELD_IS_TO_SHORT`
	} else {
		return ''
	}
}

export const validateSame = (filed: string, a: string, b: string): string => {
	return a !== '' && a === b ? '' : `validation.FIELD_DO_NOT_MATCH`
}

export const checkDatePattern = (payload: string | undefined) => {
	const pattern = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)
	if(payload) {
		return pattern.test(payload)
	}

	return false
}

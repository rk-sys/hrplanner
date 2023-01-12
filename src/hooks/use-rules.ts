export const isRequired = (value: string): boolean => {
	return !!value && !!value.trim()
}

export const rulesSettingsChars = (value: string, min: number): boolean => {
	return value.length < min
}

export const validateEmail = (email: string): boolean => {
	const validRegex = /^[a-zA-Z_0-9]+[.]?[a-zA-Z_0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	return !email.match(validRegex)
};

export const validateField = (field: string, newValue: string, min: number): string => {
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

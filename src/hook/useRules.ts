export const isRequired = (value: string): boolean => {
	return !!value && !!value.trim()
}

export const rulesSettingsChars = (value: string, min: number): boolean => {
	return value.length < min
}

export const validateEmail = (email: string): boolean => {
	const validRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	return !email.match(validRegex)
};

export const validateField = (field: string, newValue: string, min: number): string => {
	if(!newValue) {
		return `${field} is required`
	} else if (newValue.length < min) {
		return `${field} is to short`
	} else {
		return ''
	}
}

export const validateSame = (filed: string, a: string, b: string): string => {
	return a !== '' && a === b ? '' : `${filed} do not match`
}

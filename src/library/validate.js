export const email = emailString => {
	const fail = () => {
		throw new Error('Please enter a valid email.')
	}
	const emailParts = emailString.split('@')
	if (emailParts.length !== 2) fail()
	if (!emailParts[1].includes('.')) fail()
	return true
}

const validate = {
	email,
}

export default validate;

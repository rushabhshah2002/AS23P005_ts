import { Verifier } from "verifierjs";

export const isDate = (date: string) => {
	return new Verifier(date).isEmail(/(19|20)\d{2}-\d{1,2}-\d{1,2}/).correct;
};

export const isEmpty = (val: string) => {
	return new Verifier(val).isLengthen("gt0").correct;
};

export const isOTP = (otp: string) => {
	return new Verifier(otp)
		.consistOf({
			numbers: true,
		})
		.isLengthen(6).correct;
};

export const isName = (name: string) => {
	return new Verifier(name).consistOf({
		lowercaseAlpha: true,
		uppercaseAlpha: true,
		whitespace: true,
	}).correct;
};
export const isEmail = (email: string) => {
	return new Verifier(email).isEmail(/^[a-z0-9-._]+@[a-z0-9-]+\.[a-z0-9-.]+$/).correct;
};

export const isPhone = (phoneNo: string) => {
	return new Verifier(phoneNo).isEmail(/^[1-9][0-9]{9}$/).isLengthen(10).correct;
};

export const isPassword = (password: string) => {
	return new Verifier(password).isPassword().correct;
};

export const isAlias = (alias: string) => {
	return new Verifier(alias).consistOf({
		lowercaseAlpha: true,
		uppercaseAlpha: true,
		whitespace: true,
		numbers: true,
	}).correct;
};

export const isNumber = (count: string) => {
	return new Verifier(count).consistOf({
		numbers: true,
	}).correct;
};

export const isCGPA = (cgpa: string) => {
	return new Verifier(cgpa).isEmail(/^[0-9](\.[0-9]{1,2})?$|^4(\.[0]{1,2})?$/g).correct;
}
export const verifiers = {
	isDate,
	isName,
	isEmail,
	isPhone,
	isPassword,
	isOTP,
	isAlias,
	isNumber,
	isEmpty,
	isCGPA
};

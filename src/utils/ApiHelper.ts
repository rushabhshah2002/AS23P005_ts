import axios from "axios";
import { encrypt } from "./encyption";
export const ApiHelper = async (url: string, payload: any, encryted: string[]) => {
	let encrytedPayload = { ...payload };
	encryted.map((key: string) => {
		encrytedPayload[key] = encrypt(payload[key], "ENCRYPT");
	});
	let data = null;
	let error = null;
	let loaded = false;
	// temp
	try {
		const response = await axios({
			headers: {
				"Content-Type": "application/json",
				"x-access-token": payload.token,
			},
			method: "POST",
			url: `https://apits.blockcerti.com/${url}`,
			data: encrytedPayload,
		});
		data = response.data;
		if (data) {
			loaded = true;
			return { data, error, loaded };
		}
	} catch (error: any) {
		error = error.response;
		loaded = true;
		return { data, error, loaded };
	} finally {
		loaded = true;
	}
	return { data, error, loaded };
};

export const GetApiHelper = async (url: string, payload: any) => {
	let data: any = null;
	let error: any = null;
	let loaded = false;
	try {
		await axios({
			headers: {
				"Content-Type": "application/json",
				"x-access-token": payload.token,
			},
			method: "GET",
			url: `https://apits.blockcerti.com/${url}`,
			params: payload,
		}).then((response) => {
			data = response.data;

			loaded = data ? true : false;
			return { data, error, loaded };
		});
	} catch (error: any) {
		error = error.response.data;
		loaded = true;
		return { data, error, loaded };
	}

	return { data, error, loaded };
};

export const fileToBase64 = (file: any) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};

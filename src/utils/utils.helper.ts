export const focus = (e: any) => {
	let temp: any = document.getElementById(`label_${e.target.id}`);
	temp.classList.add("labelUp");
};
const fileToBase64 = (file: File | null) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		if (file != null) {
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		}
	});
};

export const getCss = (validator: any, e: any) => {
	if (validator(e.target.value)) {
		e.target.style.borderBottom = "2px solid #00c700";
	} else {
		e.target.style.borderBottom = "2px solid #FF0000";
	}
};
export const blur = (e: any) => {
	if (e.target.value == "") {
		let temp: any = document.getElementById(`label_${e.target.id}`);
		temp.classList.remove("labelUp");
	}
	if (e.target.value != "") {
		let temp: any = document.getElementById(`label_${e.target.id}`);
		temp.classList.add("labelUp");
	}
};
export const checkValForLabel = (e: any) => {
	if (e.target.value != "") {
		let temp: any = document.getElementById(`label_${e.target.id}`);
		temp.classList.add("labelUp");
	}
};
// const getCss = (validator:, e) => {
// 	if (validator(e.target.value)) {
// 		e.target.style.border = "2px solid #00c700";
// 	} else {
// 		e.target.style.border = "2px solid #FF0000";
// 	}
// };

const stringToColor = (string: string): string => {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
};

const stringAvatar = (name: string) => {
	return {
		sx: {
			fontSize: `3rem`,
			bgcolor: stringToColor(name),
		},
		children: `${name.charAt(0).toUpperCase()}`,
	};
};

export const truncateFile = (str: any) => {
	let fileName: string = str;
	const fileExt: string = fileName.substring(fileName.lastIndexOf('.') + 1);
	if (fileName.length > 15) {
		fileName = fileName.substring(0, 10) + '...' + fileExt;
	}
	return fileName;
}

export const helper = {
	focus,
	blur,
	checkValForLabel,
	fileToBase64,
	stringAvatar,
	getCss,
	truncateFile,
};

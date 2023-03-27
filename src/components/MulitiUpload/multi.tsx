import React, { useState } from "react";
import JSZip from "jszip";

const SendFiles: React.FC = () => {
	const [fileList, setFileList] = useState<File[]>([]);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			setFileList([...fileList, ...files]);
		}
	};

	const handleSendFiles = async () => {
		const zip = new JSZip();
		for (const file of fileList) {
			const fileData = await file.arrayBuffer();
			zip.file(file.name, fileData);
		}
		const zipData = await zip.generateAsync({ type: "blob" });
		const formData = new FormData();
		formData.append("zip", zipData, "files.zip");

		// Replace this URL with your API endpoint for sending the file
		const sendUrl = "http://localhost:3001/auth/register";

		try {
			const response = await fetch(sendUrl, {
				method: "POST",
				body: formData,
			});
			if (response.status === 200) {
				// Handle success
				return;
			}
			// Handle response from server
		} catch (error) {
			// Handle error
		}
	};

	return (
		<div>
			<input type="file" onChange={handleFileSelect} multiple />
			<button onClick={handleSendFiles}>Send Files</button>
		</div>
	);
};

export default SendFiles;

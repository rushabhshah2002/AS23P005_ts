import React, { SetStateAction } from "react";
import { GetApiHelper } from "../utils/ApiHelper";

export const useGetApi = (
	route: string,
	payload: any,
	setData: React.Dispatch<SetStateAction<any>>,
	setError: React.Dispatch<SetStateAction<any>>,
	setLoad: React.Dispatch<SetStateAction<boolean>>,
	email: string,
	token: string,
	dependency: any
) => {
	const GetData = () => {
		if (email == "" || token == "") {
			return;
		}
		GetApiHelper(route, payload)
			.then((res: { data: { status: number; data: any }; error: any }) => {
				if (res.error) {
					setError(res.error);
					setLoad(true);
					return;
				}
				if (res?.data?.status === 200) {
					setData(res?.data?.data);
					setLoad(true);
				}
			})
			.catch((err: any) => {
				setError(err);
				setLoad(true);
			});
	};
	React.useEffect(() => {
		GetData();
	}, [email, token,...dependency]);
};

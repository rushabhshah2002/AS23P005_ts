import React from "react";
import { GetApiHelper } from "../utils/ApiHelper";
import { toast } from "react-toastify";

const useGetData = (type: boolean, user: any, setUser: any, token: string) => {
	const GetData = () => {
		if (user.email === "" || token == "") {
			return;
		}
		GetApiHelper(`profile/${type ? "inst" : "indi"}`, { token: token, email: user.email, instEmail: user?.instEmail })
			.then((res) => {
				if (res.data.status === 200) {
					setUser({ ...user, ...res.data });
				}
			})
			.catch((err) => {
				if (err) {
					toast.error(err.response.message);
				}
			});
	};
	React.useEffect(() => {
		GetData();
	}, [user.email]);
};
export default useGetData;

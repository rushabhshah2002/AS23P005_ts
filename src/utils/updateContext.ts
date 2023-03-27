import { useContext } from "react";
import { decrypt } from "./encyption";
export const updateContext = (userContext: React.Context<any>, tokenContext: React.Context<any>) => {
	const { user, setUser } = useContext(userContext);
	const { token, setToken } = useContext(tokenContext);

	if (token == "null") {
		let token = localStorage.getItem("token");
		if (token) {
			token = decrypt(token, "ENCRYPT");
			setToken(token);
		}
	}

	if (user.email == "" || user.email == null) {
		let email = localStorage.getItem("user");
		let instituteEmail = localStorage.getItem("instEmail");

		if (user) {
			if (instituteEmail) {	
				setUser({ ...user, email: email, instEmail: instituteEmail });
			} else {
				{
					setUser({ ...user, email: email });
				}
			}
		}
	}
};

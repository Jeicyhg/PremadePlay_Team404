import React from "react";
import { googleLogout } from "@react-oauth/google";
import { Button } from "react-bootstrap";

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Logout({ setUser }) {
	const alternative_logout = () => {
		try {
			googleLogout();
		} catch (e) {
			console.log("Logout failed: error: ", e);
		}
		setUser(null);
		localStorage.setItem("login", null);
		console.log("logged out");
	};

	return (
		<div>
			<Button
				className="logoutButton btn-secondary"
				onClick={alternative_logout}
			>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
					alt="Google Logo"
					width="20"
					height="20"
					align="middle"
					hspace="5"
					vspace="5"
				/>{" "}
				Log out
			</Button>
		</div>
	);
}

export default Logout;

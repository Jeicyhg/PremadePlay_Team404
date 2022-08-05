import axios from "axios";

class MessagesDataService {
	getMessages(userId) {
		return axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/messages/${userId}`
		);
	}

	setNewMessage(data) {
		return axios.post(`${process.env.REACT_APP_API_BASE_URL}/messages`, data);
	}
}

export default new MessagesDataService();

import axios from "axios";

class ProfilesDataService {
	getAll(page = 0) {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/?page=${page}`);
	}
	getProfile(id) {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/players/id/${id}`);
    }

	setNewProfile(data) {
		return axios.put(`${process.env.REACT_APP_API_BASE_URL}/profiles`, data);
	}

	updateProfile(data) {
		return axios.post(`${process.env.REACT_APP_API_BASE_URL}/profiles`, data);
	}

	deleteProfile(userId) {
		return axios.delete(
			`${process.env.REACT_APP_API_BASE_URL}/profiles`,
			userId
		);
	}

	getRank() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/rank`);
	}

	getRole() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/role`);
	}

	getServer() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/server`);
	}

	getLanguage() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/language`);
	}
}

export default new ProfilesDataService();

import axios from "axios";

class ProfilesDataService {
	getAll(page = 0) {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/?page=${page}`);
	}

	find(query) {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}`, {
			params: { query },
		});
	}

	getProfile(userId) {
		return axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/profiles/id/${userId}`
		);
	}
	getProfileByUserId(userId) {
		return axios.get(
			`${process.env.REACT_APP_API_BASE_URL}?${"user_id"}=${userId}`
		);
	}

	setNewProfile(data) {
		return axios.post(`${process.env.REACT_APP_API_BASE_URL}/profiles`, data);
	}

	updateProfile(data) {
		return axios.put(`${process.env.REACT_APP_API_BASE_URL}/profiles`, data);
	}

	deleteProfile(userId) {
		return axios.delete(
			`${process.env.REACT_APP_API_BASE_URL}/profiles`,
			userId
		);
	}

	getRanks() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/rank`);
	}

	getRoles() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/role`);
	}

	getServers() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/server`);
	}

	getLanguages() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/language`);
	}
}

export default new ProfilesDataService();

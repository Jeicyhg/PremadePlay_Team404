import axios from "axios";

class ProfilesDataService {
	getAll(page = 0) {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/?page=${page}`);
	}

	find(queryObject, page = 0) {
		var queryString = Object.keys(queryObject)
			.map((key) => key + "=" + queryObject[key])
			.join("&");
		return axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/?page=${page}&` + queryString
		);
	}

	getProfile(userId) {
		return axios.get(
			`${process.env.REACT_APP_API_BASE_URL}/id/${userId}`
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

	getRanksSolo() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/rank_solo`);
	}

	getRanksFlex() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/rank_flex`);
	}

	getRanksTft() {
		return axios.get(`${process.env.REACT_APP_API_BASE_URL}/rank_tft`);
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

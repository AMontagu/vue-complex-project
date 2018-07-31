/**
 * Created by adrien on 20/07/17.
 */
let jwt = require('jsonwebtoken');

class AuthService {
	constructor() {
		//Used to simulate database
		this.userData = {username: "toto", password: "titi"}
		this.userData.token = jwt.sign(this.userData, "loadThisFromFileVeryImportant")
	}

	async login(username, password) {

		//Get the user in the database. Simulate here by a default user
		//Normally the token is crypted. Decrypt if before.
		if(username === this.userData.username && password === this.userData.password){
			return Promise.resolve(this.userData)
		}else{
			return Promise.reject('Wrong credentials')
		}
	}

	async checkToken(token) {
		//Get userData token from database
		if(token === this.userData.token){
			return Promise.resolve(this.userData);
		}else{
			return Pomise.reject('Token not matching.');
		}
	}
}

module.exports = new AuthService();

import { hostname } from './repositoryConfig';

import axios from 'axios';

function error(err) {
	console.error(err);
	alert("Error:\n" + err);
}

export class AccountRepository {

	getAuthors() {
		return new Promise((resolve, reject) => {
			axios.get(hostname + '/authors/get')
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					console.error(err);
					reject(err);
				});
		})
	}

    addAuthors(firstName, lastName) {
		return new Promise((resolve, reject) => {
			axios.post(hostname + '/authors/add')
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					error(err);
					resolve(undefined);
				});
		});
	}

    getPapers(){
        return new Promise((resolve, reject) => {
			axios.get(hostname + '/papers/get')
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					console.error(err);
					reject(err);
				});
		})
    }

}

export default AccountRepository;
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

    addAuthors(first, last) {
		return new Promise((resolve, reject) => {
			axios.put(hostname + '/authors/addAuthor', {first, last})
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
			axios.get(hostname + '/papers/getPapers')
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					console.error(err);
					reject(err);
				});
		})
    }

	postPaper(title, author_first_names, author_last_names, publication_name, publication_journal, publication_number, publication_year, publication_location, url,  page_number){
		return new Promise((resolve, reject) => {
			axios.put(hostname + '/papers/addPaper', {title, author_first_names, author_last_names, publication_name, publication_journal, publication_number, publication_year, publication_location, url,  page_number})
				.then(response => {
					resolve(response.data);
					
				})
				.catch(err => {
					error(err);
					resolve(undefined);
				});
		});

	}

	searchByAuthor(first, last){
		return new Promise((resolve, reject) => {
			axios.get(hostname + `/papers/getPaper/${first}/${last}`)
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					console.error(err);
					reject(err);
				});
		})
	}

	searchByTitle(title){
		return new Promise((resolve, reject) => {
			axios.get(hostname + `/papers/getPaper/${title}`)
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					console.error(err);
					reject(err);
				});
		})
	}


	getPapersByAuthor(first, last){
		return new Promise((resolve, reject) => {
			axios.get(hostname +`/papers/getPaper/${first}/${last}`)
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
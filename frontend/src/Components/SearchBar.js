import React from 'react'
import SearchIcon from "@material-ui/icons/Search";
import './SearchBar.css'
import { Link } from 'react-router-dom'
import CloseIcon from "@material-ui/icons/Close";

import { AccountRepository } from '../api/accountRepository';



export class SearchBar extends React.Component {

    accountRepository = new AccountRepository();

    state = {
        data: [],
        filteredData: [],
        wordEntered: '',
        authorFilter: false,
		paperFilter: true,
        yearFilter: false,
        placeholder: "Enter Paper title",
        dataPassIn: [],
        cringeTest : "yieks"
    }


    handleFilter = (event) => {
		const searchWord = event.target.value;
		this.setState({ wordEntered: searchWord })
		const newFilter = this.state.data.filter((value) => {
			if (this.state.paperFilter === true) {
				return value.title.toLowerCase().includes(searchWord.toLowerCase());
			}
			else if(this.state.authorFilter === true) {
                let temp = ""
                for (let i =0;i<value.authors.length;i++){
                    temp = temp + value.authors[i]
                    console.log(temp)
                }
                return temp.toLowerCase().includes(searchWord.toLowerCase());
				//return value.authors.toLowerCase().includes(searchWord.toLowerCase());
			}
            else {
                return value.publication.journal.toLowerCase().includes(searchWord.toLowerCase());
            }
		});


		if (searchWord === "") {
			this.setState({ filteredData: this.state.data })
		} else {
			this.setState({ filteredData: newFilter })
		}
	};

    changeFilter = (event) => {
		const searchFilter = event.target.value;
		console.log("working")
		if (searchFilter == "authorFilter") {
			this.setState({ authorFilter: true, paperFilter: false, yearFilter: false, placeholder: 'Enter Author Name' })
		}
		else if(searchFilter == "paperFilter"){
			this.setState({ authorFilter: false, paperFilter: true, yearFilter: false, placeholder: 'Enter Paper Title' })
		}
        else{
            this.setState({ authorFilter: false, paperFilter: false, yearFilter: true, placeholder: 'Enter Publication Name' })
        }


	}

    clearInput = () => {
		this.setState({ filteredData: [] })
		this.setState({ wordEntered: [] })
	};

    async getAuthorInfo(input){
        let arrName = input.split(" ")
        let x = await this.accountRepository.getPapersByAuthor(arrName[0], arrName[1])
        this.setState({dataPassIn:x})
        console.log(this.state.dataPassIn)
    }

    filterRender = () => {
		if (this.state.filteredData !== 0 && this.state.wordEntered !== '') {
			return <>
				<div className="dataResult">
					{this.state.filteredData.map((paper, key) => {
						return <>
                            <div class="row mb-2 mb-sm-0 py-25">
                                
                                <div class="d-none d-sm-block col-1">{key+1}</div>
                                <div class="col-9 col-sm-5">
                                    
                                <p >
                                        <Link to={`/viewPaper/`} > {paper.title} 
                                        {sessionStorage.setItem("paperTitle", paper.Title)}
                                        {sessionStorage.setItem("paperURL", paper.url)}
                                        {sessionStorage.setItem("paperPublication", paper.publication.year)}
                                        {sessionStorage.setItem("paperAuthors", paper.authors)}
                                        {sessionStorage.setItem("paperNumber", paper.page_number)}
                                        </Link>
                                    </p>
                                    </div>
                                <div class="d-none d-sm-block col-2">
                                    {
                                        paper.authors.map((name) => {
                                            return<>
                                                <p >
                                                    
                                                  <Link to={{
                                                      pathname: `/viewAuthor/${this.state.cringeTest}`,
                                    
                                                  }}> {name+ ", "} </Link>
                                                </p>
                                            </>
                                        })            
                                    }
                                </div>
                                <div class="d-none d-sm-block col-2 text-95">{paper.publication.journal} <h6>{paper.publication.name}</h6></div>
                                <div class="col-2 text-secondary-d2">{paper.page_Number}</div>
                                
                            </div>
                            
                        </>
					})}
				</div>
                
			</>
		}
		else if (this.state.filteredData == 0 && this.state.wordEntered !== '') {
			return <>
				<h3>No Matches!</h3>
			</>
		}
		else {
			return <>
				<div className="dataResult">
					{this.state.data.map((paper, key) => {
						return <>
                            <div class="row mb-2 mb-sm-0 py-25">
                                <div class="d-none d-sm-block col-1">{key+1}</div>
                                <div class="col-9 col-sm-5">
                                    <p >
                                        <Link to={`/viewPaper/`} > {paper.title} 
                                        
                                        
                                        </Link>
                                        {sessionStorage.setItem("paperTitle", paper.title)}
                                        {sessionStorage.setItem("paperURL", paper.url)}
                                        {sessionStorage.setItem("paperPublication", paper.publication)}
                                        {sessionStorage.setItem("paperAuthors", paper.authors)}
                                        {sessionStorage.setItem("paperNumber", paper.page_number)}
                                    </p>
                                    </div>
                                <div class="d-none d-sm-block col-2">
                                    {
                                        paper.authors.map((name) => {
                                            return<>
                                                <p >
                                                    
                                                  <Link to={`/viewAuthor/${this.state.cringeTest}`} > {name+ ", "} </Link>
                                                </p>
                                            </>
                                        })            
                                    }
                                </div>
                                <div class="d-none d-sm-block col-2 text-95">{paper.publication.journal} <h6>{paper.publication.name}</h6></div>
                                <div class="col-2 text-secondary-d2">{paper.publication.year}</div>
                            </div>
                        </>
					})}
				</div>
                <hr class="class-4"/>
			</>

		}
	}


    async componentDidMount(){
        let data = await this.accountRepository.getPapers()
        this.setState({ data })
        console.log(data)
    }


    render () {
        return <>
        
        <div class="page-content container">
        <div class="page-header text-blue-d2">
        <h1 class="page-title text-secondary-d1" className = "mt-4 mx-auto border-0">
            NoSQL Project
        </h1>

        <div class="page-tools">
            <div class="action-buttons">
                <a class="btn bg-white btn-light mx-1px text-95" href="/postPaper">
                    Post Publication
                </a>
            </div>
        </div>
    </div>
    <hr class="class-4"/>
    

    <div class="container px-0">
        <div class="row mt-4">
            <div class="col-12 col-lg-10 offset-lg-1">
                <div class="row">
                        <div class="text-center text-150">
                            <span class="text-default-d3">Search for Papers</span>
                        </div>
                </div>
              
                <hr class="row brc-default-l1 mx-n1 mb-4" />


                
				<div className="search input-group container m-5" >
					<div className="searchInputs form-outline input-group">
						<input
							className="form-control-lg"
							style={{ width: '400px' }}
							type="text"
							placeholder={this.state.placeholder}
							value={this.state.wordEntered}
                            
							onChange={(e) => this.handleFilter(e)}
                            
						/>
						
					</div>
                    




					<label for="membership" className="mt-4 me-2"><span>Search by:</span></label>
					<div>
						<select className="form-select form-control mt-3" name="membership" id="membership"onChange={(e) => this.changeFilter(e)} >
							<option
								value="paperFilter"
							>Paper Title</option>
							<option
								value="authorFilter"
							>Author Name</option>
                            <option
                                value = "yearFilter"
                            >Year Range/Publication
                            </option>
						</select>

					</div>
				</div>
				<hr />
				<div>

					
				</div>
			


















                <div class="mt-4">
                    <div class="row text-600 text-white bgc-default-tp1 py-25">
                        <div class="d-none d-sm-block col-1">#</div>
                        <div class="col-9 col-sm-5">Title</div>
                        <div class="d-none d-sm-block col-4 col-sm-2">Author</div>
                        <div class="d-none d-sm-block col-sm-2">Publication</div>
                        <div class="d-none d-sm-block col-sm-2">Year Published</div>
                    </div>

                    <div class="text-95 text-secondary-d3">
                        {this.filterRender()}

                        
                    </div>

                    <div class="row border-b-2 brc-default-l2"></div>


                    <hr class="class-2"/>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
    }
}


export default SearchBar;
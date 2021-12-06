import React from 'react'
import { AccountRepository } from '../api/accountRepository';



export class PostPaper extends React.Component {

    accountRepository = new AccountRepository();

    state = {
        pubVal : "Conference",
        journalVal: "No",
        url: "",
        author_first_name: "",
        author_last_name: "",
        author2_first_name: "",
        author2_last_name: "",
        author3_first_name: "",
        author3_last_name: "",
        
        number: "",
        year: "",
        location: "",
        pageNumber: "",
        pubName: "",
        submitValBool: false,
        submitVal: "Publish",
        authorAmount: [],
        title: "",
    }


    changeButton(){
        if(this.state.pubVal === "Conference"){
            this.setState({pubVal: "Journal"})
        }
        else{
            this.setState({pubVal: "Conference"})
        }
    }

    changeJournal(){
        if(this.state.journalVal === "Yes"){
            this.setState({journalVal: "No"})
        }
        else{
            this.setState({journalVal: "Yes"})
        }
    }

    condRender(){
        if(this.state.pubVal === "Conference"){
            return <>
                <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder= "Conference Name"
                    onChange={ e => this.setState({pubName: e.target.value}) }/>
                </div>
                <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder = "Number of Times Held"
                    onChange={ e => this.setState({number: e.target.value}) }/>
                </div>
                <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder = "Year Held"
                    onChange={ e => this.setState({year: e.target.value}) }/>
                </div>
                <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder = "Location"
                    onChange={ e => this.setState({location: e.target.value}) }/>
                </div>
            </>
        }
        else{
            return <>
                <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder= "Journal Name"
                    onChange={ e => this.setState({pubName: e.target.value}) }/>
                </div>
                <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder = "Volume"
                    onChange={ e => this.setState({number: e.target.value}) }/>
                </div>
                <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder = "Year Held"
                    onChange={ e => this.setState({year: e.target.value}) }/>
                </div>
            </>
        }
    }

    addAuthor(){
        let x = this.state.authorAmount 
        x.push(this.state.authorAmount.length + 1)
        
        this.setState({authorAmount: x})
        console.log(this.state.authorAmount)
        
        return <>
                        
            {
                this.state.authorAmount.map((val) => {
                    console.log("hi" + val)
                    return<>
                        <div class="col-md-9 pe-5">
                        <input type="text" 
                        class="form-control form-control-lg" 
                        placeholder = {"Author " + val + " First Name"}
                        onChange={ e => this.setState({location: e.target.value}) }/>
                        </div>
                    </>
                })            
            }
                                
        </>

        /*for(let i = 0; i<this.state.authorAmount; i++){
            return<>
            <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder = "Location"
                    onChange={ e => this.setState({location: e.target.value}) }/>
                </div>
                <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder = "Location"
                    onChange={ e => this.setState({location: e.target.value}) }/>
                </div>

            </>
        }*/
       
    }


    async postPaper(){

        let title = this.state.title


        
        let author_first_names = []
        let author_last_names = []


        if (this.state.author_first_name !== "" && this.state.author_first_name !==""){
            await this.accountRepository.addAuthors(this.state.author_first_name, this.state.author_last_name)
            author_first_names.push(this.state.author_first_name)
            author_last_names.push(this.state.author_last_name)
        }

        if (this.state.author2_first_name !== "" && this.state.author2_first_name !==""){
            await this.accountRepository.addAuthors(this.state.author2_first_name, this.state.author2_last_name)
            author_first_names.push(this.state.author2_first_name)
            author_last_names.push(this.state.author2_last_name)
        }

        if (this.state.author3_first_name !== "" && this.state.author3_first_name !==""){
            await this.accountRepository.addAuthors(this.state.author3_first_name, this.state.author3_last_name)
            author_first_names.push(this.state.author3_first_name)
            author_last_names.push(this.state.author3_last_name)
        }


        
        
        
        let publication_name = this.state.pubName
        let publication_journal = ""
        if(this.state.pubVal === "Conference"){
            publication_journal = "Conference"
        }
        else{
            publication_journal = "Journal"
        }
        let publication_number = parseInt(this.state.number)
        let publication_year = parseInt(this.state.year)
        let publication_location = this.state.location
        let url = this.state.url
        let page_number = parseInt(this.state.pageNumber)

        console.log(title, author_first_names, author_last_names, publication_name, publication_journal, publication_number, publication_year, publication_location, url, page_number)
    
        
        this.accountRepository.postPaper(title, author_first_names, author_last_names, publication_name, publication_journal, publication_number, publication_year, publication_location, url, page_number)
        this.setState({submitValBool: true})
        this.setState({submitVal: "Published"})
    }

    secondPost(){
        if(this.state.submitVal!=="Publish"){
            let title = this.state.title
            let author_first_names = [this.state.author_first_name]
            let author_last_names = [this.state.author_last_name]
            let publication_name = this.state.pubName
            let publication_journal = ""
            if(this.state.pubVal === "Conference"){
                publication_journal = "Conference"
            }
            else{
                publication_journal = "Journal"
            }
            let publication_number = parseInt(this.state.number)
            let publication_year = parseInt(this.state.year)
            let publication_location = this.state.location
            let url = this.state.url
            let page_number = parseInt(this.state.pageNumber)

    
        
            
            
            this.accountRepository.postPaper(title, author_first_names, author_last_names, publication_name, publication_journal, publication_number, publication_year, publication_location, url, page_number)
            
        }
    }




    

    render () {
        return <>
        <div>
        <section class="vh-100" >
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-xl-9">
                        <h1 class="mb-4">Post Paper</h1>
                        <div class="card">
                            <div class="card-body">


                                <div class="row align-items-center py-3">
                                        <div class="col-md-3 ps-5">
                                            <h6 class="mb-0">Title</h6>
                                        </div>
                                    <div class="col-md-9 pe-5">
                                        <input type="text" 
                                        class="form-control form-control-lg" 
                                        placeholder='Enter Title' 
                                        onChange={ e => this.setState({title: e.target.value}) }/>
                                    </div>
                                </div>

                                <hr class="mx-n3"/>

                                <div class="row align-items-center py-3">
                                    <div class="col-md-3 ps-5">
                                        <h6 class="mb-0">Author(s)</h6>
                                    </div>
                                <div class="col-md-3 pe-1">
                                    <input type="text" 
                                    class="form-control form-control-lg" 
                                    placeholder='Author 1 First Name' 
                                    onChange={ e => this.setState({author_first_name: e.target.value}) }/>
                                    <input type="text" 
                                    class="form-control form-control-lg" 
                                    placeholder='Author 1 Last Name' 
                                    onChange={ e => this.setState({author_last_name: e.target.value}) }/>
                                    <input type="text" 
                                    class="form-control form-control-lg" 
                                    placeholder='Author 2 First Name' 
                                    onChange={ e => this.setState({author2_first_name: e.target.value}) }/>
                                    <input type="text" 
                                    class="form-control form-control-lg" 
                                    placeholder='Author 2 Last Name' 
                                    onChange={ e => this.setState({author2_last_name: e.target.value}) }/>
                                    <input type="text" 
                                    class="form-control form-control-lg" 
                                    placeholder='Author 3 First Name' 
                                    onChange={ e => this.setState({author3_first_name: e.target.value}) }/>
                                    <input type="text" 
                                    class="form-control form-control-lg" 
                                    placeholder='Author 3 Last Name' 
                                    onChange={ e => this.setState({author3_last_name: e.target.value}) }/>
                                    
                                
                                
                                </div>
                            </div>

                            <hr class="mx-n3"/>

                            <div class="row align-items-center py-3">
                                    <div class="col-md-3 ps-5">
                                        <h6 class="mb-0">url</h6>
                                    </div>
                                <div class="col-md-9 pe-5">
                                    <input type="text" 
                                    class="form-control form-control-lg" 
                                    placeholder='url' 
                                    onChange={ e => this.setState({url: e.target.value}) }/>
                                </div>
                            </div>

                            <hr class="mx-n3"/>


                            <div class="row align-items-center py-3">
                                    <div class="col-md-3 ps-5">
                                        <h6 class="mb-0">Publication</h6>
                                    </div>
                                <div class="col-md-9 pe-5">
                                    <button type="submit" 
                                        class="btn btn-primary btn-lg" 
                                        onClick={() => this.changeButton()}>{this.state.pubVal}
                                    </button>
                                    {this.condRender()}
                                </div>
                            </div>

                            <hr class="mx-n3"/>

                            <div class="row align-items-center py-3">
                                    <div class="col-md-3 ps-5">
                                        <h6 class="mb-0">Page Number</h6>
                                    </div>
                                <div class="col-md-9 pe-5">
                                    <input type="text" class="form-control form-control-lg" 
                                    placeholder="" 
                                    onChange={ e => this.setState({pageNumber: e.target.value}) }/>
                                </div>
                            </div>

                            <hr class="mx-n3"/>

            <div class="px-5 py-4">
                <button type="submit" 
                    onClick={() => this.postPaper()}
                    disabled={this.state.submitValBool}
                    class="btn btn-primary btn-lg">
                    {this.state.submitVal}    
                </button>
            </div>
            {}

          </div>
        </div>

      </div>
    </div>
             </div>
            </section>
        </div>
    </>
    }
}


export default PostPaper;
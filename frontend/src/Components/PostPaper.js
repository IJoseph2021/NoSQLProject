import React from 'react'




export class PostPaper extends React.Component {

    state = {
        pubVal : "Yes",
        journalVal: "No",
        firstName: "",
        lastName: "",
        url: "",
        author: [
            {
                firstName: "",
                lastName: "",
            }
        ],
        number: "",
        year: "",
        location: "",
        pageNumber: "",
        submitValBool: false,
        submitVal: "Publish",
        authorAmount: 0
    }


    changeButton(){
        if(this.state.pubVal === "Yes"){
            this.setState({pubVal: "No"})
        }
        else{
            this.setState({pubVal: "Yes"})
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
        if(this.state.pubVal === "No"){
            return <>
                <div class="row align-items-center py-3">
                    <div >
                        <h6 class="mb-0">Journal</h6>
                    </div>
                    <div class="col-md-9 pe-5">
                        <button type="submit" 
                            class="btn btn-primary btn-lg" 
                            onClick={() => this.changeJournal()}>{this.state.journalVal}
                        </button>
                    </div>
                </div>
            
                <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder= "Number"
                    onChange={ e => this.setState({number: e.target.value}) }/>
                </div>
                <div class="col-md-9 pe-5">
                    <input type="text" 
                    class="form-control form-control-lg" 
                    placeholder = "Year"
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
    }

    addAuthor(){
        let x = this.state.authorAmount + 1
        this.setState({authorAmount: x})

        
        for(let i = 0; i<this.state.authorAmount; i++){
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
        }
       
    }


    async postPaper(){
        console.log(
            this.state.pubVal,
            this.state.journalVal,
            this.state.firstName,
            this.state.lastName,
            this.state.url,
            this.state.author,
            this.state.number,
            this.state.year,
            this.state.location,
            this.state.pageNumber,
        )
        this.setState({submitValBool: true})
        this.setState({submitVal: "Published"})
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


                                <div class="row align-items-center pt-4 pb-3">
                                    <div class="col-md-3 ps-5">
                                        <h6 class="mb-0">First Name</h6>
                                    </div>
                                    <div class="col-md-9 pe-5">
                                        <input type="text" 
                                        class="form-control form-control-lg" 
                                        placeholder="First Name"
                                        onChange={ e => this.setState({firstName: e.target.value}) }/>
                                    </div>
                                </div>
                                <hr class="mx-n3"/>


                                <div class="row align-items-center pt-4 pb-3">
                                    <div class="col-md-3 ps-5">
                                        <h6 class="mb-0">Last Name</h6>
                                    </div>
                                    <div class="col-md-9 pe-5">
                                        <input type="text" 
                                        class="form-control form-control-lg" 
                                        placeholder= "Last Name"
                                        onChange={ e => this.setState({lastName: e.target.value}) }/>
                                    </div>
                                </div>
                                <hr class="mx-n3"/>



                                <div class="row align-items-center py-3">
                                    <div class="col-md-3 ps-5">
                                        <h6 class="mb-0">Author(s)</h6>
                                    </div>
                                <div class="col-md-9 pe-5">
                                    <input type="text" 
                                    class="form-control form-control-lg" 
                                    placeholder='Please enter: "Author1, Author2"..' 
                                    onChange={ e => this.setState({author: e.target.value}) }/>
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
import React from 'react'
import { AccountRepository } from '../api/accountRepository';
import { Link } from 'react-router-dom'



export class Paper extends React.Component {

    accountRepository = new AccountRepository();

    state = {
        title: this.props.title,
        data : {},
        authors:[],
        publicationType: "",
        publicationName: "",
        publicationNumber: "",
        publicationYear: "",
        publicationLocation: "",
        publicationPageNumber: "",

    }


    async componentDidMount(){
        let dataInput = await this.accountRepository.searchByTitle(this.state.title)
        this.setState({ data : dataInput})
        this.setState({authors: dataInput.authors, 
            publicationType: dataInput.publication.journal, 
            publicationName: dataInput.publication.name, 
            publicationNumber: dataInput.publication.number,
            publicationYear: dataInput.publication.year,
            publicationLocation: dataInput.publication.location,
            publicationPageNumber: dataInput.page_number

        })
        

    }

    conferenceType(){
        if(this.state.publicationType === "Conference"){
            return <>
                <h5 class="card-subtitle mb-2 text-muted mt-5">Conference: </h5>
                <ul class="list-group">
                            <li class="list-group-item">
                                {"Name: " + this.state.publicationName}
                            </li>
                            <li class="list-group-item">
                                {"Number: " + this.state.publicationNumber}
                            </li> 
                            <li class="list-group-item">
                                {"Year: " + this.state.publicationYear}
                            </li>
                            <li class="list-group-item">
                                {"Location: " + this.state.publicationLocation}
                            </li>
                            <li class="list-group-item">
                                {"Page Number: " + this.state.publicationPageNumber}
                            </li>
                </ul>
            </>
        }
        else{
            return <>
                <h5 class="card-subtitle mb-2 text-muted mt-5">Journal: </h5>
                <ul class="list-group">
                            <li class="list-group-item">
                                {"Name: " + this.state.publicationName}
                            </li>
                            <li class="list-group-item">
                                {"Number: " + this.state.publicationNumber}
                            </li> 
                            <li class="list-group-item">
                                {"Year: " + this.state.publicationYear}
                            </li>
                            <li class="list-group-item">
                                {"Page Number: " + this.state.publicationPageNumber}
                            </li>
                </ul>
            </>
        }
    }
  


    render () {
        return <>
        <div class="card" styles="width: 18rem;">
            <div class="card-body">
                <h2 class="card-title">Title: {this.state.title}</h2>
                <h5 class="card-subtitle mb-2 text-muted mt-5">url: <a href={this.state.data.url}>{this.state.data.url} </a> </h5>
                {this.conferenceType()}
                <h5 class="card-subtitle mb-2 text-muted mt-5">Authors: </h5>
                <ul class="list-group">
                    {this.state.authors.map((author, key) => {
                        return <>
                            <li class="list-group-item">
                                <Link to={`/viewAuthor/${author}`} > {author} </Link>
                            </li>
                        </>
                    })}
                </ul>
                  
            </div>
            </div>
    </>
    }
}


export default Paper;
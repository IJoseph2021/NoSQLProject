import React from 'react'
import { AccountRepository } from '../api/accountRepository';
import { Link } from 'react-router-dom'



export class Author extends React.Component {

    accountRepository = new AccountRepository();

    state = {
        firstName : this.props.name[0],
        lastName : this.props.name[1],
        papers: [],
        employer: "",
        startDate: "",
        endDate: "",
        employment: [],
        invalidCred: false,
        invalidCredNum: false,
        coAuthors : []

    }


    async componentDidMount(){
        let papers = await this.accountRepository.getPapersByAuthor(this.state.firstName, this.state.lastName)
        this.setState({ papers })

        let employment  = await this.accountRepository.getEmployment(this.state.firstName, this.state.lastName)
        this.setState( {employment} )
        

        let coAuthors = await this.accountRepository.getCoAuthors(this.state.firstName, this.state.lastName)
        this.setState( {coAuthors} )
        console.log(this.state.coAuthors)

        
    }

    async addEmployment(){
        if(!this.validation()){
            
            this.setState({invalidCred:true})
            
        }
        else{
            
            if(!this.validationNum()){
                this.setState({invalidCred:false, invalidCredNum:true})
            }
            else{
                this.setState({invalidCredNum:false})
                await this.accountRepository.addEmployment(this.state.firstName, this.state.lastName, this.state.employer, this.state.startDate, this.state.endDate)
                
                this.setState({employer: "", startDate: "", endDate: ""})
                this.refreshPage()
            }
            
        }
        
        
    }

    validation(){
		return this.state.employer.length > 0 && this.state.startDate.length > 0 && this.state.endDate.length > 0
	}

    validationNum(){
        return !isNaN(this.state.startDate) && !isNaN(this.state.endDate) 
    }

    refreshPage() {
        window.location.reload(false);
      }
  


    render () {
        return <>
        {this.state.invalidCred && <p className="form-control is-invalid"> Fill Out All Inputs!</p>}
        {this.state.invalidCredNum && <p className="form-control is-invalid"> Start and End Date Need to be Numbers</p>}
        <div class="card" styles="width: 18rem;">
            <div class="card-body">
                <h2 class="card-title">{this.state.firstName + " " + this.state.lastName}</h2>
                <h5 class="card-subtitle mb-2 text-muted">Papers: </h5>
                <ul class="list-group">
                    {this.state.papers.map((paper, key) => {
                            return <>
                                <li class="list-group-item">
                                    <Link to={`/viewPaper/${paper.title}`} > {paper.title} </Link>
                                </li>
                            </>
                        })}
                </ul>
                <h5 class="card-subtitle mb-2 text-muted mt-2">Coauthors: </h5>
                <ul class="list-group">
                    {this.state.coAuthors.map((authors, key) => {
                            return <>
                                <li class="list-group-item">
                                    <Link to={`/viewAuthor/${authors}` } > {authors} </Link>                                  
                                </li>
                            </>
                        })}
                </ul>
                
                <h5 class="card-subtitle mb-2 text-muted mt-2">Employment: </h5>
                <ul class="list-group">
                    {this.state.employment.map((employer, key) => {
                            return <>
                                <li class="list-group-item">
                                    <p>Employer: {" " + employer.name} </p>
                                    <p>Dates: {" " + employer.start + "-" + employer.end}</p>
                                </li>
                            </>
                        })}
                </ul>

                <h5 class="card-subtitle mb-2 text-muted mt-2">Add Employment: </h5>
                <form>
                    <div class="row">
                        <div class="col">
                        <input type="text" class="form-control" placeholder="Employer" value={this.state.employer} onChange={e => this.setState({ employer: e.target.value })}/>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" placeholder="Start Date" value={this.state.startDate} onChange={e => this.setState({ startDate: e.target.value })}/>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" placeholder="End Date" value={this.state.endDate} onChange={e => this.setState({ endDate: e.target.value })}/>
                        </div>
                        
                    </div>
                    </form>
                    <div>
                            <button type="submit" className="btn btn-primary mt-2" onClick={() => this.addEmployment()}> Add Employment </button>
                    </div>
            </div>
            </div>
        
      
    </>
    }
}



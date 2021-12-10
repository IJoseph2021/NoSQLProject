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
        employment: []

    }


    async componentDidMount(){
        let papers = await this.accountRepository.getPapersByAuthor(this.state.firstName, this.state.lastName)
        this.setState({ papers })
        

        
    }

    async addEmployment(){
        await this.accountRepository.addEmployment(this.state.firstName, this.state.lastName, this.state.employer, this.state.startDate, this.state.endDate)
        this.setState({employer: "", startDate: "", endDate: ""})
    }

  


    render () {
        return <>
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
                <h5 class="card-subtitle mb-2 text-muted mt-2">Employment: </h5>
                <ul class="list-group">
                    {this.state.papers.map((paper, key) => {
                            return <>
                                <li class="list-group-item">
                                    <Link to={`/viewPaper/${paper.title}`} > {paper.title} </Link>
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
                        <div>
                            <button type="submit" className="btn btn-success mt-2" onClick={e => this.addEmployment(e)}> Add Employment </button>
                        </div>
                    </div>
                    </form>
            </div>
            </div>
        
      
    </>
    }
}


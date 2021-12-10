import React from 'react'
import { AccountRepository } from '../api/accountRepository';



export class Author extends React.Component {

    accountRepository = new AccountRepository();

    state = {


    }


    async componentDidMount(){
        let data = await this.accountRepository.getPapers()
        this.setState({ data })
        
    }

  


    render () {
        return <>
        <div>
            Author
        </div>
      
    </>
    }
}


export default Author;
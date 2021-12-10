import React from 'react'
import { AccountRepository } from '../api/accountRepository';



export class Paper extends React.Component {

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
            Paper
        </div>
    </>
    }
}


export default Paper;
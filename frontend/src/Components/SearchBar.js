import React from 'react'
import SearchIcon from "@material-ui/icons/Search";
import './SearchBar.css'
import CloseIcon from "@material-ui/icons/Close";

export class SearchBar extends React.Component {
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

                

                <div class="mt-4">
                    <div class="row text-600 text-white bgc-default-tp1 py-25">
                        <div class="d-none d-sm-block col-1">#</div>
                        <div class="col-9 col-sm-5">Title</div>
                        <div class="d-none d-sm-block col-4 col-sm-2">Author</div>
                        <div class="d-none d-sm-block col-sm-2">Unit Price</div>
                        <div class="d-none d-sm-block col-sm-2">Unit Price</div>
                       
                    </div>

                    <div class="text-95 text-secondary-d3">
                        <div class="row mb-2 mb-sm-0 py-25">
                            <div class="d-none d-sm-block col-1">1</div>
                            <div class="col-9 col-sm-5">Domain registration</div>
                            <div class="d-none d-sm-block col-2">Domain  registration</div>
                            <div class="d-none d-sm-block col-2 text-95">$10</div>
                            <div class="col-2 text-secondary-d2">$20</div>
                        </div>

                        <div class="row mb-2 mb-sm-0 py-25 bgc-default-l4">
                            <div class="d-none d-sm-block col-1">2</div>
                            <div class="col-9 col-sm-5">Web hosting</div>
                            <div class="d-none d-sm-block col-2">1</div>
                            <div class="d-none d-sm-block col-2 text-95">$15</div>
                            <div class="col-2 text-secondary-d2">$15</div>
                        </div>

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
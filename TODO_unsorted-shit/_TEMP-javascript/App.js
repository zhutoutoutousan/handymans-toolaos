import React from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

function App({articles}) {
    // articles hook with initial value article
    // get articles from props and sort them by upvotes in descending order
    // return articles
    
    const [articlesHook, setArticlesHook] = React.useState(articles.sort((a, b) => b.upvotes - a.upvotes));
    const sortArticles = (orderBy) => {
        if (orderBy === 'upvotes') {
            setArticlesHook(articles.sort((a, b) => b.upvotes - a.upvotes));
        } else {
            setArticlesHook(articles.sort((a, b) => b.date - a.date));
        }
    }  
    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button data-testid="most-upvoted-link" type="button" className="small" onClick={() => sortArticles('upvotes')}>Most Upvoted</button>
                <button data-testid="most-recent-link" type="button" className="small" onClick={() => sortArticles('date')}>Most Recent</button>                
            </div>
            <Articles articles={articlesHook}/>
        </div>
    );

}

export default App;

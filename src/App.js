import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Search } from './Search'
import Table from './Table'
import Button from './Button'
import { Loading } from './Loading'
import { sortBy } from 'lodash';


const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100'
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage='


export const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
  };

class  App extends Component {

  _isMounted = false;

  constructor(props){
    super(props)
    this.state = {
      results:null,
      searchKEY: '',
      searchItem: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse:false
    }
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onSort = this.onSort.bind(this)
  }

  needsToSearchTopStories(searchItem) {
    return !this.state.results[searchItem];
    }

  onDismiss(id){
    const { searchKEY, results } = this.state
    const { hits, page } = results[searchKEY]
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({ results:{ 
      ...results,
      [searchKEY]: { hits: updatedHits, page } }});
  }

  onSearchChange(event){
   this.setState({searchItem: event.target.value})
  }

  setSearchTopStories(result){
  
  const { hits, page } = result
  
  const { searchKEY, results} = this.state

  const oldHits = results && results[searchKEY]
        ? results[searchKEY].hits
        : []

  const updatedHits = [...oldHits, ...hits]

  this.setState({
    results: {
      ...results,
      [searchKEY]: { hits: updatedHits, page}
    },
    isLoading: false
  })
  }
   onSort(sortKey){
     const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
     this.setState({sortKey, isSortReverse})

   }

  onSearchSubmit(event){
    const { searchItem } = this.state
    this.setState( { searchKEY: searchItem })
    if (this.needsToSearchTopStories(searchItem)) {
      this.fetchSearchTopStories(searchItem);
      }
    event.preventDefault();
  }

  fetchSearchTopStories(searchItem, page = 0){
    this.setState({ isLoading: true });
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchItem}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    // .then(response => response.json())
    .then(result => this._isMounted && this.setSearchTopStories(result.data))
    .catch(error => this._isMounted && this.setState({ error }))

  }

  componentDidMount(){
    this._isMounted = true
    const { searchItem } = this.state;
    this.setState({ searchKEY: searchItem })
    this.fetchSearchTopStories(searchItem);
   

  }

  componentWillUnmount() {
    this._isMounted = false;
    }

  render (){

    const { searchItem, results, searchKEY, error, isLoading, sortKey, isSortReverse } = this.state

    const page =(results && results[searchKEY] && results[searchKEY].page) || 0

    const list = (results && results[searchKEY] && results[searchKEY].hits) || []
    if (!results) { return null; }
    if(error){
      return <p>Something went wrong</p>
    }
    return (
      <div className="page">
      <div className='interactions'>

        <Search
        value={searchItem}
        onChange={this.onSearchChange}
        onSubmit={this.onSearchSubmit}
        >
        Search
        </Search>
      </div>
      {
        error
        ? <div className="interactions">
        <p>Something went wrong</p>
        </div>
        :
        <Table
        list={list}
        sortKey= {sortKey}
        onSort= {this.onSort}
        onDismiss={this.onDismiss}
        isSortReverse={isSortReverse}
         />
      }
         <div className="interactions">
          {
            isLoading
             ? <Loading/>
             : <Button
             onClick={() => this.fetchSearchTopStories(searchKEY, page + 1)}>
             More
             </Button>
           }
         </div>
        </div>
      
      
    );
  }
  
}

export default App;

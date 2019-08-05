import React from 'react';
import logo from './logo.svg';
import './SearchForm';
import './App.css';
import SearchForm from './SearchForm';
import TitleDisplay from './TitleDisplay';

class App extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        titles: [],
        currentSearchTerm: '',

    };
}


setSearchTermInput = e => {
    this.setState({
        currentSearchTerm: e.target.value
    });
};

fetchTitles = async event => {
    event.preventDefault();
    console.log(this.state.currentSearchTerm);
    // search results
    let response = await fetch('http://localhost:3001/title-search/' + this.state.currentSearchTerm);
    // parse results
    let myJson = await response.json();
    // business data
    console.log(myJson);
    // set state with search results
    let resultsChecked = myJson.length > 0 ? myJson : [];
    this.setState({
      titles: resultsChecked
    });
  };

   render() { 
        return (
            <div className="App">
                <SearchForm 
                fetchTitles={this.fetchTitles}
                setSearchTermInput={this.setSearchTermInput}
                />

                <TitleDisplay titles={this.state.titles}/>
            </div>
            
        );
    }
}

export default App;

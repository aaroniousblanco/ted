import React from 'react';
import './App.css';
import SearchForm from './SearchForm';
import Header from './Header';
import Card from './TitleDisplayCard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [],
      currentSearchTerm: '',

    };
  }


setSearchTermInput = (e) => {
  this.setState({
    currentSearchTerm: e.target.value,
    titles: [],
  });
};

fetchTitles = async (event) => {
  event.preventDefault();
  // search results
  const response = await fetch(`http://localhost:3001/title-search/${this.state.currentSearchTerm}`);
  // parse results
  const myJson = await response.json();
  // business data
  console.log(myJson);
  // set state with search results
  const resultsChecked = myJson.length > 0 ? myJson : [];
  resultsChecked.forEach(item => {
    item.expanded = 'false';
  });
  this.setState({
    titles: resultsChecked,
  });
};

   handleExpandClick =  async (idx) => {
    const shallowCopy = [...this.state.titles];
    console.log(shallowCopy);
    shallowCopy[idx].expanded = !shallowCopy[idx].expanded;
    this.setState({
        titles: shallowCopy
    });
    // search results
    const response = await fetch(`http://localhost:3001/fetch-image/?q=${shallowCopy[idx].TitleName}&d=${shallowCopy[idx].ReleaseYear}`);
    // parse results
    const imageUrl = await response.json();
    // business data
    if (imageUrl) {
        shallowCopy[idx].imageUrl = imageUrl;
    }
    this.setState({
        titles: shallowCopy
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <SearchForm
          fetchTitles={this.fetchTitles}
          setSearchTermInput={this.setSearchTermInput}
        />
        <Card
          titles={this.state.titles}
          handleExpandClick={this.handleExpandClick}
        />
      </div>

    );
  }
}

export default App;

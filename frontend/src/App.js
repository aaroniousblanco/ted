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
  const { currentSearchTerm } = this.state;
  if (currentSearchTerm.length < 1) {
    return;
  }
  const response = await fetch(`http://localhost:3001/title-search/${currentSearchTerm}`);
  // parse results
  const myJson = await response.json();
  // set state with search results
  let resultsChecked = myJson.length > 0 ? myJson : [];
  resultsChecked = resultsChecked.map((item) => {
    const itemCopy = item;
    itemCopy.expanded = 'false';
    return itemCopy;
  });
  this.setState({
    titles: resultsChecked,
  });
};

   handleExpandClick = async (idx) => {
     const { titles } = this.state;
     titles[idx].expanded = !titles[idx].expanded;
     this.setState({
       titles,
     });
     // search results
     const response = await fetch(`http://localhost:3001/fetch-image/?q=${titles[idx].TitleName}&d=${titles[idx].ReleaseYear}`);
     // parse results
     const imageUrl = await response.json();
     // business data
     if (imageUrl) {
       titles[idx].imageUrl = imageUrl;
     }
     this.setState({
       titles,
     });
   };

   render() {
     const { titles } = this.state;
     return (
       <div className="App">
         <Header />
         <SearchForm
           fetchTitles={this.fetchTitles}
           setSearchTermInput={this.setSearchTermInput}
         />
         <Card
           titles={titles}
           handleExpandClick={this.handleExpandClick}
         />
       </div>

     );
   }
}

export default App;

import React, { Component } from 'react';
import Listings from './components/Listings';
import ListingForm from './components/ListingForm';
import Items from './components/Items';
import ItemForm from './components/ItemForm';

class App extends Component {
  render() {
    return (
      <div>
        <Listings />
        <ListingForm />
        <Items />
        <ItemForm />
      </div>
    );
  }
}

export default App;

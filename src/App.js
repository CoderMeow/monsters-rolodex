import React, {Component} from 'react';
import {CardList} from './card-list/card-list-component';
import './App.css';
import {SearchBox} from './search-box/search-box.component';
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
    
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({monsters: users}));
  }

  //lexically scoped, arrow functions bind to the context of where it was defined, which is in the context of the component class
  handleChange = (e) => {
      this.setState({searchField: e.target.value})
  }

  render() {
    const {monsters, searchField} = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase()),
    );

    return (
      <div className="App">
        <h1>{'Monsters Rolodex'}</h1>
        <SearchBox handleChange={this.handleChange} placeHolder="search monsters" />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
export default App;

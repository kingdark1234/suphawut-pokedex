import React,{Component} from 'react';
import './ModalListView.css'
import ListView from '../shared/ListView/ListView.component'
import {map} from 'lodash';

export default class ModalListView extends Component {
  constructor() {
    super();

    this.state = {
      input: ''
    };
  }
  getPokemonCard = (card) =>(<ListView key={card.id} pokemonList={card} added={this.props.added}/>)

  onSearchNameChange = (input) => {
    const queryString = input.target.value;
    this.props.searchPokemon(queryString);
    this.setState({input:queryString})
  }

  onClickSearch = () => {
    this.props.searchPokemon(this.state.input);
  }
   
  render () {
    const {pokemonList} = this.props
    const cards = map(pokemonList, (value) => this.getPokemonCard(value));
    return (
      <div id='searchBox' className='contentModal'>
        <div className='search'>
          <input id='search' className='searchInput' type="text" onChange={this.onSearchNameChange} placeholder="Name or Type"/>
          <img className='searchIcon' src={require('../../search.png')} onClick={this.onClickSearch}/>
        </div>
        {cards}
      </div>
    );
  }
}
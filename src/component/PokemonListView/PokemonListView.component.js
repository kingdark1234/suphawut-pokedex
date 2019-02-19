import React,{Component} from 'react';
import './PokemonListView.css';
import {map} from 'lodash';
import ListView from '../shared/ListView/ListView.component';

export default class PokemonListView extends Component {
  getPokemonCard = (card) =>(<ListView key={card.id} pokemonList={card} removeCard={this.props.removeCard}/>)
  render () {
    const {addedPokemonList} = this.props;
    const cards = map(addedPokemonList, (value) => this.getPokemonCard(value));
    return (
      <div className="List">
        {cards}
      </div>
    );
  }
}
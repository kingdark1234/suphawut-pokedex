import React from 'react';
import PokemonList from '../component/PokemonListView/PokemonListView.component'


export default class ListPokemon extends React.Component {
  render () {
    const {addedPokemonList,removeCard} = this.props
    return (
      <PokemonList addedPokemonList={addedPokemonList} removeCard={removeCard}/>
    );
  }
}
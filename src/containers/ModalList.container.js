import React from 'react';
import ModalListView from '../component/ModalListView/ModalListView.component'
import axios from 'axios';
import {get} from 'lodash';
import {calculatePokemonDetailList} from '../utils/pokemon';
import {map,isEmpty} from 'lodash';


export default class ModalList extends React.Component {

  searchPokemon = async (searchValue) => {
    const response = await axios.get(`http://localhost:3030/api/cards?&name=${searchValue}`);
    let dataList = get(response,'data.cards',[]);
    if(isEmpty(dataList)){
      const response = await axios.get(`http://localhost:3030/api/cards?&type=${searchValue}`);
      dataList = get(response,'data.cards',[]);
    }
    const pokeList = map(dataList,value => calculatePokemonDetailList(value));
    this.props.setPokemonList(pokeList);
  }
  
  async componentDidMount(){
    const response = await axios.get('http://localhost:3030/api/cards');
    const dataList = get(response,'data.cards',[]);
    const pokeList = map(dataList,value => calculatePokemonDetailList(value));
    this.props.setPokemonList(pokeList);
  }

  render () {
    return (
      <ModalListView pokemonList={this.props.pokemonList} added={this.props.added} searchPokemon={this.searchPokemon}/>   
    );
  }
}
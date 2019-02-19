import React, { Component } from 'react'
import './App.css'
import PokemonList from './containers/ListPokemon.container'
import Modal from 'react-modal';
import ModalList from './containers/ModalList.container';
import {findIndex,get,remove,map,pullAt} from 'lodash';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '90%',
    width                 : '50%'
  }
};

Modal.setAppElement(document.getElementById('root'));
class App extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      pokemonList: [],
      addedPokemonList: []
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  async afterOpenModal() {
  //  const response = await axios.get('/user?ID=12345');
  }

  setPokemonList = (pokeList)=> {
    const idExisted = map(this.state.addedPokemonList,'id');
    const indexArrayToRemove = [];
    for (const index in idExisted) {
      indexArrayToRemove.push(findIndex(pokeList,['id',idExisted[index]]));
    } 
    pullAt(pokeList,indexArrayToRemove);
    this.setState({pokemonList:pokeList});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  added = (id) => {
    const index = findIndex(this.state.pokemonList,['id', id])
    const addToList = get(this.state.pokemonList,`[${index}]`,{});
    addToList.canAdd = false;
    this.setState(prevState => {
      const oldPokeDesk = get(prevState,'pokemonList',[])
      const newPokeDesk = remove(oldPokeDesk, (value) => value.id !== id);
      return {
        pokemonList: newPokeDesk
      }
    });
    this.setState(prevState => ({
      addedPokemonList:[
        ...prevState.addedPokemonList,
        addToList
      ]
    }));
  }

  removeCard = (id) => {
    const pokeDeskList = this.state.addedPokemonList
    remove(pokeDeskList, (value) => value.id === id);
    console.log(pokeDeskList);
    this.setState({addedPokemonList:pokeDeskList});
  }

  render() {
    return (
      <div className="App">
      <center><h3>MY Pokedex</h3></center>
      <div className="PokeList">
        <PokemonList addedPokemonList={this.state.addedPokemonList} removeCard={this.removeCard}/>
      </div>
      <div className='bottom' onClick={this.openModal}><p className='addCard'>+</p></div>
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <ModalList pokemonList={this.state.pokemonList} setPokemonList={this.setPokemonList} added={this.added}/>
        </Modal>
      </div>
    )
  }
}

export default App

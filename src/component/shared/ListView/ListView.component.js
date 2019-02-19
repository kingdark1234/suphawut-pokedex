import React,{Component} from 'react';
import './ListView.css'

export default class ListView extends Component {
  getLevel = (data) => {
    const result = [];
    for (let i = 0; i < data; i++) {
      result.push(<img className='imglevel' key={i} src={require('../../../cute.png')}/>);
    };
    return result;
  }
  render () {
    const {pokemonList ,added, removeCard} = this.props
    return (
      <div className='listItem'>
        <img className='pokemonImage' src={pokemonList.image}/>
        <div className='item'>
          <h1 className='textStyle'>{pokemonList.name}</h1>
            <h2 className='textStyle'>HP : </h2>
            <div className="progress">
              <div className="progress-bar-orange pokeBar" role="progressbar" style={{width:`${pokemonList.hp}%`}} aria-valuenow={pokemonList.hp} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          <h2 className='textStyle'>STR : </h2>
          <div className="progress">
              <div className="progress-bar-orange pokeBar" role="progressbar" style={{width:`${pokemonList.str}%`}} aria-valuenow={pokemonList.str} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          <h2 className='textStyle'>weak : </h2>
          <div className="progress">
              <div className="progress-bar-orange pokeBar" role="progressbar" style={{width:`${pokemonList.weak}%`}} aria-valuenow={pokemonList.weak} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          <div className='imgStyle'>{this.getLevel(pokemonList.level)}</div>
        </div>
        {(pokemonList.canAdd) ? <p className='add' onClick={added.bind(this,pokemonList.id)}>Add</p> : null}
        {(!pokemonList.canAdd) ? <p className='remove' onClick={removeCard.bind(this, pokemonList.id)}>X</p> : null}
      </div>
    );
  }
}
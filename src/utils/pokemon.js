import ListView from '../component/shared/ListView/ListView.component'
import {get,isEmpty,map} from 'lodash'

const getHP = (hp) => {
  const intHp = parseInt(hp);
  return (intHp > 100)? 100 : intHp;
}

const getStrength = (strength) => {
  if(isEmpty(strength)){
    return 0;
  }else if (strength.length === 1){
    return 50;
  }else{
    return 100;
  }
}

const getWeakness = (weakness) => isEmpty(weakness)?0:100

const getDamage = (Damages) => {
  let damage = 0;
  if(Damages.length > 0){
    Damages.forEach(attacks => {
      const dmg = get(attacks,'damage',0);
      damage += parseInt(dmg.replace(/\D+/g, ''));
    });
  }
  return damage;
}

const getHappiness = (hp,damage,weak) => {
  const result = ((hp / 10) + (damage /10 ) + 10 - (weak.length)) / 5;
  return parseInt(result);
}

export const calculatePokemonDetailList = (data,canAdd = true) => {
  const id = get(data, 'id', '');
  const image = get(data, 'imageUrl', '');
  const name = get(data, 'name', '');
  const pokeHP = getHP(get(data,'hp',0));
  const pokeStrength = getStrength(get(data,'attacks',[]));
  const pokeWeakness = getWeakness(get(data,'weaknesses',[]));
  const pokeDamage = getDamage(get(data,'attacks',[]));
  const pokeHappiness = getHappiness(pokeHP,pokeDamage,get(data,'weaknesses',[]));

  return {
    id,
    image,
    name,
    hp: pokeHP,
    str: pokeStrength,
    weak: pokeWeakness,
    damage: pokeDamage,
    level: pokeHappiness,
    canAdd
  }
}
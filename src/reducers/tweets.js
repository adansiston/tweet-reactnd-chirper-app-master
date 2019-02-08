import { RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets'  // adcionamos a constante criada


export default function tweets (state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS :
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET :  // criamos o tratamento para a constante
      return {
        ...state,
        [action.id]: {  // aqui estamos pegando o tweet com o id passado, para depois mudarmos a propredade likes
          ...state[action.id],  // vai permanecer como está, apenas a propriedade da linha debaixo será mudada
          likes: action.hasLiked === true // se essa propriedade for true
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser) // se já tiver o like, entao retira, devolvendo a lista sem o usuario autenticado
            : state[action.id].likes.concat([action.authedUser])  // se nao deu like ainda, adiciona o usuario autenticado na lista
        }
      }
    default :
      return state
  }
}
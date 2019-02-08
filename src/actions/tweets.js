import { saveLikeToggle } from '../utils/api' // importando a função para salvar no backend


export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'  // nova constatnte


export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}

function toggleTweet({ id, authedUser, hasLiked }) {  // acção nova definida
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}


export function handleToggleTweet(info) {   // função que chama a api para atualizar na base e tb atualiza nossa store
  return (dispatch) => {
    dispatch(toggleTweet(info))
    return saveLikeToggle(info)
      .catch((e) => {
        console.warn('Error in handleToggleTweet ', e)
        dispatch(toggleTweet(info))
        alert('The was an error liking the tweet. Try again.')
      })
  }
}



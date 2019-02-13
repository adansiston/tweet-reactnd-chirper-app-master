import { saveLikeToggle, saveTweet } from '../utils/api' // importando a função saveTweet do backend
import { showLoading, hideLoading } from 'react-redux-loading' // importando a barrinha

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'  // nova ação



function addTweet(tweet) {   // ação nova
  return {
    type: ADD_TWEET,
    tweet,
  }
}

export function handleAddTweet(text, replyingTo) {   // função que chama a api para atualizar na base e tb atualiza nossa store
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
      .then((tweet) => dispatch(addTweet(tweet))) // só executa depois da de cima
      .then(() => dispatch(hideLoading()))  // só executa depois da de cima
  }
}

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}

function toggleTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}


export function handleToggleTweet(info) {   
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



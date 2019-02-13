import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'

import { TiArrowBackOutline } from 'react-icons/ti/index.js'
import { TiHeartOutline } from 'react-icons/ti/index.js'
import { TiHeartFullOutline } from 'react-icons/ti/index.js'

import { handleToggleTweet } from '../actions/tweets' // importamos a ação criada

import { Link, withRouter } from 'react-router-dom' // para redirecionar corretamente. withRouter é um alternativo ao React Router. pq sem um dos dois não vamos conseguir utilizar o this.props.history, que não será passado


class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, tweet, authedUser } = this.props; // pegamos da props tudo que vamos usar
    

    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    }))
        
  }
  toParent = (e, id) => {     // função pré configurada para reponder ao tweet original, do qual p tweet em questão é uma resposta
    e.preventDefault()
    this.props.history.push(`/tweet/${id}`)   // redirecionando
  }
  render() {
    const { tweet } = this.props
    console.log ('tweet a ser exibido', tweet)

    if (tweet === null) {
      return <p>This Tweet doesn't existd</p>
    }
    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, id, parent     // inserimos o id aqui para passar para o link abaixo
    } = tweet
    console.log ('txt do', text)
    
    return (
      <Link to={`/tweet/${id}`} className='tweet'>  {/* vai redirecionar*/}
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked === true
                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                : <TiHeartOutline className='tweet-icon'/>}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    )
  }
}
function mapStateToProps ({authedUser, users, tweets}, { id }) {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  }
}
export default withRouter(connect(mapStateToProps)(Tweet)) // empacotamos tudo com o withRouter para ter acesso ao history
    
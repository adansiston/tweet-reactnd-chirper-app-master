import React, { Component } from 'react'
import { connect } from 'react-redux' // para poder conectar com o dispatch
import Tweet from './Tweet'     // importamos o tweet para renderizar
import NewTweet from './NewTweet'   // para renderizar a resposta

class TweetPage extends Component {


  render() {
    const { id, replies } = this.props 
    console.log('respostas', replies);
    return (
      <div>
          <Tweet id={id}/>
          <NewTweet id={id}/>
          {replies.length !== 0 && <h3 className='center'>Replies</h3>}
          <ul>
              {replies.map((replyId)=> (
                  <li key={replyId}>
                    <Tweet id={replyId}/>
                  </li>
              ))}
          </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, tweets, users }, props ) {		// vai receber as atualizações do store do React. Isso significa que a função mapStateToProps será chamada toda vez que o store for atualizado. Esta pegando  authedUser, tweets, users da store e props vai ser o id que está sendo passado na chamada desse componente
                                // na verdade essa função mapStateToProps adiciona objetos(elementos) ao props. Agora, nesse caso, temos o tweets no props desse componente, sem sequer ter sido passado por quem chama o TweetPage
   const { id } = props.match.params

   return {
        id,
        replies: !tweets[id]
            ? []
            : tweets[id].replies.sort((a,b,) => tweets[b].timestamp - tweets[a].timestamp)
   }
       
  }

export default connect(mapStateToProps)(TweetPage) // para dar acesso ao dispatch (tem acesso ao props com tudo)
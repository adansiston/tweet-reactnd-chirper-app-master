import React, { Component } from 'react'
import { connect } from 'react-redux'	// // Usar a função connect() transforma um componente em um container. Containers podem ler o estado do armazenador e despachar ações. 
import Tweet from './Tweet' // importando o tweet component

class Dashboard extends Component {
  render() {
	console.log('this.props on dashboard',this.props)
    return (
      <div>
        <h3 className='center'>Your Timeline</h3>
        <ul className='dashboard-list'>
          {this.props.tweetIds.map((id) => (
            <li key={id}>
              <Tweet id={id}/>  {/*  chamando o componente tweet passando o id */}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
function mapStateToProps ({ tweets }) {		// função que atualiza os tweets, pega apenas os tweets da nossa store que já possui mais coisas -> Caso este argumento seja especificado, o novo componente vai receber as atualizações do store do React. Isso significa que a função mapStateToProps será chamada toda vez que o store for atualizado.
  return {                                // na verdade essa função mapStateToProps adiciona objetos(elementos) ao props. Agora, nesse caso, temos o tweets no props desse componente, sem sequer ter sido passado por quem chama o Dashboard
    tweetIds: Object.keys(tweets)		
      .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)	// ordenou a lista
  }
}
export default connect(mapStateToProps)(Dashboard)	// // Usar a função connect() transforma um componente em um container. Containers podem ler o estado do armazenador e despachar ações. 

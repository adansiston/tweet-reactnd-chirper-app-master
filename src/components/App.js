import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'		
import LoadingBar from 'react-redux-loading'

import NewTweet from './NewTweet' 
import TweetPage from './TweetPage'   

import { BrowserRouter as Router, Route } from 'react-router-dom'    // para fazer a navegação
import Nav from './Nav' // importei a pagina criada

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <div>    {/* componente que serve para agrupar apenas*/}
          <LoadingBar />
          <div className='container'>     
            <Nav />      {/* componente que criamos*/}
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />    {/* de acordo com as entradas um componente */}
                  <Route path='/tweet/:id' component={TweetPage} />
                  <Route path='/new' component={NewTweet} />

                </div>
              }	
          </div>
        </div>
      </Router>
      
    )
  }
}
function mapStateToProps ({ authedUser }) {	// incluíos essa função para só carregar a página Dashboard se o usuário logado já existir, o que significa que nossa stre já possui dados
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App)	// para poder acessar o usuário logado tivemos que colocar o connect e a função


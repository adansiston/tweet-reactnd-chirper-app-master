import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'		// parte nova com a importação

import LoadingBar from 'react-redux-loading'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>     
        <LoadingBar />
        {this.props.loading === true
          ? null
          : <Dashboard />}	{/* caso exista um usuário logado na store ele vai carregar o nosso dashboard */}
      </div>
    )
  }
}
function mapStateToProps ({ authedUser }) {	// incluíos essa função para só carregar a página Dashboard se o usuário logado já existir, o que significa que nossa stre já possui dados
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App)	// para poder acessar o usuário logado tivemos que colocar o connect e a função


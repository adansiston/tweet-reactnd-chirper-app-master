import React, { Component } from 'react'
import { connect } from 'react-redux' // para poder conectar com o dispatch
import { handleAddTweet } from '../actions/tweets' // ação que queremos usar

import { Redirect } from 'react-router-dom' // para fazer o redirecionamento


class NewTweet extends Component {
  state = {     // o texto aqui vai ser um componente controlado, isto é, vai ser controlado pelo react, não pelo redux
      text: '', // Se esse texto fosse ser compartilhado com outros componentes, aí sim seria o caso de colocar no redux.
      toHome: false,  //para controlar o redirecionamento
  }             

  handleChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({
        text
    }))
  }

  handleSubmit = (e) => {
      e.preventDefault();
      const { text } = this.state;
      const { dispatch, id } = this.props;
      dispatch(handleAddTweet(text, id))  // se vier o id é pq é uma resposta, senao é um novo



      this.setState(() => ({
        text: '',
        toHome: id ? false : true,  // se tem id é uma resposta, por isso vai ficar na msm pagina, senao é pq é um tweet novo, e precisa voltar para home.
    }))
  }

  render() {
    const { text, toHome } = this.state;
    const tweetLeft = 280 - text.length;

    if(toHome === true){
      return <Redirect to='/' />
    }
    
    return (
      <div>
          <h3 className='center'>Compose a New Tweet</h3>
          <form className='new-tweet' onSubmit={this.handleSubmit}>
            <textarea
                placeholder="'What's happening?"
                value={text} 
                onChange={this.handleChange}
                className='textarea'
                maxLength={280}
            />
            {tweetLeft <= 100 && (
                <div className='tweet-length'>
                    {tweetLeft}
                </div>

            )}
            <button className='btn' type='submit' disabled={text === ''}>
                Submit
            </button>
          </form>
      </div>
    )
  }
}

export default connect()(NewTweet) // para dar acesso ao dispatch (tem acesso ao props com tudo)
    
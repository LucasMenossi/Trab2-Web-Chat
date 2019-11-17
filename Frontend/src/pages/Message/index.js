import React from 'react'
import axios from "axios";

import './styles.css'

export default class MessageScreen extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            user: 'teste',
            friend: 'teste2',
            message: '',
            messages: []
        }

    }

    componentDidMount(){
        this.getMessages()
    }

    getMessages = async () => {

        const { user, friend } = this.state
        const result = await axios.get(`http://localhost:3000/api/messages/${user}/${friend}/`);
        this.setState({
            messages: result.data
        });
    }

    onChangeHandler = e => {
        this.setState({[e.target.name]: e.target.value })
    }

    submitHandler = async e => {
        e.preventDefault()

        const { user, friend, message } = this.state

        await axios.post(`http://localhost:3000/api/messages/${user}/${friend}/`, {send: user, receiver: friend, message: message})
        .then( response => {
            this.getMessages()
        })
        .catch(error => {
            console.log(error)
        })

    }

    render(){

        return (
            <div className='container'>
                <header className='header'>
                    <h1 className='messageSend'>
                        Titulo
                    </h1>
                </header>
                <div className='messages'>
                        {this.state.messages && this.state.messages.map( message => {

                             if( message.send === this.state.user)
                                return (
                                    <div className='sendItem' key={message._id}> 
                                        <div className='send messageItem'>
                                            <h3>{message.message}</h3>
                                            <h3>{message.time}</h3>
                                            <br />
                                        </div>
                                    </div>
                                )
                              else 
                                return (
                                    <div className='receiverItem messageItem' key={message._id}> 
                                        <div className='receiver'>
                                            <h3>{message.message}</h3>
                                            <h3>{message.time}</h3>
                                            <br />
                                        </div>
                                    </div>
                                )
                            
                        })}
                </div>

                <form onSubmit={this.submitHandler} className='sendInput'>
                    <label className='messageLabel'>Mensagem</label>
                    <input type='text' name='message' className='input' value={this.state.message} onChange={this.onChangeHandler} />
                    <button type='submit'>Enviar</button>
                </form>
                
            </div>
        )
    }

}
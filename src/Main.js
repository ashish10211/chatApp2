import React from 'react';
import Title from './Title';
import './Main.css';
import io from "socket.io-client";
import avatar from'./assests/man.png';


  class Main extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            message: '',
            user:'UserOne',
            messages: []
        };

        this.socket = io('localhost:8080');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        
    this.socket.on('SERVER_MESSAGES', function(data) {
      alert(data);
      console.log(data)
    });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                message: this.state.message
            })
            this.setState({message: ''});
           this.socket.emit('SERVER_MESSAGES', {
                message: this.state.message
            })
        }
    }

      render() {
        return (
          <div className="App">
          <div className="App_container">
          <Title/>
          

          <div className="Messages">
          
          {this.state.messages.map(message => {
                                        return (
                                            <div> {<img src={avatar} />} : {message.message}</div>
                                        )
                                    })}
                                    
          </div>
         
          <form className="SendMessages" onSubmit={this.sendMessage}>
                <input
                    className='inputText'
                    placeholder="Please Type Your Message Here and Hit Enter "
                    type="text"
                    onChange={ev => this.setState({message: ev.target.value})}
                    value={this.state.message}
                     />
          }
            </form>

          </div>
         </div>
        )
      }
    }


export default Main;

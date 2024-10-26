import React, {useState} from 'react'
import { Form } from 'react-bootstrap'

import "../styles/chat.css"

const Chat = ({sendHandler, roomId, username}) => {

    const [msg, setmsg] = useState('')

    const handleChange = (e) => {
        setmsg(e.target.value)
    }
    const handleSend = (e) => {
        e.preventDefault();
        if(msg.length===0) return;
        sendHandler(2,{username, msg})
        addSendMsg(msg)
        setmsg('')
    }
    
    const addSendMsg = (text) => {
        const element = 
            ` <div class='send'>
                    <div class='msg'>
                       ${text}
                    </div>
                </div>`;
        const rdiv = document.createElement('div')
        rdiv.innerHTML=element
        rdiv.setAttribute('class', 'msg-container')
        
        const par = document.getElementById('msg-div')
        par?.appendChild(rdiv)  
        par.scrollTop = par.scrollHeight  
    }


    return (
        <div className='chatCont mt5'>
            <div className='chatBox'>
                <div className='scroller' id='msg-div'>
                </div>
                <div className='minp'>
                    <Form onSubmit={handleSend}>

                    
                        <Form.Control
                            type="text" 
                            placeholder="Enter message" 
                            name="msg"
                            onChange={handleChange}
                            value={msg}
                            className='finp inlin'
                        />
                        {/* <Button className='inlin' onClick={handleSend}> Send</Button> */}
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Chat
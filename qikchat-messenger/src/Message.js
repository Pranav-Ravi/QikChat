import React from 'react'

function Message(props) {
    return (
        <div>
            <h4>{props.username}: {props.text}</h4>
        </div>
    )
}

export default Message

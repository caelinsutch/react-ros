import React, { useState } from 'react'
import { useROS } from '../ROS'

function EchoTopic() {
  const { createListener, topics, isConnected } = useROS();
  const [ lastMsg, setLastMsg ] = useState('');

  var displayTopic = "/your/topic/here";
  var listener = null;

  const handleTopic = (topicInput) => {
    if (listener) {
      console.log("Unsubscribing");
      listener.unsubscribe();
      listener = null;
    }

    for (var i = 0; i < topics.length; i++) {
      if (topics[i].path == topicInput) {
        listener = createListener(topics[i].path, topics[i].msgType);
        break;
      }
    }

    if (listener) {
      console.log("Subscribing to messages...");
      listener.subscribe(handleMsg);
    } else {
      console.log("Topic not found...make sure to input the full topic path - including the leading '/'");
    }
  }

  const handleMsg = (msg) => {
    console.log(msg);
    setLastMsg(msg.data);
  }

  return (
    <div>
      <b>Topic to echo:  </b><input name="topicInput" defaultValue={ displayTopic } onChange={event => handleTopic(event.target.value)} />  <br />
      <b>Last message received:  </b> {lastMsg}
    </div>
  );
}

export default EchoTopic;
'use client';

import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm'

export default function Home() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [promptMessage, setPromptText] = useState<string>('');
  const [promptData, setMessages] = useState<string>('');

  const handleClick = async () => {
    if (connection && connection.state === 'Connected') {
      setMessages('');

      await connection.invoke('StreamChat', promptMessage);
    }
  };


  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5049/prompthub')
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          //console.log('Connected..');

          connection.on('ReceiveChunk', (message) => {
            //console.log(message);
            setMessages(prev => prev + message);
          });
        })
        .catch((err: any) => console.error('Connection failed: ', err));
    }
  }, [connection]);

  return (
    <div className="container">
      <h1>Career Analyst AI</h1>
      <p>This is a simple example of leveraging Angular or React, C#, SignarR, and OpenAI to build a tailored AI chatbot. In this example, this chatbot is tailored to be a career analyst and give detailed, no-BS information when prompted about a career.</p>

      <div className="promptSection">
        <input type="text" id="iPrompt" placeholder="What career are you interestted in going into?" value={promptMessage} onChange={e => setPromptText(e.target.value)}/>
      </div>
      
      <div className="actionSection">
        <button onClick={handleClick}>Do stuff</button>
      </div>

      <div id="messageContent" >
        <Markdown rehypePlugins={[rehypeRaw, remarkGfm]}>{promptData}</Markdown>
      </div>
    </div>
  );
}

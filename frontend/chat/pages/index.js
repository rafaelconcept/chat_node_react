
import React, {useState} from 'react'
import {io} from 'socket.io-client'


const socket = io("http://localhost:8000", {transports: ['websocket']})

import Head from 'next/head'

export default function Home() {

  const [name, setName] = useState("")
  const [msg, setMsg] = useState("")
  const [listMsg, setListMsg] =  useState([])
  const [ListMembers, setListMembers] =  useState(['Rafa', 'Anderson'])

  const handlepost = (e) => {
      e.preventDefault();
      setMsg('');
      socket.emit("newMessage", {name: name?name:'Unnamed', msg: msg})
  }

  socket.on("newMessageReceived", (data)=>{
    setListMsg([...listMsg, data])
    console.log(data)
  })

  return (


    <div className="container">

      
             

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">my webchat</a>
        </h1>

        <p className="description">
        webchat made just to train socket and next.js



        </p><input placeholder='Your Name' type="text" onChange={(e)=> setName(e.target.value)} />

        <div className="grid">
          <a className="board">
            <div className="boardMsg">
              {listMsg.map((x, index)=>(<div key={index} className={x.name==name?'mensagemBoardMinha':'mensagemBoard'}>{x.msg}</div>))
              }
              {//listMsg.map((x, index)=>(<div key={index} className='mensagemBoard'>{x.msg}</div>))
              }
        
              
            </div>
            <div className="boardTexto">
            <form>
            <input className="boardTextoInput" type="text" value={msg} onChange={(e)=> setMsg(e.target.value)} placeholder="Type..." /> 
              <button className="BotaoEnviarTexto" onClick={handlepost}>></button>
            </form> 
            </div>
              
          </a>
          <div className='barraUsers'>
              People List
              {ListMembers.map((x, index)=>(<div key={index} >{x}</div>))}

            </div>
        
        </div>
      </main>

 

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
    
          justify-content: center;
          flex-wrap: wrap;

          width: 1200px;
         // margin-top: 3rem;
        }
        .barraUsers {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          width: 150px;
          min-height: 50px;
          max-height: 500px;
          padding: 5px;
        }

        .mensagemBoard {
          border: 1px solid #eaeaea;
          border-radius: 10px;
          margin-bottom:5px;
          padding-left:5px;
    
     
        }
        .mensagemBoardMinha {
          border: 1px solid #eaeaea;
          border-radius: 10px;
          margin-bottom:5px;
          padding-left:5px;
          background-color: #bedbbe;
        }

        .boardTexto {
          margin-top:10px;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          width: 100%;
          padding: 5px;
        }
        .boardTextoInput{
          border: 0px solid #eaeaea;
          width: 90%;
          height: 20px;
        }

        .BotaoEnviarTexto{
          margin-left:15px;
          width: 25px;
          height: 25px;
        }

        textarea:focus, input:focus{
            outline: none;
        }


        .board {
          width: 100%;
          height: 100%;
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

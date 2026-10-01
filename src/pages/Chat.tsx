import {useState,useEffect,useRef,FormEvent} from 'react'
import {useStore} from '../lib/store'
export default function Chat(){const {chat,send}=useStore();const [t,setT]=useState('');const end=useRef<HTMLDivElement>(null)
  useEffect(()=>end.current?.scrollIntoView({behavior:'smooth'}),[chat])
  const go=(e:FormEvent)=>{e.preventDefault();if(t.trim()){send(t.trim());setT('')}}
  return(<><h1>Atendimento</h1><div className="chat"><div className="chathead"><img src="./logo.png" alt="" className="logoimg" style={{height:24,verticalAlign:'middle'}}/> Bunny Store · 🟢 Atendimento online</div>
  <div className="msgs">{chat.map((m,i)=><div key={i} className={'msg '+m.from}><small>{m.from==='store'?'Bunny Store':'Cliente'} · {m.time}</small><p>{m.text}</p></div>)}<div ref={end}/></div>
  <form className="row" onSubmit={go}><input aria-label="Mensagem" placeholder="Digite sua mensagem..." value={t} onChange={e=>setT(e.target.value)}/><button className="btn">Enviar</button></form></div></>)}

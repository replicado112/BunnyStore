import {useState,FormEvent} from 'react'
import {Link,useNavigate,useSearchParams} from 'react-router-dom'
import {useStore} from '../lib/store'
const F=({l,v,set,t='text'}:{l:string;v:string;set:(s:string)=>void;t?:string})=><label>{l}<input required type={t} value={v} onChange={e=>set(e.target.value)}/></label>
export function Login(){const {setUser,toast}=useStore();const [e,sE]=useState('');const [p,sP]=useState('');const nav=useNavigate();const next=useSearchParams()[0].get('next')??'/perfil'
  const go=(ev:FormEvent)=>{ev.preventDefault();setUser({name:e.split('@')[0],email:e,createdAt:new Date().toISOString().slice(0,10)});toast('Login simulado realizado!');nav(next)}
  return(<form className="auth" onSubmit={go}><h1>Entrar</h1><p className="muted">Login simulado — qualquer dado funciona.</p><F l="Email" t="email" v={e} set={sE}/><F l="Senha" t="password" v={p} set={sP}/><button className="btn full">Entrar</button><Link to="/cadastro">Criar conta</Link> · <Link to="/recuperar">Esqueci a senha</Link></form>)}
export function Register(){const {setUser,toast}=useStore();const [n,sN]=useState('');const [e,sE]=useState('');const [p,sP]=useState('');const [c,sC]=useState('');const nav=useNavigate()
  const go=(ev:FormEvent)=>{ev.preventDefault();if(p!==c)return toast('As senhas não conferem.');setUser({name:n,email:e,createdAt:new Date().toISOString().slice(0,10)});toast('Conta criada!');nav('/perfil')}
  return(<form className="auth" onSubmit={go}><h1>Cadastro</h1><F l="Nome" v={n} set={sN}/><F l="Email" t="email" v={e} set={sE}/><F l="Senha" t="password" v={p} set={sP}/><F l="Confirmar senha" t="password" v={c} set={sC}/><button className="btn full">Cadastrar</button></form>)}
export function Recover(){const {toast}=useStore();const [e,sE]=useState('')
  return(<form className="auth" onSubmit={ev=>{ev.preventDefault();toast('Se o email existir, enviaremos o link (simulado).')}}><h1>Recuperar senha</h1><F l="Email" t="email" v={e} set={sE}/><button className="btn full">Enviar link</button></form>)}

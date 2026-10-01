import {Link,useNavigate} from 'react-router-dom'
import {useStore} from '../lib/store'
export default function Profile(){const {user,setUser,orders,favs,toast}=useStore();const nav=useNavigate()
  if(!user)return <div className="empty"><p>Você não está logado.</p><Link className="btn" to="/login">Entrar</Link></div>
  return(<><h1>Meu perfil</h1><div className="panel"><p><b>{user.name}</b></p><p className="muted">{user.email} · Cadastro: {user.createdAt}</p><p>Pedidos: {orders.length} · Favoritos: {favs.length}</p>
  <div className="row"><Link className="btn" to="/pedidos">Meus pedidos</Link><Link className="btn" to="/favoritos">Favoritos</Link><button className="btn ghost" onClick={()=>{const n=prompt('Novo nome',user.name);if(n)setUser({...user,name:n})}}>Editar perfil</button><button className="btn ghost" onClick={()=>{setUser(null);toast('Você saiu.');nav('/')}}>Sair</button></div></div></>)}

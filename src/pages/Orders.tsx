import {Link,useParams} from 'react-router-dom'
import {useStore} from '../lib/store'
import {brl} from '../lib/format'
export function Orders(){const {orders}=useStore()
  return(<><h1>Meus pedidos</h1>{orders.map(o=><Link key={o.id} to={'/pedido/'+o.id} className="panel orderrow"><b>#{o.id}</b><span className="muted">{o.date} · {o.items.reduce((s,i)=>s+i.qty,0)} item(ns)</span><b>{brl(o.total)}</b><span className="status">{o.status}</span></Link>)}</>)}
export function OrderDetails(){const {id}=useParams();const {orders,find}=useStore();const o=orders.find(x=>x.id===id)
  if(!o)return <p>Pedido não encontrado.</p>
  return(<><Link to="/pedidos" className="muted">← Meus pedidos</Link><h1>Pedido #{o.id}</h1><div className="panel"><p className="status">{o.status}</p><p className="muted">{o.date}</p>
  {o.items.map(i=><div className="between" key={i.id}><span>{find(i.id).name} × {i.qty}</span><span>{brl(find(i.id).price*i.qty)}</span></div>)}<div className="between total"><span>Total</span><span>{brl(o.total)}</span></div>
  <p>🟢 Atendimento disponível</p><Link className="btn" to="/chat">Falar com atendimento</Link></div></>)}
export function Success(){const {id}=useParams()
  return(<div className="empty"><h1>Pedido realizado com sucesso! 🎉</h1><h2>Pedido #{id}</h2><p>Pagamento aprovado · Preparando pedido</p><div className="row"><Link className="btn" to={'/pedido/'+id}>Ver meu pedido</Link><Link className="btn ghost" to="/">Voltar para loja</Link></div></div>)}

import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Trash2} from 'lucide-react'
import {useStore} from '../lib/store'
import {brl} from '../lib/format'
export default function Cart(){
  const s=useStore();const [code,setCode]=useState('');const nav=useNavigate()
  if(!s.cart.length)return <div className="empty"><h1>Carrinho vazio</h1><Link className="btn" to="/produtos">Continuar comprando</Link></div>
  return(<><h1>Carrinho</h1><div className="cols"><div>{s.cart.map(i=>{const p=s.find(i.id);return(<div className="line" key={i.id}><img src={p.image} alt=""/><div className="grow"><b>{p.name}</b><div className="muted">{brl(p.price)}</div>
    <div className="qty"><button aria-label="Diminuir" onClick={()=>s.setQty(i.id,i.qty-1)}>-</button><span>{i.qty}</span><button aria-label="Aumentar" onClick={()=>s.setQty(i.id,i.qty+1)}>+</button></div></div>
    <button className="icon" aria-label="Remover" onClick={()=>s.remove(i.id)}><Trash2/></button></div>)})}<Link to="/produtos" className="muted">← Continuar comprando</Link></div>
  <aside className="summary"><h3>Resumo</h3><div className="between"><span>Subtotal</span><span>{brl(s.subtotal)}</span></div><div className="between"><span>Desconto{s.coupon&&` (${s.coupon})`}</span><span>-{brl(s.discount)}</span></div><div className="between total"><span>Total</span><span>{brl(s.total)}</span></div>
    <div className="row"><input aria-label="Cupom" placeholder="Cupom (BUNNY10, WELCOME, PINK)" value={code} onChange={e=>setCode(e.target.value)}/><button className="btn" onClick={()=>s.applyCoupon(code)}>Aplicar</button></div>
    <button className="btn full" onClick={()=>nav(s.user?'/checkout':'/login?next=/checkout')}>Finalizar compra</button></aside></div></>)}

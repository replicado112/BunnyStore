import {useState} from 'react'
import {useParams,Link,useNavigate} from 'react-router-dom'
import {Heart} from 'lucide-react'
import {products} from '../data/products'
import {useStore} from '../lib/store'
import {brl,discountPct} from '../lib/format'
export default function ProductDetails(){
  const {id}=useParams();const p=products.find(x=>x.id===id);const {add,favs,toggleFav}=useStore();const [q,setQ]=useState(1);const nav=useNavigate()
  if(!p)return <p>Produto não encontrado. <Link to="/produtos">Voltar para produtos</Link></p>
  return(<><Link to="/produtos" className="muted">← Voltar para produtos</Link>
  <div className="detail"><img src={p.image} alt={p.name}/><div><h1>{p.name}</h1><p className="muted">{p.description}</p>
    <div className="price big"><b>{brl(p.price)}</b>{p.oldPrice&&<><s className="muted">{brl(p.oldPrice)}</s><span className="tag">-{discountPct(p)}%</span></>}</div>
    <ul className="muted"><li>Categoria: {p.category}</li><li>Evento: {p.event}</li><li>Raridade: <span className={'rar r-'+p.rarity}>{p.rarity}</span></li><li>Estoque: {p.stock}</li><li>Entrega digital via atendimento</li></ul>
    <div className="qty"><button aria-label="Diminuir" onClick={()=>setQ(Math.max(1,q-1))}>-</button><span>{q}</span><button aria-label="Aumentar" onClick={()=>setQ(Math.min(p.stock,q+1))}>+</button></div>
    <div className="row"><button className="btn" onClick={()=>add(p.id,q)}>Adicionar ao carrinho</button><button className="btn alt" onClick={()=>{add(p.id,q);nav('/carrinho')}}>Comprar agora</button><button className={'btn ghost'+(favs.includes(p.id)?' on':'')} onClick={()=>toggleFav(p.id)} aria-label="Favoritar"><Heart size={18}/></button></div></div></div></>)}

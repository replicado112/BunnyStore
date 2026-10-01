import {Link} from 'react-router-dom'
import {Heart} from 'lucide-react'
import type {Product} from '../../types'
import {useStore} from '../../lib/store'
import {brl,discountPct} from '../../lib/format'
export default function ProductCard({p}:{p:Product}){
  const {favs,toggleFav,add}=useStore();const fav=favs.includes(p.id);const d=discountPct(p)
  return(<article className="card">
    <Link to={'/produto/'+p.id}><div className="imgw"><img src={p.image} alt={p.name} loading="lazy"/>{d>0&&<span className="tag">-{d}%</span>}</div></Link>
    <button className={'heart'+(fav?' on':'')} aria-label={fav?'Remover dos favoritos':'Favoritar'} aria-pressed={fav} onClick={()=>toggleFav(p.id)}><Heart size={18} fill={fav?'currentColor':'none'}/></button>
    <div className="cbody"><small className="muted">{p.category} · <span className={'rar r-'+p.rarity}>{p.rarity}</span></small>
    <Link to={'/produto/'+p.id}><h3>{p.name}</h3></Link>
    <div className="price"><b>{brl(p.price)}</b>{p.oldPrice&&<s className="muted">{brl(p.oldPrice)}</s>}</div>
    <small className="muted">{p.stock} em estoque</small>
    <button className="btn" onClick={()=>add(p.id)}>Comprar</button></div></article>)
}

import {useState,useMemo,useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import {products} from '../data/products'
import {categories} from '../data/categories'
import {events} from '../data/events'
import {rarities} from '../data/rarities'
import {discountPct} from '../lib/format'
import ProductCard from '../components/products/ProductCard'
const PER=8
export default function Products(){
  const [sp,setSp]=useSearchParams();const q=sp.get('q')??'';const [cat,setCat]=useState(sp.get('cat')??'');const [ev,setEv]=useState('');const [rar,setRar]=useState('');const [max,setMax]=useState(100);const [sort,setSort]=useState(sp.get('sort')??'rel');const [page,setPage]=useState(1)
  useEffect(()=>setPage(1),[q,cat,ev,rar,max,sort])
  const list=useMemo(()=>{let l=products.filter(p=>(!cat||p.category===cat)&&(!ev||p.event===ev)&&(!rar||p.rarity===rar)&&p.price<=max&&(p.name+p.category+p.description).toLowerCase().includes(q.toLowerCase()))
    const s:any={rel:(a:any,b:any)=>+b.featured-+a.featured,asc:(a:any,b:any)=>a.price-b.price,desc:(a:any,b:any)=>b.price-a.price,new:(a:any,b:any)=>b.createdAt-a.createdAt,disc:(a:any,b:any)=>discountPct(b)-discountPct(a)}
    return [...l].sort(s[sort])},[q,cat,ev,rar,max,sort])
  const pages=Math.max(1,Math.ceil(list.length/PER));const shown=list.slice((page-1)*PER,page*PER)
  const Sel=({v,set,opts,all}:{v:string;set:(s:string)=>void;opts:string[];all:string})=><select aria-label={all} value={v} onChange={e=>set(e.target.value)}><option value="">{all}</option>{opts.map(o=><option key={o}>{o}</option>)}</select>
  return(<><h1>Produtos</h1>
  <div className="filters"><input aria-label="Pesquisar" placeholder="Pesquisar..." value={q} onChange={e=>setSp(e.target.value?{q:e.target.value}:{})}/>
    <Sel v={cat} set={setCat} opts={categories} all="Categoria: Todos"/><Sel v={ev} set={setEv} opts={events} all="Evento: Todos"/><Sel v={rar} set={setRar} opts={rarities} all="Raridade: Todas"/>
    <label className="muted">Até R$ {max}<input type="range" min={10} max={100} value={max} onChange={e=>setMax(+e.target.value)}/></label>
    <select aria-label="Ordenar" value={sort} onChange={e=>setSort(e.target.value)}><option value="rel">Mais relevantes</option><option value="asc">Menor preço</option><option value="desc">Maior preço</option><option value="new">Mais recentes</option><option value="disc">Maior desconto</option></select></div>
  {shown.length?<div className="grid">{shown.map(p=><ProductCard key={p.id} p={p}/>)}</div>:<div className="empty"><p>Não encontramos nenhum produto.</p><button className="btn" onClick={()=>{setSp({});setCat('');setEv('');setRar('');setMax(100)}}>Limpar pesquisa</button></div>}
  <div className="pager"><button disabled={page===1} onClick={()=>setPage(page-1)} aria-label="Anterior">←</button>{Array.from({length:pages},(_,i)=><button key={i} className={page===i+1?'on':''} onClick={()=>setPage(i+1)}>{i+1}</button>)}<button disabled={page===pages} onClick={()=>setPage(page+1)} aria-label="Próxima">→</button></div></>)}

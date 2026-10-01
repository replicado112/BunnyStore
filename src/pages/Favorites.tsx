import {Link} from 'react-router-dom'
import {products} from '../data/products'
import {useStore} from '../lib/store'
import ProductCard from '../components/products/ProductCard'
export default function Favorites(){const {favs}=useStore();const l=products.filter(p=>favs.includes(p.id))
  return(<><h1>Meus favoritos</h1>{l.length?<div className="grid">{l.map(p=><ProductCard key={p.id} p={p}/>)}</div>:<div className="empty"><p>Nenhum favorito ainda.</p><Link className="btn" to="/produtos">Ver produtos</Link></div>}</>)}

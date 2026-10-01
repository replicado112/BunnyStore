import {Link} from 'react-router-dom'
import {products} from '../data/products'
import {categories} from '../data/categories'
import ProductCard from '../components/products/ProductCard'
export default function Home(){return(<>
  <section className="hero"><div className="glow"/>
    <img className="heroimg" src="./hero.png" alt="Bunny Store"/>
  </section>
  <div className="herobtn"><Link to="/produtos" className="btn">Explorar produtos</Link></div>
  <h2>Categorias</h2><div className="chips">{categories.map(c=><Link key={c} className="chip" to={'/produtos?cat='+encodeURIComponent(c)}>{c}</Link>)}</div>
  <h2>Destaques</h2><div className="grid">{products.filter(p=>p.featured).map(p=><ProductCard key={p.id} p={p}/>)}</div></>)}

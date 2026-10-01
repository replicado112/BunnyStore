import {ReactNode,useState,FormEvent} from 'react'
import {Link,NavLink,useNavigate} from 'react-router-dom'
import {ShoppingCart,Search,User,Menu,X,Heart,MessageCircle,Instagram,Music2,Phone,Gamepad2} from 'lucide-react'
import {useStore} from '../../lib/store'
const links:[string,string][]=[['Início','/'],['Produtos','/produtos'],['Categorias','/produtos'],['Eventos','/produtos'],['Ofertas','/produtos?sort=disc'],['Meus pedidos','/pedidos'],['Favoritos','/favoritos'],['Carrinho','/carrinho'],['Perfil','/perfil'],['Atendimento','/chat']]
export default function Layout({children}:{children:ReactNode}){
  const {count,user,toasts,termsOk,setTermsOk}=useStore()
  const [open,setOpen]=useState(false);const [terms,setTerms]=useState(false);const [q,setQ]=useState('');const nav=useNavigate()
  const submit=(e:FormEvent)=>{e.preventDefault();nav('/produtos?q='+encodeURIComponent(q))}
  return(<>
  <header className="header"><div className="container hrow">
    <button className="icon mobile-only" aria-label="Abrir menu" onClick={()=>setOpen(true)}><Menu/></button>
    <Link to="/" className="logo">🐰 <b>Bunny</b> Store</Link>
    <nav className="desk-only" aria-label="Principal">{[links[0],links[1],links[4],links[5]].map(([t,h])=><NavLink key={t} to={h}>{t}</NavLink>)}</nav>
    <form className="search desk-only" onSubmit={submit} role="search"><Search size={16}/><input aria-label="Pesquisar produtos" placeholder="Pesquisar..." value={q} onChange={e=>setQ(e.target.value)}/></form>
    <Link to="/favoritos" className="icon desk-only" aria-label="Favoritos"><Heart/></Link>
    <Link to="/carrinho" className="icon cartbtn" aria-label={`Carrinho, ${count} itens`}><ShoppingCart/>{count>0&&<span className="badge">{count}</span>}</Link>
    <Link to={user?'/perfil':'/login'} className="icon" aria-label="Perfil"><User/></Link>
  </div></header>
  <div className={'overlay'+(open?' show':'')} onClick={()=>setOpen(false)}/>
  <aside className={'drawer'+(open?' open':'')} aria-hidden={!open}><div className="between"><b>🐰 Bunny Store</b><button className="icon" aria-label="Fechar menu" onClick={()=>setOpen(false)}><X/></button></div>
    {links.map(([t,h])=><Link key={t} to={h} onClick={()=>setOpen(false)}>{t}</Link>)}</aside>
  <main className="container page fade">{children}</main>
  <footer className="footer"><div className="container fgrid">
    <div><b>🐰 Bunny Store</b><p className="muted">Sua loja gamer com itens, contas e serviços. Protótipo frontend — nada aqui é real.</p></div>
    <div><b>Navegação</b>{[['Início','/'],['Produtos','/produtos'],['Ofertas','/produtos?sort=disc'],['Meus pedidos','/pedidos']].map(([t,h])=><Link key={t} to={h}>{t}</Link>)}</div>
    <div><b>Atendimento</b><Link to="/chat">Suporte / Chat</Link><a href="#/">FAQ</a><button className="linkbtn" onClick={()=>setTerms(true)}>Termos</button><a href="#/">Privacidade</a></div>
    <div><b>Redes</b><div className="social"><a href="#/" aria-label="Discord"><Gamepad2/></a><a href="#/" aria-label="Instagram"><Instagram/></a><a href="#/" aria-label="TikTok"><Music2/></a><a href="#/" aria-label="WhatsApp"><Phone/></a></div></div>
  </div></footer>
  <Link to="/chat" className="fab" aria-label="Atendimento"><MessageCircle/></Link>
  {(!termsOk||terms)&&<div className="modalbg"><div className="modal fade" role="dialog" aria-modal="true" aria-label="Termos"><h2>Bem-vindo à Bunny Store 🐰</h2>
    <p className="muted">Esta é uma loja de demonstração. Ao continuar, você concorda com os termos de uso fictícios: nenhum pagamento é real e os dados ficam apenas no seu navegador.</p>
    <div className="row"><button className="btn" onClick={()=>{setTermsOk(true);setTerms(false)}}>Li e aceito</button><button className="btn ghost" onClick={()=>{setTermsOk(true);setTerms(false)}}>Continuar navegando</button></div></div></div>}
  <div className="toasts" aria-live="polite">{toasts.map(t=><div key={t.id} className="toast">{t.text}</div>)}</div>
  </>)
}

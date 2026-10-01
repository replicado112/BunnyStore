import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useStore} from '../lib/store'
import {brl} from '../lib/format'
const CODE='00020101021226830014br.gov.bcb.pix0136bunny-prototipo-fake5204000053039865802BR5910BUNNYSTORE6009SAO PAULO62070503***6304ABCD'
export default function Checkout(){
  const s=useStore();const nav=useNavigate();const [step,setStep]=useState(1);const [pay,setPay]=useState('PIX')
  const f=s.form;const set=(k:string,v:string)=>s.setForm({...f,[k]:v,...(k==='name'&&!f.wpp?{}:{})})
  if(!s.user){nav('/login?next=/checkout');return null}
  if(!s.cart.length)return <div className="empty"><p>Seu carrinho está vazio.</p><Link className="btn" to="/produtos">Ver produtos</Link></div>
  const wpp=f.wpp||f.name
  return(<><h1>Checkout</h1><div className="steps">{['Dados','Pedido','Pagamento'].map((t,i)=><span key={t} className={step===i+1?'on':''}>{i+1}. {t}</span>)}</div>
  {step===1&&<form className="auth wide" onSubmit={e=>{e.preventDefault();s.setForm({...f,wpp});setStep(2)}}>
    {([['name','Nome'],['nick','Nickname'],['wpp','Nome no WhatsApp'],['level','Nível']] as const).map(([k,l])=><label key={k}>{l}<input required={k!=='wpp'} value={k==='wpp'?wpp:f[k]} onChange={e=>set(k,e.target.value)}/></label>)}
    <label>Observações<textarea value={f.obs} onChange={e=>set('obs',e.target.value)}/></label><button className="btn full">Continuar</button></form>}
  {step===2&&<div className="panel">{s.cart.map(i=><div className="between" key={i.id}><span>{s.find(i.id).name} × {i.qty}</span><span>{brl(s.find(i.id).price*i.qty)}</span></div>)}
    <div className="between"><span>Subtotal</span><span>{brl(s.subtotal)}</span></div><div className="between"><span>Cupom {s.coupon}</span><span>-{brl(s.discount)}</span></div><div className="between total"><span>Total</span><span>{brl(s.total)}</span></div>
    <div className="row"><button className="btn ghost" onClick={()=>setStep(1)}>Voltar</button><button className="btn" onClick={()=>setStep(3)}>Ir para pagamento</button></div></div>}
  {step===3&&<div className="panel"><div className="chips">{['PIX','Cartão','Mercado Pago'].map(p=><button key={p} className={'chip'+(pay===p?' on':'')} onClick={()=>setPay(p)}>{p}</button>)}</div>
    <p className="muted">⚠️ Pagamento 100% simulado. Nenhuma cobrança real.</p>
    {pay==='PIX'?<div className="pix"><svg viewBox="0 0 21 21" width="160" role="img" aria-label="QR Code simulado"><rect width="21" height="21" fill="#fff"/>{Array.from({length:441},(_,n)=>((n*7+n%5*3+(n>>2))%3===0)?<rect key={n} x={n%21} y={Math.floor(n/21)} width="1" height="1" fill="#111"/>:null)}</svg>
      <code>{CODE}</code><button className="btn ghost" onClick={()=>{navigator.clipboard?.writeText(CODE);s.toast('Código copiado!')}}>Copiar código</button></div>:<p>Tela de {pay} simulada.</p>}
    <div className="row"><button className="btn ghost" onClick={()=>setStep(2)}>Voltar</button><button className="btn" onClick={()=>nav('/sucesso/'+s.createOrder())}>Simular pagamento aprovado</button></div></div>}</>)}

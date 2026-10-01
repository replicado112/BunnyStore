import {createContext,useContext,useEffect,useState,useCallback,ReactNode} from 'react'
import {products} from '../data/products'
import {coupons} from '../data/coupons'
import {seedOrders} from '../data/orders'
import type {CartItem,Order,User,Msg,Checkout} from '../types'
import {now} from './format'

function useLS<T>(k:string,d:T):[T,React.Dispatch<React.SetStateAction<T>>]{
  const [v,s]=useState<T>(()=>{try{const r=localStorage.getItem('bunny:'+k);return r?JSON.parse(r):d}catch{return d}})
  useEffect(()=>{try{localStorage.setItem('bunny:'+k,JSON.stringify(v))}catch{}},[k,v])
  return [v,s]
}
const welcome:Msg[]=[{from:'store',text:'Olá! Como podemos ajudar?',time:now()}]
function useStoreState(){
  const [cart,setCart]=useLS<CartItem[]>('cart',[])
  const [favs,setFavs]=useLS<string[]>('favs',[])
  const [user,setUser]=useLS<User|null>('user',null)
  const [orders,setOrders]=useLS<Order[]>('orders',seedOrders)
  const [chat,setChat]=useLS<Msg[]>('chat',welcome)
  const [coupon,setCoupon]=useLS<string|null>('coupon',null)
  const [form,setForm]=useLS<Checkout>('checkout',{name:'',nick:'',wpp:'',level:'',obs:''})
  const [termsOk,setTermsOk]=useLS('terms',false)
  const [toasts,setToasts]=useState<{id:number;text:string}[]>([])
  const toast=useCallback((text:string)=>{const id=Date.now()+Math.random();setToasts(t=>[...t,{id,text}]);setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),2500)},[])
  const find=(id:string)=>products.find(p=>p.id===id)!
  const add=(id:string,qty=1)=>{setCart(c=>{const e=c.find(i=>i.id===id);const max=find(id).stock;return e?c.map(i=>i.id===id?{...i,qty:Math.min(max,i.qty+qty)}:i):[...c,{id,qty:Math.min(max,qty)}]});toast('Produto adicionado ao carrinho!')}
  const remove=(id:string)=>{setCart(c=>c.filter(i=>i.id!==id));toast('Produto removido!')}
  const setQty=(id:string,q:number)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,Math.min(find(id).stock,q))}:i))
  const toggleFav=(id:string)=>{setFavs(f=>f.includes(id)?f.filter(x=>x!==id):[...f,id]);toast(favs.includes(id)?'Removido dos favoritos':'Produto adicionado aos favoritos!')}
  const subtotal=cart.reduce((s,i)=>s+find(i.id).price*i.qty,0)
  const c=coupon?coupons[coupon]:null
  const discount=c?Math.min(subtotal,c.type==='pct'?subtotal*c.value/100:c.value):0
  const total=Math.max(0,subtotal-discount)
  const applyCoupon=(code:string)=>{const k=code.trim().toUpperCase();if(coupons[k]){setCoupon(k);toast('Cupom aplicado com sucesso!');return true}toast('Este cupom não é válido.');return false}
  const createOrder=()=>{const id='BUN-'+String(123+orders.length-2).padStart(6,'0');const o:Order={id,date:new Date().toISOString().slice(0,10),items:cart,total,status:'Pagamento aprovado'};setOrders(x=>[o,...x]);setCart([]);setCoupon(null);toast('Pedido criado!');return id}
  const send=(text:string)=>{setChat(m=>[...m,{from:'client',text,time:now()}]);toast('Mensagem enviada!');setTimeout(()=>setChat(m=>[...m,{from:'store',text:'Claro! Vamos verificar seu pedido.',time:now()}]),1200)}
  return {cart,favs,user,setUser,orders,chat,coupon,setCoupon,form,setForm,termsOk,setTermsOk,toasts,toast,find,add,remove,setQty,toggleFav,subtotal,discount,total,applyCoupon,createOrder,send,count:cart.reduce((s,i)=>s+i.qty,0)}
}
type Ctx=ReturnType<typeof useStoreState>
const C=createContext<Ctx>(null as any)
export const StoreProvider=({children}:{children:ReactNode})=><C.Provider value={useStoreState()}>{children}</C.Provider>
export const useStore=()=>useContext(C)

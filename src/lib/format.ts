export const brl=(n:number)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
export const discountPct=(p:{price:number;oldPrice?:number})=>p.oldPrice?Math.round((1-p.price/p.oldPrice)*100):0
export const now=()=>new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})

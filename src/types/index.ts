export interface Product{id:string;name:string;description:string;price:number;oldPrice?:number;image:string;category:string;event:string;rarity:string;stock:number;featured:boolean;createdAt:number}
export interface CartItem{id:string;qty:number}
export type OrderStatus='Aguardando pagamento'|'Pagamento aprovado'|'Preparando'|'Em atendimento'|'Concluído'|'Cancelado'
export interface Order{id:string;date:string;items:CartItem[];total:number;status:OrderStatus}
export interface User{name:string;email:string;createdAt:string}
export interface Msg{from:'store'|'client';text:string;time:string}
export interface Checkout{name:string;nick:string;wpp:string;level:string;obs:string}

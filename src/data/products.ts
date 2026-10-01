import type {Product} from '../types'
const img=(e:string,h:number)=>'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h},80%,18%)"/><stop offset="1" stop-color="#111"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><circle cx="200" cy="200" r="110" fill="hsl(${h},90%,60%)" opacity=".15"/><text x="200" y="250" font-size="150" text-anchor="middle">${e}</text></svg>`)
const C='Flee the Facility'
// [nome, categoria, evento, raridade, preço, preço antigo, estoque, emoji, hue]
const raw:[string,string,string,string,number,number,number,string,number][]=[
['Skin Bunny Rosa',C,'Páscoa','Lendário',19.9,29.9,12,'🐰',330],['Martelo Neon',C,'Especial','Épico',14.9,0,30,'🔨',320],
['Traje Halloween',C,'Halloween','Raro',9.9,14.9,50,'🎃',20],['Skin Beast Exclusiva',C,'Especial','Exclusivo',29.9,39.9,8,'👹',340],
['Conta Flee Nível 100',C,'Especial','Lendário',89.9,119.9,3,'🔥',10],['Pacote de Gems 1000',C,'Verão','Comum',49.9,0,99,'💎',200],
['Trail Natalino',C,'Natal','Raro',12.9,0,40,'🎄',120],['Pacote Natal Premium',C,'Natal','Épico',59.9,79.9,10,'🎁',280],
['Emote Verão',C,'Verão','Comum',7.9,9.9,70,'🏖️',190],['Capuz de Páscoa',C,'Páscoa','Raro',11.9,0,25,'🥚',300],
['Serviço: Farm de Créditos',C,'Especial','Épico',34.9,0,15,'🛠️',230],['Serviço: Boost de Nível',C,'Especial','Comum',15.9,19.9,30,'⚙️',210],
['Martelo Dourado',C,'Especial','Lendário',27.9,34.9,9,'🏆',45],['Pet Bunny Fantasma',C,'Halloween','Raro',24.9,0,20,'👻',260],
['Pacote de Gems 5000',C,'Especial','Épico',39.9,49.9,5,'💠',140],['Coroa Bunny Exclusiva',C,'Especial','Exclusivo',99.9,149.9,2,'👑',335]]
export const products:Product[]=raw.map((r,i)=>({id:'p'+(i+1),name:r[0],description:`${r[0]} — item digital de ${r[1]}. Entrega rápida via atendimento Bunny. (Dados fictícios do protótipo.)`,category:r[1],event:r[2],rarity:r[3],price:r[4],oldPrice:r[5]||undefined,stock:r[6],image:img(r[7],r[8]),featured:i%3===0,createdAt:i}))

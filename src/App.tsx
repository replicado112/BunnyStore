import {Routes,Route,Navigate} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import {Login,Register,Recover} from './pages/Auth'
import Profile from './pages/Profile'
import {Orders,OrderDetails,Success} from './pages/Orders'
import Favorites from './pages/Favorites'
import Chat from './pages/Chat'
// Futuro: adicionar <Route path="/admin/*"> aqui (fora do escopo deste protótipo).
export default function App(){return(<Layout><Routes>
<Route path="/" element={<Home/>}/><Route path="/produtos" element={<Products/>}/><Route path="/produto/:id" element={<ProductDetails/>}/>
<Route path="/carrinho" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/>
<Route path="/login" element={<Login/>}/><Route path="/cadastro" element={<Register/>}/><Route path="/recuperar" element={<Recover/>}/>
<Route path="/perfil" element={<Profile/>}/><Route path="/pedidos" element={<Orders/>}/><Route path="/pedido/:id" element={<OrderDetails/>}/>
<Route path="/sucesso/:id" element={<Success/>}/><Route path="/favoritos" element={<Favorites/>}/><Route path="/chat" element={<Chat/>}/>
<Route path="*" element={<Navigate to="/"/>}/></Routes></Layout>)}

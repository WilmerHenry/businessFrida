import React, { useEffect, useState } from 'react'
import { categories, getCategory, getProduct, products } from './data/catalog'
import { WHATSAPP_NUMBER } from './data/store'
import { addItem, cleanItems, RESERVATION_KEY, whatsappUrl } from './lib/reservations'
import { Icon } from './ui'
import Home from './pages/Home'
import Category from './pages/Category'
import Product from './pages/Product'
import Reservations from './pages/Reservations'
import './store.css'

function readItems() {
  try { return cleanItems(JSON.parse(localStorage.getItem(RESERVATION_KEY)), products.map(p => p.id)) } catch { return [] }
}
export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  const [items, setItems] = useState(readItems)
  const [storageFailed, setStorageFailed] = useState(false)
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const segments = path.split('/').filter(Boolean)
  const category = getCategory(segments[0])
  const product = segments.length === 2 ? getProduct(segments[1]) : null
  const isProduct = product && category && product.category === category.slug
  const isCategory = category && segments.length === 1
  const isHome = path === '/'
  const isReservation = path === '/reservas'
  const title = isHome ? 'Tu estilo, tu esencia' : isReservation ? 'Mi reserva' : isProduct ? product.name : isCategory ? category.name : 'Página no encontrada'
  useEffect(() => {
    document.title = `${title} · Frida`
    document.querySelector('meta[name="description"]')?.setAttribute('content', isProduct ? product.description : isCategory ? category.description : 'Explora ropa, perfumes, maquillaje y ganoderma. Prepara tu selección y consulta tu reserva con Frida por WhatsApp.')
  }, [title])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1b201a' : '#626d52')
  }, [theme])
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('frida-theme', next) } catch {}
  }
  const saveItems = next => {
    setItems(next)
    try { localStorage.setItem(RESERVATION_KEY, JSON.stringify(next)); setStorageFailed(false) } catch { setStorageFailed(true) }
  }
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const contact = whatsappUrl(WHATSAPP_NUMBER, 'Hola, Frida. Quisiera información sobre sus productos y cómo reservar.')
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="announcement">Tu estilo, tu belleza, tu bienestar <span>✧</span> Reservas por WhatsApp</div>
    <header className="header shell store-header"><a className="brand" href="/" aria-label="Frida, inicio">frida<span>ESTILO & BIENESTAR</span></a><nav aria-label="Navegación principal"><a href="/" aria-current={isHome ? 'page' : undefined}>Inicio</a>{categories.map(c => <a key={c.slug} href={`/${c.slug}`} aria-current={category?.slug === c.slug ? 'page' : undefined}>{c.name}</a>)}</nav><div className="header-actions"><button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Tema oscuro" aria-pressed={theme === 'dark'} title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}><Icon name={theme === 'dark' ? 'sun' : 'moon'}/></button><a href="/reservas" className="reservation-nav" aria-label={`Mi reserva, ${count} unidades`} aria-current={isReservation ? 'page' : undefined}><Icon name="bag"/><span className="reservation-nav-label">Mi reserva</span><b>{count}</b></a></div></header>
    <main id="contenido">{isHome ? <Home/> : isReservation ? <Reservations items={items} onUpdate={(index, changes) => saveItems(items.map((item, i) => i === index ? {...item, ...changes} : item))} onRemove={index => saveItems(items.filter((_, i) => i !== index))} storageFailed={storageFailed}/> : isProduct ? <Product product={product} onAdd={item => saveItems(addItem(items, item))}/> : isCategory ? <Category category={category}/> : <section className="shell empty not-found"><span className="eyebrow">404 / UN CAMINO POR DESCUBRIR</span><h1>Esta página no existe.</h1><p>Vuelve al inicio para encontrar tu colección.</p><a className="button primary" href="/">Volver al inicio <Icon/></a></section>}</main>
    <footer className="store-footer"><div className="shell footer-grid"><div><a className="brand" href="/">frida<span>ESTILO & BIENESTAR</span></a><p>Un espacio para descubrir<br/>lo que se siente muy tú.</p></div><div><h3>Explora</h3>{categories.map(c => <a key={c.slug} href={`/${c.slug}`}>{c.name}</a>)}</div><div><h3>Tu selección</h3><a href="/reservas">Mi reserva</a><p>Los precios y la disponibilidad<br/>se confirman en la conversación.</p></div><div><h3>Conversemos</h3>{contact && <a className="footer-whatsapp" href={contact} target="_blank" rel="noreferrer"><Icon name="chat"/> +51 970 170 212 ↗</a>}<p>Consulta productos y coordina<br/>tu reserva por WhatsApp.</p></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Frida · Estilo & Bienestar</span><span>Fotografías ilustrativas · Catálogo en preparación</span></div></footer>
  </>
}

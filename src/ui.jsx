import React from 'react'
import { getCategory, productPath } from './data/catalog'

export function Icon({ name = 'arrow', ...props }) {
  const paths = {
    arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
    bag: <><path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    leaf: <><path d="M20 3C8 2 3 7 5 14s14 6 15-11Z"/><path d="M3 21 15 9"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    chat: <><path d="M21 11.5a8.5 8.5 0 0 1-12.8 7.3L3 21l1.8-5.3A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 9c1 4 3 5 6 6l2-2-3-1-1 1-2-2 1-1-1-3-2 2Z"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>,
    moon: <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/>,
  }
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
}
export function Breadcrumbs({ category, product, current }) {
  return <nav className="breadcrumbs" aria-label="Ruta de navegación"><a href="/">Inicio</a><span>/</span>{category && <><a href={`/${category.slug}`} aria-current={!product ? 'page' : undefined}>{category.name}</a>{product && <span>/</span>}</>}{(product || current) && <span aria-current="page">{product?.name || current}</span>}</nav>
}
export function ProductVisual({ product, eager = false }) {
  return product.image ? <img src={product.image} alt={`Fotografía ilustrativa de ${getCategory(product.category).name.toLowerCase()}; no representa un modelo confirmado`} loading={eager ? 'eager' : 'lazy'}/> : <div className={`dxn-art dxn-${product.type === 'Cacao' ? 'cocoa' : 'coffee'}`}><span className="dxn-brand">DXN <i>SELECCIÓN</i></span><Icon name="leaf" width="60" height="60"/><span className="dxn-mark">{product.mark}</span><strong>{product.name}</strong><small>Referencia de catálogo · Imagen de producto pendiente</small></div>
}
export function ProductCard({ product }) {
  return <article className="catalog-card"><a className="card-photo" href={productPath(product)} tabIndex={-1} aria-hidden="true"><ProductVisual product={product}/><span className="card-tag">{product.reference ? 'Explorar opciones' : 'Línea DXN'}</span></a><div className="card-description"><span className="eyebrow">{product.type}</span><h3><a href={productPath(product)}>{product.name}</a></h3><p>{product.reference ? 'Modelos y disponibilidad por consultar' : 'Presentación y disponibilidad por confirmar'}</p><div className="card-action"><span>Precio por consultar</span><a href={productPath(product)} aria-label={`Ver ${product.name}`}>Ver detalles <Icon/></a></div></div></article>
}
export function Quantity({ value, onChange, label = 'Cantidad' }) {
  return <div className="quantity"><button type="button" disabled={value <= 1} onClick={() => onChange(value - 1)} aria-label={`Disminuir ${label.toLowerCase()}`}>−</button><output aria-label={label} aria-live="polite">{value}</output><button type="button" disabled={value >= 99} onClick={() => onChange(value + 1)} aria-label={`Aumentar ${label.toLowerCase()}`}>+</button></div>
}

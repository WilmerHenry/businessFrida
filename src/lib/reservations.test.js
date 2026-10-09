import test from 'node:test'
import assert from 'node:assert/strict'
import { addItem, cleanItems, reservationMessage, whatsappUrl } from './reservations.js'

test('restores only valid reservation lines', () => {
  const rows = [{id:'coffee',quantity:2,preference:'Caja'}, {id:'unknown',quantity:1,preference:''}, {id:'coffee',quantity:-1,preference:''}, {id:'coffee',quantity:100,preference:''}, null]
  assert.deepEqual(cleanItems(rows, ['coffee']), [rows[0]])
  assert.deepEqual(cleanItems({}, ['coffee']), [])
})
test('combines identical preferences and preserves different variants', () => {
  const first = [{id:'shirt',quantity:2,preference:'M'}]
  assert.deepEqual(addItem(first, {id:'shirt',quantity:3,preference:'M'}), [{id:'shirt',quantity:5,preference:'M'}])
  assert.equal(addItem(first, {id:'shirt',quantity:1,preference:'L'}).length, 2)
  assert.equal(first[0].quantity, 2)
  assert.equal(addItem(first, {id:'shirt',quantity:99,preference:'M'})[0].quantity, 99)
})
test('builds a WhatsApp message with quantities and correctly encoded preferences', () => {
  const message = reservationMessage([{id:'coffee',quantity:2,preference:'Caja & regalo 🎁'}], [{id:'coffee',name:'Café 3 en 1'}], {name:'Ana',delivery:'Por coordinar',note:'Consultar envío'})
  const link = new URL(whatsappUrl('+51 970 170 212', message))
  assert.equal(link.hostname, 'wa.me')
  assert.equal(link.pathname, '/51970170212')
  assert.equal(link.searchParams.get('text'), message)
  assert.match(message, /2 unidad/)
  assert.match(message, /Nombre: Ana/)
  assert.match(message, /pendiente de confirmación/)
  assert.equal(whatsappUrl('123',message), null)
})

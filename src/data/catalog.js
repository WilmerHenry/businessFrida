const image = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
export const categories = [
  { slug: 'ropa', name: 'Ropa', eyebrow: 'EL ARTE DE VESTIR A TU MANERA', title: 'Tu estilo no necesita permiso.', description: 'Explora prendas para los planes de siempre y los momentos especiales. Cuéntanos tu talla y el estilo que buscas.', image: image('photo-1483985988355-763728e1935b'), note: 'Prendas que hablan de ti', types: ['Vestidos', 'Blusas', 'Conjuntos'], guide: ['Elige el tipo de prenda que te gusta.', 'Indica tu talla y color preferidos en la ficha.', 'Consulta los modelos disponibles por WhatsApp.'], preference: 'Talla y color preferidos', placeholder: 'Ej.: talla M, color beige' },
  { slug: 'perfumes', name: 'Perfumes', eyebrow: 'UNA HUELLA INVISIBLE, MUY TUYA', title: 'Hay aromas que dicen todo.', description: 'Frescos, florales o intensos. Encuentra la familia de aromas que va contigo y consulta las fragancias disponibles.', image: image('photo-1541643600914-78b084683601'), note: 'El recuerdo de una esencia', types: ['Florales', 'Frescos', 'Intensos'], guide: ['Explora la familia de aromas que prefieres.', 'Cuéntanos la marca o presentación que buscas.', 'Confirma la fragancia y el precio por WhatsApp.'], preference: 'Marca o presentación que buscas', placeholder: 'Ej.: aroma floral, presentación de 100 ml' },
  { slug: 'maquillaje', name: 'Maquillaje', eyebrow: 'BELLEZA QUE SE EXPRESA A TU MANERA', title: 'Tu lienzo. Tus reglas.', description: 'Descubre opciones para labios, rostro y ojos. Desde un toque natural hasta el look que acompaña una ocasión especial.', image: image('photo-1596462502278-27bfdc403348'), note: 'Pequeños detalles, mucha expresión', types: ['Labios', 'Rostro', 'Ojos'], guide: ['Elige qué parte de tu rutina quieres renovar.', 'Indica el tono, acabado o marca que buscas.', 'Consulta las opciones disponibles antes de reservar.'], preference: 'Tono, acabado o marca preferidos', placeholder: 'Ej.: tono nude, acabado mate' },
  { slug: 'ganoderma', name: 'Ganoderma', eyebrow: 'DESCUBRE NUESTRA SELECCIÓN DXN', title: 'Un momento para disfrutar.', description: 'Explora referencias de café, cacao y otras bebidas DXN. Elige tu presentación y consulta el catálogo disponible.', image: image('photo-1442512595331-e89e73853f31'), note: 'Una pausa que sabe bien', types: ['Café', 'Cacao', 'Otras bebidas'], guide: ['Revisa las referencias de la lista DXN.', 'Indica cuántas unidades quieres consultar.', 'Confirma presentación, precio y disponibilidad.'], preference: 'Presentación o preferencia', placeholder: 'Ej.: una caja, confirmar contenido' },
]
const reference = (id, name, category, type, description) => ({ id, name, category, type, description, reference: true, image: categories.find(c => c.slug === category).image })
export const products = [
  reference('vestidos', 'Vestidos para tus planes', 'ropa', 'Vestidos', 'Consulta vestidos según la ocasión y el estilo que buscas. La fotografía ilustra la categoría; los modelos se confirman por WhatsApp.'),
  reference('blusas', 'Blusas y tops', 'ropa', 'Blusas', 'Una opción para combinar con tu estilo de cada día. Indica talla, color y preferencias para conocer los modelos disponibles.'),
  reference('conjuntos', 'Conjuntos a tu manera', 'ropa', 'Conjuntos', 'Consulta opciones de conjuntos y combinaciones. Elige tus preferencias y confirma prendas y tallas antes de reservar.'),
  reference('florales', 'Fragancias florales', 'perfumes', 'Florales', 'Explora opciones de la familia floral. Consulta marcas, notas y presentaciones disponibles; la foto es ilustrativa.'),
  reference('frescos', 'Fragancias frescas', 'perfumes', 'Frescos', 'Consulta aromas frescos para acompañar tu día. Comparte la marca o presentación que buscas.'),
  reference('intensos', 'Fragancias intensas', 'perfumes', 'Intensos', 'Consulta fragancias de carácter intenso. Las marcas, concentraciones y precios se confirman por WhatsApp.'),
  reference('labios', 'Color para tus labios', 'maquillaje', 'Labios', 'Consulta labiales y productos para labios. Indica tu tono y acabado preferidos para conocer las opciones disponibles.'),
  reference('rostro', 'Esenciales para el rostro', 'maquillaje', 'Rostro', 'Consulta productos para tu rutina de maquillaje. Cuéntanos qué tono, marca o acabado necesitas.'),
  reference('ojos', 'Una mirada con estilo', 'maquillaje', 'Ojos', 'Consulta opciones de maquillaje para ojos. Confirma tonos, marcas y presentaciones antes de reservar.'),
  ...[
    ['lingzhi-3-en-1', 'Lingzhi Coffee 3 en 1', 'Café', '03 / 01'],
    ['lingzhi-2-en-1', 'Lingzhi Coffee 2 en 1', 'Café', '02 / 01'],
    ['cocozhi', 'Cocozhi', 'Cacao', 'COCOA'],
    ['zhi-mocha', 'Zhi Mocha', 'Café', 'MOCHA'],
    ['white-coffee', 'White Coffee', 'Café', 'WHITE'],
    ['vitacafe', 'Vita Café', 'Otras bebidas', 'VITA'],
  ].map(([id, name, type, mark]) => ({ id, name, category: 'ganoderma', type, mark, description: `${name} figura en la lista DXN proporcionada. Consulta contenido, presentación, precio vigente y disponibilidad antes de confirmar tu reserva.` })),
]
export const getCategory = slug => categories.find(category => category.slug === slug)
export const getProduct = id => products.find(product => product.id === id)
export const productPath = product => `/${product.category}/${product.id}`

import { Router } from 'express';
const router = Router();

// Array simulado de productos
const products = [
    { id: 1, title: 'Bebidas', description: '', code: '', price: 100, status: true, stock: 1, category: '', thumbnails: []},
    { id: 2, title: 'Sandwichs', description: '', code: '', price: 200, status: true, stock: 1, category: '', thumbnails: []}
];

// Array simulado de carritos
const carts = [];

// Middleware de autenticación simulado
const auth = (req, res, next) => {
    console.log('Autenticación...');
    next(); // Simulación de autenticación exitosa
};

// Crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = {
        id: carts.length ? Math.max(...carts.map(cart => cart.id)) + 1 : 1, // Generar un ID único
        products: [] // Inicialmente vacío
    };
    carts.push(newCart);
    res.status(201).send({ error: null, data: newCart });
});

// Obtener productos del carrito por ID (cid)
router.get('/:cid', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    if (cart) {
        res.status(200).send({ error: null, data: cart.products });
    } else {
        res.status(404).send({ error: 'Carrito no encontrado' });
    }
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.cid));
    const product = products.find(p => p.id === parseInt(req.params.pid));

    if (!cart) {
        return res.status(404).send({ error: 'Carrito no encontrado' });
    }
    if (!product) {
        return res.status(404).send({ error: 'Producto no encontrado' });
    }

    // Verificar si el producto ya existe en el carrito
    const existingProduct = cart.products.find(p => p.product === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1; // Incrementar cantidad
    } else {
        cart.products.push({ product: product.id, quantity: 1 }); // Agregar nuevo producto
    }

    res.status(200).send({ error: null, data: cart.products });
});

export default router;
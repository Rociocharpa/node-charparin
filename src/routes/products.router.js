import { Router } from 'express';
const router = Router();

// Array simulado de productos
const products = [
    { id: 1, title: 'Bebidas', description : '', code : '', price: 100, status : true, stock : 1, category : '', thumbnails : []},
    { id: 2, title: 'Sandwichs', description : '', code : '', price: 200, status : true, stock : 1, category : '', thumbnails : []}
];

// Middleware de autenticación simulado
const auth = (req, res, next) => {
    console.log('Autenticación...');
    next(); // Simulación de autenticación exitosa
};

// Obtener todos los productos
router.get('/', (req, res) => {
    res.status(200).send({ error: null, data: products });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    product ? res.status(200).send({ error: null, data: product }) : res.status(404).send({ error: 'Producto no encontrado' });
});

// Agregar un nuevo producto
router.post('/', auth, (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body; 

    if (title && price !== undefined && status !== undefined && stock !== undefined) {
        const maxId = Math.max(...products.map(element => +element.id)); // Obtener el último id
        const newProduct = { 
            id: maxId + 1, // Asignar nuevo id
            title,
            description: description || '', // Asignar descripción, puede estar vacía
            code: code || '', // Asignar código, puede estar vacío
            price,
            status,
            stock,
            category: category || '', // Asignar categoría, puede estar vacía
            thumbnails: thumbnails || [] // Asignar thumbnails, puede estar vacío
        };

        products.push(newProduct); // Agregar el nuevo producto al array
        res.status(200).send({ error: null, data: newProduct });
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

// Actualizar un producto por ID
router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    // Verificar si todos los campos obligatorios están presentes
    if (title && price && status && stock) {
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex > -1) {
            const updatedProduct = {
                id: productId,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            };
            products[productIndex] = updatedProduct;
            res.status(200).send({ error: null, data: updatedProduct });
        } else {
            res.status(404).send({ error: 'Producto no encontrado' });
        }
    } else {
        res.status(400).send({ error: 'Faltan campos obligatorios', data: [] });
    }
});

// Eliminar un producto por ID
router.delete('/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index > -1) {
        products.splice(index, 1);
        res.status(200).send({ error: null, data: 'Producto eliminado' });
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

export default router;
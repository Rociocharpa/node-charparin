import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Activamos las rutas de productos bajo el prefijo /api/products
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
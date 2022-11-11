import express from 'express';
import productRoutes from './routes/products';

const app = express();
const PORT = 8000;

app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});

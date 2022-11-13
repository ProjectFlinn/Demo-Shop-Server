import express, { json } from 'express';
import cors from 'cors';
import productRoutes from './routes/products';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`);
});

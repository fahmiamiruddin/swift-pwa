import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getAllProducts = () => useQuery(Schema.getAllProduct);

export default { getAllProducts };

import knex from 'knex';
import confKnex from '../../knexfile';

const connection = knex(confKnex.development);

export default connection;
import connection from '../../database/connection';

class IncidentController {


  async index(request, response) {

    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',  
        'ongs.whatsapp',  
        'ongs.city',  
        'ongs.uf',  
      ]);

    response.header('X-Total-Count', count['count(*)']); 

    return response.json(incidents);  
  }

  async store(request, response) {
    const { title, description, value } = await request.body; 
    const ong_id = request.headers.authorization;

    console.log(ong_id);

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });

    return response.json({ id });
  }

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident =await connection('incidents')
      .select('ong_id')
      .where('id', id)
      .first();
      
    if (incident.ong_id !== ong_id) 
      return response.status(401).json({ Erro: 'Operação não permitida' });

    await connection('incidents').delete().where('id', id);


    return response.status(204).send();
  }
}

export default new IncidentController();
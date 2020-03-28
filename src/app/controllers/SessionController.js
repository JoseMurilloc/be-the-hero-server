import connection from '../../database/connection';

class SessionController {
  async store(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .select('name')
      .where('id', id)
      .first();

    if (!ong)
      return response.status(400).json({ error: 'Não encontrou uma ONG com esse ID' });

    return response.json(ong);
  }

  async delete(request, response) {
    return response.send();
  }
}

export default new SessionController();

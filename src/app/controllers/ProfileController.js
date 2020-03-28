import connection from '../../database/connection';

class ProfileController {
  async index(request, response) {

    const ong_id = request.headers.authorization;

    const incidents = await connection('incidents')
      .select('*')
      .where('ong_id', ong_id);


    return response.json(incidents);
  }
}

export default new ProfileController();
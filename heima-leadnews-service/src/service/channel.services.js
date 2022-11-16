const connection = require('../app/database')

class ChannelService {
  async getChannel() {
    const statement = `SELECT * FROM channel`;
    const result = await connection.execute(statement);

    return result[0];
  }
}

module.exports = new ChannelService();
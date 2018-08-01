const Service = require('egg').Service;
class EmotionService extends Service {
  async emotionlist(page = 1) {
    const emotionData = await this.app.mysql.get('emotion');
    return emotionData;
  }
}
module.exports = EmotionService;
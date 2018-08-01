const Service = require('egg').Service;
class NewsService extends Service {
  async list(page = 1) {
    // read config
    // const { serverUrl, pageSize } = this.config.news;
    // console.log()

    // use build-in http client to GET hacker-news api
    // const { data: idList } = await this.ctx.curl('${serverUrl}/topstories.json', {
    //   data: {
    //     orderBy: '"$key"',
    //     startAt: '"${pageSize * (page - 1)}"',
    //     endAt: '"${pageSize * page - 1}"',
    //   },
    //   dataType: 'json',
    // });

	
    // parallel GET detail
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' ,time: new Date().getTime()},
        { id: 2, title: 'this is news 2', url: '/news/2' ,time: new Date().getTime()}
      ]
    }
    return dataList;
  }
}

module.exports = NewsService;
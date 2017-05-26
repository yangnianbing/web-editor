**基于Vue实现的[git trending](https://github.com/trending),根据语言以及时间查看github上面当前时间段内最受关注的项目。**

**因为github的api并没有提供这一部分的api，所以实现方式是通过获取网页，在服务端解析来得到json数据，然后给vue去展示。**

**如何运行**
1. git clone https://git.coding.net/yangnb/vue-git.git获取源代码
2. `cd vue-git && npm install` 安装依赖
3. 执行`npm run dev`和`cd  src/git-api && node server.js`，其中git-api是用express实现的一个简单的服务用来抓取[https://github.com/trending](https://github.com/trending)的数据并解析成json数据返回

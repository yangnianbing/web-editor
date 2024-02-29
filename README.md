![](http://ww1.sinaimg.cn/large/006rHsX4ly1fx1za18v3uj31hc0t3di7.jpg)
浏览器里面的vscode,有木有很高仿
![](http://ww1.sinaimg.cn/large/006rHsX4ly1fx1yydgzybj31hc0swwfl.jpg)
最大化，看起来是不是和vscode很像

1. 运行服务端 
```shell
node ./server/index.js
```
服务端通过graphql提供文件列表，文件编辑等功能。

2. 运行客户端
```shell
npm start
```
create-react-app生成的架子。
文本编辑器用的是monaco，这本来也是vscode使用的文本编辑器。
terminal使用的是xterm，一个全功能的web terminal，通过websocket和服务端通信，貌似graphql有subscription，后面尝试换？
整体ui是使用react实现，从vscode里面爬过来的样式。


东拼西凑的一个东西，只是为了能跑起来，我也不知道有啥用🚀

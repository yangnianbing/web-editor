问题记录：

```html
<Tabs v-model="currentShowFile.path" type="card"  addable @tab-click="handleTabClick"  @edit="handleTabsEdit">
    <TabPane v-model="openFiles[index]" v-for="(file,index) in openFiles" :key="file.path" closable  :label="file.name" :name="file.path">
            <MonacoEditor
                height="100%"
                language="typescript"
                srcPath="/public/monaco-editor/dev"
                :changeThrottle="1000"
                theme="vs-light"
                @mounted="onMounted"
                @codeChange="onCodeChange"
            ></MonacoEditor>
    </TabPane>
    <TabPane name="add" :disabled="false" :closable="false">
            <span slot="label"><i class="icon-add iconfont"></i> </span>
    </TabPane>
</Tabs>
```
最后一个TabPanel不是通过v-for渲染出来的，点击最后一个panel的时候会推一个对象到openFiles中，最后得到的结果openFiles中的倒数第二个元素的name属性会被置为add。
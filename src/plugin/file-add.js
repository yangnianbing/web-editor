export default fileOpen

import { MessageBox } from 'element-ui'
function fileOpen () {

}

fileOpen.prototype.apply = function ($eventBus) {
  console.log('fileOpen.apply')
  $eventBus.$on('created_menu', (callback, params) => {
    var menus = params.menus;
    menus.forEach(menu => {
      if (menu.act === 'file') {
        !menu.children && (menu.children = []);
        menu.children.push({title: '打开新项目', act: 'file-add'});
      }
    })
    callback && callback(menus);
  });

  $eventBus.$on('file-add', (callback, params) => {
    MessageBox.prompt('请输入路径', '打开', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputValue: '',
      beforeClose (action, instance, done) {
        if (action === 'cancel') {
          done()
          return
        }
        var inputValue = instance.inputValue;
        $eventBus.$emit('open-url', function () { }, {url: inputValue})
        done();
      }
    }).catch(e => {
      console.log('cancel! do nothing');
    })
  })
}

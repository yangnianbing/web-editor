export default fileOpen

function fileOpen () {

}

fileOpen.prototype.apply = function ($eventBus) {
  console.log('fileOpen.apply')
  $eventBus.$on('beforeCreate_menu', function (callback) {
    console.log(callback);
    callback();
  });
}

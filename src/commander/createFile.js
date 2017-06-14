

function createFile(){
    var $store = this.$store;
    var max = '';
    var allUntitled = $store.state.openFiles.map(function(openFile){
        if(openFile.name.startsWith('Untitled')){
            return openFile.name.split('-')[1];
        }
    });
    allUntitled.sort().every((item, index) => {
        if(item != index + 1){
            max = index+1;
            return false;
        }else{
            return true;
        }
    })
    if(!max){
        max = allUntitled.length +1;
    }
    $store.commit('setCurrentShowFile', {currentShowFile : {name:'Untitled-' + max, path : 'Untitled-' + max, folder : false, content:'', type:'tmp'}});
}

export {createFile}
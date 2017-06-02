export default{
    js : 'javascript',
    get (path){
        if(this[path]){
            return this[path];
        }else{
        
            var index = path.lastIndexOf('.');
            var suffix = path.substring(index + 1);
            return this[suffix] || suffix;
        }
    }
}
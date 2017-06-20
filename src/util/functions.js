import Constants from './Constants'

export default {
    //  a/b/c/d => {a:{b:{c:{d:obj}}}};
    stringToObj(str, obj){
        var bread = str.split(Constants.fileSeperate);
        function recurse(breads, content){
            var tmp = {};
            if(breads.length == 1){
                tmp[breads[0]] = content;
                return tmp;
            }else{
                var key = breads.pop();
                tmp[key] = content;
                return recurse(breads, tmp);
            }
        }
        return recurse(bread, obj);
    }
}
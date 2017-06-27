import Constants from './Constants'

export default {
    //  a/b/c/d => {a:{b:{c:{d:obj}}}};
    stringToTreeNode(str, file){
        // var breads = str.split(Constants.fileSeperate);
        // var key = breads.pop();
 
        // function recurse(breads, content){
        //     var tmp = {};
        //     if(breads.length <= 0){
        //         return content;
        //     }
        //     var key = breads.pop();

        //     tmp.name = key;
        //     tmp.isFolder = true;
        //     tmp.children = [];
        //     tmp.children.push(content)

        //     return recurse(breads, tmp);
        // }
        // return recurse(breads, file)
    },

    mergeTreeNode(target, file){
        var breads = file.path.split(Constants.fileSeperate);
        breads.pop();
        breads.shift();

        function recurse(tree, breads, file){
            if(breads.length == 0){
                tree.children.push(file);
                return;
            }
            var path = breads.shift()
            var subTree;
            tree.children.every(function(item){
                if(item.name == path){
                    subTree = item;
                    return false;
                }
                return true;
            })
            if(!subTree){
                subTree = {
                    name : path,
                    isFolder : true,
                    children : []
                }
                tree.children.push(subTree);
            }
            recurse(subTree, breads, file);
        }
        recurse(target, breads, file);
        return target;
    }
}

<script>
    import {mapState} from 'vuex'
    import {Menu, Submenu, MenuItem} from 'element-ui'

    export default{
        data(){
            return {
                
            }
        },
        computed : mapState({
            menuItems : state => state.menuItems
        }),

        components : {
            ElMenu : Menu,
            ElSubmenu:Submenu,
            ElMenuItem:MenuItem
        },

        render(createElement){
            var $vue = this;
            return createElement('div', {
                class : 'topBar'
            }, [createElement('ElMenu', $vue.menuItems.map((menuItem, index) => {
                if(!menuItem.items){
                    return createElement('ElMenuItem', {
                        props : {
                            index : index+''
                        }
                    }, menuItem.name)
                }else{
                    return createElement('ElSubmenu', {
                        props : {
                            index : index+''
                        }
                    }, test(createElement, menuItem, index))
                }
            }))])
        }
    }

    function test(createElement, menuItem, index){
        debugger;
        var a= [createElement('template', {
                    attrs: {
                        slot : "title"
                    }
                }, menuItem.name), ... menuItem.items.map((subItem, subIndex) => {
                    return createElement('ElMenuItem', {
                            props : {
                                index : index + '-' + subIndex
                            }
                    }, subItem.name)
                })]
                console.log(a);
                return a;
    }

</script>

<style lang="css">
    .theme-dark .menu{
        background: #e5e5e5;
    }
    .topBar ul.menu{
        height : 25px;
        margin:0px;
        line-height:25px;
    }
</style>
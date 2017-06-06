<template>
    <section v-show="isActive"
             :aria-hidden="! isActive"
             class="tabs-component-panel"
             :id="hash"
             role="tabpanel"
    >
        <slot />
    </section>
</template>

<script>
    export default {
        name : 'Tab',
        props: {
            id: { default: null },
            name: { required: true },
            prefix: { default: '' },
            suffix: { default: '' },
        },

        data(){
            return {
                isActive: false
            }
        },
        mounted (){

        },
        computed: {
            header() {
                return this.prefix + this.name + this.suffix;
            },

            hash() {
                return this.id ?
                    '#' + this.id :
                    '#' + this.name.toLowerCase().replace(/ /g, '-');
            },
        },
    };
</script>
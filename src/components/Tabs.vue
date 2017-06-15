<template>
    <div class="tabs-component">
        <ul role="tablist" class="tabs-component-tabs">
            <li v-for="tab in tabs"
                :class="{ 'is-active': tab.isActive }"
                class="tabs-component-tab"
                role="presentation"
            >

                <a v-html="tab.header"
                   :aria-controls="tab.hash"
                   :aria-selected="tab.isActive"
                   @click="selectTab(tab.hash)"
                   :href="tab.hash"
                   class="tabs-component-tab-a"
                   role="tab"
                ></a>

            </li>
        </ul>
        <div class="tabs-component-panels">
            <slot/>
        </div>
    </div>
</template>

<script>

    export default {
        name : 'Tabs',

        data: () => ({
            tabs: [],
            activeTabHash: '',
        }),

        created() {
            this.tabs = this.$children;
            this.$on('selectTab', function(id){
                this.selectTab('#'+id);
            })
        },

        mounted() {
            if (this.tabs.length) {
                this.selectTab(this.tabs[0].hash);
            }
        },

        methods: {
            findTab(hash) {
                return this.tabs.find(tab => tab.hash === hash);
            },

            selectTab(selectedTabHash) {
                debugger;
                const selectedTab = this.findTab(selectedTabHash);

                if (! selectedTab) {
                    return;
                }
                this.tabs.forEach(tab => { 
                    tab.isActive = (tab.hash === selectedTab.hash);
                });
                this.activeTabHash = selectedTab.hash;
            },
        },
    };
</script>

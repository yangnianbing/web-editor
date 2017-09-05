<template>
  <div class="vue-jquery-layout" style="zoom: 1; overflow: hidden; width: auto; height: auto; margin: 0px; position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;">
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable */
import loader from './LayoutLoader'

export default {
  props: {
    srcPath: String,
    resizable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    },
    slidable: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.fetchJqueryLayout()
  },
  methods: {
    initLayout () {
      
      window.$(this.$el).layout({
            //	reference only - these options are NOT required because 'true' is the default
          closable:					true	// pane can open & close
        ,	resizable:					true	// when open, pane can be resized 
        ,	slidable:					true	// when closed, pane can 'slide' open over other panes - closes on mouse-out
        ,	livePaneResizing:			true

        //	some resizing/toggling settings
        ,	north__slidable:			false	// OVERRIDE the pane-default of 'slidable=true'
        ,	north__togglerLength_closed: '100%'	// toggle-button is full-width of resizer-bar
        ,	north__spacing_closed:		20		// big resizer-bar when open (zero height)
        ,	south__resizable:			true	// OVERRIDE the pane-default of 'resizable=true'
        ,	south__spacing_open:		0		// no resizer-bar when open (zero height)
        ,	south__spacing_closed:		20		// big resizer-bar when open (zero height)

        //	some pane-size settings
        ,	west__minSize:				100
        ,	east__size:					300
        ,	east__minSize:				200
        ,	east__maxSize:				.5 // 50% of layout width
        ,	center__minWidth:			100

        //	some pane animation settings
        ,	west__animatePaneSizing:	false
        ,	west__fxSpeed_size:			"fast"	// 'fast' animation when resizing west-pane
        ,	west__fxSpeed_open:			1000	// 1-second animation when opening west-pane
        ,	west__fxSettings_open:		{ easing: "easeOutBounce" } // 'bounce' effect when opening
        ,	west__fxName_close:			"none"	// NO animation when closing west-pane

        //	enable showOverflow on west-pane so CSS popups will overlap north pane
        ,	west__showOverflowOnHover:	true

        //	enable state management
        ,	stateManagement__enabled:	true // automatic cookie load & save enabled by default

        ,	showDebugMessages:			true // log and/or display messages from debugging & testing code
      })
    },
    fetchJqueryLayout () {
      loader.load(this.srcPath, this.initLayout)
    }
  }
}
</script>

<style>

</style>

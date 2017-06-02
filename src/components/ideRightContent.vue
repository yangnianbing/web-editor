<template>
        <div class="ide-right-content ide-section">
                    <FileTable></FileTable>
                   <MonacoEditor
                    height="100%"
                    language="typescript"
                    srcPath="/public/monaco-editor/min"
                    :code="code"
                    :options="options"
                    :highlighted="highlightLines"
                    :changeThrottle="500"
                    theme="vs-light"
                    @mounted="onMounted"
                    @codeChange="onCodeChange"
                    >
        </div>
</template>
<script>
    import MonacoEditor from 'vue-monaco-editor'
    
    import LanguageUtil from '../util/suffixMapLanguage'

module.exports = {
  components: {
    MonacoEditor
  },
    data() {
    return {
        code: '// type your code \n',
        highlightLines: [
        {
            number: 0,
            class: 'primary-highlighted-line'
        },
        {
            number: 0,
            class: 'secondary-highlighted-line'
        }
        ]
    };
    },
    methods: {
    onMounted(editor) {
        console.log('after mount!', editor, editor.getValue(), editor.getModel());
        this.editor = editor;
    },
    onMounted2(editor) {
        console.log('after mount!', editor, editor.getValue(), editor.getModel());
        this.editor2 = editor;
    },
    onCodeChange(editor) {
        console.log('code changed!', 'code:' + this.editor.getValue());
    },
    onCodeChange2(editor) {
        console.log('code changed!', 'code:' + this.editor2.getValue());
    },
    clickHandler() {
        console.log('here is the code:', this.editor.getValue());
    }
    },
    created() {
    this.options = {
        selectOnLineNumbers: false
    };
    }
    };
</script>

<style lang="css">
    .ide-right-content{
        width:80%;
        height:100%;
        right:0px;
    }
</style>
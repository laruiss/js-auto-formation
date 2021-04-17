<template>
  <div
    ref="homeEl"
    class="home"
  >
    <h1>JavaScript</h1>

    <h2>Partie 1 : Les fonctions</h2>

    <div v-html="statement" />

    <app-exercise
      :initial-code="initialCode"
      :test-code="testCode"
      title="Les fonctions"
    />
  </div>
</template>

<script>
import { Remarkable } from 'remarkable'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github.css'

import AppExercise from '@/components/AppExercise.vue'
import { onMounted, ref } from '@vue/runtime-core'
import testCodeRaw from '@/assets/exercises/fn-one-test.js?raw'
import initialCodeRaw from '@/assets/exercises/fn-one-init.js?raw'
import statementRaw from '@/assets/exercises/fn-one-statement.md?raw'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)
const md = new Remarkable()
const statement = md.render(statementRaw)

// const getRawCode = url => fetch('/assets' + url).then(res => res.text())

export default {
  name: 'ExercisePage',

  components: {
    AppExercise,
  },

  props: {
    exercise: {
      type: String,
      default: '',
    },
  },

  setup (props, ctx) {
    const homeEl = ref(null)
    const testCode = ref(testCodeRaw)
    const initialCode = ref(initialCodeRaw)

    onMounted(() => {
      [...homeEl.value.querySelectorAll('code.language-javascript')]
        .forEach(block => hljs.highlightBlock(block))
    })

    return ({
      testCode,
      initialCode,
      statement,
      homeEl,
    })
  },
}

</script>

<style scoped>
.flex-w-1\/2 {
  flex-basis: 34%;
  flex-grow: 1;
}

.editor {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
}

.text-red {
  font-weight: bold;
  color: #fa5555;
}

.text-orange {
  color: #fa9933;
}

.text-green {
  font-weight: bold;
  color: #55ee55;
}

.text-center {
  text-align: center;
}
</style>

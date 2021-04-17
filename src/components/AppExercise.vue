<template>
  <div class="exercize">
    <h3>{{ title }}</h3>

    <h4>
      <slot name="goal" />
    </h4>

    <p>
      <slot name="details" />
    </p>
    <div class="flex">
      <div class="u-flex-w-1/2  mx-1">
        <p>
          Votre code :
        </p>
        <MonacoEditor
          v-model="code"
          class="editor"
          language="javascript"
          theme="vs"
        />
      </div>
      <div class="u-flex-w-1/2  mx-1">
        <p>Doit passer ce test :</p>
        <MonacoEditor
          :model-value="testCode"
          class="editor"
          language="javascript"
          theme="vs-dark"
          :read-only="true"
        />
      </div>
    </div>
    <div class="text-center  my-2">
      <basic-button
        class="btn"
        text="Passer le test"
        @click.prevent="evaluate"
      />
      <div class="result">
        <p>
          {{ intro }}
        </p>
        <p>
          <b :class="resultClass">
            {{ result }}
          </b>
          <em class="text-red">
            {{ error }}
          </em>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BasicButton from './BasicButton.vue'
import { ref } from '@vue/runtime-core'
import MonacoEditor from '@/components/MonacoEditor'

import {
  getRightFeedback,
  getWrongFeedback,
  getErrorFeedback,
} from '../utils/index.js'

export default {
  name: 'AppExercize',

  components: {
    BasicButton,
    MonacoEditor,
  },

  props: {
    initialCode: {
      type: String,
      default: '',
    },
    testCode: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Titre',
    },
  },

  setup (props) {
    console.log('Initial code:', props.initialCode)
    const code = ref(props.initialCode)
    const testCode = ref(props.testCode)
    const intro = ref('')
    const result = ref('')
    const resultClass = ref('')
    const error = ref('')

    const resetResultData = () => {
      intro.value = ''
      result.value = ''
      resultClass.value = ''
      error.value = ''
    }

    return {
      code,
      intro,
      result,
      resultClass,
      error,
      async evaluate () {
        resetResultData()
        try {
          const returnValue = eval(code.value + ';' + testCode.value) // eslint-disable-line
          if (returnValue) {
            result.value = getRightFeedback()
            resultClass.value = 'text-green'
          } else {
            resultClass.value = 'text-orange'
            result.value = getWrongFeedback()
          }
        } catch (err) {
          intro.value = getErrorFeedback()
          error.value = err.message
        }
      },
    }
  },
}
</script>

<style scoped>
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

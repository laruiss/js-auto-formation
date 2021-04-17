<template>
  <div
    ref="homeEl"
    class="home"
  >
    <h1>JavaScript</h1>

    <h2>Partie 1 : Les fonctions</h2>

    <app-exercise
      :initial-code="initialCode"
      :test-code="testCode"
      title="Les fonctions"
      :html-course="course"
      :statement="statement"
    />
  </div>
</template>

<script>
import AppExercise from '@/components/AppExercise.vue'
import { onMounted, ref } from '@vue/runtime-core'
import testCodeRaw from '@/assets/exercises/fn-one-test.js?raw'
import initialCodeRaw from '@/assets/exercises/fn-one-init.js?raw'
import courseRaw from '@/assets/exercises/fn-one-course.md?raw'
import statementRaw from '@/assets/exercises/fn-one-statement.md?raw'
import { getMarkdownParser } from '@/utils/md-utils'

const parseMd = getMarkdownParser()
const course = parseMd(courseRaw)
const statement = parseMd(statementRaw)

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

  setup () {
    const homeEl = ref(null)
    const testCode = ref(testCodeRaw)
    const initialCode = ref(initialCodeRaw)

    return ({
      course,
      homeEl,
      initialCode,
      statement,
      testCode,
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

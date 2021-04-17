<template>
  <div class="home">
    <h1>JavaScript</h1>

    <h2>Partie 1 : Les fonctions</h2>

    <p>
      {{ md }}
    </p>

    <app-exercise
      :initial-code="initialCode"
      :test-code="testCode"
      title="Les fonctions"
    />
  </div>
</template>

<script>
import AppExercise from '@/components/AppExercise.vue'
import { ref } from '@vue/runtime-core'
import testCodeRaw from '@/assets/exercises/fn-one-test.js?raw'
import initialCodeRaw from '@/assets/exercises/fn-one-init.js?raw'
import md from '@/assets/exercises/fn-one-statement.md?raw'

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
    const testCode = ref(testCodeRaw)
    const initialCode = ref(initialCodeRaw)

    return ({
      testCode,
      initialCode,
      md,
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

<template>
  <pre>
    {{ jsondata }}
  </pre>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      jsondata: null,
      error: null
    }
  },
  methods: {
    async getAllBookapi() {
      try {
        const response = await axios.get('https://getallbooks-hb2si6l26a-uc.a.run.app')
        this.jsondata = response.data
        this.error = null
      } catch (e) {
        console.error('error fetching book count:', e)
        this.error = e
        this.jsondata = null
      }
    }
  },
  mounted() {
    this.getAllBookapi()
  }
}
</script>
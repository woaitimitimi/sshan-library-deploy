<template>
  <div id="app">
    <h1>Book Counter</h1>
    <button @click="getBookCount">get a book count</button>
    <p v-if="count != null">Total number of books: {{ count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
  <!-- <table>
    <tr>
      <th>table header 1</th><br>
      <th>table-header 2</th>
    </tr>
    <tr>
      <td>table data 1</td>
      <td>table data 2</td>
    </tr>
  </table> -->
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      count: null,
      error: null,
    }
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://countbooks-hb2si6l26a-uc.a.run.app') //发request去这个网址，这个网址是服务器的function，产生响应回来
        this.count = response.data.count
        this.error = null
      } catch (error) {
        console.error('Error fetching book count:', error)
        this.error = error
        this.count = null
      }
    },
  },
};
</script>
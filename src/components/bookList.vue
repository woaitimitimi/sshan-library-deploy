<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <!-- <button @click="capitalizeAllBooks">Capitalize Books</button> -->
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, getDocs } from 'firebase/firestore'
// import axios from 'axios'

export default {
  setup() {
    const books = ref([])
    const fetchbooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    onMounted(() => {
      fetchbooks()
    })

    return {
      books
    }
  },
  // methods: {
  //   async capitalizeAllBooks() {
  //     try {
  //       const response = await axios.get('https://capitalizeallbooks-hb2si6l26a-uc.a.run.app');
  //       alert(response.data);
  //     } catch (error) {
  //       console.error('Error capitalizing books:', error);
  //     }
  //   }
  // }
}
</script>
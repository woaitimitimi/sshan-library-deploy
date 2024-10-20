<template>
  <div class="mb-5">
    <h1>Add Book</h1>
    <form @submit.prevent="addbook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>
  </div>
  <bookList />
</template>

<script>
import { ref } from 'vue'
// import db from '../firebase/init.js'
// import { collection, addDoc } from 'firebase/firestore'

import bookList from '../components/bookList.vue'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')

    const addbook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        const response = await fetch('https://capviaonerequest-hb2si6l26a-uc.a.run.app', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            isbn: isbnNumber,
            name: name.value
          })
        });

        const result = await response.text()
        isbn.value = ''
        name.value = ''
        console.log(result) //先打印，再alert
        alert('Book added successfully!')
      } catch (error) {
        console.error('Error adding book:', error)
      }
    }
    return {
      isbn,
      name,
      addbook
    }
  },
  components: {
    bookList
  }
}

// export default {
//   setup() {
//     const isbn = ref('')
//     const name = ref('')

//     const addbook = async () => {
//       try {
//         const isbnNumber = Number(isbn.value)
//         if (isNaN(isbnNumber)) {
//           alert('ISBN must be a valid number')
//           return
//         }

//         await addDoc(collection(db, 'books'), {
//           isbn: isbnNumber,
//           name: name.value
//         })

//         isbn.value = ''
//         name.value = ''
//         alert('Book added successfully!')
//       } catch (error) {
//         console.error('Error adding book:', error)
//       }
//     }
//     return {
//       isbn,
//       name,
//       addbook
//     }
//   },
//   components: {
//     bookList
//   }
// }

</script>
<!-- JSON.vue -->
<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <p>Our <code>authors.json</code> contains an array of author objects.</p>

      <h3>Iterating through Arrays</h3>
      <ul>
        <li v-for="author in authors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Filtering Arrays</h3>
      <p>Authors born after 1850:</p>
      <ul>
        <li v-for="author in modernAuthors" :key="author.id">
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Mapping Arrays</h3>
      <p>Famous works:</p>
      <ul>
        <li v-for="work in allFamousWorks" :key="work">
          {{ work }}
        </li>
      </ul>

      <h3>Finding in Arrays</h3>
      <p>Finding by property: {{ orwell?.name }}</p>

      <h3>Nested Arrays/Objects</h3>
      <p>{{ austen?.name }}'s works:</p>
      <ul>
        <li v-for="work in austen?.famousWorks" :key="work.title">
          {{ work.title }} ({{ work.year }})
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Our <code>bookstores.json</code> is a JSON object.</p>

      <h3>Accessing Properties</h3>
      <p>
        Company:
        <!-- Activity 9a: Get the company name from the bookstores object. -->
        {{ companyName }}
      </p>

      <p>
        Total Stores:
        <!-- Activity 9b: Get the total number of stores from the bookstores object. -->
        {{ totalStores }}
      </p>

      <h3>Iterating Object Properties</h3>
      <p>Store Types:</p>
      <!-- Activity 10: Iterate through the storeTypes array and display the store type and the number of stores that use that type. -->
      <ul>
        <li v-for="type in types" :key="type.type">{{ type.type }}: {{ type.count }}</li>
      </ul>

      <h3>Nested Objects</h3>
      <p>Opening Hours:</p>
      <!-- Activity 11: Iterate through the openingHours object and display the day of the week and the opening and closing times. -->
      <ul>
        <li v-for="hours in openingHours" :key="hours.day">
          {{ hours.day }}: Open at {{ hours.open }} and Close at {{ hours.close }}
        </li>
      </ul>

      <h3>Working with Arrays in Objects</h3>
      <!-- Activity 12: Get the top sellers from the bookstores object. -->
      <ul>
        <li v-for="book in topSellers" :key="book">
          {{ book }}
        </li>
      </ul>
      <p>We operate in:</p>
      <p>Our #1 seller:</p>
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <p>Toggle visibility based on a condition.</p>
      <!-- Activity 13: Toggle the message visibility when the button is clicked. -->
      <!-- TODO: CODE TO TOGGLE MESSAGE VISIBILITY HERE. Hint: Use the v-if directive. -->
      <button @click="showMessage = !showMessage">Toggle Message</button>
      <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
      <p v-else>Click the button to see a message.</p>
    </section>

    <section class="lab-section">
      <h2>Attribute, Class and Style Binding with <code>v-bind</code></h2>
      <p>Highlighting Specific Authors:</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Import JSON files
import authors from '../assets/json/authors.json'
import bookstores from '../assets/json/bookstores.json'

const showMessage = ref(false)

// Get authors born after 1850
const modernAuthors = computed(() => authors.filter((author) => author.birthYear > 1850))

// Get all famous works
const allFamousWorks = computed(() =>
  authors.flatMap((author) => author.famousWorks.map((work) => work.title))
)

// Find author by name
const orwell = computed(() => authors.find((author) => author.name === 'George Orwell'))

// Find author by ID
const austen = computed(() => authors.find((author) => author.id === 1))

const companyName = computed(() => bookstores.name)

const totalStores = computed(() => bookstores.totalStores)

const types = computed(() => {
  const storeTypes = bookstores.storeTypes
  const result = []

  for (const type in storeTypes) {
    result.push({ type, count: storeTypes[type] })
  }

  return result
})

const openingHours = computed(() => {
  const hours = bookstores.openingHours

  const result = []
  for (const day in hours) {
    const { open, close } = hours[day]
    result.push({ day, open, close })
  }
  return result
})

const topSellers = computed(() => {
  return bookstores.topSellers
})
</script>

<style scoped>
.json-lab {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
  color: #333;
}
h1 {
  text-align: center;
}

.lab-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}

.highlight {
  background-color: #42b883;
}

code {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}
</style>

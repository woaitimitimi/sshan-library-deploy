<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center mb-4">🗄️ User Information Form</h1>
        <p class="text-center">
          This form now includes validation. Registered users are displayed in a data table below
          (PrimeVue).
        </p>
        <form @submit.prevent="submitForm">
          <div class="row my-3">
            <div class="col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                @blur="validateGender(true)"
                @input="validateGender(false)"
                v-model="formData.gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-6">
              <label for="password" class="form-label">password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>

            <div class="col-sm-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                @blur="() => validateConfirmedPassword(true)"
                v-model="formData.confirmedPassword"
              />
              <div v-if="errors.confirmedPassword" class="text-danger">
                {{ errors.confirmedPassword }}
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                <div v-if="errors.resident" class="text-danger">{{ errors.resident }}</div>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for Joining</label>
            <textarea
              class="form-control"
              id="reason"
              @blur="() => handleReasonBlur()"
              @input="() => validateReason(false)"
              rows="3"
              v-model="formData.reason"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            <div v-if="friendMessage" class="text-success">{{ friendMessage }}</div>
          </div>

          <div class="mb-3">
            <label for="suburb" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-model="formData.suburb" />
          </div>

          <div class="text-center my-5">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearAllSubmittedCards">
              Clear
            </button>
          </div>
        </form>

        <form @submit.prevent="proceed">
          <div v-if="showConfirm" class="container mt-5 p-4 border rounded shadow-sm bg-light">
            <div class="row text-center mb-3">
              <div class="col-12">
                <h4 class="text-primary mb-3">Confirmation Required</h4>
                <p class="mb-4">Are you sure you are not an Australian resident?</p>
              </div>
              <div class="col-6">
                <button type="submit" class="btn btn-danger w-100">
                  Yes, I'm not an Australian Resident
                </button>
              </div>
              <div class="col-6">
                <button type="button" class="btn btn-outline-secondary w-100" @click="cancel">
                  No, I forgot to tick
                </button>
              </div>
            </div>
          </div>
        </form>
        <!--  -->
      </div>
    </div>
  </div>

  <!-- <div class="row mt-5" v-if="submittedCards.length">
    <div class="d-flex flex-wrap justify-content-start">
      <div
        v-for="(card, index) in submittedCards"
        :key="index"
        class="card m-2"
        style="width: 18rem"
      >
        <div class="card-header">User Information</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Username: {{ card.username }}</li>
          <li class="list-group-item">password: {{ card.password }}</li>
          <li class="list-group-item">
            Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
          </li>
          <li class="list-group-item">Gender: {{ card.gender }}</li>
          <li class="list-group-item">Reason: {{ card.reason }}</li>
        </ul>
      </div>
    </div>
  </div> -->

  <div class="container mt-5" v-if="submittedCards.length">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <h4>This is a PrimeVue DataTable</h4>
        <DataTable
          :value="submittedCards"
          scrollable
          scrollHeight="400px"
          size="large"
          tableStyle="min-width: 50rem"
        >
          <Column field="username" header="Username"></Column>
          <Column field="password" header="Password"></Column>
          <Column field="isAustralian" header="Australian Resident"></Column>
          <Column field="gender" header="gender"></Column>
          <Column field="reason" header="Reason for Joining"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  confirmedPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: ''
})

const friendMessage = ref(null)

const isFriendContained = (blur) => {
  const reason = formData.value.reason
  const regex = /friend(s)?/i
  if (regex.test(reason)) {
    if (blur) friendMessage.value = 'Great to have a friend'
  } else {
    friendMessage.value = null
  }
}

const handleReasonBlur = () => {
  if (validateReason(true)) {
    isFriendContained(true)
  }
}

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateGender(true)
  validateResident()
  validateReason(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.gender &&
    !errors.value.resident &&
    alreadyConfirm.value &&
    !errors.value.reason
  ) {
    submittedCards.value.push({
      ...formData.value
    })
    clearForm()
    alreadyConfirm.value = false
    friendMessage.value = null
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmedPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
}

const clearAllSubmittedCards = () => {
  submittedCards.value = []
  alreadyConfirm.value = false
}

const errors = ref({
  username: null,
  password: null,
  confirmedPassword: null,
  resident: null,
  gender: null,
  reason: null
})

const validateReason = (blur) => {
  if (formData.value.reason.length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters long'
    return false
  } else {
    errors.value.reason = null
    return true
  }
}

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character'
  } else {
    errors.value.password = null
  }
}

const validateGender = (blur) => {
  const allowGenders = ['male', 'female', 'other']
  if (!allowGenders.includes(formData.value.gender)) {
    if (blur) errors.value.gender = 'Please select a valid option'
  } else {
    errors.value.gender = null
  }
}

// const validateResident = () => {
//   const isAus = formData.value.isAustralian
//   if (!isAus) {
//     const proceed = confirm('You have not selected the checkbox. Are sure you want to proceed?')
//     if (proceed) {
//       alert('Form submitted successfully!')
//     } else {
//       alert('Form submitted')
//     }
//   }
// }
const showConfirm = ref(false)
const alreadyConfirm = ref(false)

const validateResident = () => {
  if (!formData.value.isAustralian && !alreadyConfirm.value) {
    showConfirm.value = true
  } else {
    errors.value.resident = null
    alreadyConfirm.value = true
  }
}

/**
 * Confirm password validation function that checks if the password and confirmed passwords fields match.
 * @param blur: boolean - If true, the function will display an error message if the passwords do not match.
 */
const validateConfirmedPassword = (blur) => {
  if (formData.value.password != formData.value.confirmedPassword) {
    if (blur) errors.value.confirmedPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmedPassword = null
  }
}

const proceed = () => {
  showConfirm.value = false
  alreadyConfirm.value = true
  submitForm()
}

const cancel = () => {
  showConfirm.value = false
  errors.value.resident = "Please tick if you're an Australian Resident"
}
</script>

<style scoped>
/* .card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 20px;
} */

.confirm-dialog {
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  text-align: center;
}
</style>

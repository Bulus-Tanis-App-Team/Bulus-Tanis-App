<template>
  <div>
    <button @click="showModal = true" aria-haspopup="true">Profile</button>
    <div class="modal-overlay" :aria-hidden="!showModal">
      <div class="modal">
        <div class="modal-content">
          <h2>Profile</h2>
          <form @submit.prevent="submitProfile">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" v-model="name" required>
            </div>
            <div class="form-group">
              <label for="surname">Surname:</label>
              <input type="text" id="surname" v-model="surname" required>
            </div>
            <div class="form-group">
              <label for="city">City:</label>
              <input type="text" id="city" v-model="city" required>
            </div>
            <div class="form-group">
              <label for="country">Country:</label>
              <input type="text" id="country" v-model="country" required>
            </div>
            <div class="form-group">
              <label for="location">Location:</label>
              <input type="text" id="location" v-model="location" required>
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      name: '',
      surname: '',
      city: '',
      country: '',
      street: '',
    };
  },
  methods: {
    submitProfile() {
      // do something with the form data
      // for example, send it to a server or save it in local storage
      console.log('Submitted profile:', {
        name: this.name,
        surname: this.surname,
        city: this.city,
        country: this.country,
        location: this.location,
      });
      // close the modal
      this.showModal = false;
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
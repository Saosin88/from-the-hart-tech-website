<template>
  <div class="test-page">
    <h1>Test Page</h1>
    <p>This is a dummy view page for testing purposes.</p>
    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script>
  export default {
    name: 'TestPage',
    methods: {
      handleClick() {
        alert('Button clicked!')
      },
    },
  }
</script>

<style scoped>
  .test-page {
    text-align: center;
    margin-top: 50px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
</style>

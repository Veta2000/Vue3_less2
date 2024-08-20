const { reactive, computed } = Vue;

const app = Vue.createApp({
  setup() {
    const state = reactive({
      name: 'Tatiana',
      age: 25
    });

    const people = reactive([
      { name: 'Tatiana', age: 25 },
      { name: 'Doyle', age: 35 },
      { name: 'Ross', age: 45 }
    ]);

    const updateAge = (event) => {
      state.age = event.target.value;
      console.log('Age updated to:', state.age);
    };

    const filterByAge = (ageLimit) => {
      return people.filter(person => person.age >= ageLimit);
    };

    const adults = computed(() => {
      return filterByAge(18);
    });

    const fullName = computed(() => `${state.name} (${state.age})`);

    const validateForm = () => {
      if (state.age < 18) {
        alert('Вам должно быть больше 18.');
      }
    };

    const fetchRandomName = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        state.name = `${user.name.first} ${user.name.last}`;
        console.log('Name updated to:', state.name);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    return {
      state,
      updateAge,
      validateForm,
      adults,
      fullName,
      fetchRandomName
    };
  }
});

app.mount('#app');

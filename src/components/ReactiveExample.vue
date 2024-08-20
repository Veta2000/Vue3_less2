<template>
    <div>
        <h2>Реактивные Объекты</h2>
        <p> Имя: {{ state.name }}</p>
        <p> Возраст: {{ state.age }} </p>
        <button @click="fetchRandomName">Change Name</button>
        <input type="number" v-model="state.age" @input="updateAge" />
        <button @click="validateForm"> Validate Age</button>

        <h2>Фильтр лист</h2>
        <ul>
            <li v-for="person in adults" :key="person.name">{{ person.name }} - {{ person.age }} years old</li>
        </ul>

        <h2> Рандомное имя апи</h2>
        <p>{{ fullName }}</p>
        <button @click="fetchRandomName">Фетч имени</button>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'


export default {
  name: 'ReactiveExample',
  setup() {
    const state = reactive({
      name: 'Tatiana',
      age: 25,
    });


    const people = reactive([
      { name: 'Tatiana', age: 25 },
      { name: 'Doyle', age: 35 },
      { name: 'Ross', age: 45 },
    ]);


    const changeName = () => {
      state.name = 'Yulia';
    };


    const updateAge = (event) => {
      state.age = event.target.value;
    };


    const validateForm = () => {
      if (state.age < 18) {
        alert('Вам должно быть больше 18.');
      }
    };

    
    const filterByAge = (ageLimit) => {
      return people.filter(person => person.age >= ageLimit);
    };

   
    const adults = computed(() => {
      return filterByAge(18);
    });


    const fullName = computed(() => `${state.name} (${state.age})`);

   
    const fetchRandomName = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        state.name = `${user.name.first} ${user.name.last}`;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    
    watch(
      () => state.age,
      (newAge, oldAge) => {
        console.log(`Age changed from ${oldAge} to ${newAge}`);
      }
    );


    watch(fullName, (newName) => {
      console.log(`Name changed to: ${newName}`);
    });

    return {
      state,
      changeName,
      updateAge,
      validateForm,
      adults,
      fullName,
      fetchRandomName,
    };
  },
};
</script>

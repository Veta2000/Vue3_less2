<template>
  <div>
    <h2>Реактивные Объекты</h2>
    <p>Имя: {{ state.name }}</p>
    <p>Возраст: {{ state.age }}</p>

    <h2>Добавить Человека</h2>
    <form @submit.prevent="addPerson">
      <input type="number" v-model="newPerson.age" placeholder="Введите возраст" />
      <button type="submit">Добавить</button>
    </form>
    
    <h2>Рандомное имя API</h2>
    <p>{{ fullName }}</p>
    <button @click="fetchRandomName">Фетч имени</button>

    <h2>Фильтр лист</h2>
    <input type="number" v-model="filterAge.value" placeholder="Введите возраст для фильтрации" />

    <ul>
      <li v-for="person in filteredPeople" :key="person.name">{{ person.name }} - {{ person.age }} years old</li>
    </ul>

    <h2>Обновить Имя</h2>
    <input type="text" @input="updateName" placeholder="Введите новое имя" />

    <h2>Компонент ChildComponent</h2>
    <ChildComponent :message="childMessage.text" />
    <button @click="changeChildMessage">Изменить</button>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, watch } from 'vue';
import ChildComponent from './ChildComponent.vue';

export default defineComponent({
  name: 'ReactiveExample',
  components: { ChildComponent },
  setup() {
    const state = reactive({
      name: 'Tatiana',
      age: 25,
    });

    const people = reactive([]);

    const newPerson = reactive({
      age: null,
    });

    const filterAge = reactive({
      value: null,
    });

    const childMessage = reactive({ text: 'Начальное сообщение' });

    const addPerson = () => {
      if (newPerson.age && newPerson.age >= 18) {
        const existingPerson = people.find(person => person.name === state.name);
        if (existingPerson) {
          existingPerson.age = parseInt(newPerson.age);
        } else {
          people.push({ name: state.name, age: parseInt(newPerson.age) });
        }
        newPerson.age = null;
      } else {
        alert('Возраст должен быть 18 или больше.');
      }
    };

    const filteredPeople = computed(() => {
      if (filterAge.value) {
        return people.filter(person => person.age >= filterAge.value);
      }
      return people;
    });

    const fullName = computed(() => `${state.name} (${state.age})`);

    const shortUserName = computed(() => fullName.value.split(' ')[0]);

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

    const updateName = (event) => {
      state.name = event.target.value;
    };

    const changeChildMessage = () => {
      childMessage.text = 'Сообщение изменено!';
    };

    watch(() => state.name, (newValue, oldValue) => {
      console.log(`Имя изменилось с ${oldValue} на ${newValue}`);
    });

    return {
      state,
      newPerson,
      filterAge,
      people,
      filteredPeople,
      addPerson,
      fullName,
      shortUserName,
      fetchRandomName,
      updateName,
      childMessage,
      changeChildMessage,
    };
  },
});
</script>

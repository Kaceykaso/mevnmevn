<template>
  <main>
    <h1 class="title">MEVN CRUD APP</h1>

    <form @submit.prevent="addTodo" method="post">
      <input class="input" v-model="title" type="text" name="name" placeholder="Enter todo" />
      <input class="input" v-model="description" type="text" name="description" placeholder="Enter Description" />
      <button type="submit" class="submit-btn">Add Todo</button>
    </form>
    <div class="todo-wrapper">
      <h2 class="caption">Todo List</h2>
      <div v-if="todos.length < 1">Todo list is empty</div>
      <ul v-else>
        <li class="todo-item" v-for="(todo, i) in todos" :key="todo._id">
          <div class="todo">
            <h3 class="todo-title">{{ todo.title }}</h3>
            <span class="todo-description">{{ todo.description }}</span>
          </div>

          <div class="update-form" id="updateForm">
            <input type="text" name="updateTitle" id="updateTodo" v-model="updateTitle" />
            <br />
            <input type="text" name="updateDescription" id="updateTodo" v-model="updateDescription" />
          </div>
          <div class="todo-btns">
            <button type="button" class="edit-btn" @click="updateTodo($event, todo._id, i, todo)">
              Edit
            </button>
            <button type="button" class="del-btn" @click="delTodo(todo._id, i)">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      title: "",
      description: "",
      todos: [],
      updateTitle: "",
      updateDescription: "",
    };
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      const res = await fetch('api/todoList');
      const data = await res.json();
      this.todos = data;
    },

    async addTodo() {
      const res = await axios.post("api/todoList/", {
        title: this.title,
        description: this.description,
      });
      this.title = "";
      this.description = "";
    },

    async delTodo(id) {
      await axios.delete(`api/todoList/${id}`);
    },

    async updateTodo(event, id, i, todo) {
      const updateForm = document.getElementsByClassName("update-form");
      const updateFormArray = [...updateForm];
      updateFormArray.forEach(async (el) => {
        if (updateFormArray.indexOf(el) === i) {
          if (!el.classList.contains("active")) {
            el.classList.add("active");
            this.updateTitle = todo.title;
            this.updateDescription = todo.description;
            event.target.innerHTML = "Save";
          } else {
            const res = await axios.put(`api/todoList/${id}`, {
              title: this.updateTitle,
              description: this.updateDescription,
            });
            event.target.innerHTML = "Edit";
            el.classList.remove("active");
            this.updateTitle = "";
            this.updateDescription = "";
          }
        }
      });
    },
  },
  watch: {
    todos() {
      this.getTodos(); // Watch todos list for any change
    },
  },
};
</script>
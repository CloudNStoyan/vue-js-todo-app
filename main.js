Vue.component('todo-item', {
    model: {
        event: "remove-clicked"
    },
    props: ['todo', 'index'],
    template: `<div><span>{{ todo.text }}</span><button class="remove-btn" v-on:click="$emit('remove-clicked', index)">Remove</button></div>`
})

let appContainer = new Vue({
    el: '#app-container',
    data: {
        todos: [],
        inputTodo: '',
        localStorageKey: '__todos'
    },
    methods: {
        addTodo() {
            if ((this.inputTodo.length === 0 || !this.inputTodo.trim())) {
                this.inputTodo = this.inputTodo.trim()
                return
            }

            let todo = { text: this.inputTodo };
            this.todos.push(todo)
            this.inputTodo = ''

            localStorage.setItem(this.localStorageKey, JSON.stringify(this.todos))
        },
        removeTodo(index) {
            this.todos.splice(index, 1)

            localStorage.setItem(this.localStorageKey, JSON.stringify(this.todos))
        }
    },
    created() {
        let todos = localStorage.getItem(this.localStorageKey)

        if (todos) {
            this.todos = JSON.parse(todos)
        }
    }
})
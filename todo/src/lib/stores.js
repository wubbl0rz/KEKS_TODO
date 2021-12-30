import { browser, prerendering } from '$app/env';
import { get, writable } from 'svelte/store';

class TodoCollection extends Array {
}

function createTodoStore() {

  const store = writable([]);

  if (browser) {
    let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
    store.set(todos);

    store.subscribe(v => {
      localStorage.setItem("todos", JSON.stringify(v));
    });
  }

  return {
    ...store
  };
}

export const todos = createTodoStore();
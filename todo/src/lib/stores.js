import { browser, prerendering } from '$app/env';
import { get, writable } from 'svelte/store';

function createTodoStore() {

  const store = writable([]);

  if (browser) {
    let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
    store.set(todos);

    store.subscribe(v => {
      console.log("SUB");
      localStorage.setItem("todos", JSON.stringify(v));
    });
  }

  return {
    ...store,
  };
}

export const todos = createTodoStore();
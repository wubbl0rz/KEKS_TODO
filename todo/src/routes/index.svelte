<script>
  import Progress from "$lib/progress.svelte";
  import { todos } from "$lib/stores";
  import Todo from "$lib/todo.svelte";
  import { v4 as uuidv4 } from "uuid";

  $: percent =
    ($todos.filter((e) => e.done).length / ($todos.length || 1)) * 100;

  function createTodo(text) {
    return {
      id: uuidv4(),
      created: Date.now(),
      text: text,
      done: false,
      deleted: false,
    };
  }

  function addTodo() {
    $todos = [...$todos, createTodo("Title")];
  }

  function removeTodo(id) {
    $todos = $todos.filter((e) => e.id != id);
  }
</script>

<div class="flex justify-center items-center">
  <div class="text-4xl dark:text-gray-100 pt-2 pr-1">KEKS TODO</div>

  <img class="w-12" src="wubPog.png" alt="wub pog" />
</div>

<div class="flex">
  <div
    class="font-bold cursor-pointer select-none hover:scale-105 transition text-gray-100 m-1 p-1 bg-teal-600 rounded flex"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
    <p class="ml-1">Default</p>
  </div>
</div>

<Progress value={percent} />

<div
  on:click={addTodo}
  class="fixed right-4 bottom-4 select-none pb-4 text-gray-100"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="select-none md:h-20 md:w-20 w-12 bg-pink-600 rounded-md"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
</div>

<ul class="pt-1">
  {#each $todos
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .sort((a, b) => a.done - b.done) as todo}
    <li class="border-b-2 last:border-b-0 border-gray-500">
      <Todo on:delete={removeTodo(todo.id)} bind:todo />
    </li>
  {/each}
</ul>

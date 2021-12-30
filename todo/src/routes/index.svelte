<script>
  import BookList from "$lib/book-list.svelte";
  import Progress from "$lib/progress.svelte";
  import { todos } from "$lib/stores";
  import Todo from "$lib/todo.svelte";
  import { v4 as uuidv4 } from "uuid";
  import Icon from "@iconify/svelte";

  function sortBy(key) {
    return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
  }

  function includesIgnoreCase(text, search) {
    return text.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  }

  let searchText = "";

  $: percent =
    ($todos.filter((e) => e.done).length / ($todos.length || 1)) * 100;

  let searchActive = false;

  $: sortedTodos = $todos
    .sort(sortBy("created"))
    .sort(sortBy("done"))
    .filter((t) => includesIgnoreCase(t.text, searchText));

  $: {
    todos.set($todos);
  }

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
</script>

<BookList />

<div class="flex gap-2 justify-around">
  <div class="w-full">
    <Progress value={percent} />
  </div>
  <div class="relative focus-within:text-blue-500 text-gray-400">
    <input
      class="rounded h-8 w-0 focus:w-64 duration-75 transition-all pt-1 placeholder:text-gray-400 text-gray-100 bg-slate-900 ring-0 outline-0 border-2"
      bind:value={searchText}
      placeholder="search..."
      type="text"
    />
    <Icon
      class="pointer-events-none absolute right-1.5 top-2"
      icon="heroicons-outline:search"
    />
  </div>
</div>

<div
  on:click={addTodo}
  class="fixed right-4 bottom-4 select-none pb-4 text-gray-100"
>
  <Icon
    class="select-none w-12 h-12 bg-pink-600 rounded-md"
    icon="heroicons-outline:plus-circle"
  />
</div>

<ul class="pt-1">
  {#each sortedTodos as todo}
    <li class="border-b-2 last:border-b-0 border-gray-500">
      <Todo bind:todo />
    </li>
  {/each}
</ul>

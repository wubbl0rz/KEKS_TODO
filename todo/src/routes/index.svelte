<script>
  import BookList from "$lib/book-list.svelte";
  import Progress from "$lib/progress.svelte";
  import { todos } from "$lib/stores";
  import Todo from "$lib/todo.svelte";
  import { v4 as uuidv4 } from "uuid";
  import Icon from "@iconify/svelte";

  let searchInput;
  let searchText = "";

  $: sortedTodos = $todos
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .sort((a, b) => a.done - b.done)
    .filter((t) =>
      t.text.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );

  $: percent =
    ($todos.filter((e) => e.done).length / ($todos.length || 1)) * 100;

  let searchActive = false;

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

<Progress value={percent} />

<div
  on:click={addTodo}
  class="fixed right-4 bottom-4 select-none pb-4 text-gray-100"
>
  <Icon
    class="select-none md:h-20 md:w-20 w-12 h-12 bg-pink-600 rounded-md"
    icon="heroicons-outline:plus-circle"
  />
</div>

<div class="fixed right-20 bottom-4 select-none pb-4 text-gray-100">
  <input
    bind:value={searchText}
    bind:this={searchInput}
    class:opacity-0={!searchActive}
    class:opacity-100={searchActive}
    class="absolute shadow-md transition-all rounded-md right-0 bottom-20 ring-gray-600 ring-2 bg-gray-900 "
    type="text"
  />
  <div
    on:click={() => {
      searchActive = !searchActive;
      searchActive && searchInput.focus();
    }}
  >
    <Icon
      class="select-none md:h-20 md:w-20 w-12 h-12 bg-pink-600 rounded-md"
      icon="heroicons-outline:search"
    />
  </div>
</div>

<ul class="pt-1">
  {#each sortedTodos as todo}
    <li class="border-b-2 last:border-b-0 border-gray-500">
      <Todo bind:todo />
    </li>
  {/each}
</ul>

<script>
  import BookList from "$lib/book-list.svelte";
  import Progress from "$lib/progress.svelte";
  import { todos } from "$lib/stores";
  import Todo from "$lib/todo.svelte";
  import { v4 as uuidv4 } from "uuid";
  import Icon from "@iconify/svelte";
  import { fly } from "svelte/transition";
  import { beforeUpdate } from "svelte";
  import Switch from "$lib/switch.svelte";

  //todo disable scrollbar firefox

  function sortBy(key) {
    return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
  }

  function includesIgnoreCase(text, search) {
    return text.toLowerCase().includes(search.toLowerCase());
  }

  let searchText = "";
  let showDeleted = false;

  $: percent =
    ($todos.filter((e) => e.done && !e.deleted).length /
      ($todos.filter((e) => !e.deleted).length || 1)) *
    100;

  let searchActive = false;
  let showDialog = false;

  $: sortedTodos = $todos
    .sort(sortBy("created"))
    .sort(sortBy("done"))
    .filter((t) => showDeleted == t.deleted)
    .filter((t) => includesIgnoreCase(t.text, searchText));

  $: todos.set($todos);

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

  function handleKey(e) {
    if (e.key == "Enter" && e.altKey) {
      addTodo();
    }
  }

  function clearTrash(clear) {
    if (clear) {
      $todos = $todos.filter((t) => !t.deleted);
      showDeleted = false;
    }
    showDialog = false;
  }
</script>

{#if showDialog}
  <div
    transition:fly={{ y: 200, duration: 200 }}
    style="z-index: 99999;"
    class="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center"
  >
    <div
      class="bg-slate-900 
      text-gray-100 shadow-slate-900 shadow-md rounded p-2 border-2 border-pink-600"
    >
      <div class="font-bold text-center p-2">CLEAR TRASH?</div>
      <div class="flex justify-evenly">
        <div
          on:click={() => clearTrash(true)}
          class="font-bold cursor-pointer select-none hover:scale-105 transition text-gray-100 m-1 p-1 bg-teal-600 rounded flex"
        >
          <Icon class="h-6 w-6" icon="heroicons-outline:check-circle" />
          <p class="ml-1">YES</p>
        </div>
        <div
          on:click={() => clearTrash(false)}
          class="font-bold cursor-pointer select-none hover:scale-105 transition text-gray-100 m-1 p-1 bg-teal-600 rounded flex"
        >
          <Icon class="h-6 w-6" icon="heroicons-outline:x-circle" />
          <p class="ml-1">NO</p>
        </div>
      </div>
    </div>

    <!-- <button on:click={() => (showDialog = false)}>CLOSE</button> -->
  </div>
{/if}

<svelte:window on:keydown={handleKey} />

<div class:blur={showDialog}>
  <Switch bind:active={showDeleted} />
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
    <div />
  </div>

  <div
    on:click={showDeleted ? () => (showDialog = true) : addTodo}
    class="fixed right-4 bottom-4 select-none pb-4 text-gray-100"
  >
    <Icon
      class="select-none w-12 h-12 bg-pink-600 rounded-md"
      icon={showDeleted
        ? "heroicons-outline:trash"
        : "heroicons-outline:plus-circle"}
    />
  </div>

  <div>
    <ul class="pt-1">
      {#each sortedTodos as todo}
        <li class="border-b-2 last:border-b-0 border-gray-500">
          <Todo bind:todo />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .blur {
    filter: blur(5px);
  }
</style>

<script>
  import { createEventDispatcher } from "svelte";
  import { todos } from "$lib/stores";
  import Icon from "@iconify/svelte";

  export let todo;

  function toggleDeleted() {
    todo.deleted = !todo.deleted;
  }

  function handleKey(e) {
    if (e.key == "d" && e.altKey) {
      todo.done = !todo.done;
    }

    if (todo.done && e.key == "Delete" && e.altKey) {
      removeTodo(todo.id);
    }
  }
</script>

<div class="flex items-start gap-2 my-2">
  <input
    class="w-8 h-8 rounded dark:bg-gray-400 text-pink-600 hover:animate-pulse"
    bind:checked={todo.done}
    type="checkbox"
  />
  <textarea
    on:keydown={handleKey}
    class:line-through={todo.done}
    class:dark:bg-gray-400={todo.done}
    class:dark:bg-gray-900={!todo.done}
    readonly={todo.done}
    spellcheck="false"
    class="scrollbar-off outline-0 hover:ring-2 resize-none 
    ring-0 h-8 text-gray-200 font-bold ring-offset-gray-100 
    shadow-md border-2 border-gray-500 rounded p-0 pt-0.5 pl-2 w-full 
    focus:h-40 transition-[height]"
    bind:value={todo.text}
    type="text"
  />

  <div on:click={toggleDeleted} class="select-none text-gray-100">
    <Icon
      class="h-8 w-8 transition hover:scale-125 hover:text-pink-600 cursor-pointer"
      icon={todo.deleted
        ? "heroicons-outline:receipt-refund"
        : "heroicons-outline:trash"}
    />
  </div>
</div>

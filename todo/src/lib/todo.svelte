<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onDelete() {
    dispatch("delete");
  }

  export let todo;
</script>

<div class="flex items-start gap-2 my-2">
  <input
    class="w-8 h-8 rounded dark:bg-gray-400 text-pink-600 hover:animate-pulse"
    bind:checked={todo.done}
    type="checkbox"
  />
  <textarea
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
  <div on:click={onDelete} class="select-none text-gray-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8 transition hover:scale-125 
      hover:text-pink-600 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </div>
</div>

<style>
  .scrollbar-off {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }
  .scrollbar-off::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
</style>

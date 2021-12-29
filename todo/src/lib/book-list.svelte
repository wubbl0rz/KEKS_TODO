<script>
  import Icon from "@iconify/svelte";
  import { todos } from "$lib/stores";
</script>

<div class="flex">
  <div
    class="font-bold cursor-pointer select-none hover:scale-105 transition text-gray-100 m-1 p-1 bg-teal-600 rounded flex"
  >
    <Icon class="h-6 w-6" icon="heroicons-outline:book-open" />
    <p class="ml-1">Default</p>
  </div>
</div>

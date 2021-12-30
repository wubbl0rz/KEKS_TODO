<script>
  export let active = false;
</script>

<div
  class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
>
  <input
    bind:checked={active}
    type="checkbox"
    name="toggle"
    id="toggle"
    class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
  />
  <label
    for="toggle"
    class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
  />
</div>
<label for="toggle" class="text-xs text-gray-700" />

<style>
  .toggle-checkbox:checked {
    right: 0;
    border-color: #68d391;
  }
  .toggle-checkbox:checked + .toggle-label {
    background-color: #68d391;
  }
</style>

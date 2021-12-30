<script>
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let value = 0;

  let progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  $: {
    progress.set(value);
  }
</script>

<div class="ring-2 ring-gray-900 rounded relative">
  <div
    class="select-none absolute text-gray-100 font-bold"
    style="top: -5px; right: 10px"
  >
    {Math.floor($progress)}%
  </div>
  <div style={`width:${$progress}%`} class="bg-pink-600 w-0 h-4 rounded mt-2" />
</div>

<script>
  //LIBS
  import { createEventDispatcher } from "svelte";

  //PROPS
  export let label;

  let dispatch = createEventDispatcher();

  let isInfoVisible = false;

  const handleClick = async () => {
    isInfoVisible = true;
    dispatch("infovisible", { state: isInfoVisible });
    console.log("isInfoVisible", isInfoVisible);
  };
</script>

<div
  on:click={handleClick}
  class="mx-auto w-120 text-md text-center text-primary-main font-bold hover:text-secondary-main cursor-pointer"
>
  <h1>{label}</h1>
</div>

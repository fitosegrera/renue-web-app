<script>
  //LIBS
  import Icon from "@iconify/svelte";
  import { spring } from "svelte/motion";

  //PROPS
  export let icon_label, label;

  let isBooped = false;
  let rotation = 10;
  let timing = 200;

  let springyRotation = spring(0, {
    stiffness: 0.1,
    damping: 0.15,
  });

  $: springyRotation.set(isBooped ? rotation : 0);

  $: style = `
		transform: rotate(${$springyRotation}deg)
	`;

  $: if (isBooped) {
    setTimeout(() => {
      isBooped = false;
    }, timing);
  }

  const toggle = () => {
    isBooped = true;
  };
</script>

<button
  on:mouseenter={toggle}
  on:mouseleave={toggle}
  class="flex items-center text-secondary-dark-alpha font-bold rounded-md transition ease-in-out hover:text-secondary-main duration-500"
>
  <h1 class="text-md">{label}</h1>
  <div class="text-4xl">
    <Icon icon={icon_label} {style} />
  </div>
</button>

<style>
  * {
    overflow: hidden;
  }
</style>

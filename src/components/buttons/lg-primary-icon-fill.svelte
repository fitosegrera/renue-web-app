<script>
  //LIBS
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { spring } from "svelte/motion";

  //PROPS
  export let icon_label, label, url;

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

  onMount(() => {});
</script>

<a href={url}>
  <button
    on:mouseenter={toggle}
    on:mouseleave={toggle}
    class="flex items-center px-32 space-x-16 w-268 h-72 text-on-background-variant font-bold rounded-md bg-primary-main transition ease-in-out hover:bg-secondary-main duration-500"
  >
    <div class="text-xl">
      <Icon icon={icon_label} {style} />
    </div>
    <h1 class="text-lg">{label}</h1>
  </button>
</a>

<style>
  * {
    overflow: hidden;
  }
</style>

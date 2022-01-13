<script>
	import { onMount } from 'svelte';

	let e;

	onMount(async () => {
		const { createScene } = await import('./js/scene');
		createScene(e);
	});
</script>

<canvas bind:this={e} />

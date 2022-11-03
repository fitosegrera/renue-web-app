<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}`,
        msg: `${error.message}`,
      },
    };
  }
</script>

<script>
  export let title, msg;
</script>

<div class="w-full h-screen gradient-blue-to-green-light-vertical">
  <div
    class="flex flex-col w-full h-full items-center justify-center space-y-24"
  >
    <div>
      <h1 class="text-6xl">{title}</h1>
    </div>
    <div>
      <p class="text-xl">{msg}</p>
    </div>
    <div>
      <p class="text-lg">The url you are looking for does not exist.</p>
    </div>
  </div>
</div>

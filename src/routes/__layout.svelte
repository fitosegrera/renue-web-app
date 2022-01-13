<script>
  //COMPONENTS
  import Navbar from "../components/navigation/navbar.svelte";
  import Footer from "../components/navigation/footer.svelte";

  //CONTAINERS
  import MainContainer from "../components/containers/main.svelte";

  import "../layout.css";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Mulish&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<MainContainer>
  <Navbar />
  <slot />
  <Footer />
</MainContainer>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

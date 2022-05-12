<script>
  //LIBS
  import { onMount } from "svelte";

  //COMPONENTS
  // import Navbar from "../components/navigation/navbar.svelte";
  import Footer from "../components/navigation/footer.svelte";
  import Navbar from "../components/navigation/responsive/navbar.svelte";
  import Sidebar from "../components/navigation/responsive/sidebar.svelte";

  //CONTAINERS
  import MainContainer from "../components/containers/main.svelte";

  //STORES
  import { cms_url } from "../stores/renuestore";

  //STYLES
  import "../layout.css";

  $: innerHeight = 0;
  let open = false;

  let navBarItems = {};
  let socialItems = {};

  const fetchRefs = async () => {
    const res = await fetch($cms_url);
    const data = await res.json();
    return data.refs;
  };

  const fetchData = async (callback) => {
    const refs = await fetchRefs();

    const masterRef = await refs.map((ref, index) => {
      return ref.ref;
    });

    const url =
      $cms_url + "/documents/search?ref=" + masterRef + "#format=json";
    const res = await fetch(url);
    const data = await res.json();

    let navBarData = {};

    await data.results.map((data, index) => {
      if (data.slugs[0] === "navbar") {
        navBarData = data.data;
      }
    });

    callback(navBarData);
  };

  onMount(async () => {
    fetchData(async (navbar) => {
      //console.log("navbar", navbar);
      navBarItems = await navbar;
      socialItems = navbar.social;
    });
    return () => navBarItems;
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Mulish&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<svelte:window bind:innerHeight />

<MainContainer>
  <!-- <Navbar /> -->
  <Sidebar bind:open navbar_data={navBarItems} />
  <Navbar bind:sb={open} navbar_data={navBarItems} />
  <slot />
  <Footer />
</MainContainer>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

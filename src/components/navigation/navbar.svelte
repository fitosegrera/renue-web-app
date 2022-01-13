<script>
  //LIBS
  import { onMount } from "svelte";

  //COMPONENTS
  import MenuItem from "./menu-item.svelte";

  //STORES
  import { cms_url } from "../../stores/renuestore";

  let navBarItems = {};
  let socialItems = {};

  /////////////////////////////////////////////

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

<div
  id="wrapper"
  class="w-full xl:px-148 lg:px-96 md:px-72 h-72 bg-on-background-variant-alpha"
>
  <nav class="flex py-16 lg:text-md md:text-md">
    <div class="flex-grow">
      <a class="" href="/">
        {#if navBarItems.logo !== undefined}
          <img src={navBarItems.logo.url} alt="Renue Logo" class="md:w-168" />
        {/if}
      </a>
    </div>
    <div class="flex items-center xl:space-x-16 lg:space-x-32">
      {#if navBarItems["menu-item"] !== undefined}
        {#each navBarItems["menu-item"] as item}
          <MenuItem label={item.label} url={item.url} id={item.label} />
        {/each}
      {/if}
    </div>
  </nav>
</div>

<style>
  * {
    overflow: hidden;
  }
  #wrapper {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }
</style>

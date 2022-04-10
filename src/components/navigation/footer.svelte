<script>
  //LIBS
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  //STORES
  import { cms_url, break_point } from "../../stores/renuestore";

  let footerItems = {};
  let socialItems = [];

  let mobileView = false;
  let innerWidth;

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

    let footerData = {};

    await data.results.map((data, index) => {
      if (data.slugs[0] === "footer") {
        footerData = data.data;
      }
    });

    callback(footerData);
  };

  const switchView = (e) => {
    if (innerWidth <= $break_point) {
      mobileView = true;
    } else {
      mobileView = false;
    }
  };

  onMount(async () => {
    if (innerWidth <= $break_point) {
      mobileView = true;
    } else {
      mobileView = false;
    }

    const mediaListener = window.matchMedia(
      "(max-width: " + $break_point + "px)"
    );
    mediaListener.addListener(switchView);

    fetchData(async (footer) => {
      //console.log("footer", footer);
      footerItems = await footer;
      socialItems = await footer.social;
    });
  });
</script>

<svelte:window bind:innerWidth />

<div
  id="wrapper"
  class="w-full h-auto md:px-72 sm:px-32 bg-on-background-variant-alpha"
>
  <nav class="flex items-center py-32 xl:text-lg lg:text-lg md:text-md">
    <div class="flex flex-grow space-x-32 text-sm">
      {#if footerItems.logo !== undefined}
        <a href="/">
          <img src={footerItems.logo.url} alt="Renue Logo" class="w-120" />
        </a>
        {#if !mobileView}
          <p>{footerItems.copyright[0].text}</p>
        {/if}
      {/if}
    </div>
    <div class="flex items-center xl:space-x-48 sm:space-x-32 text-2xl">
      {#if socialItems.length > 0}
        {#each socialItems as item}
          <a href="">
            <div class="text-secondary-dark hover:text-secondary-main">
              <Icon icon={"akar-icons:" + item.id + "-fill"} />
            </div>
          </a>
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
    /* position: relative; */
    z-index: 100;
  }
</style>

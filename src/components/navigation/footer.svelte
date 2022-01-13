<script>
  //LIBS
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  //STORES
  import { cms_url } from "../../stores/renuestore";

  let footerItems = {};
  let socialItems = [];

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

  onMount(async () => {
    fetchData(async (footer) => {
      //console.log("footer", footer);
      footerItems = await footer;
      socialItems = await footer.social;
    });
  });
</script>

<div
  id="wrapper"
  class="w-full h-auto xl:px-148 lg:px-96 md:px-72 bg-on-background-variant-alpha"
>
  <nav class="flex items-center py-32 xl:text-lg lg:text-lg md:text-md">
    <div class="flex flex-grow space-x-32 text-sm">
      {#if footerItems.logo !== undefined}
        <a href="/">
          <img src={footerItems.logo.url} alt="Renue Logo" class="w-120" />
        </a>
        <p>{footerItems.copyright[0].text}</p>
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

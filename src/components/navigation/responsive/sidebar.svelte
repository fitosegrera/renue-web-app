<script>
  //COMPONENTS
  import MenuItem from "./menu-item.svelte";
  import SpacerLine from "../../containers/spacer-line-primary-thin.svelte";

  //PROPS
  export let open;
  export let navbar_data;

  const toggleSidebar = (e) => {
    //console.log("EVENT DISPATCHER", e);
    open = !open;
  };
</script>

{#await navbar_data then navBarItems}
  <aside
    class="w-full h-screen gradient-bg-semidark-secondary-alpha shadow-lg text-left font-semibold"
    class:open
  >
    <nav
      class="flex justify-center items-center max-h-72 py-16 w-full bg-on-background-variant md:px-48 sm:px-16"
    >
      {#if navBarItems["menu-item"] !== undefined}
        <div class="flex-grow h-full items-center text-textColorDark">
          <a class="" href="/">
            {#if navBarItems.logo !== undefined}
              <img src={navBarItems.logo.url} alt="Renue Logo" class="w-200" />
            {/if}
          </a>
        </div>
        <div id="mobile-list" class="w-full h-full pt-96 px-32">
          {#each navBarItems["menu-item"] as item}
            <div
              class="w-full h-120 text-2xl leading-loose text-on-background-variant"
            >
              <MenuItem
                on:openSidebar={toggleSidebar}
                label={item.label}
                url={item.url}
                id={item.label}
                mobile_view={true}
              />
              <SpacerLine />
            </div>
          {/each}
        </div>
      {/if}
    </nav>
  </aside>
{/await}

<style>
  * {
    overflow: hidden;
  }
  aside {
    position: fixed;
    left: -100%;
    transition: left 0.3s ease-in-out;
    filter: opacity(0.95);
    backdrop-filter: blur(12px);
    line-height: 9rem;

    background-color: rgba(43, 29, 56, 0.685);
    z-index: 20;
  }

  #mobile-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 30;
  }

  .open {
    left: 0;
  }

  a {
    background: -webkit-linear-gradient(
      90deg,
      rgba(208, 245, 148, 0.842),
      rgba(230, 132, 205, 0.746)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    text-shadow: 0.15rem 0.25rem 0rem #26bb9b49, 0.8rem 0.8rem 0rem #53013f71;
  }
</style>

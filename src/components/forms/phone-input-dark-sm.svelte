<script>
  //LIBS
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

  //HELPERS
  import { getFlags } from "../../helpers/flags";

  //PROPS
  export let type, label, placeholder, id;

  let items;

  onMount(async () => {
    items = await getData();
  });

  const getData = async () => {
    let objs = [];
    await fetch("/assets/dial-codes.json").then(async (res) => {
      await res.json().then(async (data) => {
        await data.map((obj) => {
          //console.log(obj);
          obj.flag = getFlags(obj.ccode);
          objs.push(obj);
        });
      });
    });
    return objs;
  };
</script>

<div class="my-16 text-md text-on-background-variant">
  <label for={id}>{label}</label>
</div>

<div class="flex w-full h-64 flex-col relative">
  {#await items}
    <h1 class="text-secondary text-xl">Loading...</h1>
  {:then countryData}
    {#if countryData}
      <div class="flex w-full bg-secondary-variant rounded-md">
        <div class="flex select-container w-120">
          <select
            class="w-full h-64 bg-secondary-variant-light px-12 text-md rounded-sm"
          >
            {#each countryData as country}
              <option value={country}>
                <div>
                  {country.flag} &nbsp; {country.mcode}
                </div>
              </option>
            {/each}
          </select>
        </div>
        <!-- <div class="w-thin h-64 bg-tertiary-main mx-12 my-12" /> -->
        <div
          class="flex w-50 h-64 items-center px-16 text-tertiary-main text-md"
        >
          <input
            id="phone"
            type="tel"
            placeholder="000-000-0000"
            class="bg-secondary-variant"
          />
        </div>
      </div>
    {/if}
  {/await}
  <div class="grad-line w-full h-6 gradient-blue-to-green-light-diagonal" />
</div>

<style>
  * {
    overflow: hidden;
  }

  .grad-line {
    position: absolute;
    bottom: 0;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    border: none;
    color: #eee;
    cursor: pointer;
  }

  select:focus {
    outline: none;
    border: 2px solid #a6cf4d;
    color: #eee;
    cursor: pointer;
  }

  input[type="tel"] {
    outline: none;
    border: none;
    color: #eee;
  }

  ::-webkit-input-placeholder {
    color: rgb(200, 200, 200);
  }

  :-moz-placeholder {
    /* Firefox 18- */
    color: #eee;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
    color: #eee;
  }

  :-ms-input-placeholder {
    color: #eee;
  }

  input[type="tel"]:focus {
    outline: none;
    border: 2px solid #a6cf4d;
    color: #eee;
  }
</style>

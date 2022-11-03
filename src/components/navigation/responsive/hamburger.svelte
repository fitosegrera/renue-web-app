<script>
  import { mobile_menu } from "../../../stores/renuestore";
  export let open = false;

  const handleClick = () => {
    open = !open;
    $mobile_menu = open;
  };
</script>

<button class="w-auto cursor-pointer" class:open on:click={handleClick}>
  <svg class="text-secondary-dark" width="48" height="24">
    <line id="top" x1="0" y1="2" x2="48" y2="2" />
    <line id="middle" x1="0" y1="12" x2="48" y2="12" />
    <line id="bottom" x1="0" y1="22" x2="48" y2="22" />
  </svg>
</button>

<style>
  svg {
    min-height: 24px;
    transition: transform 0.3s ease-in-out;
    transform: scale(1.5);
    /* filter: drop-shadow(2px 2px 2px rgb(0, 0, 0, 0.3)); */
  }

  svg line {
    stroke: #122c32;
    stroke-width: 4;
    transition: transform 0.3s ease-in-out;
  }

  button {
    z-index: 40;
  }

  .open svg {
    transform: scale(1.5);
  }

  .open #top {
    transform: translate(16px, -2px) rotate(45deg);
  }

  .open #middle {
    opacity: 0;
  }

  .open #bottom {
    transform: translate(-6px, 12px) rotate(-45deg);
  }

  svg:hover line {
    /* stroke: #00bcea; */
  }
</style>

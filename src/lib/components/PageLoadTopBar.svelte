<script>
  import { navigating } from "$app/stores";
  let h = "inactive";
  $: if ($navigating) {
    //if $navigating is true for more than 300ms, show loading bar
    setTimeout(() => {
      if ($navigating) {
        h = "active";
      } else {
        h = "inactive";
      }
    }, 500);
  } else {
    h = "inactive";
  }
</script>

{#key h}
  <div class="{h} load-indicator transition-all duration-200 w-full overflow-clip">
    <div class="bg-accent h-full rounded-full w-1/3 animate-slide overflow-clip" />
  </div>
{/key}

<style>
  .load-indicator {
    height: 0px;
    transition: height 100ms;
  }

  .load-indicator.active {
    height: 4px;
  }

  .animate-slide {
    animation: slide 1s ease-in-out infinite;
  }

  @keyframes slide {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(300%);
    }
  }
</style>

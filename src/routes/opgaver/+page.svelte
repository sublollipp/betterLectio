<script>
  import { get } from "$lib/js/http.js";
  import { opgaver, hold } from "$lib/js/store.js";
  import { fade } from "svelte/transition";
  import { formatDate } from "$lib/js/realtiveTime.js";
  import { indstillinger } from "$lib/js/store.js";
  import { HoldOversætter } from "$lib/js/HoldOversætter.js";

  let _opgaver = [];

  get("/opgaver").then((data) => {
    $opgaver = data;
  });

  $: if ($opgaver && (selected == "ikkeAfleveredeOpgaver" || selected == "afleveredeOpgaver" || selected == "afsluttedeOpgaver")) {
    _opgaver = sortOpgaver($opgaver);
  }

  function sortOpgaver(__opgaver) {
    let ikkeAfleveredeOpgaver = [];
    let afleveredeOpgaver = [];
    let afsluttedeOpgaver = [];

    //loop trouh __opgaver
    for (const opgave of __opgaver) {
      let _date = opgave.frist.replace("-", "/").split(" ");
      let __date = _date[0].split("/");
      opgave.date = new Date(`${__date[1]}/${__date[0]}/${__date[2]} ${_date[1]}`);
      if (opgave.status == "Afleveret") {
        opgave.class = "btn btn-success";
        afleveredeOpgaver.push(opgave);
        continue;
      } else if (opgave.status == "Afsluttet") {
        opgave.class = "btn";
        afsluttedeOpgaver.push(opgave);
        continue;
      } else if (opgave.status == "Venter") {
        opgave.class = "btn btn-warning";
      } else {
        opgave.class = "btn btn-error";
      }
      ikkeAfleveredeOpgaver.push(opgave);
      afleveredeOpgaver.reverse();
    }

    if (selected == "ikkeAfleveredeOpgaver") {
      return ikkeAfleveredeOpgaver;
    } else if (selected == "afleveredeOpgaver") {
      afleveredeOpgaver.reverse();
      return afleveredeOpgaver;
    } else {
      afsluttedeOpgaver.reverse();
      return afsluttedeOpgaver;
    }
  }

  let selected = "ikkeAfleveredeOpgaver";

  let searchString = "";
  function search() {
    selected = "search";

    let searchResults = [];
    $opgaver.forEach((opgave) => {
      if (opgave.opgavetitel.toLowerCase().includes(searchString.toLowerCase())) {
        searchResults.push(opgave);
      }
    });
    _opgaver = searchResults;
  }
</script>

<div>
  <h1 class="heading">Opgaver</h1>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="flex flex-col sm:flex-row">
    <div class="tabs tabs-boxed w-full justify-between sm:w-fit">
      <button
        class={selected == "ikkeAfleveredeOpgaver" ? "tab- tab tab-active tab-sm sm:tab-md" : "tab tab-sm sm:tab-md"}
        on:click={() => {
          selected = "ikkeAfleveredeOpgaver";
        }}>Ikke-afleverede</button
      >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button
        class={selected == "afleveredeOpgaver" ? "tab tab-active tab-sm sm:tab-md" : "tab tab-sm sm:tab-md"}
        on:click={() => {
          selected = "afleveredeOpgaver";
        }}>Afleverede</button
      >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button
        class={selected == "afsluttedeOpgaver" ? "tab tab-active tab-sm sm:tab-md" : "tab tab-sm sm:tab-md"}
        on:click={() => {
          selected = "afsluttedeOpgaver";
        }}>Afsluttet</button
      >
    </div>
    <input
      type="text"
      placeholder="Søg"
      class="input input-lg mt-4 w-full bg-base-200 sm:mt-0 sm:ml-4 sm:h-10 sm:w-fit"
      bind:value={searchString}
      on:input={search}
    />
  </div>

  {#if _opgaver}
    <ul class="list my-4 lg:hidden">
      {#each _opgaver as opgave}
        <li class="relative flex {opgave.class} mt-2 h-full w-full justify-start text-left font-normal normal-case">
          <a class="mt-2 mb-2" href="/opgave?exerciseid={opgave.exerciseid}">
            <div class="flex items-center">
              <div class="mr-4 flex-none">
                <div>
                  <p><strong>{opgave.frist.split("-")[0]}</strong></p>
                  <p><strong>{opgave.frist.split(" ")[1]}</strong></p>
                </div>
              </div>

              <div class="flex-1">
                <p class="font-bold line-clamp-1 {opgave.status == 'Venter' ? 'mr-16' : ''}">
                  {opgave.opgavetitel}
                </p>
                <p>{HoldOversætter(opgave.hold, $hold)}</p>
                <p class="line-clamp-2 {opgave.status == 'Venter' ? 'mr-16' : ''}">{opgave.opgavenote}</p>
              </div>

              {#if opgave.status == "Venter"}
                <div class="flex items-center">
                  <div class="absolute right-0 mr-4 text-end">
                    <p><strong>Om</strong></p>
                    <p>
                      <strong>{formatDate(opgave.date).replace("om ", "")}</strong>
                    </p>
                  </div>
                </div>
              {/if}
            </div>
          </a>
        </li>
      {/each}
    </ul>
    <div class="hidden overflow-x-hidden lg:flex">
      <table class="table-zebra my-4 table w-full">
        <thead>
          <tr>
            <th>Opgavetitel</th>
            <th>Timer</th>
            <th>Fag</th>
            <th>Frist</th>
            <th>Opgavenote</th>
          </tr>
        </thead>
        <tbody class="w-full">
          {#each _opgaver as opgave (opgave.exerciseid)}
            <tr class="" in:fade={{ duration: 200 }}>
              <td>
                <a href="/opgave?exerciseid={opgave.exerciseid}" class="{opgave.class} btn-xs w-full">
                  <p class="line-clamp-1">{opgave.opgavetitel}</p>
                </a></td
              >
              <td class="bg-">{opgave["elev-tid"]}</td>
              <td class="">{HoldOversætter(opgave.hold, $hold)}</td>
              <td class="w-fit">
                {#if $indstillinger?.opgaver?.visFristAbsolut}
                  <div class="frist w-max btn-xs btn">
                    {opgave.frist}
                  </div>
                {:else}
                  <div class="frist btn-xs w-max btn">
                    {formatDate(opgave.date)}
                  </div>
                {/if}
              </td>
              <td class="text-left" id={opgave.exerciseid}>
                <p class="line-clamp-1">
                  {opgave.opgavenote}
                </p>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<script lang="ts">
  import '../app.postcss';
  import Home from '../icons/Home.svelte';
  import Monitor from '../icons/Monitor.svelte';
  import MusicNote from '../icons/MusicNote.svelte';
  import News from '../icons/News.svelte';
  import Download from '../icons/Download.svelte';
  import Book from '../icons/Book.svelte';
  import BarGraph from '../icons/BarGraph.svelte';
  import Gear from '../icons/Gear.svelte';
  import { onMount } from 'svelte';

  import type { ContextBridge } from '../global';

  let api: ContextBridge.ExposeInMainWorld.api;
  let push = (url: string): void => window.location.replace(url);

  onMount(() => {
    api = (window as any).api;
  });

  let routes = [
    [Home, '/'],
    [Monitor, '/watch'],
    [MusicNote, '/music'],
    [News, '/news'],
    [Download, '/download'],
    [Book, '/library'],
    [BarGraph, '/statistics']
  ];
</script>

<nav class="layout:titlebar drag">
  <svg on:click={() => api.send('titlebar', 'destroy')} class="layout:titlebar-icon no-drag">
    <circle cx="6" cy="6" r="6" fill="#ff5c5c" />
  </svg>
  <svg on:click={() => api.send('titlebar', 'minimize')} class="layout:titlebar-icon no-drag">
    <circle cx="6" cy="6" r="6" fill="#ebbb10" />
  </svg>
  <svg on:click={() => api.send('titlebar', 'resize')} class="layout:titlebar-icon no-drag">
    <circle cx="6" cy="6" r="6" fill="#1ed960" />
  </svg>
</nav>

<br>

<div class="layout:view no-drag">
  <div class="layout:sidebar">
    <div class="layout:sidebar-container">
      {#each routes as route}
        <span on:click={() => push(route[1])}>
          <svelte:component this={route[0]}/>
        </span>
      {/each}
    </div>

    <div class="layout:sidebar-container">
      <span on:click={() => push('/settings')}>
        <Gear />
      </span>
    </div>
  </div>

  <div class="layout:slot">
    <slot />
  </div>
</div>


<script lang="ts">
  import Gear from '../../icons/Gear.svelte';
  import Download from '../../icons/Download.svelte';
  import MusicNote from '../../icons/MusicNote.svelte';

  let options = [
    [Download, 'Download settings', 'download/'],
    [MusicNote, 'Music settings', 'music/']
  ]
</script>

<Gear width={70} height={70} />

<br><br>

{#each options as option}
  <a href="/settings/{option[2]}" class="inline-flex items-center text-indigo-400 hover:text-green-500">
    <svelte:component this={option[0]} width="20" height="20" />
    &nbsp;&nbsp;{option[1]}
  </a>
  <br><br>
{/each}

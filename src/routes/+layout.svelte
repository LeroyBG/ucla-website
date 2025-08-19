<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PUBLIC_SKELETON_URL } from '$env/static/public';
	import DoodlesOverlay from './DoodlesOverlay.svelte';

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window {onmousemove}/>


{#snippet headerNav()}
	<nav class="mx-auto pb-4">
		<ol class="flex gap-4">
			<li><a href="/">home</a></li>
			<li><a href="this-site">this site</a></li>
			<li><a href={PUBLIC_SKELETON_URL} target="_blank">skeleton</a></li>
		</ol>
	</nav>
{/snippet}

<DoodlesOverlay>
	<div class="px-4 sm:px-0 py-2 sm:py-4 mx-auto max-w-md flex flex-col">
		{@render headerNav()}
		{@render children?.()}
	</div>
</DoodlesOverlay>



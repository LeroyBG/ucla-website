<script lang="ts">
	import { onMount } from "svelte";

    let dotdotdot: string = ""
    onMount(() => {
        const interval = setInterval(()=> {
            dotdotdot = dotdotdot.length < 3 ? dotdotdot + "." : "";
        }, 503)
        return () => clearInterval(interval)
    })
    
</script>

{dotdotdot}
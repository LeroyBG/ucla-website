<script>
import EmbedSkeleton from '$lib/EmbedSkeleton.svelte'
import {
    PUBLIC_SKELETON_CLIENT_ID,
    PUBLIC_SKELETON_SERVER_URL,
    PUBLIC_SKELETON_REDIRECT_URI,
    PUBLIC_SKELETON_REPO_URL
} from "$env/static/public"
</script>

<h1 class="font-bold text-center">this page doesn't work right now. check out this page's
    <a href={PUBLIC_SKELETON_REPO_URL} target="_blank">git repo</a> to run it locally.</h1>
<EmbedSkeleton
    SERVER_URL={PUBLIC_SKELETON_SERVER_URL}
    CLIENT_ID={PUBLIC_SKELETON_CLIENT_ID}
    REDIRECT_URI={PUBLIC_SKELETON_REDIRECT_URI} 
/>
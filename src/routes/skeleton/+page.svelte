<script>
import EmbedSkeleton from '$lib/EmbedSkeleton.svelte'
import {
    PUBLIC_SKELETON_CLIENT_ID,
    PUBLIC_SKELETON_SERVER_URL,
    PUBLIC_SKELETON_REDIRECT_URI
} from "$env/static/public"
</script>

<EmbedSkeleton 
    SERVER_URL={PUBLIC_SKELETON_SERVER_URL}
    CLIENT_ID={PUBLIC_SKELETON_CLIENT_ID}
    REDIRECT_URI={PUBLIC_SKELETON_REDIRECT_URI} 
/>
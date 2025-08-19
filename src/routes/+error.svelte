<script lang="ts">
    import { page } from "$app/state";
</script>

<div class="flex justify-center">
    {#if page.status === 404}
        <div class="flex gap-4">
            <p>404 page not found. who sent you here?</p>
        </div>
    {:else}
        error: {page.state} {page.error?.message}
    {/if}
</div>


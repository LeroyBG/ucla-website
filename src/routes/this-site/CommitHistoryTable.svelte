<script lang="ts">
	import { PUBLIC_REPO_URL } from "$env/static/public";
import type { Commit } from "$lib/types/content";
	import { formatCommitDate } from "$lib/util";

    let {
        commits
    }: {
        commits: Commit[]
    } = $props()
</script>

<table class="table-fixed border-separate border-spacing-y-2">
    <thead >
        <tr>
            <th scope="col" class="font-normal">hash</th>
            <th scope="col" class="font-normal">message</th>
            <th scope="col" class="font-normal">date</th>
        </tr>
    </thead>
    <tbody>
        {#each commits as commit}
            <tr>
                <th scope="row" class="flex items-start">
                    <a href={`${PUBLIC_REPO_URL}/commit/${commit.sha}`} target="_blank" class="text-xs">
                        {commit.sha.slice(0, 8)}
                    </a>
                </th>
                <td class="align-top text-xs px-2">{commit.commit.message}</td>
                <td class="text-xs w-20">{commit.commit.author?.date ? formatCommitDate(new Date(commit.commit.author?.date)) : ""}</td>
            </tr>
        {/each}
    </tbody>
</table>
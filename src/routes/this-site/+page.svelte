<script lang="ts">
	import { onMount } from "svelte";
    import {
        PUBLIC_GITHUB_USERNAME,
        PUBLIC_GITHUB_WEBSITE_REPO_NAME
    } from '$env/static/public'
	import DotDotDot from "$lib/DotDotDot.svelte";
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    const repoURL = `https://github.com/${PUBLIC_GITHUB_USERNAME}/${PUBLIC_GITHUB_WEBSITE_REPO_NAME}`
    let commitsState = {
        loading: true,
        error: false,
        commits: []
    }

    let formatCommitDate = (commitDate: string): string => {
        const commitDateObj = new Date(commitDate)
        const now = new Date(Date.now())
        const diffSeconds = (now.getTime() - commitDateObj.getTime()) / 1000
        const diffMinutes = diffSeconds / 60
        const diffHours = diffMinutes / 60
        const diffDays = diffHours / 24
        const diffMonths = diffDays / 31
        const diffYears = diffDays / 365
        let formatted = {
            value: -1,
            unit: ""
        }
        if (diffSeconds < 60) {
            formatted = {
                value: diffSeconds,
                unit: "second"
            }
        } else if (diffMinutes < 60) {
            formatted = {
                value: diffMinutes,
                unit: "minute"
            }
        } else if (diffHours < 24) {
            formatted = {
                value: diffHours,
                unit: "hour"
            }
        } else if (diffDays < 31) {
            formatted = {
                value: diffDays,
                unit: "day"
            }
        } else if (diffDays < 365) {
            formatted = {
                value: diffMonths,
                unit: "month"
            }
        } else {
            formatted = {
                value: diffYears,
                unit: "year"
            }
        }
        return `${Math.floor(formatted.value)} ${formatted.unit}${Math.floor(formatted.value) !== 1 ? 's' : ''} ago`
    }
    onMount(async () => { // Note: ensure the repo is public or this won't work!
        try {
            // console.log(PUBLIC_GITHUB_USERNAME)
            const res = await fetch(`https://api.github.com/repos/${PUBLIC_GITHUB_USERNAME}/${PUBLIC_GITHUB_WEBSITE_REPO_NAME}/commits`, {
                headers: {
                    "Accept": "application/vnd.github+json"
                }
            })
            if (!res.ok) {
                commitsState = {
                    ...commitsState,
                    error: true,
                    loading: false
                }
                return
            }
            const data = await res.json()
            // console.log(data)
            commitsState = {
                ...commitsState,
                commits: data,
                loading: false
            }
        } catch (err) {
            commitsState = {
                ...commitsState,
                loading: false,
                error: true
            }
        }
    })

</script>

<div class="grow w-full h-full flex flex-col items-center align-baseline">
    <div class="w-3/5 grow max-h-72 h-72 min-h-1/4 flex flex-col justify-center items-center">
        <p>
            this site was created with the Svelte JavaScript and Tailwind CSS
            frameworks. check out the commit history for this site's git repo
            below. full source code can be found 
            <a href={repoURL} target="_blank">here</a>.
        </p>
    </div>
    <div class="grow w-3/4 h-full flex flex-col item-center justify-center">
        {#if commitsState.loading || commitsState.error}
            <div class="grow flex justify-center items-center">
                {#if commitsState.loading}
                    <p class="text-center">getting recent commits<DotDotDot/></p>
                {:else}
                    <p class="text-center">something went wrong fetching the repository</p>
                {/if}
            </div>
        {:else}
        <h2 class="text-base font-medium text-center">commit history</h2>
        <table class="table-auto">
            <thead>
                <tr class="pb-2 mt-5">
                    <th class="font-normal">hash</th>
                    <th class="font-normal">message</th>
                    <th class="font-normal">date</th>
                </tr>
            </thead>
            {#each commitsState.commits as commit}
                <tr>
                    <td class="flex items-start px-2 pb-2"><a href={`${repoURL}/commit/${commit.sha}`} target="_blank" class="text-icyLilac-800 decoration-nettleRash-500 decoration-4">{commit.sha.slice(0, 8)}</a></td>
                    <td class="align-top text-sm pr-3">{commit.commit.message}</td>
                    <td class="text-xs w-20">{formatCommitDate(commit.commit.author.date)}</td>
                </tr>
            {/each}
        </table>
        {/if}
    </div>
</div>
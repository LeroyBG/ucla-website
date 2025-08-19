<script lang="ts">
	import type { Commit } from '$lib/types/content';
	import { Octokit } from 'octokit';
	import CommitHistoryTable from './CommitHistoryTable.svelte';
	import { PUBLIC_GITHUB_USERNAME, PUBLIC_REPO_URL, PUBLIC_REPOSITORY_NAME } from '$env/static/public';

	const getCommits = async (): Promise<Commit[]> => {
		const octokit = new Octokit({ request: { fetch: fetch } });
		const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
			owner: PUBLIC_GITHUB_USERNAME,
			repo: PUBLIC_REPOSITORY_NAME,
			headers: {
				'X-GitHub-Api-Version': '2022-11-28'
			}
		});
		return response.data;
	};

    const commitsTask = getCommits()
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-2">
		<h2 class="text-lg">Site Content</h2>
		<p>
			This site was created with
			<a href="https://svelte.dev" target="_blank">SvelteKit</a> +
			<a href="https://tailwindcss.com" target="_blank">Tailwind</a>. I used the
			<a href="https://uchu.style" target="_blank">uchu</a> color palette because it's lit.
		</p>
	</div>

	<div class="flex flex-col gap-2">
		<h2 class="text-lg">Reaching This Site</h2>
		<p>
			This site is deployed on my Raspberry Pi in my room. Because my ISP switches my router's IP
			address perodically, I use
			<a href="https://duckdns.org" target="_blank">duckdns</a> to anchor a static domain name to my
			router's IP.
		</p>
		<p>
			The URLs that duckdns generates are kinda ugly, so I bought this domain name and then pointed
			it to the duckdns name. So the chain of references is:
		</p>
		<code>
			pretty domain name -&gt; duckdns hostname -&gt; router ip address -&gt; Raspberry pi internal
			IP
		</code>
		<p>As of the time of writing, that chain looks like:</p>
		<code>
			leroylightn.ing -&gt; leroy-server.duckdns.org -&gt; (47.156.144.215) -&gt; (192.168.254.204)
		</code>
	</div>
	<div class="flex flex-col gap-2">
		<h2 class="text-lg">Deployment</h2>
		<p>
			Every site within this domain is served from the same device, using nginx as a reverse proxy
			to SvelteKit, Python servers, etc.
		</p>
		<p>
			I use systemd services to control all the servers running on the Pi, that way I can make them
			start automatically whenever I accidentally unplug it, which is often.
		</p>
		<p>
			I have a poor man's CI setup that uses a GitHub webhook to call an API endpoint on this server
			every time I push to the main branch of this repo. It just pulls the latest commits to the Pi
			and then restarts the systemd module that controls this server.
		</p>
	</div>
    
    <div class="flex flex-col gap-2">
            <h2>Commits to <a href={PUBLIC_REPO_URL}> This Repo</a></h2>

        {#await commitsTask then commits}
            <CommitHistoryTable {commits} />
        {:catch}
            <h2>Something went wrong fetching commits :(</h2>
        {/await}
    </div>

    
</div>

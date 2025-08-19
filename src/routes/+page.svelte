<script lang="ts">
    import headshot from "$lib/assets/headshot-cropped.jpg"
    import { PUBLIC_EMAIL, PUBLIC_GITHUB_ACCOUNT_URL, PUBLIC_LINKEDIN_ACCOUNT_URL, PUBLIC_RESUME_LINK } from "$env/static/public";
	import { formatURLForDisplay } from "$lib/util";
</script>

<div class="flex flex-col gap-8">
        <div id="image-and-links" class="flex flex-col items-center gap-4">
            <img src={headshot} alt="professional headshot" class="w-50 rounded-md">
            <h1 class="text-xl">Leroy Betterton Gage</h1>
            <ol class="flex flex-col items-center gap-2">
                <li><a href={PUBLIC_RESUME_LINK} target="_blank">resume</a></li>
                <li><a href="mailto:{PUBLIC_EMAIL}">mrleroybg@gmail.com</a></li>
                <li><a href={PUBLIC_GITHUB_ACCOUNT_URL} target="_blank">{formatURLForDisplay(PUBLIC_GITHUB_ACCOUNT_URL)}</a></li>
                <li><a href={PUBLIC_LINKEDIN_ACCOUNT_URL} target="_blank">{formatURLForDisplay(PUBLIC_LINKEDIN_ACCOUNT_URL)}</a></li>
            </ol>
        </div>
        <div id="intro-text" class="h-full flex flex-col gap-4">
        <p>
            Hi! I'm Leroy :)
        </p>
        <p>
            I'm a computer science graduate from UCLA interested in music, education & pedagogy, 
            and outer space.
        </p>
        <p>Check out my projects on GitHub to see what I'm working on.</p>
        <p>Connect with me on linkedin if that's your thing</p>
    </div>
</div>
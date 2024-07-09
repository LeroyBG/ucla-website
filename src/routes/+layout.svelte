<script>
import "../app.css"

const navItems = [
    ["home", "/#"],
    ["skeleton", "/skeleton"],
    ["this site", "/this-site"]
]
</script>
<div class="min-h-screen bg-cherryPearl-500 flex flex-col">
    <div class="h-20">
        <nav class="w-3/4 h-full">
            <ul class="flex items-center h-full text-theme-dark ml-3">
                {#each navItems as navItem}
                <li class="grow max-w-32"><a href={navItem[1]} class="hover:underline font-normal text-2xl decoration-nettleRash-500 underline-offset-4 decoration-8">{navItem[0]}</a></li>
                {/each}
            </ul>
        </nav>
    </div>
    <div class="w-full grow flex flex-col">
        <slot/>
    </div>
</div>

<script>
import "../app.css"
import { PUBLIC_SKELETON_DEPLOY_URL } from "$env/static/public"

const navItems = [
    ["home", "/#"],
    ["skeleton", PUBLIC_SKELETON_DEPLOY_URL],
    ["this site", "/this-site"]
]
</script>
<div class="min-h-screen flex flex-col">
    <div class="h-20">
        <nav class="w-3/4 h-full">
            <ul class="flex items-center h-full text-theme-dark ml-3">
                <li class="grow max-w-32"><a href="/#" class="hover:underline font-normal text-2xl decoration-nettleRash-500 underline-offset-4 decoration-8">home</a></li>
                <li class="grow max-w-32"><a href={PUBLIC_SKELETON_DEPLOY_URL} target="_blank" class="hover:underline font-normal text-2xl decoration-nettleRash-500 underline-offset-4 decoration-8">skeleton</a></li>
                <li class="grow max-w-32"><a href="/this-site" class="hover:underline font-normal text-2xl decoration-nettleRash-500 underline-offset-4 decoration-8">this site</a></li>
            </ul>
        </nav>
    </div>
    <div class="w-full grow flex flex-col h-full">
        <slot/>
    </div>
</div>

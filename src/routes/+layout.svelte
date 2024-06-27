<script>
import "../app.css"
</script>
<div class="min-h-screen bg-cherryPearl-500 flex flex-col">
    <div class="h-20">
        <nav class="w-3/4 h-full">
            <ul class="flex items-center h-full text-theme-dark">
                <li><a href="/#" class="hover:underline font-normal px-5 text-2xl decoration-nettleRash-500 underline-offset-4 decoration-8">home</a></li>
                <li><a href="/skeleton" class="hover:underline font-normal px-5 text-2xl decoration-nettleRash-500 underline-offset-4 decoration-8">skeleton</a></li>
                <li><a href="/this-site" class="hover:underline font-normal px-5 text-2xl decoration-nettleRash-500 underline-offset-4 decoration-8">this site</a></li>
            </ul>
        </nav>
    </div>
    <div class="w-full grow flex flex-col">
        <slot/>
    </div>
</div>

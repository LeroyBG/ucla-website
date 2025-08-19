<script lang="ts">
    let { children } = $props()

	let mousePosition = $state({ x: 0, y: 0 })

    const onmousemove = (e: MouseEvent) => [mousePosition.x, mousePosition.y] = [e.clientX, e.clientY]
</script>

<svelte:window {onmousemove} />

<div id="doodles" class="pointer-events-none fixed top-0 left-0 w-full h-full z-100">
    <div 
        id="v-line" 
        class="absolute bg-uchu-gray will-change-transform w-[1px] h-full opacity-25" 
        style="transform: translateX({mousePosition.x}px);"
    ></div>
    <div 
        id="h-line" 
        class="absolute bg-uchu-gray will-change-transform h-[1px] w-full opacity-25" 
        style="transform: translateY({mousePosition.y}px);"
    ></div>
    <div 
        id="y-coordinate-display" 
        class="absolute will-change-transform text-uchu-gray opacity-25 text-[10px] p-1" 
        style="transform: translateY({mousePosition.y}px) translateX({mousePosition.x}px)"
    >x: {mousePosition.x}</div>
    <div 
        id="y-coordinate-display" 
        class="absolute will-change-transform text-uchu-gray opacity-25 text-[10px] top-[-30px] left-[-7px]" 
        style="transform: translateY({mousePosition.y}px) translateX({mousePosition.x}px) rotate(-90deg)"
    >y: {mousePosition.y}</div>
</div>

{@render children?.()}
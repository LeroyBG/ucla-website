<script lang="ts">
	import { onMount } from "svelte";


type bigGreetingState = {
    text: string,
    isCode: boolean,
    toggler: boolean,
    computeStyle: () => string,
    lastTemplate: number,
    lastGreeting: number,
    overrideGreeting: boolean
}
// import Github, LinkedIn profile url from .env
const greetings = [
    "hi!",
    "hello!",
    "test",
    "testing",
    "blah",
    "please work"
]

const waysOfPrinting = [
    (m: string) => `console.log("${m}")`, // JS
    (m: string) => `print("${m}")`, // Python
    (m: string) => `printf("${m}");`, // C
    (m: string) => `System.out.println("${m}");`, // Java
    (m: string) => `print_endline "${m}"`, // OCaml
    (m: string) => `std::cout << "${m}\\n";`, // C++
    (m: string) => `write(fd, "${m}", ${m.length + 1});`, // C write to file
    (m: string) => `println!("${m}")` // Rust
]

let bigGreetingState: bigGreetingState = {
    text: "hi!",
    isCode: false,
    toggler: false,
    computeStyle: function () {
        return ((this.isCode && !this.overrideGreeting) ?
            "font-mono font-medium text-2xl text-icyLilac-800"
            :
            "font-sans font-bold text-7xl text-theme-dark")
    },
    lastTemplate: -1,
    lastGreeting: 0,
    overrideGreeting: false
}

const calculateNewCodeGreeting = ({ text, toggler, lastTemplate, lastGreeting }: bigGreetingState): bigGreetingState => {
    if (bigGreetingState.toggler){ // change the greeting
        let newGreeting = Math.floor(Math.random() * greetings.length)
        // avoid getting the same greeting twice
        while (newGreeting === lastGreeting) {
            newGreeting = Math.floor(Math.random() * greetings.length)
        }
        lastGreeting = newGreeting
        text = (waysOfPrinting[lastTemplate])(greetings[lastGreeting])
    } else { // change the template
        let newTemplate = Math.floor(Math.random() * waysOfPrinting.length)
        // avoid getting the same template twice
        while (newTemplate === lastTemplate) {
            newTemplate = Math.floor(Math.random() * waysOfPrinting.length)
        }
        lastTemplate = newTemplate
        text = (waysOfPrinting[lastTemplate])(greetings[lastGreeting])
    }
    toggler = !toggler
    return {
        ...bigGreetingState,
        text: text,
        isCode: true,
        toggler: toggler,
        lastTemplate: lastTemplate,
        lastGreeting: lastGreeting
    }
}

// calculate new text,
// current text starts as empty string
// if we have empty string, start building
// build until we reach desired string
type editOutput = {
    current: string,
    building: boolean,
    finished: boolean,
    typo: boolean,
}

const makeOneEdit = ({current, building, typo }: editOutput, next: string): editOutput => {
    if (typo) {
        return {
            current: current.slice(0, current.length - 1),
            building: true,
            finished: false,
            typo: false
        }
    }
    if (building) {
        if (!Math.floor(Math.random() * 12)) { // 1-in-12 random change we make a typo
            return {
                current: current + String.fromCharCode(Math.floor(Math.random() * 26) + 97), // random char
                building: true, // we're still in build phase, just need to delete temporarily
                finished: false,
                typo: true
            }
        }
        if (current.length === next.length) { // if we finish with this edit
            return {
                current: next,
                building: false,
                finished: true,
                typo: false
            }
        } else {
            return {
                current: next.slice(0, current.length + 1),
                building: true,
                finished: false,
                typo: false
            }
        }
    } else { // we're deleting
        if (current.length === 1) { // if we finish deleting with this edit
            return {
                current: "",
                building: true,
                finished: false,
                typo: false
            }
        } else {
            return {
                current: current.slice(0, current.length - 1),
                building: false,
                finished: false,
                typo: false
            }
        }
    }
}

const delay= (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

onMount(async () => {
    let first = true
    let edit: editOutput
    // Top level page logic
    await delay (5000)
    while (true) {
        let nextGreeting: bigGreetingState
        if (first) {
            // clear big heading
            bigGreetingState = {
            ...bigGreetingState,
            isCode: true,
            text: ""
            }
            // calculate the next greeting
            nextGreeting = calculateNewCodeGreeting(bigGreetingState)
            // make initial edit
            edit = makeOneEdit({
                current: bigGreetingState.text, // the empty string
                building: true,
                typo: false,
                finished: false
            }, nextGreeting.text)
            first = false
        } else {
            nextGreeting = calculateNewCodeGreeting(bigGreetingState)
            // make first delete edit
            edit = makeOneEdit({
                current: bigGreetingState.text,
                building: false,
                typo: false,
                finished: false
            }, nextGreeting.text)
        }
        
        while (!edit.finished) {
            let delayDuration = edit.building ? 140 : 55
            await delay(delayDuration) // wait
            bigGreetingState = {
                ...bigGreetingState,
                text: edit.current + "_",
                isCode: true
            }// make change
            edit = makeOneEdit(edit, nextGreeting.text)
        }
        if (edit.finished) { // make cursor thing blink
            let blinking = false;
            for (let i = 0; i < 6; i++){
                await delay(530)
                bigGreetingState = {
                    ...bigGreetingState,
                    text: blinking ? bigGreetingState.text + "_" : bigGreetingState.text.slice(0, bigGreetingState.text.length - 1),
                    isCode: true
                }
                blinking = !blinking;
            }
        }
    }
})

</script>
<div class="grow w-full h-full flex flex-col items-center">
    <div class="grow h-full w-3/5 flex flex-col justify-center">
        <div class="grow shrink max-h-44" />
        <!-- svelte-ignore a11y-no-static-element-interactions TODO: Fix. I'm not sure what this event means-->
        <div class="h-16 mb-1 {bigGreetingState.isCode ? "flex items-end" : ""}">
            <h1 class={bigGreetingState.computeStyle()}>
                {bigGreetingState.text}
            </h1>
        </div>
        <p class="font-sans text-theme-dark">
            i'm leroy, a fourth-year computer science student at UCLA. i'm
            interested in music, education & pedagogy, and outer space. check out
            my <a href="PLACEHOLDER">Github</a> to see whatever cool projects i'm
            working on; if you like what you see and want to connect
            professionally, here's my <a href="PLACEHOLDER">LinkedIn</a>.
        </p><!-- put a little thing with the current weather? -->
        <div class="grow" />
    </div>
</div>

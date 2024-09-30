/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
			theme: {
				light: "#f2f2e6",
				dark: "#330644"
			},
			cherryPearl: {
				50: "#f8f1ef",
				100: "#fdf8f8",
				200: "#ffffff",
				300: "#ffffff",
				400: "#fffafd",
				500: "#f9e4f4",
				600: "#e2b7de",
				700: "#c281c3",
				800: "#954c9c",
				900: "#652171",
			},
			daisyWhite: {
				50: "#f7f8ef",
				100: "#fcfdf8",
				200: "#ffffff",
				300: "#ffffff",
				400: "#fffef9",
				500: "#f9f3e3",
				600: "#e2ceb6",
				700: "#c39780",
				800: "#9c534c",
				900: "#712130",
			},
			nettleRash: {
				50: "#f0f8ef",
				100: "#f8fdf8",
				200: "#ffffff",
				300: "#ffffff",
				400: "#f9fffb",
				500: "#e3f9e8",
				600: "#b6e2b7",
				700: "#94c380",
				800: "#869c4c",
				900: "#716021",
			},
			icyLilac: {
				50: "#f8eff5",
				100: "#fdf8fc",
				200: "#ffffff",
				300: "#ffffff",
				400: "#f9f9ff",
				500: "#e3e9f9",
				600: "#b6c6e2",
				700: "#8099c3",
				800: "#4c629c",
				900: "#212b71",
			},
			skeletonGreen: {
				900: "#79dd48"
			}
		},
    },
  },
  plugins: [],
}


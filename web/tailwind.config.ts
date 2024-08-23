const { fontFamily } = require("tailwindcss/defaultTheme")
 
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
}
export default config
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#141414",
        "spark":"#FAE153",
        "bgc":"#fff",
        "navbg":"#3498db",
        "not-today":"#ef5777",
        "bigbg":"#7ed6df"
        
      },
      
    },
  },
  plugins: [],
}
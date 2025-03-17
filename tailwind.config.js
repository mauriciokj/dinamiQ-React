/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Cor principal
        secondary: "#818CF8", // Cor secundária
        brand: {
          red: "#FF5A5F",    // Cor do logo (vermelho/coral)
          blue: "#00D1D1",   // Cor do gráfico (azul turquesa)
          gray: "#E6E9EC",   // Cor de fundo cinza da imagem
          teal: "rgb(37, 150, 190)",  // Nova cor azul-esverdeada
        }
      }
    },
  },
  plugins: [],
}

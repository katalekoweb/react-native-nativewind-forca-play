import { Config } from 'tailwindcss'
import { theme } from "./src/shared/themes/theme"

export default {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: theme.colors.background,
        paper: theme.colors.paper,
        text: theme.colors.text,
        primary: theme.colors.primary,
        alert: theme.colors.alert,
        primaryText: theme.colors.primaryText,
        correct: theme.colors.correct,
        wrong: theme.colors.wrong,
      },
      borderRadius: {
        sm: `${theme.corner.small}px`,
        DEFAULT: `${theme.corner.normal}px`,
        lg: `${theme.corner.large}px`
      },
      fontFamily: {
        bold: theme.fonts.family.bold,
        regular: theme.fonts.family.regular,
        italic: theme.fonts.family.italic
      },
      fontSize: {
        sm: `${theme.fonts.sizes.small}px`,
        base: `${theme.fonts.sizes.body}px`,
        lg: `${theme.fonts.sizes.large}px`,
        xl: `${30}px`
      },
      
    },
  },
  plugins: [],
} satisfies Config
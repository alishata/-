import { Inter, JetBrains_Mono, Outfit } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
})

export { inter, jetbrainsMono, outfit }

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anish Anto — AI Engineer & Product Manager',
  description: 'Production-grade AI apps using LLMs, OpenAI & Claude APIs. Officially certified by Anthropic.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

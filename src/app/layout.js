import './globals.css'

export const metadata = {
  title: 'Retinal Disease Diagnostic Portal',
  description: 'AI-powered retinal disease detection using DenseNet169 on Jetson Nano Orin',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
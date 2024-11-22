import { FC, useEffect, useState } from 'react'

const ThemeSelectorDropdown = () => {
  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
  ]

  const [theme, setTheme] = useState('night')

  // Apply the selected theme to the HTML element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="bg-base-200 text-base-content p-8">
      <select
        className="select select-bordered w-full max-w-xs"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}

const App: FC = () => {
  return (
    <div className="min-h-screen bg-base-200 text-base-content p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">OQL Playground</h1>
        <p className="mt-2 text-lg">Explore OQL and SQL with an in-browser database</p>
      </div>

      <ThemeSelectorDropdown />
    </div>
  )
}

export default App

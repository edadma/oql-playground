import { FC, useState, KeyboardEvent } from 'react'
import ThemeSelectorDropdown from './ThemeSelectorDropdown'

const App: FC = () => {
  const [oqlResult, setOqlResult] = useState<Record<string, unknown> | null>(null)
  const [sqlLog, setSqlLog] = useState<string[]>([])

  const handleOqlSubmit = (): void => {
    const mockResult = { data: { message: 'Hello OQL!' } } // Replace with OQL logic
    setOqlResult(mockResult)
  }

  const handleSqlSubmit = (sql: string): void => {
    setSqlLog((prev) => [...prev, `> ${sql}`, 'Query executed successfully.']) // Replace with SQL logic
  }

  const handleSqlKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      handleSqlSubmit(target.value)
      target.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">OQL Playground</h1>
        <p className="mt-2 text-lg">Explore OQL and SQL with an in-browser database</p>
      </div>

      <ThemeSelectorDropdown />

      <div className="grid grid-cols-3 gap-4 mt-4 h-[calc(100vh-240px)]">
        <div className="bg-base-100 p-4 rounded shadow flex flex-col">
          <label className="block mb-2 font-bold">Data Model Input</label>
          <textarea
            className="textarea textarea-bordered w-full flex-grow mb-4 resize-none overflow-y-auto font-mono"
            placeholder="Define your data model here..."
            style={{ minHeight: '200px' }}
          ></textarea>
          <div className="flex gap-2">
            <button className="btn btn-success flex-1">Create Database</button>
            <button className="btn btn-error flex-1">Clear Database</button>
          </div>
        </div>

        <div className="flex flex-col gap-4 h-full">
          <div className="bg-base-100 p-4 rounded shadow flex flex-col flex-1">
            <label className="block mb-2 font-bold">OQL Query Input</label>
            <textarea
              className="textarea textarea-bordered w-full flex-grow font-mono resize-none"
              placeholder="Type OQL query here..."
            ></textarea>
            <button className="btn btn-primary w-full mt-4" onClick={handleOqlSubmit}>
              Run OQL Query
            </button>
          </div>

          <div className="bg-base-100 p-4 rounded shadow flex flex-col flex-1">
            <label className="block mb-2 font-bold">SQL Terminal</label>
            <textarea
              className="textarea textarea-bordered w-full h-20 mb-4 font-mono resize-none"
              placeholder="Type SQL here..."
              onKeyDown={handleSqlKeyDown}
            ></textarea>
            <div className="bg-base-200 p-2 rounded flex-grow overflow-y-auto text-sm font-mono">
              {sqlLog.map((entry, index) => (
                <div key={index}>{entry}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-base-100 p-4 rounded shadow flex flex-col h-full">
          <label className="block mb-2 font-bold">Query Results</label>
          <div className="bg-base-200 p-4 rounded flex-grow overflow-y-auto">
            <pre className="text-sm font-mono h-full">
              {oqlResult ? JSON.stringify(oqlResult, null, 2) : ''}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

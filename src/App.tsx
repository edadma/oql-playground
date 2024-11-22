import { FC, useState, KeyboardEvent, useEffect, useRef } from 'react'
import ThemeSelectorDropdown from './ThemeSelectorDropdown'

const App: FC = () => {
  const [oqlResult, setOqlResult] = useState<Record<string, unknown> | null>(null)
  const [sqlLog, setSqlLog] = useState<string[]>([])
  const [dataModel, setDataModel] = useState<string>('') // State for data model
  const [demoDatabase, setDemoDatabase] = useState<string>('') // State for selected demo database
  const sqlLogRef = useRef<HTMLDivElement>(null) // Reference to the SQL log container

  // Auto-scroll to the bottom when the SQL log changes
  useEffect(() => {
    if (sqlLogRef.current) {
      sqlLogRef.current.scrollTo({ top: sqlLogRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [sqlLog])

  const demoOptions: Record<string, string> = {
    'Simple User DB': 'User { id: ID, name: String, email: String }',
    'Product Inventory': 'Product { id: ID, name: String, price: Float, stock: Int }',
    'Blog Platform': 'Post { id: ID, title: String, content: String, author: ID }',
  }

  const handleDemoSelection = (option: string): void => {
    const model = demoOptions[option]
    setDataModel(model) // Populate data model textarea
    setDemoDatabase(option) // Track selected demo database
    // Automatically trigger database creation logic
    handleCreateDatabase(model)
  }

  const handleCreateDatabase = (model: string): void => {
    setSqlLog((prev) => [
      ...prev,
      `Creating database: ${demoDatabase}`,
      'Database created successfully.',
    ])
    console.log('Database created with data model:', model) // Replace with actual creation logic
  }

  const handleClearDatabase = (): void => {
    setDataModel('') // Clear the data model
    setSqlLog((prev) => [...prev, 'Database cleared.'])
    console.log('Database cleared.') // Replace with actual clear logic
  }

  const handleOqlSubmit = (): void => {
    const mockResult = {
      data: {
        message: ['Hello OQL!'],
      },
    } // Replace with OQL logic
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
    <div className="min-h-screen bg-base-200 text-base-content p-4">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold">OQL Playground</h1>
        <p className="mt-2 text-lg">Explore OQL and SQL with an in-browser database</p>
      </div>

      <div className="bg-base-100 p-2 rounded shadow flex items-center gap-4 mb-4">
        <div>
          <label className="block mb-2 font-bold">Theme Chooser</label>
          <ThemeSelectorDropdown />
        </div>
        <div>
          <label className="block mb-2 font-bold">Demo Chooser</label>
          <select
            className="select select-bordered w-52"
            value={demoDatabase}
            onChange={(e) => handleDemoSelection(e.target.value)}
          >
            {Object.keys(demoOptions).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 h-[calc(100vh-240px)]">
        <div className="bg-base-100 p-2 rounded shadow flex flex-col">
          <label className="block mb-2 font-bold">Data Model Input</label>
          <textarea
            className="textarea textarea-bordered w-full flex-grow mb-4 resize-none overflow-y-auto font-mono"
            placeholder="Define your data model here..."
          ></textarea>
          <div className="flex gap-2">
            <button
              className="btn btn-success flex-1"
              onClick={() => handleCreateDatabase(dataModel)}
            >
              Create Database
            </button>
            <button className="btn btn-error flex-1" onClick={handleClearDatabase}>
              Clear Database
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 h-full">
          <div className="bg-base-100 p-2 rounded shadow flex flex-col flex-1">
            <label className="block mb-2 font-bold">OQL Query Input</label>
            <textarea
              className="textarea textarea-bordered w-full flex-grow font-mono resize-none"
              placeholder="Type OQL query here..."
            ></textarea>
            <button className="btn btn-primary w-full mt-4" onClick={handleOqlSubmit}>
              Run OQL Query
            </button>
          </div>

          <div className="bg-base-100 p-2 rounded shadow flex flex-col flex-1">
            <label className="block mb-2 font-bold">SQL Terminal</label>
            <textarea
              className="textarea textarea-bordered w-full h-10 mb-4 font-mono resize-none"
              placeholder="Type SQL here..."
              onKeyDown={handleSqlKeyDown}
            ></textarea>
            <div className="bg-base-200 p-2 rounded flex-grow overflow-y-auto text-sm font-mono h-0">
              {sqlLog.map((entry, index) => (
                <div key={index}>{entry}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-base-100 p-2 rounded shadow flex flex-col h-full">
          <label className="block mb-2 font-bold">Query Results</label>
          <div className="bg-base-200 rounded flex-grow overflow-y-auto h-0">
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

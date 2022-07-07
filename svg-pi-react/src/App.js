import {useState, useEffect} from 'react'
import ProgressBar from './components/ProgressBar/ProgressBar'
import './App.css'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const loadingDuration = 3000 // 3 seconds

  useEffect(() => {
    let loadingTimeout = setTimeout(() => {
      if (loading >= 100) return
      setProgress(progress + 1)
    }, loadingDuration/100)

    if (progress === 100) {
      setLoading(false)
    }

    return () => {
      clearTimeout(loadingTimeout)
    }
  }, [progress, loading])

  useEffect(() => {
    document.title = "SVG Pi implemented in React"
  }, [])

  return (
    <div className="App">
      {loading ? (
        <ProgressBar progress={progress} trackWidth={5} indicatorWidth={10} />
      ) : (
        <div
          className="App-content"
        >
          <p>This main page of the app shows up as soon as the <strong title="ProgressBar">SVG Pi</strong> hits 100%.</p>
        </div>
      )}
    </div>
  )
}

export default App

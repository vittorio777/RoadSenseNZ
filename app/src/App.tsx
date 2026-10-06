import { Analytics } from '@vercel/analytics/react';
import PracticePage from './components/PracticePage';

function App() {
  return (
    <div className="App">
      <PracticePage />
      <Analytics />
    </div>
  )
}

export default App
import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('Chargement...')

  useEffect(() => {
    fetch('http://localhost:3010/')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(() => setMessage('Erreur : impossible de joindre le backend'))
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>{message}</h1>
    </div>
  )
}

export default App
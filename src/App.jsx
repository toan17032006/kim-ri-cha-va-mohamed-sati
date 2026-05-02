import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [kimHealth, setKimHealth] = useState(100)
  const [mohamedHealth, setMohamedHealth] = useState(100)
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
  const [kimAttacking, setKimAttacking] = useState(false)
  const [mohamedAttacking, setMohamedAttacking] = useState(false)
  const [battleLog, setBattleLog] = useState([])

  const addLog = (message) => {
    setBattleLog(prev => [...prev.slice(-4), message])
  }

  const kimAttack = () => {
    if (gameOver) return
    setKimAttacking(true)
    const damage = Math.floor(Math.random() * 15) + 10
    setMohamedHealth(prev => {
      const newHealth = Math.max(0, prev - damage)
      if (newHealth === 0) {
        setGameOver(true)
        setWinner('kim')
        addLog(`Kim Ri Cha thúc củi chỏ gây ${damage} sát thương! WINNER!`)
      } else {
        addLog(`Kim Ri Cha thúc củi chỏ gây ${damage} sát thương! Mohamed còn ${newHealth} HP`)
      }
      return newHealth
    })
    setTimeout(() => setKimAttacking(false), 300)
  }

  const mohamedAttack = () => {
    if (gameOver) return
    setMohamedAttacking(true)
    const damage = Math.floor(Math.random() * 15) + 10
    setKimHealth(prev => {
      const newHealth = Math.max(0, prev - damage)
      if (newHealth === 0) {
        setGameOver(true)
        setWinner('mohamed')
        addLog(`Mohamed Sati bóp cổ gây ${damage} sát thương! WINNER!`)
      } else {
        addLog(`Mohamed Sati bóp cổ gây ${damage} sát thương! Kim còn ${newHealth} HP`)
      }
      return newHealth
    })
    setTimeout(() => setMohamedAttacking(false), 300)
  }

  const resetGame = () => {
    setKimHealth(100)
    setMohamedHealth(100)
    setGameOver(false)
    setWinner(null)
    setBattleLog([])
  }

  return (
    <div className="game-container">
      <h1 className="title">🥊 KIM RI CHA vs MOHAMED SATI 🥊</h1>
      
      <div className="arena">
        <div className={`fighter ${kimAttacking ? 'attacking' : ''}`}>
          <div className="fighter-info">
            <h2>Kim Ri Cha</h2>
            <span className="jersey">🇵🇹 Số 7</span>
          </div>
          <div className="avatar">🥋</div>
          <div className="health-bar">
            <div className="health-fill kim-health" style={{ width: `${kimHealth}%` }}></div>
          </div>
          <div className="health-text">{kimHealth}/100</div>
          <div className="skill-name">Võ Lạc Đà</div>
          <button 
            className="attack-btn kim-btn" 
            onClick={kimAttack} 
            disabled={gameOver}
          >
            💪 Thúc Củi Chỏ
          </button>
        </div>

        <div className="vs">VS</div>

        <div className={`fighter ${mohamedAttacking ? 'attacking' : ''}`}>
          <div className="fighter-info">
            <h2>Mohamed Sati</h2>
            <span className="jersey">🇦🇷 Số 10</span>
          </div>
          <div className="avatar">🥋</div>
          <div className="health-bar">
            <div className="health-fill mohamed-health" style={{ width: `${mohamedHealth}%` }}></div>
          </div>
          <div className="health-text">{mohamedHealth}/100</div>
          <div className="skill-name">Võ Chile</div>
          <button 
            className="attack-btn mohamed-btn" 
            onClick={mohamedAttack} 
            disabled={gameOver}
          >
            🤜 Bóp Cổ
          </button>
        </div>
      </div>

      {gameOver && (
        <div className="game-over">
          {winner === 'kim' ? (
            <div className="result kim-wins">
              <h2>🏆 KIM RI CHA THẮNG! 🏆</h2>
              <p className="taunt">ĂN VẠ VỚI BỐ FIFA</p>
            </div>
          ) : (
            <div className="result mohamed-wins">
              <h2>🏆 MOHAMED SATI THẮNG! 🏆</h2>
              <p className="taunt">CÚT VỀ ĐƯỜNG HẦM</p>
            </div>
          )}
          <button className="restart-btn" onClick={resetGame}>🔄 Chơi Lại</button>
        </div>
      )}

      <div className="battle-log">
        <h3>📜 Lịch Sử Trận Đấu</h3>
        {battleLog.map((log, index) => (
          <div key={index} className="log-entry">{log}</div>
        ))}
      </div>
    </div>
  )
}

export default App

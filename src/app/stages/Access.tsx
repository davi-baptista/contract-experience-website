import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import StageContainer from '../../components/StageContainer'

const statusMessages = [
  'Estabelecendo canal seguro…',
  'Validando credenciais…',
  'Decodificando transmissão…',
  'Sincronizando frequências…',
  'Canal seguro estabelecido',
]

type Props = {
  onReset?: () => void
}

export default function Access({ onReset }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(-1) // Começa com -1
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isSeeking, setIsSeeking] = useState(false)

  // FASE DE DECODIFICAÇÃO
  useEffect(() => {
    let currentStep = 0
    const totalSteps = 12
    
    // Primeiro, mostra a mensagem inicial
    setStatusIndex(0)
    setProgress(0)
    
    const interval = setInterval(() => {
      currentStep += 1
      const newProgress = (currentStep / totalSteps) * 100
      setProgress(newProgress)

      // Muda a mensagem a cada 2-3 steps
      if (currentStep <= 3) {
        setStatusIndex(1) // Validando credenciais
      } else if (currentStep <= 6) {
        setStatusIndex(2) // Decodificando transmissão
      } else if (currentStep <= 9) {
        setStatusIndex(3) // Sincronizando frequências
      } else if (currentStep === totalSteps) {
        setStatusIndex(4) // Canal seguro estabelecido
        clearInterval(interval)
        setTimeout(() => setReady(true), 500)
      }
    }, 600) // Aumentei para 600ms para ficar mais lento

    return () => clearInterval(interval)
  }, [])

  // Configurações do áudio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      if (!isSeeking) {
        setCurrentTime(audio.currentTime)
      }
    }

    const handleEnded = () => {
      setPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [isSeeking])

  const handlePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.volume = volume
      audio.play().then(() => setPlaying(true))
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setCurrentTime(value)
    
    if (audioRef.current) {
      audioRef.current.currentTime = value
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleSeekStart = () => setIsSeeking(true)
  const handleSeekEnd = () => setIsSeeking(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Garante que não tentamos acessar um índice inválido
  const currentMessage = statusIndex >= 0 && statusIndex < statusMessages.length 
    ? statusMessages[statusIndex] 
    : ''

  return (
    <StageContainer>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring" }}
        style={{ 
          textAlign: 'center',
          maxWidth: 700,
          width: '100%'
        }}
      >
        {/* HEADER DE SISTEMA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '50px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-soft)',
            position: 'relative'
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '11px',
              letterSpacing: '3px',
              color: 'var(--gold-primary)',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <span style={{ opacity: 0.7 }}>//</span> UBERS OMERTÀ
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              fontSize: '11px',
              letterSpacing: '2px',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-body)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: ready ? 'var(--gold-primary)' : 'var(--text-dim)',
                boxShadow: ready ? '0 0 10px var(--gold-primary)' : 'none'
              }} />
              <span>TRANSMISSÃO {ready ? 'ATIVA' : 'INICIANDO'}</span>
            </div>
          </motion.div>
        </div>

        {/* TÍTULO PRINCIPAL */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ marginBottom: '40px' }}
        >
          <h1 style={{ 
            fontSize: '3rem',
            fontWeight: 300,
            letterSpacing: '4px',
            marginBottom: '15px',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-heading)'
          }}>
            ACESSO{' '}
            <span style={{ 
              color: 'var(--gold-primary)',
              fontWeight: 400
            }}>
              CONCEDIDO
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: 'var(--text-muted)',
              maxWidth: '600px',
              margin: '0 auto',
              fontFamily: 'var(--font-body)'
            }}
          >
            Agora você tem acesso ao que não é feito para o público comum.
            <br />
            <span style={{ color: 'var(--gold-primary)', fontWeight: 500 }}>
              A transmissão está preparada.
            </span>
          </motion.p>
        </motion.div>

        {/* LINHA DECORATIVA */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.2, duration: 1.5 }}
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--gold-primary), transparent)',
            margin: '40px 0'
          }}
        />

        {/* PLAYER DE TRANSMISSÃO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, type: "spring" }}
          style={{
            background: 'var(--glass-bg)',
            border: '2px solid var(--border-soft)',
            borderRadius: '8px',
            padding: '40px',
            position: 'relative',
            boxShadow: 'var(--shadow-deep)',
            marginBottom: '40px',
            backdropFilter: 'blur(8px)'
          }}
        >
          {/* ELEMENTOS DECORATIVOS */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '15px',
            height: '15px',
            borderTop: '1px solid var(--gold-primary)',
            borderLeft: '1px solid var(--gold-primary)',
            opacity: 0.5
          }} />
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '15px',
            height: '15px',
            borderTop: '1px solid var(--gold-primary)',
            borderRight: '1px solid var(--gold-primary)',
            opacity: 0.5
          }} />

          {/* CABEÇALHO DO PLAYER */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-soft)'
          }}>
            <div>
              <div style={{
                fontSize: '12px',
                letterSpacing: '2px',
                color: 'var(--gold-primary)',
                marginBottom: '5px',
                fontFamily: 'var(--font-mono)'
              }}>
                TRANSMISSÃO EXCLUSIVA
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                letterSpacing: '1px',
                fontFamily: 'var(--font-heading)'
              }}>
                MENSAGEM DO DON
              </div>
            </div>
            
            <div style={{
              fontSize: '10px',
              color: 'var(--text-dim)',
              letterSpacing: '2px',
              padding: '8px 15px',
              border: '1px solid var(--border-soft)',
              borderRadius: '4px',
              background: 'var(--bg-black-soft)',
              fontFamily: 'var(--font-mono)'
            }}>
              CONFIDENCIAL
            </div>
          </div>

          {/* BARRA DE PROGRESSO DO CARREGAMENTO */}
          {!ready && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ marginBottom: '30px' }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
              }}>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--text-dim)',
                  letterSpacing: '1px',
                  fontFamily: 'var(--font-body)'
                }}>
                  PREPARANDO TRANSMISSÃO
                </span>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--gold-primary)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {Math.round(progress)}%
                </span>
              </div>
              
              <div style={{
                height: '4px',
                background: 'var(--bg-black)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-primary))',
                    borderRadius: '2px'
                  }}
                />
              </div>

              {/* STATUS MESSAGES */}
              <motion.p
                key={statusIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontSize: '12px',
                  color: 'var(--gold-primary)',
                  marginTop: '15px',
                  fontFamily: 'var(--font-mono)',
                  height: '20px',
                  minHeight: '20px'
                }}
              >
                {currentMessage && `▸ ${currentMessage}`}
              </motion.p>
            </motion.div>
          )}

          {/* CONTROLES DO PLAYER */}
          {ready && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* CONTROLES PRINCIPAIS */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '30px',
                marginBottom: '30px'
              }}>
                {/* BOTÃO PLAY/PAUSE */}
                <motion.button
                  onClick={handlePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--bg-black-soft), var(--bg-black))',
                    border: '2px solid var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: playing ? '0 0 30px var(--gold-primary)40' : 'none',
                    position: 'relative',
                    padding: 0,
                    margin: 0
                  }}
                >
                  {/* ÍCONE PLAY */}
                  {!playing ? (
                    <div style={{
                      width: 0,
                      height: 0,
                      borderTop: '12px solid transparent',
                      borderBottom: '12px solid transparent',
                      borderLeft: '20px solid var(--gold-primary)',
                      marginLeft: '3px',
                    }} />
                  ) : (
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '24px',
                        background: 'var(--gold-primary)',
                        borderRadius: '1px'
                      }} />
                      <div style={{
                        width: '8px',
                        height: '24px',
                        background: 'var(--gold-primary)',
                        borderRadius: '1px'
                      }} />
                    </div>
                  )}
                </motion.button>
              </div>

              {/* BARRA DE PROGRESSO DA MÚSICA */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                  fontSize: '11px',
                  color: 'var(--text-dim)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  onMouseDown={handleSeekStart}
                  onMouseUp={handleSeekEnd}
                  onTouchStart={handleSeekStart}
                  onTouchEnd={handleSeekEnd}
                  style={{
                    width: '100%',
                    height: '4px',
                    WebkitAppearance: 'none',
                    background: 'var(--bg-black)',
                    borderRadius: '2px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                <style>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: var(--gold-primary);
                    cursor: pointer;
                    box-shadow: 0 0 10px var(--gold-primary);
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: var(--gold-primary);
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 0 10px var(--gold-primary);
                  }
                `}</style>
              </div>

              {/* CONTROLE DE VOLUME */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: 'var(--text-dim)',
                  minWidth: '70px',
                  textAlign: 'right',
                  fontFamily: 'var(--font-body)'
                }}>
                  VOLUME
                </span>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    flex: 1,
                    height: '4px',
                    WebkitAppearance: 'none',
                    background: `linear-gradient(90deg, var(--gold-primary) ${volume * 100}%, var(--bg-black) ${volume * 100}%)`,
                    borderRadius: '2px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
                
                <span style={{
                  fontSize: '11px',
                  color: 'var(--gold-primary)',
                  minWidth: '40px',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* RODAPÉ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            fontSize: '10px',
            color: 'var(--text-dim)',
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-soft)',
            letterSpacing: '1px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <p style={{ margin: 0, lineHeight: '1.6' }}>
            TRANSMISSÃO ID: {Date.now().toString(36).toUpperCase()} • 
            FREQUÊNCIA: {Math.floor(Math.random() * 9000) + 1000}kHz •
            {playing ? ' TRANSMITINDO' : ' EM ESPERA'}
          </p>
        </motion.div>

        {/* AUDIO HIDDEN */}
        <audio 
          ref={audioRef} 
          src="/audio/previa.mp3" 
          preload="metadata"
        />
      </motion.div>
      
      {/* Botão de reset (opcional, pode ser bem discreto) */}
      {onReset && (
        <motion.button
          onClick={onReset}
          whileHover={{ opacity: 0.8 }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'transparent',
            border: '1px solid var(--border-soft)',
            color: 'var(--text-dim)',
            fontSize: '10px',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: 0.5,
            transition: 'opacity 0.3s',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '1px'
          }}
        >
          REINICIAR EXPERIÊNCIA
        </motion.button>
      )}
    </StageContainer>
  )
}
import StageContainer from '../../components/StageContainer'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  onNext: () => void
}

export default function Invite({ onNext }: Props) {
  const [showElements, setShowElements] = useState<boolean[]>([false, false, false, false])
  const [buttonEnabled, setButtonEnabled] = useState(false)

  useEffect(() => {
    // Sequência de aparecimento dos elementos
    const timers = [
      setTimeout(() => {
        setShowElements(prev => {
          const newArr = [...prev]
          newArr[0] = true
          return newArr
        })
      }, 800),
      
      setTimeout(() => {
        setShowElements(prev => {
          const newArr = [...prev]
          newArr[1] = true
          return newArr
        })
      }, 2000),
      
      setTimeout(() => {
        setShowElements(prev => {
          const newArr = [...prev]
          newArr[2] = true
          return newArr
        })
      }, 3200),
      
      setTimeout(() => {
        setShowElements(prev => {
          const newArr = [...prev]
          newArr[3] = true
          return newArr
        })
        // Botão ativa 0.5s após a última frase
        setTimeout(() => {
          setButtonEnabled(true)
        }, 1200)
      }, 4400)
    ]

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  const handleClick = () => {
    if (!buttonEnabled) return
    
    // Efeito de clique
    setButtonEnabled(false)
    onNext()
  }

  return (
    <StageContainer>
      <div style={{ 
        textAlign: 'center', 
        maxWidth: 600,
        position: 'relative'
      }}>
        {/* Efeito de brilho dourado sutil no fundo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            background: `radial-gradient(circle, var(--gold-primary)33 0%, transparent 70%)`,
            pointerEvents: 'none'
          }}
        />

        {/* Linha de entrada superior dourada */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 0.3 }}
          style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, var(--gold-primary), transparent)`,
            marginBottom: 40
          }}
        />

        {/* Cabeçalho elegante */}
        <div style={{ marginBottom: 30 }}>
          {showElements[0] && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 15,
                marginBottom: 20
              }}
            >
              <div style={{ 
                width: 20, 
                height: 20, 
                border: `1px solid var(--gold-primary)`,
                transform: 'rotate(45deg)',
                opacity: 0.7
              }} />
              <span style={{ 
                color: 'var(--gold-primary)', 
                fontSize: '1.1rem',
                letterSpacing: '3px',
                fontWeight: 300,
                fontFamily: 'var(--font-body)'
              }}>
                CONVITE EXCLUSIVO
              </span>
              <div style={{ 
                width: 20, 
                height: 20, 
                border: `1px solid var(--gold-primary)`,
                transform: 'rotate(45deg)',
                opacity: 0.7
              }} />
            </motion.div>
          )}
        </div>

        {/* Textos com aparecimento sequencial */}
        <div style={{ marginBottom: 10 }}>
          {showElements[1] && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              style={{ 
                fontSize: '1.5rem', 
                fontWeight: 300, 
                letterSpacing: '0.8px',
                lineHeight: 1.4,
                fontFamily: 'var(--font-heading)'
              }}
            >
              <span style={{ 
                color: 'var(--text-primary)',
                background: `linear-gradient(90deg, var(--text-primary), var(--gold-primary))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 20px rgba(201, 162, 39, 0.3)'
              }}>
                Você foi convidado a sentar à mesa.
              </span>
            </motion.p>
          )}
        </div>

        <div style={{ marginBottom: 10 }}>
          {showElements[2] && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              style={{ 
                fontSize: '1.5rem', 
                fontWeight: 300, 
                letterSpacing: '0.8px',
                lineHeight: 1.4,
                fontFamily: 'var(--font-heading)'
              }}
            >
              <span style={{ 
                color: 'var(--gold-soft)',
                textShadow: '0 0 15px var(--gold-primary)'
              }}>
                Aqui, decisões valem mais que talento.
              </span>
            </motion.p>
          )}
        </div>

        <div style={{ marginBottom: 40 }}>
          {showElements[3] && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              style={{ 
                fontSize: '1.5rem', 
                fontWeight: 400, 
                letterSpacing: '0.8px',
                lineHeight: 1.4,
                fontFamily: 'var(--font-heading)'
              }}
            >
              <span style={{ 
                color: 'var(--gold-primary)',
                fontWeight: 500,
                textShadow: '0 0 20px var(--gold-primary)'
              }}>
                Cada movimento tem um preço.
              </span>
            </motion.p>
          )}
        </div>

        {/* Linha de entrada inferior dourada */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 5 }}
          style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, var(--gold-primary), transparent)`,
            marginBottom: 40
          }}
        />

        {/* Botão dourado - SÓ APARECE QUANDO PRONTO */}
        {buttonEnabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0
            }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              onClick={handleClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px var(--gold-primary)'
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: 20,
                padding: '18px 40px',
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, var(--bg-black-soft), var(--bg-black), var(--bg-black-soft))',
                color: 'var(--gold-primary)',
                border: '2px solid var(--gold-primary)',
                borderRadius: '8px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'var(--font-body)',
                letterSpacing: '1.5px',
                fontWeight: 500,
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Efeito de brilho dourado no botão */}
              <motion.div
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '60%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, var(--gold-primary)20, transparent)',
                  pointerEvents: 'none'
                }}
              />
              
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 12,
                position: 'relative',
                zIndex: 1
              }}>
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ fontSize: '1.3rem' }}
                >
                  💎
                </motion.span>
                ACEITAR CONVITE
                <span style={{ fontSize: '1.3rem', opacity: 0.7 }}>→</span>
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Texto de instrução sutil em dourado */}
        {buttonEnabled && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1, duration: 1 }}
            style={{
              fontSize: '0.9rem',
              marginTop: 25,
              color: 'var(--gold-primary)',
              fontStyle: 'italic',
              letterSpacing: '1px',
              fontFamily: 'var(--font-body)'
            }}
          >
            Este convite é válido por tempo limitado
          </motion.p>
        )}

        {/* Elementos decorativos nos cantos */}
        {showElements[3] && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 3, duration: 1 }}
              style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: 30,
                height: 30,
                borderTop: '1px solid var(--gold-primary)',
                borderLeft: '1px solid var(--gold-primary)',
                pointerEvents: 'none'
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 3.2, duration: 1 }}
              style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: 30,
                height: 30,
                borderTop: '1px solid var(--gold-primary)',
                borderRight: '1px solid var(--gold-primary)',
                pointerEvents: 'none'
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 3.4, duration: 1 }}
              style={{
                position: 'absolute',
                bottom: '20%',
                left: '10%',
                width: 30,
                height: 30,
                borderBottom: '1px solid var(--gold-primary)',
                borderLeft: '1px solid var(--gold-primary)',
                pointerEvents: 'none'
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 3.6, duration: 1 }}
              style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: 30,
                height: 30,
                borderBottom: '1px solid var(--gold-primary)',
                borderRight: '1px solid var(--gold-primary)',
                pointerEvents: 'none'
              }}
            />
          </>
        )}
      </div>
    </StageContainer>
  )
}
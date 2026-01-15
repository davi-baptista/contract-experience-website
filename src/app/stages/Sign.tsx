import { useState, useEffect, useRef } from 'react'
import StageContainer from '../../components/StageContainer'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  onConfirm: () => void
  onCancel: () => void
}

export default function Sign({ onConfirm, onCancel }: Props) {
  const [name, setName] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [shakeField, setShakeField] = useState(false)
  const [step, setStep] = useState<'intro' | 'input' | 'ready'>('intro')
  
  const canSign = name.trim().length >= 3
  const nameLengthRef = useRef(name.length)

  // Atualiza ref sempre que name mudar
  useEffect(() => {
    nameLengthRef.current = name.length
  }, [name])

  // Gerenciamento do step com setTimeout
  useEffect(() => {
    const introTimer = setTimeout(() => {
      setStep('input')
    }, 1500)
    
    return () => clearTimeout(introTimer)
  }, [])

  // Atualiza step quando name tiver 3+ caracteres
  useEffect(() => {
    if (name.length >= 3 && step === 'input') {
      const readyTimer = setTimeout(() => {
        setStep('ready')
      }, 300)
      return () => clearTimeout(readyTimer)
    }
  }, [name, step])

  // Mostra warning após delay quando começar a digitar
  useEffect(() => {
    if (name.length === 1) {
      const warningTimer = setTimeout(() => {
        setShowWarning(true)
      }, 800)
      return () => clearTimeout(warningTimer)
    } else if (name.length === 0) {
      setShowWarning(false)
    }
  }, [name.length])

  const handleNameChange = (value: string) => {
    setName(value)
  }

  const handleSubmit = () => {
    if (!canSign) {
      setShakeField(true)
      const shakeTimer = setTimeout(() => setShakeField(false), 500)
      return () => clearTimeout(shakeTimer)
    }
    onConfirm()
  }

  const handleCancel = () => {
    const confirmed = window.confirm('Você tem certeza que deseja recusar o contrato? Esta ação é irreversível.')
    if (confirmed) {
      onCancel()
    }
  }

  return (
    <StageContainer>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring" }}
        style={{
          maxWidth: 600,
          width: '100%',
          padding: '50px',
          background: 'var(--glass-bg)',
          border: '2px solid var(--border-soft)',
          borderRadius: '2px',
          textAlign: 'center',
          position: 'relative',
          boxShadow: 'var(--shadow-deep)',
          backdropFilter: 'blur(8px)'
        }}
      >
        {/* Elementos decorativos de canto */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: 15,
          height: 15,
          borderTop: '1px solid var(--gold-primary)',
          borderLeft: '1px solid var(--gold-primary)',
          opacity: 0.7
        }} />
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 15,
          height: 15,
          borderTop: '1px solid var(--gold-primary)',
          borderRight: '1px solid var(--gold-primary)',
          opacity: 0.7
        }} />
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          width: 15,
          height: 15,
          borderBottom: '1px solid var(--gold-primary)',
          borderLeft: '1px solid var(--gold-primary)',
          opacity: 0.7
        }} />
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 15,
          height: 15,
          borderBottom: '1px solid var(--gold-primary)',
          borderRight: '1px solid var(--gold-primary)',
          opacity: 0.7
        }} />

        {/* CABEÇALHO */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '10px',
            letterSpacing: '3px',
            color: 'var(--text-dim)',
            marginBottom: '25px',
            paddingBottom: '15px',
            borderBottom: '1px solid var(--border-soft)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)' }}>// UBERS • FINAL STEP</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--gold-primary)',
              boxShadow: '0 0 8px var(--gold-primary)'
            }} />
            <span style={{ fontFamily: 'var(--font-body)' }}>ASSINATURA REQUERIDA</span>
          </div>
        </motion.div>

        {/* TÍTULO PRINCIPAL */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            letterSpacing: '3px',
            marginBottom: '20px',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-heading)'
          }}
        >
          <AnimatePresence mode="wait">
            {step === 'intro' && (
              <motion.span
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'block' }}
              >
                A MESA ESTÁ POSTA.
              </motion.span>
            )}
            {step !== 'intro' && (
              <motion.span
                key="final"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'block' }}
              >
                ÚLTIMO PASSO
              </motion.span>
            )}
          </AnimatePresence>
        </motion.h1>

        {/* LINHA DECORATIVA */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.8, duration: 1.5 }}
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--gold-primary), transparent)',
            margin: '30px 0'
          }}
        />

        {/* MENSAGEM */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            fontSize: '15px',
            lineHeight: '1.8',
            color: 'var(--text-muted)',
            marginBottom: '40px',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'var(--font-body)'
          }}
        >
          Sua assinatura representa o aceite total e irrevogável dos termos do contrato.
          <br />
          <span style={{ color: 'var(--gold-primary)', fontWeight: 500 }}>
            Após confirmar, não há retorno.
          </span>
        </motion.p>

        {/* CAMPO DE ASSINATURA */}
        <AnimatePresence>
          {step !== 'intro' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: '40px', textAlign: 'left' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: canSign ? 'var(--gold-primary)' : 'var(--text-dim)',
                  boxShadow: canSign ? '0 0 10px var(--gold-primary)' : 'none'
                }} />
                <label
                  style={{
                    fontSize: '11px',
                    letterSpacing: '2px',
                    color: 'var(--text-dim)',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  ASSINATURA DIGITAL
                </label>
              </div>

              <motion.div
                animate={shakeField ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Digite seu nome completo aqui…"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: 'var(--bg-black-soft)',
                    border: `2px solid ${isFocused ? 'var(--gold-primary)' : 'var(--border-soft)'}`,
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    outline: 'none',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.3s ease',
                    boxShadow: isFocused ? '0 0 0 1px var(--gold-primary)40' : 'none'
                  }}
                />
              </motion.div>

              <AnimatePresence>
                {showWarning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '12px',
                      padding: '10px',
                      background: 'var(--bg-black)80',
                      borderRadius: '4px',
                      borderLeft: '3px solid var(--gold-primary)'
                    }}>
                      <span style={{ color: 'var(--gold-primary)', fontSize: '14px' }}>⚠</span>
                      <p style={{
                        fontSize: '11px',
                        color: 'var(--text-dim)',
                        margin: 0,
                        lineHeight: '1.5',
                        fontFamily: 'var(--font-body)'
                      }}>
                        Sua assinatura será registrada permanentemente no sistema.
                        Certifique-se de que está pronto para prosseguir.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTADOR DE CARACTERES */}
        {step !== 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{
              fontSize: '11px',
              color: 'var(--text-dim)',
              marginBottom: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <span>
              {name.length}/3 CARACTERES MÍNIMOS
            </span>
            <span style={{ 
              color: canSign ? 'var(--gold-primary)' : 'var(--text-dim)',
              fontWeight: canSign ? 600 : 400
            }}>
              {canSign ? '✓ PRONTO PARA ASSINAR' : '✗ INCOMPLETO'}
            </span>
          </motion.div>
        )}

        {/* BOTÕES */}
        <AnimatePresence>
          {step !== 'intro' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {/* BOTÃO DE CONFIRMAÇÃO */}
              <motion.button
                onClick={handleSubmit}
                disabled={!canSign}
                whileHover={canSign ? { 
                  scale: 1.02,
                  boxShadow: '0 0 40px var(--gold-primary)30'
                } : {}}
                whileTap={canSign ? { scale: 0.98 } : {}}
                style={{
                  padding: '20px 40px',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  background: canSign 
                    ? 'linear-gradient(135deg, var(--bg-black-soft), var(--bg-black))'
                    : 'var(--bg-black-soft)',
                  color: canSign ? 'var(--gold-primary)' : 'var(--text-dim)',
                  border: canSign 
                    ? '2px solid var(--gold-primary)' 
                    : '2px solid var(--text-dim)',
                  borderRadius: '4px',
                  cursor: canSign ? 'pointer' : 'not-allowed',
                  textTransform: 'uppercase',
                  position: 'relative',
                  overflow: 'hidden',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.3s ease'
                }}
              >
                {canSign ? (
                  <>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                      <span style={{ fontSize: '1.3rem' }}>✍️</span>
                      CONFIRMAR ASSINATURA
                      <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>→</span>
                    </span>
                    <motion.div
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '40%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, var(--gold-primary)10, transparent)',
                        pointerEvents: 'none'
                      }}
                    />
                  </>
                ) : (
                  'DIGITE SEU NOME COMPLETO'
                )}
              </motion.button>

              {/* BOTÃO DE CANCELAMENTO */}
              <motion.button
                onClick={handleCancel}
                whileHover={{ 
                  opacity: 0.8,
                  color: 'var(--text-primary)'
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  padding: '15px',
                  position: 'relative',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase'
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>
                  RECUSAR CONTRATO E SAIR
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '1px',
                    background: 'var(--text-dim)'
                  }}
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RODAPÉ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            fontSize: '10px',
            color: 'var(--text-dim)',
            textAlign: 'center',
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-soft)',
            letterSpacing: '1px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <p style={{ margin: 0, lineHeight: '1.6' }}>
            SESSÃO {new Date().getTime().toString().slice(-6)} • 
            ÚLTIMA ATUALIZAÇÃO: {new Date().toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </motion.div>
      </motion.div>
    </StageContainer>
  )
}
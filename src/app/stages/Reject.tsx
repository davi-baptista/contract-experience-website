import { motion } from 'framer-motion'
import StageContainer from '../../components/StageContainer'
import { useEffect, useState } from 'react'

type Props = {
  onExit: () => void
}

export default function Reject({ onExit }: Props) {
  const [showElements, setShowElements] = useState(false)
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    // Elementos aparecem após 0.5s
    const timer = setTimeout(() => {
      setShowElements(true)
    }, 500)

    // Countdown para saída automática
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          setTimeout(() => onExit(), 300)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(countdownInterval)
    }
  }, [onExit])

  return (
    <StageContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          maxWidth: 600,
          width: '100%',
          padding: '50px',
          background: 'var(--glass-bg)',
          border: '2px solid var(--border-soft)',
          boxShadow: 'var(--shadow-deep)',
          backdropFilter: 'blur(8px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Efeito de desfoque/desvanecimento */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, var(--gold-primary) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Linhas de corte nos cantos */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: 30,
          height: 30,
          borderTop: '1px solid var(--gold-dark)',
          borderLeft: '1px solid var(--gold-dark)',
          opacity: 0.3
        }} />
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 30,
          height: 30,
          borderTop: '1px solid var(--gold-dark)',
          borderRight: '1px solid var(--gold-dark)',
          opacity: 0.3
        }} />

        {/* CABEÇALHO */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '10px',
            letterSpacing: '3px',
            color: 'var(--text-dim)',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '1px solid var(--border-soft)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)' }}>// UBERS • REJEIÇÃO</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--gold-dark)',
              opacity: 0.5
            }} />
            <span>ACESSO NEGADO</span>
          </div>
        </motion.div>

        {/* ÍCONE/X */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 0.8, type: "spring", damping: 15 }}
          style={{
            width: '80px',
            height: '80px',
            border: '2px solid var(--gold-dark)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 40px',
            position: 'relative'
          }}
        >
          {/* X estilizado */}
          <div style={{
            width: '40px',
            height: '2px',
            background: 'var(--gold-dark)',
            transform: 'rotate(45deg)',
            position: 'absolute'
          }} />
          <div style={{
            width: '40px',
            height: '2px',
            background: 'var(--gold-dark)',
            transform: 'rotate(-45deg)',
            position: 'absolute'
          }} />
        </motion.div>

        {/* MENSAGEM PRINCIPAL */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: showElements ? 1 : 0 }}
          transition={{ delay: 1 }}
          style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            letterSpacing: '3px',
            marginBottom: '20px',
            color: 'var(--text-primary)',
            textTransform: 'uppercase'
          }}
        >
          DECISÃO REGISTRADA
        </motion.h1>

        {/* LINHA DIVISÓRIA */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 1.2, duration: 1.5 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--gold-dark), transparent)',
            margin: '30px 0'
          }}
        />

        {/* MENSAGEM SECUNDÁRIA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showElements ? 1 : 0 }}
          transition={{ delay: 1.4 }}
          style={{ marginBottom: '40px' }}
        >
          <p style={{
            fontSize: '15px',
            lineHeight: '1.8',
            color: 'var(--text-muted)',
            marginBottom: '15px',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Você optou por não prosseguir com o contrato.
            <br />
            <span style={{ color: 'var(--gold-soft)', fontWeight: 500 }}>
              O acesso ao sistema foi permanentemente revogado.
            </span>
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2 }}
            style={{
              fontSize: '12px',
              fontStyle: 'italic',
              color: 'var(--text-dim)',
              marginTop: '30px',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '1px'
            }}
          >
            Algumas portas se fecham apenas uma vez.
          </motion.p>
        </motion.div>

        {/* CONTADOR REGRESSIVO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showElements ? 1 : 0 }}
          transition={{ delay: 1.8 }}
          style={{
            marginBottom: '40px',
            padding: '20px',
            background: 'rgba(18, 17, 15, 0.5)',
            border: '1px solid var(--border-soft)',
            borderRadius: '4px'
          }}
        >
          <div style={{
            fontSize: '11px',
            letterSpacing: '2px',
            color: 'var(--text-dim)',
            marginBottom: '10px',
            fontFamily: 'var(--font-mono)'
          }}>
            SESSAO SENDO ENCERRADA
          </div>
          
          <div style={{
            fontSize: '24px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--gold-dark)',
            fontWeight: 500
          }}>
            00:{countdown.toString().padStart(2, '0')}
          </div>
          
          <div style={{
            fontSize: '10px',
            color: 'var(--text-dim)',
            marginTop: '10px',
            fontFamily: 'var(--font-mono)'
          }}>
            Redirecionamento automático em {countdown} segundo{countdown !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* BOTÃO DE SAÍDA IMEDIATA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: showElements ? 1 : 0 }}
          transition={{ delay: 2.2 }}
          onClick={onExit}
          whileHover={{ 
            scale: 1.05,
            borderColor: 'var(--gold-soft)',
            color: 'var(--gold-soft)'
          }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'transparent',
            border: '1px solid var(--gold-dark)',
            color: 'var(--text-dim)',
            fontSize: '12px',
            letterSpacing: '2px',
            cursor: 'pointer',
            padding: '15px 40px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>
            ENCERRAR SESSÃO AGORA
          </span>
          <motion.div
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '1px',
              background: 'var(--gold-dark)'
            }}
          />
        </motion.button>

        {/* RODAPÉ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.5 }}
          style={{
            fontSize: '9px',
            color: 'var(--text-dim)',
            textAlign: 'center',
            marginTop: '50px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-soft)',
            letterSpacing: '1px',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <p style={{ margin: 0, lineHeight: '1.6' }}>
            SESSÃO #{Date.now().toString(36).toUpperCase()} • 
            STATUS: REJEITADO • 
            REGISTRO: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </motion.div>
      </motion.div>
    </StageContainer>
  )
}
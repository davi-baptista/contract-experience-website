import { useEffect, useState } from 'react'
import StageContainer from '../../components/StageContainer'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  onNext: () => void
}

export default function Contract({ onNext }: Props) {
  const clauses = [
    {
      title: 'O SILÊNCIO (OMERTÀ)',
      text: 'O silêncio é nossa moeda mais valiosa. O que é visto, ouvido ou realizado dentro da organização jamais deve ser compartilhado com o mundo exterior. Violações resultam em rescisão imediata e definitiva.',
      severity: 5
    },
    {
      title: 'A LEALDADE ABSOLUTA',
      text: 'A hierarquia é sagrada. Ordens não são sugestões. A lealdade ao sistema precede qualquer interesse pessoal, familiar ou legal.',
      severity: 5
    },
    {
      title: 'A PERMANÊNCIA',
      text: 'A entrada é opcional. A saída, inexistente. Ao aceitar os termos, o associado compreende que este vínculo não possui data de expiração.',
      severity: 4
    },
    {
      title: 'O RISCO',
      text: 'Todo participante assume total responsabilidade pelos riscos inerentes ao sistema. Sacrifícios serão exigidos. O fracasso de um compromete todos.',
      severity: 4
    }
  ]

  const [visibleCount, setVisibleCount] = useState(0)
  const [statusText, setStatusText] = useState('Verificando integridade do documento…')
  const [showSeal, setShowSeal] = useState(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  // 🔐 Texto confidencial rotativo (apenas antes da 1ª cláusula)
  useEffect(() => {
    if (visibleCount !== 0) return

    const messages = [
      'Verificando integridade do documento…',
      'Validando credenciais de acesso…',
      'Descriptografando conteúdo…',
      'Aplicando assinatura digital…',
      'Contrato liberado. Leia com atenção.'
    ]

    let index = 0
    const interval = setInterval(() => {
      index++
      if (index < messages.length) {
        setStatusText(messages[index])
      } else {
        clearInterval(interval)
      }
    }, 1200)

    return () => clearInterval(interval)
  }, [visibleCount])

  // ⏳ Revelação ritualística das cláusulas
  useEffect(() => {
    if (visibleCount < clauses.length) {
      const timer = setTimeout(() => {
        setVisibleCount((v) => v + 1)
      }, visibleCount === 0 ? 5500 : 1200)

      return () => clearTimeout(timer)
    } else {
      // Todas as cláusulas foram reveladas
      setTimeout(() => {
        setShowSeal(true)
      }, 800)
      setTimeout(() => {
        setIsButtonEnabled(true)
      }, 1500)
    }
  }, [visibleCount, clauses.length])

  // Componente de linha decorativa
  const DecorativeLine = () => (
    <div style={{
      height: 1,
      background: 'linear-gradient(90deg, transparent, var(--gold-primary), transparent)',
      margin: '30px 0'
    }} />
  )

  return (
    <StageContainer>
      <div
        style={{
          maxHeight: '85vh',
          maxWidth: 780,
          width: '100%',
          overflowY: 'auto',
          padding: '40px',
          background: 'var(--bg-black-soft)',
          border: '2px solid var(--border-soft)',
          borderRadius: '2px',
          position: 'relative',
          boxShadow: 'var(--shadow-deep)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--gold-primary) var(--bg-black)'
        }}
      >
        {/* Efeito de papel antigo no fundo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(var(--bg-black) 2px, transparent 2px),
            linear-gradient(90deg, var(--bg-black) 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.03,
          pointerEvents: 'none'
        }} />

        {/* Linhas de segurança nos cantos */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: 30,
          height: 30,
          borderTop: '1px solid var(--gold-primary)',
          borderLeft: '1px solid var(--gold-primary)',
          opacity: 0.5
        }} />
        <div style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 30,
          height: 30,
          borderTop: '1px solid var(--gold-primary)',
          borderRight: '1px solid var(--gold-primary)',
          opacity: 0.5
        }} />
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          width: 30,
          height: 30,
          borderBottom: '1px solid var(--gold-primary)',
          borderLeft: '1px solid var(--gold-primary)',
          opacity: 0.5
        }} />
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 30,
          height: 30,
          borderBottom: '1px solid var(--gold-primary)',
          borderRight: '1px solid var(--gold-primary)',
          opacity: 0.5
        }} />

        {/* CABEÇALHO CONFIDENCIAL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '10px',
            letterSpacing: '3px',
            color: 'var(--text-dim)',
            marginBottom: '40px',
            paddingBottom: '15px',
            borderBottom: '1px solid var(--border-soft)'
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)' }}>// UBERS • OMERTÀ</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)' }}>NÍVEL 1</span>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--gold-primary)',
              boxShadow: '0 0 10px var(--gold-primary)'
            }} />
            <span style={{ fontFamily: 'var(--font-body)' }}>ACESSO RESTRITO</span>
          </div>
        </div>

        {/* TÍTULO PRINCIPAL */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: '2.8rem',
              fontWeight: 300,
              letterSpacing: '4px',
              marginBottom: '10px',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-heading)'
            }}
          >
            CONTRATO DE ADESÃO
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: '1.2rem',
              color: 'var(--gold-primary)',
              letterSpacing: '3px',
              marginBottom: '8px',
              fontWeight: 300,
              fontFamily: 'var(--font-heading)'
            }}
          >
            AO SISTEMA UBERS
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontSize: '11px',
              color: 'var(--text-dim)',
              letterSpacing: '2px',
              marginTop: '15px',
              fontFamily: 'var(--font-mono)'
            }}
          >
            DOCUMENTO CONFIDENCIAL • TRANSMISSÃO MONITORADA
          </motion.p>
        </div>

        <DecorativeLine />

        {/* TEXTO DE STATUS ANTES DAS CLÁUSULAS */}
        {visibleCount === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '40px 0',
              marginBottom: '30px'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              marginBottom: '20px'
            }}>
              {/* Indicador de carregamento */}
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid var(--gold-primary)',
                borderRadius: '50%',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <motion.div
                  animate={{ 
                    rotate: 360,
                    transition: { 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "linear" 
                    } 
                  }}
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'conic-gradient(transparent, var(--gold-primary), transparent)'
                  }}
                />
              </div>
              <span style={{
                fontSize: '13px',
                letterSpacing: '1px',
                color: 'var(--gold-primary)',
                fontFamily: 'var(--font-mono)'
              }}>
                {statusText}
              </span>
            </div>
            
            <p style={{
              fontSize: '11px',
              color: 'var(--text-dim)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontFamily: 'var(--font-body)'
            }}>
              Este documento está protegido por criptografia de nível militar.
              Qualquer tentativa de cópia, impressão ou compartilhamento será registrada e punida.
            </p>
          </motion.div>
        )}

        {/* CLÁUSULAS */}
        <AnimatePresence>
          {clauses.slice(0, visibleCount).map((clause, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{
                marginBottom: '35px',
                position: 'relative',
                paddingLeft: '25px'
              }}>
                {/* Marcador de severidade */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '5px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, var(--gold-soft) 30%, var(--gold-primary) 70%)',
                  boxShadow: '0 0 8px var(--gold-primary)'
                }} />
                
                {/* TÍTULO DA CLÁUSULA - Agora em Inter (font-body) */}
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)', // Inter para melhor legibilidade
                  letterSpacing: '1.5px', // Um pouco menos espaçado
                  marginBottom: '12px',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{
                    color: 'var(--gold-primary)',
                    fontSize: '12px',
                    fontWeight: 400,
                    fontFamily: 'var(--font-mono)' // Mono para o número
                  }}>
                    CLÁUSULA {index + 1}
                  </span>
                  {clause.title}
                </h3>
                
                {/* TEXTO DA CLÁUSULA - Inter com peso mais leve */}
                <p style={{
                  fontSize: '14px',
                  fontFamily: 'var(--font-body)', // Inter para melhor leitura
                  fontWeight: 300, // Mais leve para texto corrido
                  lineHeight: '1.8',
                  color: 'var(--text-muted)',
                  marginBottom: '0',
                  paddingLeft: '5px',
                  borderLeft: '1px solid var(--border-soft)'
                }}>
                  {clause.text}
                </p>
              </div>
              
              {index < visibleCount - 1 && <DecorativeLine />}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* SELO DE APROVAÇÃO */}
        {showSeal && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            style={{
              textAlign: 'center',
              margin: '40px 0',
              padding: '30px 0'
            }}
          >
            <div style={{
              display: 'inline-block',
              position: 'relative',
              padding: '30px 50px',
              border: '2px solid var(--gold-primary)',
              borderRadius: '4px',
              background: 'linear-gradient(45deg, var(--bg-black) 30%, var(--bg-black-soft) 100%)'
            }}>
              {/* Anéis concêntricos estáticos */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                border: '1px solid var(--gold-primary)30',
                borderRadius: '50%'
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70px',
                height: '70px',
                border: '1px solid var(--gold-primary)50',
                borderRadius: '50%'
              }} />
              
              <span style={{
                display: 'block',
                fontSize: '12px',
                color: 'var(--gold-primary)',
                letterSpacing: '3px',
                marginBottom: '10px',
                fontFamily: 'var(--font-mono)'
              }}>
                DOCUMENTO VERIFICADO
              </span>
              <span style={{
                display: 'block',
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '1px',
                fontFamily: 'var(--font-heading)'
              }}>
                TODAS AS CLÁUSULAS APROVADAS
              </span>
              <span style={{
                display: 'block',
                fontSize: '10px',
                color: 'var(--text-dim)',
                marginTop: '10px',
                letterSpacing: '2px',
                fontFamily: 'var(--font-mono)'
              }}>
                PRONTO PARA ASSINATURA
              </span>
            </div>
          </motion.div>
        )}

        {/* BOTÃO DE ASSINATURA */}
        {visibleCount === clauses.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isButtonEnabled ? 1 : 0.5, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginTop: '40px' }}
          >
            <motion.button
              onClick={isButtonEnabled ? onNext : undefined}
              disabled={!isButtonEnabled}
              whileHover={isButtonEnabled ? { 
                scale: 1.02,
                boxShadow: '0 0 30px var(--gold-primary)30'
              } : {}}
              whileTap={isButtonEnabled ? { scale: 0.98 } : {}}
              style={{
                padding: '20px 60px',
                fontSize: '1.1rem',
                fontWeight: 500,
                letterSpacing: '2px',
                background: isButtonEnabled 
                  ? 'linear-gradient(135deg, var(--bg-black), var(--bg-black-soft))'
                  : 'var(--bg-black)',
                color: isButtonEnabled ? 'var(--gold-primary)' : 'var(--text-dim)',
                border: isButtonEnabled 
                  ? '2px solid var(--gold-primary)' 
                  : '2px solid var(--text-dim)',
                borderRadius: '4px',
                cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.3s ease'
              }}
            >
              {isButtonEnabled ? (
                <>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.2rem' }}>✍️</span>
                    ASSINAR CONTRATO
                    <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>→</span>
                  </span>
                  <motion.div
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '50%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, var(--gold-primary)15, transparent)',
                      pointerEvents: 'none'
                    }}
                  />
                </>
              ) : (
                'AGUARDE...'
              )}
            </motion.button>
            
            {isButtonEnabled && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontSize: '11px',
                  color: 'var(--gold-primary)',
                  marginTop: '15px',
                  letterSpacing: '1px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                Ao assinar, você concorda irrevogavelmente com todos os termos acima
              </motion.p>
            )}
          </motion.div>
        )}

        {/* RODAPÉ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: visibleCount > 0 ? 1 : 0 }}
          transition={{ delay: 1 }}
          style={{
            fontSize: '10px',
            color: 'var(--text-dim)',
            textAlign: 'center',
            marginTop: '50px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-soft)',
            letterSpacing: '1px',
            lineHeight: '1.8',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span>TRANSAÇÃO ID: {Date.now().toString(36).toUpperCase()}</span>
            <span>•</span>
            <span>VERSÃO: 7.2</span>
            <span>•</span>
            <span>IP TRACKED</span>
          </div>
          <p>
            Documento monitorado em tempo real • Reprodução não autorizada é crime • Todas as sessões são registradas
          </p>
        </motion.div>
      </div>
    </StageContainer>
  )
}
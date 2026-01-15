import { useState, useEffect } from 'react'
import Invite from './stages/Invite'
import Contract from './stages/Contract'
import Sign from './stages/Sign'
import Reject from './stages/Reject'
import Access from './stages/Access'

type Stage = 'INVITE' | 'CONTRACT' | 'SIGN' | 'REJECT' | 'ACCESS'

export default function Experience() {
  // Tenta carregar o estágio salvo, ou começa no INVITE
  const [stage, setStage] = useState<Stage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ubers_contract_stage')
      if (saved && ['INVITE', 'CONTRACT', 'SIGN', 'REJECT', 'ACCESS'].includes(saved)) {
        return saved as Stage
      }
    }
    return 'INVITE'
  })

  // Salva o estágio sempre que mudar
  useEffect(() => {
    localStorage.setItem('ubers_contract_stage', stage)
  }, [stage])

  // Função para resetar completamente (útil para quando a pessoa terminar)
  const resetExperience = () => {
    localStorage.removeItem('ubers_contract_stage')
    setStage('INVITE')
  }

  return (
    <>
      {/* CONVITE */}
      {stage === 'INVITE' && (
        <Invite onNext={() => setStage('CONTRACT')} />
      )}

      {/* CONTRATO */}
      {stage === 'CONTRACT' && (
        <Contract onNext={() => setStage('SIGN')} />
      )}

      {/* ASSINATURA */}
      {stage === 'SIGN' && (
        <Sign
          onConfirm={() => setStage('ACCESS')}
          onCancel={() => setStage('REJECT')}
        />
      )}

      {/* RECUSA */}
      {stage === 'REJECT' && (
        <Reject onExit={() => setStage('INVITE')} />
      )}

      {/* ACESSO CONCEDIDO */}
      {stage === 'ACCESS' && <Access onReset={resetExperience} />}
    </>
  )
}
import { motion } from 'framer-motion'

type Props = {
  index: number
  title: string
  text: string
}

export default function Clause({ index, title, text }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 1fr',
        gap: '24px',
        marginBottom: '56px',
      }}
    >
      {/* NÚMERO DA CLÁUSULA */}
      <div
        style={{
          width: 40,
          height: 40,
          border: '1px solid var(--gold-primary)',
          color: 'var(--gold-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        {index}
      </div>

      {/* CONTEÚDO */}
      <div>
        <h3
          style={{
            margin: 0,
            marginBottom: 10,
            fontSize: 14,
            letterSpacing: 0.8,
            fontWeight: 500,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.9)',
            fontFamily: 'serif',
          }}
        >
          CLÁUSULA {index} — {title}
        </h3>

        <p
          style={{
            margin: 0,
            lineHeight: 1.9,
            color: 'rgba(255,255,255,0.72)',
            fontSize: 14,
          }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  )
}

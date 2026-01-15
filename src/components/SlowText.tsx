import { motion } from 'framer-motion'

type Props = {
  text: string
  delay?: number
}

export default function SlowText({ text, delay = 0 }: Props) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
      style={{ marginBottom: 24, lineHeight: 1.6 }}
    >
      {text}
    </motion.p>
  )
}

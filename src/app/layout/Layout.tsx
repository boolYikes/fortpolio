import { Box } from '@mui/material'
import Header from '../../components/Header.tsx'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />

      <Box component="main" flex={1} overflow="auto" px={2} py={2}>
        {children}
      </Box>
    </Box>
  )
}

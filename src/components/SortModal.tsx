import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useProjects } from '../app/store/ProjectContext'

interface Props {
  open: boolean
  onClose: () => void
}

export default function SortModal({ open, onClose }: Props) {
  const { sortMode, setSortMode } = useProjects()

  function choose(mode: 'date-desc' | 'alpha') {
    setSortMode(mode)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Sort</DialogTitle>

      <DialogContent>
        <List>
          <ListItemButton
            selected={sortMode === 'date-desc'}
            onClick={() => choose('date-desc')}
          >
            <ListItemText primary="Recent (Date Desc)" />
          </ListItemButton>

          <ListItemButton
            selected={sortMode === 'alpha'}
            onClick={() => choose('alpha')}
          >
            <ListItemText primary="Alphabetical" />
          </ListItemButton>
        </List>
      </DialogContent>
    </Dialog>
  )
}

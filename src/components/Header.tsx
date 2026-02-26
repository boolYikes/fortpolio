import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
} from '@mui/material'
import {useState} from 'react'
import FilterModal from './FilterModal'
import SortModal from './SortModal'
import ProfileModal from './ProfileModal'

export default function Header() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          {/* LEFT SIDE */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              alt="GitHub Avatar"
              src="https://github.com/boolYikes.png"
              sx={{ cursor: 'pointer' }}
              onClick={() => setProfileOpen(true)}
            />

            <Typography
              variant="h6"
              sx={{ cursor: 'pointer' }}
              onClick={() => setProfileOpen(true)}
            >
              boolYikes
            </Typography>
          </Box>

          {/* RIGHT SIDE */}
          <Box ml="auto" display="flex" gap={2}>
            <Button variant="outlined" onClick={() => setFilterOpen(true)}>
              Filter
            </Button>

            <Button variant="outlined" onClick={() => setSortOpen(true)}>
              Sort
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)} />

      <SortModal open={sortOpen} onClose={() => setSortOpen(false)} />

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  )
}

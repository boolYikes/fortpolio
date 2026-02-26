import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Link,
} from '@mui/material'

interface GithubLink {
  label: string
  url: string
  isPrivate?: boolean
}

interface Props {
  open: boolean
  onClose: () => void
}

const githubLinks: GithubLink[] = [
  {
    label: 'Main GitHub',
    url: 'https://github.com/boolYikes',
    isPrivate: true
  },
  {
    label: 'GitHub for learning',
    url: 'https://github.com/classroom-dee',
    isPrivate: false
  },
//   {
//     label: 'Work GitHub',
//     url: 'https://github.com/***',
//     isPrivate: true,
//   },
]

export default function ProfileModal({
  open,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Links</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3}>
          {githubLinks.map((link) => (
            <Box key={link.url}>
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Link>

              {link.isPrivate && (
                <Typography
                    variant="body2"
                    color="warning"
                >
                    [Private] For source code viewing, please contact the owner
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import {
  Box,
  Button,
  CircularProgress,
  Typography,
  IconButton,
  Fab,
} from '@mui/material'
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import ListIcon from '@mui/icons-material/List'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { markdownModules } from '../content/markdownRegistry'
import { useProjects } from '../app/store/ProjectContext'

import 'github-markdown-css/github-markdown.css'

function extractContent(raw: string) {
  const match = raw.match(/^---[\s\S]*?---/)
  if (!match) return raw
  return raw.slice(match[0].length)
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const prevRef = useRef<{
    selectedTags: string[]
    sortMode: string
  } | null>(null)

  function sameTags(a: string[], b: string[]) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    return true
  }

  const { visibleProjects, loading, selectedTags, sortMode } = useProjects()

  const [content, setContent] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  // id invalid compared to curr filtered list
  const currentIndex = visibleProjects.findIndex((p) => p.id === id)

  // proj don't exist in curr visible list
  useEffect(() => {
    if (loading || !id) return
    const exists = visibleProjects.some((p) => p.id === id)

    setNotFound(!exists)
  }, [id, visibleProjects, loading])

  // only load valid markdown
  useEffect(() => {
    async function load() {
      if (!id || notFound) return

      const path = Object.keys(markdownModules).find((p) =>
        p.endsWith(`${id}.md`),
      )

      if (!path) {
        setNotFound(true)
        return
      }

      const raw = (await markdownModules[path]!()) as string
      setContent(extractContent(raw))
    }
    load()
  }, [id, notFound])

  // if filter or sort changes while in detail view
  useEffect(() => {
    if (prevRef.current === null) {
      prevRef.current = { selectedTags, sortMode }
      return
    }

    const prev = prevRef.current
    const changed =
      prev.sortMode !== sortMode || !sameTags(prev.selectedTags, selectedTags)

    // update snapshot first (avoid loops)
    prevRef.current = { selectedTags, sortMode }

    if (changed) {
      navigate('/')
    }
  }, [selectedTags, sortMode, navigate])

  if (notFound) {
    return (
      <Box textAlign="center">
        <Typography>Project not found.</Typography>
        <Button onClick={() => navigate('/')}>To the list</Button>
      </Box>
    )
  }

  if (!content) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  const prev = currentIndex > 0 ? visibleProjects[currentIndex - 1] : null

  const next =
    currentIndex >= 0 && currentIndex < visibleProjects.length - 1
      ? visibleProjects[currentIndex + 1]
      : null

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {/* FIXED LEFT ARROW */}
      {prev && (
        <IconButton
          onClick={() => navigate(`/project/${prev.id}`)}
          sx={{
            position: 'fixed',
            left: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            // fontSize: 32,
            // minWidth: 0,
            bgcolor: 'background.paper',
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-50%) scale(1.05)',
            },
            zIndex: 10,
          }}
        >
          <ArrowBackIosNew fontSize="small" />
        </IconButton>
      )}

      {/* FIXED RIGHT ARROW */}
      {next && (
        <IconButton
          onClick={() => navigate(`/project/${next.id}`)}
          sx={{
            position: 'fixed',
            right: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            // fontSize: 32,
            // minWidth: 0,
            bgcolor: 'background.paper',
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-50%) scale(1.05)',
            },
            zIndex: 10,
          }}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      )}

      {/* FIXED BOTTOM BUTTON */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          '&:hover': {
            transform: 'translateX(-50%) scale(1.05)',
          },
        }}
      >
        <Fab
          variant="extended"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ boxShadow: 6 }}
        >
          <ListIcon sx={{ mr: 1 }} />
          To the list
        </Fab>
      </Box>

      {/* MAIN CONTENT WRAPPER */}
      <Box
        width="100%"
        maxWidth="900px"
        sx={{
          px: 2,
          pt: 4,
          pb: 12, // 🔥 space for fixed bottom button
        }}
      >
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.palette.mode === 'dark' ? '#0d1117' : '#ffffff',
            border:
              theme.palette.mode === 'dark'
                ? '1px solid #30363d'
                : '1px solid #d0d7de',
            borderRadius: '6px',
            padding: 4,
          })}
        >
          <Box className="markdown-body" sx={{ overflowWrap: 'anywhere' }}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <SyntaxHighlighter
                      style={oneLight}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { markdownModules } from '../content/markdownRegistry'
import { useProjects } from '../app/store/ProjectContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
    <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
      {/* Top Back */}
      <Button onClick={() => navigate('/')}>To the list</Button>

      {/* Content with prev/next */}
      <Box display="flex" width="100%" maxWidth="900px" gap={2}>
        {/* Previous */}
        <Box display="flex" alignItems="center" minWidth="60px">
          {prev && (
            <Button
              onClick={() => navigate(`/project/${prev.id}`)}
              sx={{ fontSize: 32 }}
            >
              ◀
            </Button>
          )}
        </Box>

        {/* Markdown */}
        <Box
          className="markdown-body"
          flex={1}
          sx={{ overflowWrap: 'anywhere' }}
        >
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

        {/* Next */}
        <Box
          display="flex"
          alignItems="center"
          minWidth="60px"
          justifyContent="flex-end"
        >
          {next && (
            <Button
              onClick={() => navigate(`/project/${next.id}`)}
              sx={{ fontSize: 32 }}
            >
              ▶
            </Button>
          )}
        </Box>
      </Box>

      {/* Bottom Back */}
      <Button onClick={() => navigate('/')}>To the list</Button>
    </Box>
  )
}

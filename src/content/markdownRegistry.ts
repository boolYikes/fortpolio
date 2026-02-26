// Lazy load raw markdown modules
export const markdownModules = import.meta.glob(
  '/src/content/markdowns/*.md',
  { query: '?raw', import: 'default' }
)

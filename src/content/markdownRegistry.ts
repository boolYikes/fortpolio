// Lazy load raw markdown modules
export const markdownModules = import.meta.glob('/src/content/markdowns/*.md', {
  query: '?raw',
  import: 'default',
})

export const imageModules = import.meta.glob(
  '/src/content/markdowns/**/*.{png,jpg,jpeg,gif,svg,webp}',
  { eager: true, import: 'default' },
)

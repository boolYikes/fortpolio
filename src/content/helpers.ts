import { defaultSchema } from 'rehype-sanitize'

/**
 * Converts a UTC timestamp string like "[2025-06-01T00:00:00.000Z]"
 * into "Mon dd(th/st/rd) yyyy" format.
 *
 * @param {string} input - Timestamp string wrapped in brackets.
 * @returns {string} Formatted date string (e.g., "Jun 1st 2025").
 */
export const formatTimestamp = (input: string): string => {
  const date = new Date(input)

  const day = date.getUTCDate()
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th'

  return (
    date.toLocaleString('en-US', {
      month: 'short',
      timeZone: 'UTC',
    }) + ` ${day}${suffix} ${date.getUTCFullYear()}`
  )
}

export const rehypeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    img: [
      ...(defaultSchema.attributes?.img || []),
      'src',
      'alt',
      'title',
      'width',
      'height',
    ],
  },
}

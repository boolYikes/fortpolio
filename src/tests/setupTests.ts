import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

globalThis.TextEncoder = TextEncoder as any
globalThis.TextDecoder = TextDecoder as any

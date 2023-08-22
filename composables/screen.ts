import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

export const isMobile = breakpoints.smaller('sm')
export const isSmaller = breakpoints.smaller('lg')

import { breakpointsTailwind } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

export const isMobile = breakpoints.smaller('md')
export const isLaptop = breakpoints.between('sm', 'lg')
export const isDesktop = breakpoints.greaterOrEqual('lg')

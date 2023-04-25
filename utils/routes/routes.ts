export const ROUTE_MAP = {
  auth: { signIn: '/sign-in', register: '/register' },
  app: {
    entry: '/',
    collections: '/collections',
    contractors: '/contractors',
    transformations: '/transformations',
    aboutUs: '/about-us',
    faq: '/faqs',
    blog: '/blog',
    press: '/press',
    tos: '/terms-of-service',
    privacy: '/privacy-policy',
    help: '/help',
    newCityLaunch: '/new-city-launch',
  },
  dashboard: {
    entry: '/dashboard',
    projectDetails: '/dashboard/project',
    projectBook: '/dashboard/project/book',
    profile: '/dashboard/profile',
    payment: '/dashboard/payment',
  },
}

export const interpolateParams = (
  route: string,
  params: Record<string, string>
) => {
  let interpolatedRoute = route

  Object.keys(params).forEach((key) => {
    interpolatedRoute = interpolatedRoute.replace(`:${key}`, params[key])
  })

  return interpolatedRoute
}

import fs from 'fs'

import { consola } from 'consola'

export const updateMiddleware = async () => {
  const filePath = 'src/middleware.js'

  consola.start('Updating middleware file...')

  // Read the current content of the middleware file
  let data = fs.readFileSync(filePath, 'utf8')

  // This pattern matches the function declaration and its body, assuming no nested braces in parameters
  const getLocalePattern = /const getLocale =[^{]*\{(?:[^{}]*|\{[^{}]*\})*\}/g
  const localizedRedirectPattern = /const localizedRedirect = \(([^)]+)\) => \{([\s\S]*?)^\}/gm

  // add the redirect function
  const redirectFunction = `const _redirect = (url, request) => {
  const _url = ensurePrefix(url, \`\${process.env.BASEPATH}\`)

  const redirectUrl = new URL(_url, request.url).toString()

  return NextResponse.redirect(redirectUrl)
}`

  // Remove the `getLocale` function from the file content
  data = data.replace(getLocalePattern, '').replace(localizedRedirectPattern, redirectFunction)
  data = data
    .replace('const locale = getLocale(request)', '')
    .replace("if (!(pathname === '/')) {", "if (pathname !== '/') {")
    .replace(/return localizedRedirect\(redirectUrl, request\)/g, 'return _redirect(redirectUrl, request)')
    .replace(/return localizedRedirect\(HOME_PAGE_URL, request\)/g, 'return _redirect(HOME_PAGE_URL, request)')
    .replace(/if\s*\(pathname === '\/' \|\| pathname === `\/\$\{locale\}`\) \{/g, "if (pathname === '/') {")
    .replace(
      'return isUrlMissingLocale(pathname) ? localizedRedirect(pathname, request) : NextResponse.next()',
      'return NextResponse.next()'
    )
  consola.success('Updated middleware file successfully.\n')

  // Write the updated content back to the middleware file
  fs.writeFileSync(filePath, data)
}

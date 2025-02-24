// host[:/]n1/n2
const RE = /^([^:\/]+)[:\/](.+)$/i

const HTTPS_HOSTS = new Set(['github.com', 'gitcafe.com', 'gist.github.com'])

export function parseGitUrl(sourceURL: string) {
  if (!sourceURL || typeof sourceURL !== 'string')
    return ''

  let url = sourceURL

  let originProtocol: string | undefined
  try {
    const uo = new URL(url)
    originProtocol = uo.protocol
  }
  catch {}

  if (url.indexOf('@') >= 0)
    url = url.replace(/^[^@]+@/, '') // `git@`` || `https://ajiu9@` => ""

  url = url.replace(/^[\w+]+:\/\//, '') // `git://` || `git+https://` => ""
    .replace(/\.git$/, '') // .git => ""
  const item = RE.exec(url)
  if (!item)
    return sourceURL

  const host = item[1]

  let protocol: string
  if (HTTPS_HOSTS.has(host))
    protocol = 'https:'
  else if (['https:', 'http:'].includes(originProtocol ?? ''))
    protocol = originProtocol!
  else
    protocol = 'http:'

  // p1/p2/.../pn[.xxx]
  const isContainGit = /\.git$/.test(sourceURL)
  url = isContainGit ? item[2] : item[2].split('/', 2).join('/')
  return `${protocol}//${host}/${url}`
}

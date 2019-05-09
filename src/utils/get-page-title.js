import defaultSettings from '@/settings'

const title = defaultSettings.title || '洞见云 礼品采购平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    16: 'public/todo_16.png',
    32: 'public/todo_32.png',
    48: 'public/todo_48.png'
  },
  action: {
    default_icon: {
      16: 'public/todo_16.png',
      32: 'public/todo_32.png',
      48: 'public/todo_48.png'
    },
    default_title: "Todo List - 任务清单",
    default_popup: 'src/popup/index.html',
  },
  permissions: [
    // 'sidePanel',
    // 'contentSettings',
  ],
  web_accessible_resources: [
    {
      resources: ['*.jpg','*.png','*.jpeg','*.gif'],
      matches: ['<all_urls>']
    }
  ]
})

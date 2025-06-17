import { DocsThemeConfig } from 'nextra-theme-docs'
import { AnimationDemo } from './components/AnimationDemo'

const config: DocsThemeConfig = {
  logo: <span>React-swift-reveal</span>,
  project: {
    link: 'https://github.com/Mutesa-Cedric/react-swift-reveal',
  },
  docsRepositoryBase: 'https://github.com/Mutesa-Cedric/react-swift-reveal/tree/main/apps/docs',
  footer: {
    text: 'Made with love by Mutesa Cedric.',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – React Swift Reveal'
    }
  },
  components: {
    AnimationDemo
  }
}

export default config

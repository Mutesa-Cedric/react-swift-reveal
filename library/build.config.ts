import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: true,
  failOnWarn:false,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})

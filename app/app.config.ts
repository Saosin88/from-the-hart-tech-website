export default defineAppConfig({
  ui: {
    strategy: 'override',
    colors: {
      primary: 'green',
      neutral: 'slate',
      secondary: 'purple',
      info: 'purple',
      success: 'green',
      warning: 'yellow',
      error: 'red',
    },
    card: {
      slots: {
        root: 'border border-secondary-500 dark:border-secondary-700',
      },
    },
  },
})

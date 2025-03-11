export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
      secondary: 'blue',
      info: 'blue',
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

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: "media", // or 'media' or 'class'
    theme: {
      container: {
        center: true
      },
      cursor: {
        "ew-resize": "ew-resize",
        pointer: 'pointer',
        default: 'default'
      },
      transitionProperty: {
        'slide': 'height, transform',
        'height': 'height'
      },
      extends: {
        transitionProperty: {
          "h": "height"
        },
        gridTemplateColumns: {
          '1gap1': '1fr 4rem 1fr'
        }
      }
    },
    variants: {
      extend: {
        backgroundColor: ['active'],
        borderColor: ['active'],
      },
    },
    plugins: [],
  }

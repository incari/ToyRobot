export default {
    transform: {
      "^.+\\.(ts|tsx)$": "babel-jest",
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.svg$": "<rootDir>/svgTransform.js"
    },
    "transformIgnorePatterns": [
        "/node_modules/",
        "\\.pnp\\.[^\\/]+$"
      ]
  };
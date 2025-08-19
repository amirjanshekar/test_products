This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# test_products

A Next.js project for interview.  
_(Add a brief description about what this project does, e.g., a product listing app, demo, etc.)_

## Table of Contents

- [Demo](#demo)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)

## Demo

_You can have a demo of this project in this link:_ https://testproducts.vercel.app/

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/amirjanshekar/test_products.git

   ```

2. Navigate into the project directory
   ```bash
   cd test_products
   ```
3. Install dependencies
   ```bash
   npm ci
   # or
   yarn ci
   ```

## Available Scripts

### In the project directory, you can run:

    npm run dev
    # or
    yarn dev

Runs the app in development mode.
Open http://localhost:3000
to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

### Build for production

    npm run build
    # or
    yarn build

Builds the app for production to the .next folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### Starts the production server after building.

    npm run start
    # or
    yarn start

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Runs ESLint to check for code quality issues.

    npm run lint
    # or
    yarn lint

### For running tests that has been writer.

    npm run test
    # or
    yarn test

## Folder Structure

test_products/

```
├── public/                # Static assets like images, icons
└── src/                   # Source of the project
   ├── api/                # Data integration hooks and methods
   ├── app/                # Next.js app router routes
   ├── components/         # React components
   ├── lib/                # Libraries customization
   ├── test/               # Tests
   ├── types/              # Type definitions
   └── utils/              # Utility hooks and methods
├── .eslintrc.json         # ESLint configuration
├── .env.development       # Development Environments
├── .prettierrc            # Prettier configuration
├── .commitlint.config.js  # Commitlint configuration
├── jest.config.ts         # JEST configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.config.ts     # Typescript configuration
├── postcss.config.js      # Postcss configuration
├── package.json
└── README.md
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

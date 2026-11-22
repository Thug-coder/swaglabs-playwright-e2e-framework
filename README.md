# Swag Labs – Playwright TypeScript E2E Automation Framework

A maintainable end-to-end test automation framework built using **Playwright and TypeScript**, following the Page Object Model (POM) design pattern and industry-standard automation practices.

## Overview

This project automates the [Swag Labs](https://www.saucedemo.com/) application and demonstrates practical implementation of modern UI test automation concepts.

The framework focuses on code reusability, maintainability, cross-browser compatibility, test isolation, and continuous integration.

## Tech Stack

- **Language:** TypeScript
- **Automation Tool:** Playwright
- **Runtime:** Node.js
- **Test Runner:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Configuration Management:** dotenv
- **Version Control:** Git and GitHub
- **CI/CD:** GitHub Actions

## Key Features

- Page Object Model (POM) architecture.
- Custom Playwright fixtures.
- Environment-based configuration using `.env`.
- Authentication using Playwright `storageState`.
- Cross-browser testing with Chromium, Firefox, and WebKit.
- Parallel test execution.
- Data-driven testing.
- Positive and negative login scenarios.
- Inventory and product sorting validation.
- Product details validation.
- Shopping cart operations and edge-case testing.
- Checkout workflow and form validation.
- Dynamic checkout price calculations.
- File download handling.
- Logout functionality.
- Test tagging and selective execution.
- Automatic screenshot capture on failure.
- Video and trace recording on failure.
- HTML and JSON test reporting.
- GitHub Actions CI/CD integration.

## Project Structure

```text
swaglabs-playwright-e2e-framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── playwright/
│   └── .auth/
│
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── pages/
│   ├── fixtures/
│   ├── data/
│   └── utils/
│
├── tests/
│   ├── auth/
│   ├── inventory/
│   ├── cart/
│   └── checkout/
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## Prerequisites

Make sure the following are installed:

- Node.js (LTS recommended)
- npm
- Git

## Installation

Clone the repository:

```bash
git clone https://github.com/Thug-coder/swaglabs-playwright-e2e-framework.git
```

Navigate to the project directory:

```bash
cd swaglabs-playwright-e2e-framework
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

## Environment Configuration

Create a `.env` file in the project root using `.env.example` as a reference.

Configure the required environment variables:

```env
BASE_URL=https://www.saucedemo.com
INVENTORY_URL=https://www.saucedemo.com/inventory.html

STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
LOCKED_USER=locked_out_user
```

**Note:** Never commit your `.env` file or authentication state files to GitHub.

## Test Execution

Run the complete test suite:

```bash
npx playwright test
```

Run tests on a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run tests using specific tags:

```bash
npx playwright test --grep "@smoke"
npx playwright test --grep "@regression"
```

Run tests with a specific number of workers:

```bash
npx playwright test --workers=2
```

Open the HTML report:

```bash
npx playwright show-report
```

## Authentication Strategy

The framework uses Playwright's `storageState` to reuse authenticated sessions.

A dedicated authentication setup test logs in using the standard user credentials and saves the browser state.

Subsequent browser projects reuse this state, reducing repeated login operations across tests.

## Reporting and Debugging

The framework is configured with:

- List reporter for terminal execution.
- HTML reporter for detailed test results.
- JSON reporter for structured test results.
- Screenshots captured on test failure.
- Videos retained on failure.
- Traces retained on failure.

## Continuous Integration

GitHub Actions is configured to execute the Playwright test suite automatically on pushes and pull requests targeting the `main` and `master` branches.

The workflow performs the following steps:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs project dependencies.
4. Installs Playwright browsers.
5. Executes the automated test suite.
6. Uploads test reports and execution artifacts.

## Author

Developed as a hands-on project to strengthen practical expertise in Playwright, TypeScript, test automation architecture, and CI/CD practices.

**GitHub:** [Thug-coder](https://github.com/Thug-coder)

**Repository:** [Swag Labs – Playwright E2E Framework](https://github.com/Thug-coder/swaglabs-playwright-e2e-framework)

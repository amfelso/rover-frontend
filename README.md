
# Rover Frontend

[![Develop](https://github.com/amfelso/rover-frontend/actions/workflows/Develop.yml/badge.svg)](https://github.com/amfelso/rover-frontend/actions/workflows/Develop.yml)
[![Release](https://github.com/amfelso/rover-frontend/actions/workflows/Release.yml/badge.svg)](https://github.com/amfelso/rover-frontend/actions/workflows/Release.yml)

## Description

This repository contains the **Rover Frontend**, a React-based application designed to interact with the Curiosity Rover API. It includes CI/CD pipelines for both `develop` and `release` branches.

- **Develop Pipeline**: Lints, tests, and validates the SAM template on every push to the `develop` branch.
- **Release Pipeline**: Deploys infrastructure, builds the React app, and syncs it to the S3 bucket on every push to the `release` branch.

---

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- AWS CLI
- SAM CLI
- Access to an AWS account with sufficient permissions
- GitHub Actions secrets for `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`

---

## Project Structure

```
.
├── src/                    # Source code for the React app
│   ├── components/         # React components
│   ├── App.js              # Main app file
│   ├── App.test.js         # Unit tests for the app
│   └── index.js            # Entry point for the React app
├── sam/                    # SAM templates for infrastructure
│   └── template.yaml       # SAM template for the infrastructure
├── .github/workflows/      # GitHub workflows
│   ├── develop.yml         # Workflow for develop branch
│   └── release.yml         # Workflow for release branch
└── README.md               # Project documentation
```

---

## CI/CD Pipelines

### Develop Pipeline

Triggered on every push to the `develop` branch. This pipeline performs the following steps:
1. **Lint**: Checks the codebase using ESLint.
2. **Test**: Runs unit tests using Jest.
3. **Validate**: Validates the SAM template.

### Release Pipeline

Triggered on every push to the `release` branch. This pipeline performs the following steps:
1. **Deploy Infrastructure**: Deploys resources defined in the SAM template.
2. **Build**: Builds the React application.
3. **Sync to S3**: Uploads the React app to the S3 bucket for hosting.

---

## Usage

### Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Access the app at `http://localhost:3000`.

### Running Tests

Run all unit tests with Jest:
```bash
npm test
```

### Validating Infrastructure

Validate the SAM template locally:
```bash
sam validate -t ./sam/template.yaml --region <your-region>
```

---

## Deployment

### Manual Deployment

To deploy infrastructure and sync the app manually:
1. Deploy infrastructure using SAM:
   ```bash
   sam deploy --guided
   ```

2. Build the React app:
   ```bash
   npm run build
   ```

3. Sync the build folder to S3:
   ```bash
   aws s3 sync ./build s3://<your-bucket-name> --delete
   ```

---

## Contributing

1. Fork this repository.
2. Create a feature branch.
3. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or suggestions, please open an issue in this repository.

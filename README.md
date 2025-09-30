# Detox Playground

E2E tests for Simple QA React App using Detox with visual regression testing.

## Prerequisites

1. **Setup the Simple QA React App first**: Follow the setup instructions in [simple-qa-react-app](https://github.com/bobpozun/simple-qa-react-app) to build and launch the app.

2. **Install dependencies**:
```bash
yarn install
npm install -g detox-cli
```

3. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env with your local paths
```

## Commands

```bash
yarn test                    # Run all tests
yarn test:android           # Run on Android
yarn test:headless          # Run headless
yarn test:single "pattern"  # Run single test
yarn update-snapshots       # Update visual baselines
yarn clean                  # Clean artifacts and rebuild framework
yarn lint                   # Lint and fix
yarn format                 # Format code
```

## Test Options

Add these flags to `yarn test`:

- `--headless` - Run without UI
- `--testNamePattern "name"` - Run specific test
- `--watchAll` - Watch mode
- `--loglevel verbose` - Verbose logging
- `--updateSnapshot` - Update visual baselines

## Visual Regression Testing

This project uses `jest-image-snapshot` for visual regression testing:

- **Device-specific snapshots**: Screenshots are named with device info (e.g., `counter-initial_ios_iPhone14.png`)
- **Baseline comparison**: Each test compares current screenshots against stored baselines in `tests/simple_qa_react_app/__image_snapshots__/`
- **Automatic updates**: Run `yarn update-snapshots` to update baselines when UI changes are intentional
- **Failure detection**: Tests fail if visual differences exceed 0.1% threshold
- **Debug artifacts**: Screenshots are also saved to `tests/simple_qa_react_app/artifacts/` for debugging and history

## Environment Variables

The following environment variables need to be configured in your `.env` file:

- `IOS_DEBUG_BINARY_PATH` - Path to iOS debug app binary
- `IOS_RELEASE_BINARY_PATH` - Path to iOS release app binary  
- `ANDROID_DEBUG_BINARY_PATH` - Path to Android debug APK
- `ANDROID_RELEASE_BINARY_PATH` - Path to Android release APK
- `APP_SOURCE_PATH` - Path to the React App source directory

Copy `.env.example` to `.env` and update the paths for your local environment.

## Troubleshooting

**Detox framework not found**: Run `yarn clean` to rebuild the framework cache.

**App not found**: Ensure the Simple QA React App is built and running. Follow the [simple-qa-react-app](https://github.com/bobpozun/simple-qa-react-app) setup instructions.

**Environment variables not loaded**: Ensure your `.env` file exists and contains the correct paths for your local setup.

**Visual test failures**: 
- Review the diff images in `tests/simple_qa_react_app/__image_snapshots__/` to see what changed
- If changes are intentional, run `yarn update-snapshots` to update baselines
- Check `tests/simple_qa_react_app/artifacts/` folder for full screenshot history

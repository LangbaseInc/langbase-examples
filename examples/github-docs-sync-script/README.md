# Script for Syncing a GitHub Documentation to Langbase Memory

This is a script that enables you to build a **powerful and auto-synced RAG** on your documentation (on GitHub) using Langbase's memory and pipes.

It helps you keep your Langbase memory updated with the latest changes in your documentation. It has two main functionalities:

1. Upload all documentation files in the repository to Langbase memory.

2. Upload only the changed documentation files between two commits to Langbase memory.

Using this script, you can keep your Langbase memory updated with the latest changes in your documentation. This will help you use Langbase's powerful pipes to create AI question-answering capabilities on your documentation with very low halucination.

## Features

- Identifies all Markdown (.md and .mdx) files that have been changed between two commits in a GitHub repository.

- Optionally, processes all Markdown files in the repository.

- Downloads the changed or all Markdown files locally.

- Modifies the filenames to include full path. This avoids conflicts when uploading files with the same name from different directories and allows you to update the files later.

- Uploads the files to Langbase via signed URLs.

- Automatically handles file types and cleans up temporary files after upload.

## Usage

### Installation

Make sure Node.js is installed in your system. Clone this example and navigate to its directory `cd github-docs-sync-script`.

 Then install the required packages:

```bash
npm install
```

### Configuration

Before running the script, select the mode:

- **processAllFiles**: In the `script.js` file, set this to `true` if you want to upload all files in the repository. Set this to `false` if you want to upload only the changed files between two commits.

For a quick one time configuration, open the `env.example` file, update the following variables and save it as `.env` file:

- **Langbase API Key**: Replace langbaseApiKey in the script with your user or org Langbase key. Available upon signing up on the Langbase website.

- **Langbase Memory**: Create a memory on Langbase if you haven't already. If you don't have an OpenAI key attached, it will show you a warning. Make sure you add the key. Update langbaseMemoryName with the memory name you want to upload the documents to in Langbase.

- **GitHub Repository**: The repository's name and and its owner name you want to process docs files from. Add in the owner and repo variables in the script, eg., owner = 'langbase', repo = 'docs'.

- **GitHub Personal Access Token**: Required for authenticating GitHub API requests. You can create one from your GitHub account's developer settings. Add the token in the script.

- **Org/User Name**: Replace orgUserName with your Langbase organization or username.

- **Commit SHAs** (Only for comparison mode): The base and head commit SHAs between which you want to compare changes in your repository. Not needed if you are in processAllFiles files mode and uploading all files. Add in baseCommitSha and headCommitSha variables in the script.

### STEP 1: Upload all Documentation files in the Repository

Initially, we need to upload all documentation files in the repository to Langbase. This will help you create a baseline memory for your documentation.

To upload all documentation files in the repository, change the `processAllFiles` variable to `true` in the start of `script.js` file:

```javascript
const processAllFiles = true;
```

Then run the script:

```bash
node script.js
```

Depending on the number of files in your repository, this process may take some time. It also reports any errors to console. We have tested this script on repositories with thousands of files and it works fine.

**NOTE:** Please save the commit SHA of the last commit when you upload all files. You will need this to upload only the changed files in the next step.

Your Langbase memory should now be updated with all the documentation files in your repository and you can start using it in a Langbase pipe to ask questions and whatnot.

### STEP 2: Upload Changed Documentation files between Commits

After uploading all documentation files, you will want to keep your memory updated with the latest updates in your documentation.

You can do it by uploading only the changed files between two commits. To do this, change the `processAllFiles` option to `false` in the start of `script.js` file:

```javascript
const processAllFiles = false;
```

Also update the `baseCommitSha` and `headCommitSha` variables with the respective commit SHAs between which you want to compare changes in your repository.

Remember we asked you to save the commit SHA of the last commit when you uploaded all files in the previous step. You can use that commit SHA as the `baseCommitSha` and the latest commit SHA as the `headCommitSha`.

Then run the script:

```bash
node script.js
```

The script will download the changed files between the two commits and update only those files in your Langbase memory.

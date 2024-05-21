import { promisify } from 'util'
import { exec as execCallback, execSync } from 'child_process'

import { consola } from 'consola'

import { updatePackages } from './updatePackages'
import { updateMiddleware } from './updateMiddleware'
import { findAndReplaceInFiles } from './findAndReplaceInFiles'
import { updateLayoutFile, updateDashboardLayoutFile } from './updateLayoutFiles'
import { removeFilesAndFolders } from './removeFilesAndFolders'
import removeUnwantedCode from './removeUnwantedCode'
import { reverseEslintConfig, updateEslintConfig } from './removeUnusedImports'
import { updateMenuFiles } from './updateMenuFiles'
import { removeLangaugeDropdown } from './removeLangaugeDropdown'
import { modifyGenerateMenuFile } from './modifyGenerateMenuFile'

const exec = promisify(execCallback)

async function main() {
  await updatePackages()
  consola.start('Moving files from src/app/[lang] to src/app...')
  execSync('cp -r src/app/\\[lang\\]/* src/app')
  execSync('rm -rf src/app/\\[lang\\]')
  consola.success('Moved files from src/app/[lang] to src/app')
  await updateMiddleware()
  await removeFilesAndFolders()
  await findAndReplaceInFiles()
  await updateMenuFiles()
  await removeLangaugeDropdown()
  await updateLayoutFile()
  await updateDashboardLayoutFile()
  await modifyGenerateMenuFile()
  await updateEslintConfig()

  // ────────────── Lint & Format Files ──────────────
  // Run pnpm lint command to fix all the linting error and give space after imports
  consola.start('Run pnpm lint command to fix all the linting error and give space after imports')
  await exec('pnpm run lint:fix')
  consola.success('Linted all the files successfully!\n')

  // Run pnpm format command to format all the files using prettier
  consola.start('Run pnpm format command to format all the files using prettier')
  await exec('pnpm run format')
  consola.success('Formatted all the files successfully!\n')

  // ────────────── Remove Unwanted Code & Comments ──────────────
  await removeUnwantedCode()
  await reverseEslintConfig()
}

main()

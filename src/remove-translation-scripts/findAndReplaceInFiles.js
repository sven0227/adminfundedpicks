import { consola } from 'consola'

const fs = require('fs')
const util = require('util')

const { globby } = require('globby')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

// Pattern to find `getLocalizedUrl('/any-url', locale)` and capture the URL
const getUrlPattern = /getLocalizedUrl\((['"`]\/)(.*)(['"`]), locale\)/g
const getUrlPattern2 = /getLocalizedUrl\((['"`])([^'"\/`].*?)(['"`]), locale\)/g
const getUrlPattern3 = /getLocalizedUrl\((.*), locale\)/g
const getDictionaryPropPattern = /dictionary={dictionary}/g

const getDictionaryProp = /const\s+dictionary\s+=\s+await\s+getDictionary\(params\.lang\)\s*/g
const replaceDirectionPattern = /const direction\s*=\s*i18n.langDirection\[params.lang\]/g
const removeDictionaryDestructuringPattern = /dictionary(,| )/g

// Pattern to match Props type definitions including `params`

const removeParamsFromFunctionPattern = /(?<={ .*)params,?(?=.* }: [A-Z][A-Za-z]+)/g

async function replacePatternInFile(filePath) {
  const data = await readFile(filePath, 'utf8')

  // Initial check to see if any pattern exists in the data, to avoid unnecessary operations
  if (
    getUrlPattern.test(data) ||
    getUrlPattern2.test(data) ||
    getUrlPattern3.test(data) ||
    getDictionaryPropPattern.test(data) ||
    getDictionaryProp.test(data) ||
    replaceDirectionPattern.test(data) ||
    removeDictionaryDestructuringPattern.test(data) ||
    removeParamsFromFunctionPattern.test(data)
  ) {
    // Perform replacements
    const newData = data
      .replace(getUrlPattern, '$1$2$3')
      .replace(getUrlPattern2, '$1/$2$3')
      .replace(getUrlPattern3, '$1')
      .replace(getDictionaryPropPattern, '')

      .replace(getDictionaryProp, '')
      .replace(replaceDirectionPattern, "const direction = 'ltr'")
      .replace(removeDictionaryDestructuringPattern, '')

      .replace(removeParamsFromFunctionPattern, '')

      .replace(/const\s*{\s*lang:\s*locale\s*}\s*=\s*useParams\(\)/g, '')
      .replace(/(\w+: )?locale,/g, '')
      .replace(/,\s*(\w+: )?locale/g, '')

    // Only write back if changes were made
    if (data !== newData) {
      await writeFile(filePath, newData, 'utf8')
    } else {
      consola.error(`No changes made to: ${filePath}`)
    }
  }
}

async function updateNextConfig() {
  const filePath = 'next.config.mjs'
  const content = await readFile(filePath, 'utf8')

  // Define a pattern that matches the redirects configuration and remove it
  const redirectsPattern = /,\s*redirects:.*[^{]\{(?:[^{}]*|\{[^{}]*\})*\}/
  const updatedContent = content.replace(redirectsPattern, '')

  if (content !== updatedContent) {
    await writeFile(filePath, updatedContent, 'utf8')
    consola.success('Removed redirects from next.config.mjs\n')
  }
}

export const findAndReplaceInFiles = async () => {
  const paths = await globby(['src/**/*.{jsx,js}', '!src/remove-translation-scripts/**/*'])

  consola.start('Replacing various patterns in whole project......')

  for (const filePath of paths) {
    await replacePatternInFile(filePath)
  }

  consola.success('Replaced pattern successfully\n')
  await updateNextConfig()
  consola.success('Replaced various patterns in whole project successfully.\n')
}

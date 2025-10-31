/**
 * CEG - Component Export Generator
 *
 * This script scans the components directory and generates an index file
 * that exports all components, organized by their categories.
 *
 * This generator is only for local generation of the index file.
 *
 * @author @2hoch1
 */

import * as fs from 'fs';
import * as path from 'path';

import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);
const projectRoot = path.resolve(__dirname, '..');

//----------------------------------------------------------------------------

/**
 * Default configuration file
 *
 * @constant {CegConfig} defaultConfig
 * @property {Object} paths - Default paths configuration
 * @property {string} paths.components - Default directory where components are located
 * @property {string} paths.indexOutput - Default output path for the generated index file
 * @property {Object} rules - Default rules configuration
 * @property {string[]} rules.allowedExtensions - Default allowed file extensions for components
 * @property {string[]} rules.ignoreFiles - Default filenames to ignore when scanning the components directory
 * @property {string} comment - Default custom header comment for the generated index file
 */
const defaultConfig: CegConfig = {
  paths: {
    components: 'src/app/components',
    indexOutput: 'src/app/components/index.ts',
  },
  rules: {
    allowedExtensions: ['.tsx'],
    ignoreFiles: ['base.tsx', 'index.ts'],
  },
  comment: '// Auto-generated index file for component exports.',
};

/**
 * Configuration interface for CEG
 *
 * @interface CegConfig
 * @property {Object} paths - Paths configuration
 * @property {string} paths.components - Directory where components are located
 * @property {string} paths.indexOutput - Output path for the generated index file
 * @property {Object} rules - Rules configuration
 * @property {string[]} rules.allowedExtensions - Allowed file extensions for components
 * @property {string[]} rules.ignoreFiles - Filenames to ignore when scanning the components directory
 * @property {string} comment - Custom header comment for the generated index file
 */
interface CegConfig {
  paths: { components: string; indexOutput: string };
  rules: { allowedExtensions: string[]; ignoreFiles: string[] };
  comment: string;
}

/**
 * Loads the CEG configuration file.
 *
 * @returns {CegConfig} The loaded configuration object.
 * @throws Will return default config if loading fails.
 */
function loadConfigFile(pathToConfig: string): CegConfig {
  let config: CegConfig;
  try {
    const configPath = path.join(projectRoot, pathToConfig);
    const configModule = require(configPath);
    config = configModule as CegConfig;
  } catch (error) {
    console.error('Error loading CEG configuration file:\n', error);
    process.exitCode = 2;
    // Fallback to default config
    config = defaultConfig;
  }
  return config;
}

/**
 * Checks if a given path exists and is readable.
 *
 * @param {string} pathToCheck - The path to check.
 * @returns {boolean} True if the path exists and is readable, false otherwise.
 */
function checkForPathExistence(pathToCheck: string): boolean {
  try {
    fs.accessSync(pathToCheck, fs.constants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Checks if a file is in the ignore list.
 * Part of isComponentFileAllowed function.
 *
 * @param {string} fileName - The name of the file to check.
 * @param {string[]} ignoreFiles - The list of filenames to ignore.
 * @returns {boolean} True if the file is ignored, false otherwise.
 */
function isFileIgnored(fileName: string, ignoreFiles: string[]): boolean {
  if (ignoreFiles.includes(fileName)) return true;
  return false;
}

/**
 * Checks if a file has an allowed extension.
 * Part of isComponentFileAllowed function.
 *
 * @param {string} fileName - The name of the file to check.
 * @param {string[]} allowedExtensions - The list of allowed file extensions.
 * @returns {boolean} True if the file has an allowed extension, false otherwise.
 */
function isExtensionAllowed(
  fileName: string,
  allowedExtensions: string[],
): boolean {
  const ext = path.extname(fileName).toLowerCase();
  return allowedExtensions.map((e) => e.toLowerCase()).includes(ext);
}

/**
 * Checks if a file is allowed based on its extension and ignore list.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.fileName - The name of the file to check.
 * @param {string[]} params.allowedExtensions - The list of allowed file extensions.
 * @param {string[]} params.ignoreFiles - The list of filenames to ignore.
 * @returns {boolean} True if the file is allowed, false otherwise.
 */
function isComponentFileAllowed({
  fileName,
  allowedExtensions,
  ignoreFiles,
}: {
  fileName: string;
  allowedExtensions: string[];
  ignoreFiles: string[];
}): boolean {
  if (isFileIgnored(fileName, ignoreFiles)) return false;
  if (!isExtensionAllowed(fileName, allowedExtensions)) return false;

  return true;
}

/**
 * Recursively retrieves component files from a directory.
 *
 * @param {string} pathToComponents - The path to the components directory.
 * @param {CegConfig} config - The CEG configuration object.
 * @returns {string[]} An array of component file paths.
 */
function getComponentFiles(
  pathToComponents: string,
  config: CegConfig,
): string[] {
  const componentFiles: string[] = [];

  const files = fs.readdirSync(pathToComponents);
  for (const file of files) {
    const filePath = path.join(pathToComponents, file);
    if (fs.statSync(filePath).isDirectory()) {
      const nestedFiles = getComponentFiles(filePath, config);
      componentFiles.push(...nestedFiles);
    } else {
      if (
        isComponentFileAllowed({
          fileName: file,
          allowedExtensions: config.rules.allowedExtensions,
          ignoreFiles: config.rules.ignoreFiles,
        })
      ) {
        componentFiles.push(filePath);
      }
    }
  }
  return componentFiles;
}

/**
 * Sets a custom header comment for the generated index file.
 *
 * @param {string} comment - The header comment string.
 * @returns {string} The header comment string.
 */
function setHeaderComment(comment: string): string {
  // If comment already contains a block, return as-is
  if (comment.trim().startsWith('/**') || comment.trim().startsWith('/*')) {
    return comment;
  }
  // Build a standard block comment from a single-line or multi-line comment
  const lines = String(comment || '')
    .split(/\r?\n/)
    .map((l) => l.trim());
  const middle = lines.map((l) => ` * ${l}`).join('\n');
  return `/**\n${middle}\n */`;
}

/**
 * Sets a category comment for the generated index file.
 *
 * @param {string} category - The category name.
 * @returns {string} The category comment string.
 */
function setCategoryComment(category: string): string {
  return `/* ${category} Components */`;
}

/**
 * Generates the index file for the component library.
 *
 * @param {string[]} componentFiles - The list of component file paths.
 * @param {string} outputFilePath - The path to the output index file.
 * @param {string} componentsDir - The path to the components directory.
 * @param {CegConfig} config - The CEG configuration object.
 */
function generateIndexFile(
  componentFiles: string[],
  outputFilePath: string,
  componentsDir: string,
  config: CegConfig,
): number {
  // Group exports by the directory path (excluding the filename),
  // so `ui/content/Card.tsx` -> group `ui content`.
  const categorizedExports: { [key: string]: string[] } = {};
  for (const filePath of componentFiles) {
    const relativePath = path.relative(componentsDir, filePath);
    const pathSegments = relativePath.split(path.sep);
    // directory segments (all except the filename)
    const dirSegments = pathSegments.slice(0, -1);
    const categoryKey = dirSegments.length ? dirSegments.join(' ') : '.';
    const fileName = path.basename(filePath, path.extname(filePath));
    const importPath = `./${path.join(...dirSegments, fileName).replace(/\\/g, '/')}`;
    if (!categorizedExports[categoryKey]) {
      categorizedExports[categoryKey] = [];
    }
    categorizedExports[categoryKey].push(
      `export { default as ${fileName} } from '${importPath}';`,
    );
  }

  // Build header from config.comment
  let indexFileContent = setHeaderComment(config.comment) + '\n\n';

  // Iterate categories in stable order
  const sortedCategories = Object.keys(categorizedExports).sort();
  for (const category of sortedCategories) {
    const exports = categorizedExports[category];
    const categoryLabel = category === '.' ? 'root' : category;
    indexFileContent += setCategoryComment(categoryLabel) + '\n';
    indexFileContent += exports.join('\n') + '\n\n';
  }

  // Remove trailing newline to avoid extra blank line at end
  indexFileContent = indexFileContent.trimEnd() + '\n';

  fs.writeFileSync(outputFilePath, indexFileContent, 'utf8');

  // Count how many export lines were written
  const exportCount = indexFileContent
    .split(/\r?\n/)
    .filter((l) => l.trim().startsWith('export')).length;
  return exportCount;
}

/**
 * Report the number of exports written for a given file.
 * If `count` is provided, it will be used; otherwise the function will read
 * the file and count lines that start with `export`.
 *
 * @param {string} filePath - Path to the generated index file
 * @param {number} [count] - Optional pre-computed export count
 * @returns {number} The number of export lines detected
 */
function reportExportCount(filePath: string, count?: number): number {
  let exportCount = typeof count === 'number' ? count : 0;
  if (typeof count !== 'number') {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      exportCount = content
        .split(/\r?\n/)
        .filter((l) => l.trim().startsWith('export')).length;
    } catch (err) {
      if (err instanceof Error) {
        console.warn('Could not read file to count exports:', err.message);
      } else {
        console.warn('Could not read file to count exports:', String(err));
      }
      exportCount = 0;
    }
  }
  console.log(`Wrote ${filePath} (${exportCount} exports)`);
  return exportCount;
}

/**
 * Main function to run the Component Export Generator (CEG).
 *
 * @returns {void}
 */
function CEG(): void {
  const config = loadConfigFile('ceg.config.cjs');
  const componentsDir = path.join(projectRoot, config.paths.components);
  const outputFilePath = path.join(projectRoot, config.paths.indexOutput);
  if (!checkForPathExistence(componentsDir)) {
    console.error(`Components directory does not exist: ${componentsDir}`);
    process.exitCode = 2;
    return;
  }
  const componentFiles = getComponentFiles(componentsDir, config);
  const exportCount = generateIndexFile(
    componentFiles,
    outputFilePath,
    componentsDir,
    config,
  );
  reportExportCount(outputFilePath, exportCount);
}

// If this file is executed directly (e.g. `node ./scripts/CEG.ts` or `npx ts-node ./scripts/CEG.ts`),
// run the generator. Keep the default export for programmatic use.
try {
  // In ESM, compare the resolved script path to import.meta.url
  if (
    process.argv[1] &&
    fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
  ) {
    CEG();
  }
} catch {
  // If anything goes wrong determining execution context, still export the function
  // and do not crash the process here.
  // (This keeps behavior safe when the module is imported.)
}

export default CEG;

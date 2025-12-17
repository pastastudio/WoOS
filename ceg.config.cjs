/**
 * Component index generator configuration
 * - kept as CommonJS to be node-compatible when required by scripts
 * - grouped and documented for clarity
 */

const paths = {
  // Directory where components live (relative to project root)
  components: 'src/components',

  // Output path for the generated index file (defaults to components folder)
  indexOutput: 'src/generated/components.ts',
};

const rules = {
  // File extensions to include when scanning for components
  allowedExtensions: ['.tsx'],

  // Filenames to ignore when scanning the components directory
  ignoreFiles: ['base.tsx', 'index.ts', 'Layout.tsx'],
};

const comment = `/**
 * Auto-generated index file for component exports.
 * This file exports all components, organized by their categories.
 * This file is auto-generated, do not edit manually.
 */`;

/* eslint-disable-next-line no-undef */
module.exports = {
  // Paths used by the generator
  paths,

  // Scanning / filtering rules
  rules,

  // Custom header comment for the generated index file
  comment,

  // Backwards-compatible top-level keys (optional convenience)
  components_directory: paths.components,
  output_file_path: paths.indexOutput,
  allowed_files_extensions: rules.allowedExtensions,
  ignore_files: rules.ignoreFiles,
};

/**
 * Conditional PostCSS configuration:
 * - If tailwindcss/autoprefixer are installed, they are used.
 * - If not installed, build continues without them.
 * This keeps the project running even without Tailwind dependencies,
 * while enabling Tailwind if the environment has it.
 */
function optionalRequire(name) {
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    return require(name);
  } catch (_e) {
    return null;
  }
}

const plugins = [];
const tailwind = optionalRequire('tailwindcss');
if (tailwind) plugins.push(tailwind);

const autoprefixer = optionalRequire('autoprefixer');
if (autoprefixer) plugins.push(autoprefixer);

module.exports = { plugins };

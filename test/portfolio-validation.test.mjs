#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const clientRoot = path.join(repoRoot, "client");

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function parseExportedArray(tsFilePath, exportName) {
  const source = fs.readFileSync(tsFilePath, "utf8");
  const withoutImports = source.replace(/^import\s+[^;]+;\s*$/gm, "");
  const replacedExport = withoutImports.replace(
    new RegExp(`export\\s+const\\s+${exportName}\\s*:[^=]+=`),
    `const ${exportName} =`
  );

  const start = replacedExport.indexOf(`const ${exportName} =`);
  if (start === -1) {
    throw new Error(`Unable to parse export ${exportName} from ${tsFilePath}`);
  }

  const executable = `${replacedExport}\nreturn ${exportName};`;
  // eslint-disable-next-line no-new-func
  return Function(executable)();
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateRequiredFields(entry, fields, label) {
  for (const field of fields) {
    assert(field in entry, `${label}: missing field '${field}'`);
    const value = entry[field];
    assert(value !== undefined && value !== null, `${label}: field '${field}' is null/undefined`);

    if (typeof value === "string") {
      assert(value.trim().length > 0, `${label}: field '${field}' is empty`);
    }

    if (Array.isArray(value)) {
      assert(value.every((item) => typeof item === "string"), `${label}: field '${field}' must be string[]`);
    }
  }
}

const requiredDataFiles = [
  path.join(clientRoot, "data", "projects.ts"),
  path.join(clientRoot, "data", "experiences.ts"),
  path.join(clientRoot, "data", "certificates.ts")
];

for (const filePath of requiredDataFiles) {
  assert(fs.existsSync(filePath), `Required data file missing: ${path.relative(repoRoot, filePath)}`);
}

const projects = parseExportedArray(path.join(clientRoot, "data", "projects.ts"), "PROJECTS_DATA");
const experiences = parseExportedArray(path.join(clientRoot, "data", "experiences.ts"), "EXPERIENCES_DATA");

assert(Array.isArray(projects) && projects.length > 0, "PROJECTS_DATA must be a non-empty array");
assert(Array.isArray(experiences) && experiences.length > 0, "EXPERIENCES_DATA must be a non-empty array");

for (const project of projects) {
  const label = `Project(id=${project?.id ?? "unknown"})`;
  validateRequiredFields(project, ["id", "title", "description", "techStack", "images", "linkGithub", "linkDemo"], label);

  assert(isValidHttpUrl(project.linkGithub), `${label}: invalid linkGithub URL '${project.linkGithub}'`);
  assert(isValidHttpUrl(project.linkDemo), `${label}: invalid linkDemo URL '${project.linkDemo}'`);

  for (const imagePath of project.images ?? []) {
    if (typeof imagePath !== "string" || imagePath.length === 0) continue;
    if (/^https?:\/\//i.test(imagePath)) continue;

    assert(imagePath.startsWith("/"), `${label}: local image path must start with '/': '${imagePath}'`);
    const relativePublicPath = imagePath.replace(/^\//, "");
    const absoluteImagePath = path.join(clientRoot, "public", relativePublicPath);
    assert(fs.existsSync(absoluteImagePath), `${label}: missing local image asset '${imagePath}'`);
  }
}

for (const experience of experiences) {
  const label = `Experience(id=${experience?.id ?? "unknown"})`;
  validateRequiredFields(experience, ["id", "title", "company", "description", "techStack", "images"], label);

  for (const imagePath of experience.images ?? []) {
    if (typeof imagePath !== "string" || imagePath.length === 0) continue;
    if (/^https?:\/\//i.test(imagePath)) continue;

    assert(imagePath.startsWith("/"), `${label}: local image path must start with '/': '${imagePath}'`);
    const relativePublicPath = imagePath.replace(/^\//, "");
    const absoluteImagePath = path.join(clientRoot, "public", relativePublicPath);
    assert(fs.existsSync(absoluteImagePath), `${label}: missing local image asset '${imagePath}'`);
  }
}

const packageJsonPath = path.join(clientRoot, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const expectedScripts = ["dev", "build", "start", "lint", "test"];

for (const scriptName of expectedScripts) {
  assert(packageJson.scripts && packageJson.scripts[scriptName], `client/package.json: missing script '${scriptName}'`);
}

if (failures.length > 0) {
  console.error("Portfolio validation failed:\n");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Portfolio validation passed.");

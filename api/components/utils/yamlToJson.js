const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

// Define the root directory where your YAML files are located
const rootDirectory = path.join(__dirname, "../Examples/B2C_Exports copy");

// Function to convert a YAML file to JSON
function convertYamlToJson(yamlFilePath) {
  try {
    // Read the YAML file
    const yamlContent = fs.readFileSync(yamlFilePath, "utf8");

    // Parse the YAML content to a JavaScript object
    const yamlObject = yaml.load(yamlContent);

    // Convert the JavaScript object to JSON
    const jsonContent = JSON.stringify(yamlObject.value, null, 2);

    // Write the JSON content to a new file with .json extension
    const jsonFilePath = path.join(
      path.dirname(yamlFilePath),
      path.basename(yamlFilePath, path.extname(yamlFilePath)) + ".json"
    );
    fs.writeFileSync(jsonFilePath, jsonContent, "utf8");
    fs.unlinkSync(yamlFilePath);

    console.log(`Converted ${yamlFilePath} to ${jsonFilePath}`);
  } catch (err) {
    console.error(`Error converting ${yamlFilePath}:`, err);
  }
}

// Recursively process directories and files
function processDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      // If it's a directory, process it recursively
      processDirectory(filePath);
    } else if (path.extname(file).toLowerCase() === ".yaml") {
      // If it's a YAML file, convert it to JSON
      convertYamlToJson(filePath);
    }
  }
}

// Start processing the root directory
processDirectory(rootDirectory);

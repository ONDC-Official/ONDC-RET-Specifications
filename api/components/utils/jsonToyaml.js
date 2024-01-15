const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { log } = require("console");

// Define the root directory where your JSON files are located
const rootDirectory = path.join(
  __dirname,
  "../Examples/B2B/on_confirm"
);

// Function to convert a JSON file to YAML
function convertJsonToYaml(jsonFilePath, yamlFilePath) {
  try {
    // Read the JSON file
    const jsonContent = fs.readFileSync(jsonFilePath, "utf8");

    // Parse the JSON content to a JavaScript object
    const jsonObject = JSON.parse(jsonContent);

       // Create an object with a "value" attribute
       const yamlObject = { value: jsonObject };

    // Convert the JavaScript object to YAML
    const yamlContent = yaml.dump(yamlObject);

    // Write the YAML content to a file
    fs.writeFileSync(yamlFilePath, yamlContent, "utf8");
    fs.unlinkSync(jsonFilePath);

    console.log(`Converted ${jsonFilePath} to ${yamlFilePath}`);
  } catch (err) {
    console.error(`Error converting ${jsonFilePath}:`, err);
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
    } else if (path.extname(file).toLowerCase() === ".json") {
      // If it's a JSON file, convert it to YAML
      const yamlFilePath = path.join(
        directoryPath,
        path.basename(file, ".json") + ".yaml"
      );
      convertJsonToYaml(filePath, yamlFilePath);
    }
  }
}

// Start processing the root directory
processDirectory(rootDirectory);

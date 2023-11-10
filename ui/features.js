var features;
function formatText(inputText) {
  const words = inputText.split("_");
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  const formattedText = formattedWords.join(" ");
  return formattedText;
}

function toUnderscoreCase(inputText) {
  const words = inputText.split(" ");
  const lowerCaseWords = words.map((word) => word.toLowerCase());
  if (words.length > 1) {
    // If it's a phrase with multiple words, add underscores and ".md" extension
    return lowerCaseWords.join("_") + ".md";
  } else {
    // If it's a single word, just add ".md" extension
    return lowerCaseWords[0] + ".md";
  }
}
async function getFeatures(branchName) {
  if (!branchName) return;
  const url = `https://api.github.com/repos/ondc-official/ONDC-RET-Specifications/contents/api/docs?ref=${branchName}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "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",
      },
    });
    const formattedResponse = await response?.json();

    var selectedOption = document.getElementById("feature-sets-dropdown");
    selectedOption.innerHTML = "";
    const featureMap = new Map();
    formattedResponse.forEach((feature) => {
      var option = document.createElement("option");

      var name = feature.name;
      featureMap.set(name, feature.download_url);
      name = name.split(".");
      const feature_name = formatText(name[0]);
      option.text = feature_name;
      selectedOption.add(option);
    });
    return featureMap;
  } catch (error) {
    console.log("Error fetching contract", error?.message || error);
    //alert('Something went wrong, Please try again later')
  }
}

function loadFeatures(data) {
  features = data;

  let firstKey = features.keys().next().value;
  const splitArr = firstKey.split(".");
  markdownConverter(splitArr[0]);
}

function updateFeature() {
  var selectedOption = document.getElementById("feature-sets-dropdown").value;
  markdownConverter(selectedOption);
}
function markdownConverter(selectedOption) {
  let download_url;

  selectedOption = toUnderscoreCase(selectedOption);
  features.forEach((url, name) => {
    if (name === selectedOption) {
      download_url = url;
    }
  });
  const filePath = download_url;

  fetch(filePath)
    .then((response) => {
      if (response.ok) {
        return response.text(); // Get the text content of the file
      }
      throw new Error("Network response was not ok.");
    })
    .then((markdownContent) => {
      // Parse the Markdown content to HTML using marked.js
      const convertedHtmlData = marked(markdownContent);

      // Set the HTML content to the designated element
      document.getElementById("featureDiv").innerHTML = convertedHtmlData;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
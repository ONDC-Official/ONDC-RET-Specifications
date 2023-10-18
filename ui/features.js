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
  const underscoreText = lowerCaseWords.join("_") + ".md";
  return underscoreText;
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

    console.log(featureMap);
    return featureMap;
  } catch (error) {
    console.log("Error fetching contract", error?.message || error);
    //alert('Something went wrong, Please try again later')
  }
}

function loadFeatures(data) {
  features = data;
  markdownConverter();
}
function markdownConverter() {
  let download_url;
  var selectedOption = document.getElementById("feature-sets-dropdown").value;
  //   const arrayWords = selectedOption.split(" ");
  selectedOption = toUnderscoreCase(selectedOption);
  console.log(selectedOption);
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

// const {getFeatures} = require("./features")
function getStringAfterEquals(inputString) {
  const index = inputString.indexOf("=");
  if (index !== -1) {
    return inputString.slice(index + 1).trim();
  } else {
    return "";
  }
}

async function readBuildFile(branchName) {
  if (!branchName) return;
  const url = `https://api.github.com/repos/ondc-official/ONDC-RET-Specifications/contents/ui/build.js?ref=${branchName}`;
  const features = await getFeatures(branchName)
 
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "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",
      },
    });
    const formattedResponse = await response?.json();
    
    // Updated code using git_url and base64 decoding
    if(formattedResponse?.git_url){
      setTimeout(async ()=>{
        const rawResponse = await fetch(formattedResponse.git_url, {
          // headers: {
          //   Authorization: "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",
          // },
        });
        let formattedrawResponse = await rawResponse?.text();
        formattedrawResponse = JSON.parse(formattedrawResponse);
        let splitedText = atob(formattedrawResponse?.content);
        build_spec = JSON.parse(getStringAfterEquals(splitedText));
        
        onFirstLoad(build_spec, features);
      }, 1200)
    }
    
  } catch (error) {
    console.log("Error fetching contract", error?.message || error);
    //alert('Something went wrong, Please try again later')
  }
}

async function fetchRequest(url){
  try{
    const response = await fetch(url, {
      headers: {
        Authorization: "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",
      },
    });
    return await response?.json();
  }catch(error){
    console.log("Error fetching contract", error?.message || error);
  }
}

async function loadContracts() {
  //fetch branches & tags from repo
  const BRANCHES_URL= "https://api.github.com/repos/ondc-official/ONDC-RET-Specifications/branches";
  const TAGS_URL= "https://api.github.com/repos/ondc-official/ONDC-RET-Specifications/tags";
                  
  let response1, response2;
  response1 = await fetchRequest(BRANCHES_URL)
  response2 = await fetchRequest(TAGS_URL)
  const response = [...response1,...response2]
  const selectedOption = document.getElementById("contract-dropdown");
  selectedOption.innerHTML = "";
  response.forEach((flow) => {
    var option = document.createElement("option");
    option.text = flow.name;
    selectedOption.add(option);
  });
  readBuildFile(response[0]?.name);
}

function upadteContract() {
  const selectedOption = document.getElementById("contract-dropdown")?.value;
  readBuildFile(selectedOption);
}

window.onload = function () {
  loadContracts()
};

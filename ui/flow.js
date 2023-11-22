// flow.js

var flows;

function loadSteps(steps) {
  const stepPane = document.querySelector(".step-pane");
  const contentPane = document.querySelector(".content-pane");
  stepPane.innerHTML = "";
  contentPane.innerHTML = "";
  steps.forEach(function (step, index) {
    const link = document.createElement("a");
    link.href = "#" + step.summary;
    link.classList.add(
      "list-group-item",
      "list-group-item-action",
      "step-item"
    );
    link.textContent = index + 1 + ". " + step.api;

    const content = document.createElement("div");
    content.id = step.summary;
    content.classList.add("step-content", "p-4");
    content.innerHTML =
      "<div>" +
      "<h3>" +
      step.summary +
      "</h3>" +
      "<p>" +
      step.description +
      "</p>" +
      "</div>" +
      '<pre class="yaml-content">' +
      JSON.stringify(step.example.value, null, 2) +
      "</pre>";

    link.addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelectorAll(".step-item").forEach(function (item) {
        item.classList.remove("active");
      });
      document.querySelectorAll(".step-content").forEach(function (content) {
        content.classList.remove("active");
      });
      link.classList.add("active");
      content.classList.add("active");
    });
    stepPane.appendChild(link);
    contentPane.appendChild(content);
  });
}

function updateFlow() {
  var flowDropdown = document.getElementById("flow-dropdown");
  var selectedValue = flowDropdown.value;
  loadFlow(selectedValue);
}

async function loadFlow(flowName) {
  const flowSummary = document.getElementById("flow-summary");
  const flowDescription = document.getElementById("flow-description");
  flowSummary.innerHTML = "";
  flowDescription.innerHTML = "";
  let selectedFlow = flows.find((obj) => {
    if (obj["summary"] === flowName) return obj;
  });
  flowSummary.textContent = selectedFlow["summary"];
  flowDescription.innerHTML ="<p>" + selectedFlow["description"] + "</p> <br />";

  if (selectedFlow["details"]) {
    var mermaidDiv = document.createElement("mermaid-div");
    for (const [index, step] of selectedFlow["details"].entries()) {
      var mermaidPane = document.createElement(`flow-mermaid-${index}`);
      const { description, mermaidGraph } = step;
      let svg = "";
      if (mermaidGraph) {
        let removeBacktick = mermaidGraph?.replace(/`/g, "");
        svg = await mermaid.render(`flow-mermaid`, removeBacktick);
      }
      mermaidPane.innerHTML =
        "<p><b>" +
        `${index + 1}. ${description}` +
        "</b></p>" +
        "<p>" +
        svg.svg +
        "</p>";
      mermaidDiv.appendChild(mermaidPane);
    }

    flowDescription.appendChild(mermaidDiv);
  }
  loadSteps(selectedFlow["steps"]);
}

function loadFlows(data) {
  flows = data;
  const flowDropdown = document.getElementById("flow-dropdown");
  flowDropdown.innerHTML = "";
  // Render the steps list
  flows.forEach((flow) => {
    var option = document.createElement("option");
    option.text = flow.summary;
    flowDropdown.add(option);
  });
  loadFlow(flows[0].summary);
}

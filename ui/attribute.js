var attributes;

function loadAttributes(data) {
  attributes = data;
  var attributesDropDown = document.getElementById("attribute-dropdown");
  attributesDropDown.innerHTML = "";

  Object.keys(attributes).forEach(function (key) {
    var option = document.createElement("option");
    option.text = key;
    attributesDropDown.add(option);
  });
  const indexKey = Object.keys(attributes);
  addAttributeSets(attributes[indexKey[0]]?.attribute_set);
}

function updateAttribute() {
  var example_set = document.getElementById("attribute-dropdown");
  var selectedValue = example_set.value;
  addAttributeSets(attributes[selectedValue]?.attribute_set);
}

function updateSetsAttribute() {
  var attributesDropDown = document.getElementById("attribute-dropdown");
  var example_set = document.getElementById("attribute-sets-dropdown");

  const object =
    attributes[attributesDropDown.value]?.attribute_set[example_set.value];
  addAttributeSets(object, ["attribute-l1-dropdown", "attribute-l2-dropdown"]);
}

function updateL1Attribute() {
  var attributesDropDown = document.getElementById("attribute-dropdown");
  var example_set = document.getElementById("attribute-sets-dropdown");
  var l1Attribute = document.getElementById("attribute-l1-dropdown");
  const object =
    attributes[attributesDropDown.value]?.attribute_set[example_set.value];
  addAttributeSets(object[l1Attribute.value], ["attribute-l2-dropdown"]);
}

function updateL2Attribute() {
  var attributesDropDown = document.getElementById("attribute-dropdown");
  var example_set = document.getElementById("attribute-sets-dropdown");
  var l1Attribute = document.getElementById("attribute-l1-dropdown");
  var l2Attribute = document.getElementById("attribute-l2-dropdown");
  const object =
    attributes[attributesDropDown.value]?.attribute_set[example_set.value];
  addAttributeSets(object[l1Attribute.value][l2Attribute.value], [
    "attribute-l2-dropdown",
  ]);
}

function addAttributeSets(
  data,
  keyList = [
    "attribute-sets-dropdown",
    "attribute-l1-dropdown",
    "attribute-l2-dropdown",
  ]
) {
  var object = data;

  for (each of keyList) {
    var setsDropDown = document.getElementById(each);
    setsDropDown.innerHTML = "";

    Object.keys(object).forEach(function (key) {
      var option = document.createElement("option");
      option.text = key;
      setsDropDown.add(option);
    });

    const firstKey = Object.keys(object)[0];
    object = object[firstKey];
  }

  flattenObject(object, null, null, object?.required_attributes);
}

function flattenObject(obj, prefix = "", result = {}, requiredAttr) {
  if ("required" in obj) {
    if (requiredAttr === undefined || requiredAttr.includes(prefix)) {
      var table = document.getElementById("tableset");
      const newRow = document.createElement("tr");
      newRow.classList.add("test");
      newRow.style.wordBreak = "break-all";
      const cell1 = document.createElement("td");
      const cell2 = document.createElement("td");
      const cell3 = document.createElement("td");
      const cell4 = document.createElement("td");

      cell1.textContent = prefix;
      cell2.textContent = obj["required"];
      cell3.textContent = obj["usage"];
      cell4.textContent = obj["description"];

      newRow.appendChild(cell1);
      newRow.appendChild(cell2);
      newRow.appendChild(cell3);
      newRow.appendChild(cell4);

      table.appendChild(newRow);
    }
    return;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key !== "required_attributes") {
      const newKey = prefix ? prefix + "." + key : key;
      if (Array.isArray(obj[key])) {
        result[newKey] = obj[key];
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], newKey, result, requiredAttr);
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

var attributes;

function updateAttribute() {
  var example_set = document.getElementById("attribute-dropdown");
  var selectedValue = example_set.value;
  document.querySelectorAll(".content").forEach((div) => div.remove());
  addAttributeSets(selectedValue);
}

function updateSetsAttribute() {
  var attributesDropDown = document.getElementById("attribute-dropdown");
  var example_set = document.getElementById("attribute-sets-dropdown");
  document.querySelectorAll(".content").forEach((div) => div.remove());
  var selectedValue = example_set.value;
  updateSets(attributesDropDown.value, selectedValue);
}

function updateL1Attribute() {
  var attributesDropDown = document.getElementById("attribute-dropdown");
  var example_set = document.getElementById("attribute-sets-dropdown");
  var l1Dropdown = document.getElementById("attribute-l1-dropdown");
  document.querySelectorAll(".content").forEach((div) => div.remove());
  var object =
    attributes[attributesDropDown.value]?.attribute_set[example_set.value];
  for (const each of l1Dropdown.value.split(".")) {
    object = object[each];
  }
  console.log("Object to render", object);
  object = removeParentAttributes(object);
  if (
    "required" in object[Object.keys(object).filter((e) => e !== "parent")[0]]
  )
    flattenObject(object, null, null, object?.required_attributes);
}

function removeParentAttributes(obj) {
  var newObj = {};
  for (const key in obj) {
    if (
      !["parent", "usage", "description", "reference", "required"].includes(
        key
      )
       &&
      !("parent" in obj[key])
    )
      newObj = { ...newObj, [key]: { ...obj[key] } };
  }
  return newObj;
}

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
  addAttributeSets(indexKey[0]);
}

function updateSets(value, option) {
  const object = attributes[value]?.attribute_set[option];

  var l1DropDown = document.getElementById("attribute-l1-dropdown");
  l1DropDown.innerHTML = "";

  const paths = generatePaths(object);

  paths.forEach(function (key) {
    var option = document.createElement("option");
    option.text = key;
    l1DropDown.add(option);
  });

  const firstKey = paths[0];
  var keyDetail = object;
  for (const each of firstKey.split(".")) {
    keyDetail = keyDetail[each];
  }

  console.log("Object to render", keyDetail);

  // if ("required" in keyDetail)
  flattenObject(keyDetail, null, null, keyDetail?.required_attributes);
}

function addAttributeSets(option) {
  const object = attributes[option]?.attribute_set;
  var setsDropDown = document.getElementById("attribute-sets-dropdown");
  setsDropDown.innerHTML = "";

  Object.keys(object).forEach(function (key) {
    var option = document.createElement("option");
    option.text = key;
    setsDropDown.add(option);
  });

  var l1DropDown = document.getElementById("attribute-l1-dropdown");
  l1DropDown.innerHTML = "";

  const paths = generatePaths(object[Object.keys(object)[0]]);
  console.log(
    "PATH from addAttributeSets",
    paths,
    object[Object.keys(object)[0]]
  );

  paths.forEach(function (key) {
    var option = document.createElement("option");
    option.text = key;
    l1DropDown.add(option);
  });

  const firstKey = paths[0];
  var keyDetail = object[Object.keys(object)[0]];
  for (const each of firstKey.split(".")) {
    keyDetail = keyDetail[each];
  }

  console.log("Object to render", keyDetail);

  if (
    "required" in
    keyDetail[Object.keys(keyDetail).filter((e) => e !== "parent")[0]]
  )
    flattenObject(keyDetail, null, null, keyDetail?.required_attributes);
}

function generatePaths(o, root = "", result = [], itr = 0) {
  var ok = Object.keys(o);
  const filteredKeys = ok.filter(
    (e) =>
      !["required", "description", "usage", "reference", "parent"].includes(e)
  );

  if (ok.includes("parent") && o["parent"] === true)
    for (const each of filteredKeys) {
      var p = root.length > 0 ? root + "." + each : each;

      generatePaths(o[each], p, result, itr + 1);
    }
  const addRoute = ["required", "description", "usage", "reference"].every(
    (e) => ok.includes(e)
  );
  if (addRoute && root.length > 0)
    var actualRoot = root.split(".").slice(0, -1).join(".");
  if (actualRoot && !result.includes(actualRoot)) {
    result.push(actualRoot);
  }

  return result;
}

function flattenObject(obj, prefix = "", result = {}, requiredAttr) {
  if ("required" in obj) {
    if (requiredAttr === undefined || requiredAttr.includes(prefix)) {
      var table = document.getElementById("tableset");
      const newRow = document.createElement("tr");
      newRow.classList.add("content");
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
    if (
      obj.hasOwnProperty(key) &&
      key !== "required_attributes" &&
      key !== "parent"
    ) {
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

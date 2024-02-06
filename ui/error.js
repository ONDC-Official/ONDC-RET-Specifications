let errors;

function loadErrors(data) {
  errors = data;
  const option = document.getElementById("error-dropdown").value;
  addErrorSets(errors[0][option]);
}

function updateErrors() {
  const option = document.getElementById("error-dropdown").value;
  const object = errors.find((obj) => {
    if (Object.keys(obj)[0] === option) {
      return obj
    }
  })
  addErrorSets(object[option]);
}

function addErrorSets(object) {
  const option = document.getElementById("error-dropdown").value;
  var table = document.getElementById("errorset");
  document.getElementById('errorset').innerHTML = '';

  if (option === 'Cancellation') {
    const row1 = document.createElement("tr");

    const head1 = document.createElement("th");
    const head2 = document.createElement("th");
    const head3 = document.createElement("th");
    const head4 = document.createElement("th");
    const head5 = document.createElement("th");
    const head6 = document.createElement("th");
    const head7 = document.createElement("th");

    head1.textContent = "Code";
    head2.textContent = "Reason";
    head3.textContent = "Triggers RTO?";
    head4.textContent = "Who can use code?";
    head5.textContent = "Cause of cancellation & hence cost attributed to";
    head6.textContent = "Applicable for part cancel";
    head7.textContent = "Comment";

    row1.appendChild(head1);
    row1.appendChild(head2);
    row1.appendChild(head3);
    row1.appendChild(head4);
    row1.appendChild(head5);
    row1.appendChild(head6);
    row1.appendChild(head7);

    table.appendChild(row1);
    
   
  }else if (option === 'ErrorCodes'){
    const row1 = document.createElement("tr");

    const head1 = document.createElement("th");
    const head2 = document.createElement("th");
    const head3 = document.createElement("th");
    const head4 = document.createElement("th");

    head1.textContent = "Code";
    head2.textContent = "Type";
    head3.textContent = "Message";
    head4.textContent = "Description";

    row1.appendChild(head1);
    row1.appendChild(head2);
    row1.appendChild(head3);
    row1.appendChild(head4);

    table.appendChild(row1);
  }
  if (object && object != undefined) {
    object.forEach(function (key) {
      const newRow = document.createElement("tr");
      newRow.classList.add("test");
      newRow.style.wordBreak = "break-all";
      if (option === 'Cancellation') {
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");
        const cell5 = document.createElement("td");
        const cell6 = document.createElement("td");
        const cell7 = document.createElement("td");

        cell1.style.minWidth = "65px";
        cell1.textContent = key["Code"];
        cell2.textContent = key["Reason"];
        cell3.textContent = key["Triggers RTO?"];
        cell4.textContent = key["Who can use code?"];
        cell5.textContent = key["Cause of cancellation & hence cost attributed to"];
        cell6.textContent = key["Applicable for part cancel"];
        cell7.textContent = key["Comment"];

        newRow.appendChild(cell1);
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);
        newRow.appendChild(cell5);
        newRow.appendChild(cell6);
        newRow.appendChild(cell7);
      } else {
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");

        cell1.style.minWidth = "65px";
        cell1.textContent = key["Code"];
        cell2.textContent = key["Type"];
        cell3.textContent = key["Message"];
        cell4.textContent = key["Description"];

        newRow.appendChild(cell1);
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);
      }
      table.appendChild(newRow);
    });
  }
}
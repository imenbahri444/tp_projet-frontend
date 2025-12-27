var API = "/tp_projet/tp_projet";

var btnPing = document.getElementById("btnPing");
var pingOut = document.getElementById("pingOut");

var addForm = document.getElementById("addForm");
var addOut = document.getElementById("addOut");

var searchForm = document.getElementById("searchForm");
var searchOut = document.getElementById("searchOut");

var updateForm = document.getElementById("updateForm");
var updateOut = document.getElementById("updateOut");

var deleteBtn = document.getElementById("deleteBtn");
var deleteOut = document.getElementById("deleteOut");

var btnLoad = document.getElementById("btnLoad");

// Old JSON output (we will not use it anymore for listing)
var out = document.getElementById("out");

// Table elements (required for "Tableau")
var table = document.getElementById("studentsTable");
var tableBody = table ? table.querySelector("tbody") : null;

// Optional search result area (recommended)
var searchResult = document.getElementById("searchResult");

btnPing.addEventListener("click", function () {
  pingOut.textContent = "Checking...";
  fetch(API + "/ping")
    .then(function (r) { return r.text(); })
    .then(function (t) { pingOut.textContent = "Backend is running ✅ (" + t + ")"; })
    .catch(function () { pingOut.textContent = "Backend not reachable ❌"; });
});

addForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var submitBtn = addForm.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  addOut.textContent = "Saving student...";

  var person = {
    cin: document.getElementById("cin").value.trim(),
    nom: document.getElementById("nom").value.trim(),
    email: document.getElementById("email").value.trim()
  };

  fetch(API + "/persons", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person)
  })
    .then(function (r) {
      if (r.ok) {
        addOut.textContent = "Student added successfully ✅";
        addForm.reset();
        return loadPersons();
      } else {
        addOut.textContent = "Failed to add student ❌ (HTTP " + r.status + ")";
      }
    })
    .catch(function () {
      addOut.textContent = "Network error ❌";
    })
    .finally(function () {
      if (submitBtn) submitBtn.disabled = false;
    });
});

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  searchOut.textContent = "Searching...";

  var id = document.getElementById("sid").value.trim();
  if (!id) { searchOut.textContent = "Enter a student ID"; return; }

  fetch(API + "/persons/" + id)
    .then(function (r) {
      if (r.status === 404) { searchOut.textContent = "No student found with this ID ❌"; return null; }
      if (!r.ok) { searchOut.textContent = "Request failed ❌ (HTTP " + r.status + ")"; return null; }
      return r.json();
    })
    .then(function (data) {
      if (data) {
        searchOut.textContent = "Student found ✅";

        // Show single student result in a dedicated area if exists
        if (searchResult) {
          searchResult.textContent = JSON.stringify(data, null, 2);
        } else if (out) {
          // fallback (if you didn't add searchResult in HTML)
          out.textContent = JSON.stringify(data, null, 2);
        }
      }
    })
    .catch(function () { searchOut.textContent = "Network error ❌"; });
});

updateForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var submitBtn = updateForm.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;

  updateOut.textContent = "Updating student...";

  var id = document.getElementById("uid").value.trim();
  if (!id) {
    updateOut.textContent = "Enter a student ID";
    if (submitBtn) submitBtn.disabled = false;
    return;
  }

  var person = {
    cin: document.getElementById("ucin").value.trim(),
    nom: document.getElementById("unom").value.trim(),
    email: document.getElementById("uemail").value.trim()
  };

  fetch(API + "/persons/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person)
  })
    .then(function (r) {
      if (r.ok) {
        updateOut.textContent = "Student updated successfully ✏️";
        updateForm.reset();
        return loadPersons();
      } else {
        updateOut.textContent = "Update failed ❌ (HTTP " + r.status + ") — check the ID";
      }
    })
    .catch(function () {
      updateOut.textContent = "Network error ❌";
    })
    .finally(function () {
      if (submitBtn) submitBtn.disabled = false;
    });
});

deleteBtn.addEventListener("click", function () {
  var id = document.getElementById("did").value.trim();
  if (!id) { deleteOut.textContent = "Enter a student ID"; return; }

  if (!confirm("Delete student id " + id + " ?")) return;

  deleteOut.textContent = "Deleting student...";

  fetch(API + "/persons/" + id, { method: "DELETE" })
    .then(function (r) {
      if (r.ok) {
        deleteOut.textContent = "Student deleted successfully 🗑️";
        document.getElementById("did").value = "";
        return loadPersons();
      } else {
        deleteOut.textContent = "Delete failed ❌ (HTTP " + r.status + ") — ID not found";
      }
    })
    .catch(function () { deleteOut.textContent = "Network error ❌"; });
});

btnLoad.addEventListener("click", loadPersons);

function loadPersons() {
  return fetch(API + "/persons")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      // If table doesn't exist, fallback to JSON output (so nothing "crashes")
      if (!tableBody) {
        if (out) {
          out.textContent = (!data || data.length === 0)
            ? "No students yet. Add one above 👆"
            : JSON.stringify(data, null, 2);
        }
        return;
      }

      // Clear table
      tableBody.innerHTML = "";

      if (!data || data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No students found</td></tr>";
        return;
      }

      data.forEach(function (p) {
        var tr = document.createElement("tr");
        tr.innerHTML =
          "<td>" + (p.id != null ? p.id : "") + "</td>" +
          "<td>" + (p.cin != null ? p.cin : "") + "</td>" +
          "<td>" + (p.nom != null ? p.nom : "") + "</td>" +
          "<td>" + (p.email != null ? p.email : "") + "</td>";
        tableBody.appendChild(tr);
      });
    })
    .catch(function () {
      if (tableBody) {
        tableBody.innerHTML = "<tr><td colspan='4'>Network error ❌</td></tr>";
      } else if (out) {
        out.textContent = "Network error ❌";
      }
    });
}

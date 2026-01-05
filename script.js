const jsonURL = "https:dev.deepthought.education/assets/uploads/file/files/other/ddugky_project";

/* ---------------- Reusable Component ---------------- */

function assetTemplate(asset) {
  let content = "";

  if (asset.asset_content_type === "video") {
    content = `
      <iframe 
        width="100%" 
        height="315" 
        src="${asset.asset_content}" 
        allowfullscreen>
      </iframe>`;
  } else {
    content = <p>${asset.asset_content}</p>;
  }

  return `
    <div class="asset-card">
      <h3>${asset.asset_title}</h3>
      <p>${asset.asset_description}</p>
      ${content}
    </div>
  `;
}

/* ---------------- Fetch & Render ---------------- */

fetch(jsonURL)
  .then(response => response.json())
  .then(data => {

    // Rendering one task only (as per instructions)
    const task = data.tasks[0];

    document.getElementById("task-title").innerText = task.task_title;
    document.getElementById("task-description").innerText = task.task_description;

    const assetsContainer = document.getElementById("assets-container");

    task.assets.forEach(asset => {
      assetsContainer.innerHTML += assetTemplate(asset);
    });
  })
  .catch(error => console.error("Error loading JSON:", error));
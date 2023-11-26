const repoInput = document.getElementById("repoInput");
const autocompleteItems = document.getElementById("autocompleteItems");
const repositoriesList = document.getElementById("repositoriesList");
let debounceTimer;

repoInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const inputValue = repoInput.value.trim();

    if (inputValue === "") {
      autocompleteItems.innerHTML = "";
      return;
    }

    searchRepositories(inputValue);
  }, 300);
});

function searchRepositories(qr) {
  fetch(`https://api.github.com/search/repositories?q=${qr}`)
    .then((response) => response.json())
    .then((data) => displayAutocomplete(data.items.slice(0, 5)))
    .catch((error) => console.error("Ошибка при выборке репозиториев:", error));
}

function displayAutocomplete(items) {
  autocompleteItems.innerHTML = "";
  items.forEach((item) => {
    const autocompleteItem = document.createElement("div");
    autocompleteItem.className = "autocomplete-item";
    autocompleteItem.textContent = item.name;
    autocompleteItem.onclick = () => addRepository(item);
    autocompleteItems.appendChild(autocompleteItem);
  });
}

function addRepository(repository) {
  const repositoryItem = document.createElement("div");
  repositoryItem.className = "repository-item";
  repositoryItem.onclick = deleteRepository;
  repositoryItem.innerHTML = `
    Name: ${repository.name}<br>
    Owner: ${repository.owner.login}<br> 
    Stars: ${repository.stargazers_count}<br>
    <button class="delete-btn"></button>
  `;
  repositoriesList.appendChild(repositoryItem);
  repoInput.value = "";
  autocompleteItems.innerHTML = "";
}

function deleteRepository(event) {
  let target = event.target;
  const repositoryItem = target.closest(".repository-item");
  if (target.className === "delete-btn")
    repositoriesList.removeChild(repositoryItem);
  else {
    return;
  }
}

function handleInput() {
  const inputValue = repoInput.value.trim();

  if (inputValue === "") {
    autocompleteItems.innerHTML = "";
  }
}

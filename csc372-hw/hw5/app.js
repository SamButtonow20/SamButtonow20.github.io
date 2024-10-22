const repoGallery = document.getElementById('repoGallery');
const searchButton = document.getElementById('searchButton');
const usernameInput = document.getElementById('usernameInput');

const defaultUsername = 'SamButtonow20';

searchButton.addEventListener('click', () => {
  const username = usernameInput.value || defaultUsername;
  fetchRepos(username);
});

// Fetch the repositories for a given GitHub username
function fetchRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayRepos(data))
    .catch(error => console.error('Error fetching repositories:', error));
}

// Function to display the repository data
function displayRepos(repos) {
  repoGallery.innerHTML = ''; // Clear previous data

  repos.forEach(repo => {
    // Create repository card
    const repoCard = document.createElement('div');
    repoCard.classList.add('repo-card');

    // Repository name with GitHub icon
    const repoName = document.createElement('h2');
    repoName.innerHTML = `<i class="fab fa-github"></i> ${repo.name}`;

    // Repository description
    const repoDescription = document.createElement('p');
    repoDescription.textContent = repo.description || 'No description available';

    // Repository creation and update dates
    const repoDates = document.createElement('p');
    repoDates.textContent = `Created: ${new Date(repo.created_at).toLocaleDateString()} | Updated: ${new Date(repo.updated_at).toLocaleDateString()}`;

    // View Repository link with GitHub icon
    const repoLink = document.createElement('a');
    repoLink.href = repo.html_url;
    repoLink.innerHTML = `<i class="fab fa-github"></i> View Repository`;
    repoLink.target = '_blank';

    // Append elements to the card
    repoCard.appendChild(repoName);
    repoCard.appendChild(repoDescription);
    repoCard.appendChild(repoDates);
    repoCard.appendChild(repoLink);
    repoGallery.appendChild(repoCard);
  });
}


// Load default profile on page load
fetchRepos(defaultUsername);

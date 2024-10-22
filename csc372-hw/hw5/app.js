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
    .then(data => {
      repoGallery.innerHTML = ''; // Clear previous data only once

      // Fetch additional details for each repo
      data.forEach(repo => {
        fetchAdditionalRepoDetails(repo, username);
      });
    })
    .catch(error => console.error('Error fetching repositories:', error));
}

// Fetch additional details like commits and languages for each repo
function fetchAdditionalRepoDetails(repo, username) {
  const commitsUrl = `https://api.github.com/repos/${username}/${repo.name}/commits`;
  const languagesUrl = `https://api.github.com/repos/${username}/${repo.name}/languages`;

  // Fetch commits and languages in parallel
  Promise.all([
    fetch(commitsUrl).then(res => res.json()),
    fetch(languagesUrl).then(res => res.json())
  ])
    .then(([commits, languages]) => {
      displayRepo(repo, commits.length, languages);
    })
    .catch(error => console.error('Error fetching additional repo details:', error));
}

// Function to display the repository data
function displayRepo(repo, commitCount, languages) {
  // Create repository card
  const repoCard = document.createElement('div');
  repoCard.classList.add('repo-card');

  const repoName = document.createElement('h2');
  repoName.innerHTML = `<i class="fab fa-github"></i> ${repo.name}`;

  const repoDescription = document.createElement('p');
  repoDescription.textContent = repo.description || 'No description available';

  const repoDates = document.createElement('p');
  repoDates.textContent = `Created: ${new Date(repo.created_at).toLocaleDateString()} | Updated: ${new Date(repo.updated_at).toLocaleDateString()}`;

  const repoCommits = document.createElement('p');
  repoCommits.textContent = `Commits: ${commitCount}`;

  const repoLanguages = document.createElement('p');
  repoLanguages.textContent = `Languages: ${Object.keys(languages).join(', ') || 'No languages available'}`;

  const repoWatchers = document.createElement('p');
  repoWatchers.textContent = `Watchers: ${repo.watchers_count || 0}`; // Default to 0 if undefined

  const repoLink = document.createElement('a');
  repoLink.href = repo.html_url;
  repoLink.textContent = 'View Repository';
  repoLink.target = '_blank';

  // Append elements to the card
  repoCard.appendChild(repoName);
  repoCard.appendChild(repoDescription);
  repoCard.appendChild(repoDates);
  repoCard.appendChild(repoCommits);
  repoCard.appendChild(repoLanguages);
  repoCard.appendChild(repoWatchers);
  repoCard.appendChild(repoLink);

  repoGallery.appendChild(repoCard); // Add the card to the gallery
}

// Load default profile on page load
fetchRepos(defaultUsername);

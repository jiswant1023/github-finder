

let inputSearch=document.getElementById("input_search");
let searchButton=document.getElementById("search_button");

let outputContainer=document.getElementById("output_container");



searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    searchGitUser(); 
});

async function searchGitUser() {
  const username = inputSearch.value.trim();
  if (username === '') {
    alert('Please enter a GitHub username.');
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const userData = await response.json();
    displayUserProfile(userData);
  } catch (error) {
    console.error(error.message);
  }
}

function displayUserProfile(userData){
    
    outputContainer.innerHTML = `
    <div>
      <img src="${userData.avatar_url}" alt="${userData.login}" style="border-radius: 50%; width: 100px; height: 100px;">
      <h2>${userData.name || userData.login}</h2>
      <p>Username: <a href="${userData.html_url}" target="_blank">${userData.login}</a></p>
      <p>Public Repositories: ${userData.public_repos}</p>
      <p>Followers: ${userData.followers}</p>
      <p>Following: ${userData.following}</p>
      <p>Created At: ${userData.created_at.trim()}</p>
    </div>
  `;
  console.log(outputContainer.innerHTML);
  
}




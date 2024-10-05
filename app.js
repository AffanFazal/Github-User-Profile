const form = document.querySelector("#form");
const mainDiv = document.querySelector("#main-div");
const messageDiv = document.querySelector("#message-p");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const imgInp = mainDiv.children[0];
    const name = mainDiv.children[1];
    const repos = mainDiv.children[2];
    const link = mainDiv.children[3];

    const value = event.target.children[0].value;
    const API_URI = `https://api.github.com/users/${value}`;

    // Clear previous messages
    messageDiv.innerText = '';

    try {
        const response = await axios(API_URI);

        // If the user is found
        imgInp.src = response.data.avatar_url;
        name.innerText = response.data.name || 'No Name Provided';
        repos.innerText = `Public Repos: ${response.data.public_repos}`;
        link.href = response.data.html_url;
        
        mainDiv.classList.remove('hidden');
        
    } catch (err) {
        console.log(err.response.data.message);

        // Show error message
        messageDiv.innerText = err.response.data.message;

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid username! Please try again.',
        });

        imgInp.src = "";
        name.innerText = "";
        repos.innerText = "";
        link.href = "";
        mainDiv.classList.add('hidden');
    }
});
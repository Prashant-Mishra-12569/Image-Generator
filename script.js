const form = document.getElementById("keywords-form");
const imageContainer = document.getElementById("image-container");

form.addEventListener("submit", event => {
    event.preventDefault();
    const keywords = document.getElementById("keywords-input").value;

    // OpenAI API endpoint and headers
    const endpoint = "https://api.openai.com/v1/images/generations";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${"API-KEY"}`
    };

    // Request data
    const data = JSON.stringify({
        model: "image-alpha-001",
        prompt: keywords,
        num_images: 1,
        size: "256x256",
        response_format: "url"
    });

    // Send request to OpenAI API
    fetch(endpoint, { method: "POST", headers, body: data })
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.data[0].url;

            // Create image element and set its src to the image URL
            const image = document.createElement("img");
            image.src = imageUrl;

            // Clear image container and append the new image
            imageContainer.innerHTML = "";
            imageContainer.appendChild(image);
        })
        .catch(error => console.error(error));
});

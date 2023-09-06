const mainForm = document.querySelector("#form-wrapper");
const buttons = document.querySelector("#buttons");
const searchButton = document.querySelector("#search-button");
const clearButton = document.querySelector("#clear-button");
const imageListWrapper = document.querySelector("#image-list-wrapper");
const inputText = document.querySelector("#input-text");

runEventListener();

function runEventListener() {
    searchButton.addEventListener("click", search);
    clearButton.addEventListener("click", clear);
}

function search(e) {
    const value = inputText.value.trim();

    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
            method: "GET",
            headers: {
                Authorization: "Client-ID -j62Gt-GAtyuCVChCtvnOga_dMzzPxIxT-2D7QJa85U"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            searchButton.disabled = true;
        Array.from(data.results).forEach(res => {
            imageAddUI(res.urls.small)
        })
    })
        .catch((err) => console.log(err));

    e.preventDefault();

}

function imageAddUI(url) {
    const div = document.createElement("div");
    div.className = "con";
    const img = document.createElement("img");
    img.setAttribute("src", url);

    div.appendChild(img);
    imageListWrapper.appendChild(div);

}

function clear(e) {
    
    searchButton.disabled = false;

    inputText.value = "";
    imageListWrapper.innerHTML = "";


    e.preventDefault();
}
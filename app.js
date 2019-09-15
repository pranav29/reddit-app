class FormPage {
    constructor() {
        this.txtSearchInput = document.getElementById("search-input");
        this.rbSortBy = document.querySelector("input[name='sortby']:checked");
        this.ddlLimit = document.getElementById("limit");
        this.btnSubmit = document.getElementById("submit");
        this.results = document.getElementById("results");
    }

    addEventListeners() {
        this.btnSubmit.addEventListener('click', this.showResults);
    }

    fetchResults = (searchInput, sortBy, limit) => {
        const proxy = `http://cors-anywhere.herokuapp.com/`;
        const url = `${proxy}https://www.reddit.com/search.json?q=${searchInput}&sort=${sortBy}&limit=${limit}`;
        return fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data.data;
            });
    }

    showResults = (e) => {
        e.preventDefault();
        const searchInput = this.txtSearchInput.value;
        const sortBy = this.rbSortBy.value;
        const limit = this.ddlLimit.value;
        
        if (searchInput === '') {
            return this.showMessage("Please add search term", "alert-danger");
        }
        this.fetchResults(searchInput, sortBy, limit)
            .then((posts) => {
                this.results.innerHTML = `<div class="row">`;
                posts.children.forEach((post)=>{
                    const image = post.data.preview ? post.data.preview.images[0].source.url : `https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg`;
                    this.results.innerHTML += `<div class = "col-sm-6"><div class = "card mb-2">
                        <img class = "card-img-top" src = ${image}>
                        <div class = "card-body">
                            <h5 class = "card-title">${post.data.title}</h5>
                            <a href = ${post.data.url} class = "btn btn-primary">Read More</a>
                        </div></div>    
                    </div>`;
                });
                this.results.innerHTML += `</div>`;
            });    
    }

    showMessage(message, className) {
        const div = document.createElement("div");
        const searchContainer = document.getElementById("search-container");
        const form = document.getElementById("search-form");

        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        searchContainer.insertBefore(div, form);
        setTimeout(() => {
            searchContainer.removeChild(div)
        }, 3000);
    }
}

const form = new FormPage();

form.addEventListeners();
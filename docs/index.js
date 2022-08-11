
// create route function that handles the page charnge event
const route = (event) => {
    event = event || window.event;
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)
    handleLocation();
}

// set of routes that we can are available
const routes = {
    '/': {
        templates: './templates/index.html',
        title: "",
        Desciption: ''
    },
    '/basket': {
        templates: './templates/basket.html',
        title: "",
        Desciption: ''
    },
    '/1': {
        templates: './books/1.html',
        title: "",
        Desciption: ''
    },
    '/2': {
        templates: './books/2.html',
        title: "",
        Desciption: ''
    }
}

// this changes the location of the url 
const handleLocation = async () => {
    const path = window.location.pathname; // get path name
    if (path.length = 0) {
        path = '/'
        loadData();
        console.log('it is working')
    }
    const destination = routes[path] || routes[404];
    console.log(destination)
    // get text form a page as inner html
    const html = await fetch(destination.templates).then((data) => data.text())
    if(destination.templates === './templates/index.html'){
        loadData();
        console.log('you bro')
    }
   
    var main = document.querySelector('.main')
    main.innerHTML = html;
}


// get books from api and write to page
function loadData() {
    fetch('https://upflex-book-store-api.herokuapp.com/books')
        .then((res) => res.json()).then((data) => {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i])
                console.log(data[i].title)
                console.log(data[i].id)
                var title = data[i].title;
                var description = data[i].metaDescription;
                var coverImage = data[i].cover;
                var id = data[i].id;
                BuildPage(title, description, coverImage, id)

            }
        })

}


function BuildPage(title, description, Image, id) {
    let bbb = document.getElementById('bbb')
    var div = document.createElement('div')
    div.setAttribute('class', 'book')
    var divHtml =`<a href="${id}" onclick="route()">
    ${title}
    
    ${description}
    
    </a>`
    div.innerHTML = divHtml;
    console.log(div)
    bbb.appendChild(div);

}



window.onpopstate = handleLocation;
window.route = route;
handleLocation();
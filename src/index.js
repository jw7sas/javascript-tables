const BASE_API = 'https://api.jikan.moe/v3/search/anime'

const fetchData = async (url) => {
    const response = await fetch(url)
    if(!response.ok){
        throw new Error("Error " + url)
    }
    return await response.json()
}

async function getMovie(){
    const urlNew = encodeURI(`${BASE_API}?q=one piece`)
    const data = await fetchData(urlNew)
    return data.results
} 

function graphMoviesWayOne(movies){
    const $tbody = document.getElementById("tbody_movies")
    if(movies){
        let $tr, td, $a, $img
        for(const index in movies){
            const movie = movies[index]

            $tr = document.createElement("tr")

            $td = document.createElement("td")
            $td.textContent = movie.title
            $tr.appendChild($td)

            $td = document.createElement("td")
            $td.textContent = movie.synopsis
            $tr.appendChild($td)

            $td = document.createElement("td")
            $img = document.createElement("img")
            $img.src = movie.image_url
            $td.appendChild($img)
            $tr.appendChild($td)

            $td = document.createElement("td")
            $a = document.createElement("a")
            $a.href = movie.url
            $a.target = "_blank"
            $a.textContent = "Ver"
            $td.appendChild($a)
            $tr.appendChild($td)

            $tbody.appendChild($tr)
        }
    }
}

const templateTdMovie = movie => {
    return (`
        <td>${movie.title}</td>
        <td>${movie.synopsis}</td>
        <td><img src="${movie.image_url}" alt="${movie.title}"></td>
        <td><a href="${movie.url}" target="_blank">Ver ${movie.title}</a></td>
    `)
}

function graphMoviesWayTwo(movies){
    const $tbody = document.getElementById("tbody_movies")
    if(movies){
        for(const index in movies){
            const movie = movies[index]
            const $tr = document.createElement("tr")

            $tr.innerHTML = templateTdMovie(movie)
            $tbody.appendChild($tr)
        }
    }
}

(async function load(){
    const movies = await getMovie()
    // graphMoviesWayOne(movies)
    graphMoviesWayTwo(movies)
    console.log(movies)
})()
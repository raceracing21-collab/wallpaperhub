const grid = document.getElementById("wallpaperGrid");

async function loadWallpapers() {

    try {

        const response = await fetch("data/wallpapers.json");

        const wallpapers = await response.json();

        showWallpapers(wallpapers);

    } catch (error) {

        console.error(error);

    }

}

function showWallpapers(data){

    grid.innerHTML="";

    data.forEach(item=>{

        grid.innerHTML += `

        <div class="wallpaper-card">

            <img src="${item.image}" alt="${item.title}">

            <div class="overlay">

                ${item.title}

            </div>

        </div>

        `;

    });

}

loadWallpapers();

const grid = document.getElementById("wallpaperGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");
let wallpapers = [];

async function loadWallpapers() {
    try {
        const response = await fetch("data/wallpapers.json");
        wallpapers = await response.json();
        showWallpapers(wallpapers);
    } catch (error) {
        console.error(error);
    }
}

function showWallpapers(data) {

    grid.innerHTML = "";

    if (data.length === 0) {
        grid.innerHTML = `
            <p style="text-align:center;width:100%;font-size:20px;">
                Wallpaper tidak ditemukan.
            </p>
        `;
        return;
    }

    data.forEach(item => {

        grid.innerHTML += `
            <div class="wallpaper-card">

                <img src="${item.image}" alt="${item.title}">

                <div class="overlay">

                    <h3>${item.title}</h3>

                    <small>${item.category}</small>

                </div>

            </div>
        `;

    });

}

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const result = wallpapers.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword)
    );

    showWallpapers(result);

});
categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        if (category === "All") {

            showWallpapers(wallpapers);

            return;
        }

        const filtered = wallpapers.filter(item =>
            item.category === category
        );

        showWallpapers(filtered);

    });

});
loadWallpapers();

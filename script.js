document.addEventListener("DOMContentLoaded", () => {
    let urlList = 'https://opensheet.elk.sh/1d_sSRkuXlhxrSU0wGK0W1S7RzQMW_PL7WDP-SrBMo68/List';
    listArr = [];
    loadList = () => {
        let wrapper = document.querySelector(".rollette__wrapper");
        wrapper.innerHTML = '';
        for (let i = 0; i < 250; i++) {
            randomIndex = Math.floor(Math.random() * listArr.length);
            let cloneElem = listArr[randomIndex].cloneNode(true);
            wrapper.appendChild(cloneElem);
        }
    }
    fetch(urlList)
        .then(data => data.json())
        .then(result => {
            if (result) {
                result.map((item, index) => {
                    let itemList = document.createElement("div");
                    itemList.className = `rollette__item ${item.color}`;
                    itemList.innerHTML = `<p>${item.name}</p>`;
                    itemList.dataset.id = index;
                    listArr.push(itemList);
                });
                loadList();
            }
        });

    let btn = document.querySelector(".rollette__btn");
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        let audioElem = document.querySelector("audio"),
            wrapper = document.querySelector(".rollette__wrapper");
        wrapper.classList.remove("active");
        setTimeout(() => {
            loadList();
            audioElem.play();
            wrapper.classList.add("active");
            setTimeout(() => {
                audioElem.load();
            }, 20000);
        }, 100);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // let urlList = 'https://opensheet.elk.sh/1d_sSRkuXlhxrSU0wGK0W1S7RzQMW_PL7WDP-SrBMo68/List';
    let urlList = './list.json';
    listArr = [];
    listObj = [];
    document.querySelector("audio").volume = window.localStorage.getItem("volume") || 1;
    document.querySelector(`.volume [type='range']`).value = window.localStorage.getItem("volume") || 1;
    document.querySelector(`.volume span`).dataset.value = window.localStorage.getItem("volume") || 1;

    modal = new function () {
        this.show = () => {
            document.querySelector(".modalwindow").classList.add("show");
        }
        this.hide = () => {
            if (document.querySelector(".modalwindow.show")) {
                document.querySelector(".modalwindow.show").classList.remove("show");
            }
        }
    }

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
                    listObj[index] = item;
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
        btn.classList.add("disabled");
        setTimeout(() => {
            loadList();
            audioElem.play();
            wrapper.classList.add("active");
            setTimeout(() => {
                btn.classList.remove("disabled");
                audioElem.load();

                let arrowElem = document.querySelector(".rollette__arrow"),
                    x = +arrowElem.getBoundingClientRect().x + (+arrowElem.clientWidth / 2),
                    y = arrowElem.getBoundingClientRect().y + (+arrowElem.clientHeight / 2),
                    elemCart = document.elementsFromPoint(x, y).find(e => e.classList.contains("rollette__item")),
                    dataItem = listObj[elemCart.dataset.id];

                let modalWindow = document.querySelector(".modalwindow");

                modalWindow.querySelector("h3").innerHTML = dataItem.name;
                modalWindow.querySelector("p").innerHTML = `Игра: ${dataItem.game}`;
                modalWindow.querySelector("span").innerHTML = dataItem.desc;
                modalWindow.querySelector(".modalwindow__wrapper").className = `modalwindow__wrapper ${dataItem.color}`;

                modal.show();


            }, 20000);
        }, 100);
    });



    if (document.querySelector(".volume")) {
        let volumeWrapper = document.querySelector(".volume"),
            btn = volumeWrapper.querySelector(`[type="checkbox"]`),
            range = volumeWrapper.querySelector(`[type="range"]`),
            audio = document.querySelector("audio");

        btn.addEventListener("change", (e) => {
            if (btn.checked) {
                range.value = window.localStorage.getItem("volume") || 1;
                audio.volume = window.localStorage.getItem("volume") || 1;
                volumeWrapper.querySelector("span").dataset.value = window.localStorage.getItem("volume") || 1;
            } else {
                range.value = 0;
                audio.volume = 0;
                volumeWrapper.querySelector("span").dataset.value = 0;
            }
        });
        range.addEventListener("input", () => {
            window.localStorage.setItem("volume", range.value);
            volumeWrapper.querySelector("span").dataset.value = range.value;
            audio.volume = range.value;
            if (range.value == 0) {
                btn.checked = false;
            } else {
                btn.checked = true;
            }
        });
    }
});
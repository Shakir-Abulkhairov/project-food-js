function tabs(tabheaderItem,tabContent,tabheaderItems,tabheaderActive){
     //tabs
    let tabs = document.querySelectorAll(tabheaderItem),
        tabcontent = document.querySelectorAll(tabContent),
        tabsParent = document.querySelector(tabheaderItems);

    function hideTabContent() {
        tabs.forEach((item) => {
            item.classList.remove(tabheaderActive)
        })
        tabcontent.forEach((tab) => {
            tab.style.display = 'none'
        })
    }

    function showTabContent(i = 0) {
        tabcontent[i].style.display = 'block'
        tabs[i].classList.add(tabheaderActive)
    }


    hideTabContent();
    showTabContent();
   
    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && e.target.classList.contains(tabheaderItem.slice(1))) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
    //3962
    //const modalTimer = setTimeout(modalBlockShow,3000)


}
export default tabs;
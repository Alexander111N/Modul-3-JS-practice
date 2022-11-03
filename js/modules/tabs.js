function tabs(selectotTabs, selectorTabsContent, selectorTabsParent, selectoractiveClass){
    // Tabs
    const tabs = document.querySelectorAll(selectotTabs);
    const tabsContent = document.querySelectorAll(selectorTabsContent);
    const tabsParent = document.querySelector(selectorTabsParent);

    function hideTabContent() {
        tabsContent.forEach((item)=>{
            item.style.display = 'none';
        });

        tabs.forEach((item)=> {
            item.classList.remove(selectoractiveClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(selectoractiveClass);
    }

    tabsParent.addEventListener('click', (event) => {
        let target = event.target;

        if(target && target.classList.contains(selectotTabs.slice(1))){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent(0);  
}

export default tabs;
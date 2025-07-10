export const scrollSmoothly = (target,offset)=>{
    let ele = document.querySelector(target);
    if (ele) {
        window.scrollTo({
            top : ele.getBoundingClientRect().top + window.scrollY + (offset || 0),
            behavior : 'smooth'
        });
    }
}
// Variables

let uploadSlideBtn = document.querySelector("#su-upload-btn")
let slideInput = document.querySelector("#su-input-slide")
let sliderContainer = document.querySelector("#su-content")
let postBtn = document.querySelector(".slider-uploader-submit-btn button")

// Event Listeners

uploadSlideBtn.addEventListener("click",() => {
    slideInput.click();
})
slideInput.addEventListener("change",handleUploadedSlide)
document.addEventListener("click",e => {
    let tagName = e.target.tagName
    if(tagName == "svg"){
        if(e.target.parentElement.classList.contains("su-remove-btn")){
            removeSlide(e.target,"svg")
        }
    }
    else if(tagName == "line"){
        if(e.target.parentElement.parentElement.classList.contains("su-remove-btn")){
            removeSlide(e.target,"line")
        }
    }
    else if(e.target && e.target.classList.contains("su-remove-btn")){
        removeSlide(e.target,"button")
    }
})

// Methods

function handleUploadedSlide(e){
    const [image] = slideInput.files
    if(image){
        let su_text = document.querySelector("#su-content .su-text")
        if(su_text){
            su_text.remove();
        }
        let img = `
        <div class="su-slide">
            <img src="${URL.createObjectURL(image)}" />
            <button type="button" class="su-remove-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
        `
        sliderContainer.insertAdjacentHTML("beforeend",img)
        postBtn.disabled = false
    }
}

function removeSlide(target, el){
    switch(el){
        case "button":
            target.parentElement.remove()
            break;
        case "svg":
            target.parentElement.parentElement.remove()
            break;
        case "line":
            target.parentElement.parentElement.parentElement.remove()
            break;
    }
    let slides = document.querySelectorAll(".su-slide")
    if(!slides[0]){
        postBtn.disabled = true
    }

}

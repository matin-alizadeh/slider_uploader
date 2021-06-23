// Variables

let uploadSlideBtn = document.querySelector("#su-upload-btn")
let slideInput = document.querySelector(".su-input-slide:last-child")
let sliderContainer = document.querySelector("#su-content .su-slider-container")
let postBtn = document.querySelector(".slider-uploader-submit-btn button")
let isFirstTime = true
let currentSlide = 1

// Event Listeners

uploadSlideBtn.addEventListener("click",() => {
    generateNewInput()
    slideInput.click();
})
slideInput.addEventListener("change",handleUploadedSlide)
document.addEventListener("click",e => {

    // remove slide btn
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

    // su-add-btn
    if(e.target.id == "su-add-btn"){
        generateNewInput()
        slideInput.click()
    }

    // su-order-btn
    if(e.target.id == "su-order-btn"){
        handleOrderBtn()
    }
})

// Library



// Methods

function generateNewInput(){
    slideInput = document.querySelector(".su-input-slide:last-child")
    slideInput.addEventListener("change",handleUploadedSlide)
}

function handleUploadedSlide(e){
    const [image] = slideInput.files
    if(image){
        let su_text = document.querySelector("#su-content .su-text")
        if(su_text){
            su_text.classList.add("hide");
        }
        let img = `
        <div class="su-slide" data-su-slide="slide${currentSlide}">
            <img style="background-image: url('${URL.createObjectURL(image)}')" />
            <button type="button" class="su-remove-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
        `
        currentSlide++
        sliderContainer.insertAdjacentHTML("beforeend",img)
        postBtn.disabled = false
        let input = `<input type="file" name="slide${currentSlide}" class="su-input-slide" hidden>`
        let su_content = document.querySelector("#su-content")
        su_content.insertAdjacentHTML("beforeend",input)
        removeOrderBtn()
        addContentButtons()
    }
}

function removeSlide(target, el){
    let slideNumber = ""
    switch(el){
        case "button":
            slideNumber = target.parentElement.dataset.suSlide
            target.parentElement.remove()
            break;
        case "svg":
            slideNumber = target.parentElement.parentElement.dataset.suSlide
            target.parentElement.parentElement.remove()
            break;
        case "line":
            slideNumber = target.parentElement.parentElement.parentElement.dataset.suSlide
            target.parentElement.parentElement.parentElement.remove()
            break;
    }

    document.querySelector(`.su-input-slide[name=${slideNumber}]`).remove()

    let slides = document.querySelectorAll(".su-slide")
    if(!slides[0]){
        postBtn.disabled = true
        removeContentButtons()
        document.querySelector("#su-content .su-text").classList.remove("hide")
        isFirstTime = true
    }

}

function addContentButtons(){
    const btns = `
        <div class="su-content-btn">
            <button id="su-order-btn" type="button">< ></button>
        </div>
        <div class="su-content-btn">
            <button id="su-add-btn" type="button">+</button>
        </div>
    `
    if(!isFirstTime){
        for(let i = 1; i <= 2; i++){
            document.querySelector(".su-content-btn").remove()
        }
    }
    sliderContainer.insertAdjacentHTML("beforeend",btns)
    isFirstTime = false;
}

function removeContentButtons(){
    const btns = document.querySelectorAll(".su-content-btn")
    btns.forEach(btn => btn.remove())
}

function handleOrderBtn(){
    let isThere = document.querySelector(".order-btn__order-mode") != null
    if(!isThere){
        let slides = document.querySelectorAll("#su-content .su-slide")
        const orderButtons = `
        <span class="circle__order-mode"></span>
        <button type="button" class="order-btn__order-mode">
            <svg width="30" height="20" xmlns="http://www.w3.org/2000/svg">
                <g>
                <rect id="svg_1" height="5" width="5" y="3" x="20" fill="#999999"/>
                <rect id="svg_2" height="5" width="5" y="3" x="12" fill="#999999"/>
                <rect id="svg_3" height="5" width="5" y="11.5" x="4" fill="#999999"/>
                <rect id="svg_4" height="5" width="5" y="3" x="4" fill="#999999"/>
                <rect id="svg_5" height="5" width="5" y="11.5" x="20" fill="#999999"/>
                <rect id="svg_6" height="5" width="5" y="11.5" x="12" fill="#999999"/>
                <rect id="svg_7" height="14" width="5" y="44" x="5" fill="#999999"/>
                </g>
            </svg>
        </button>
        `
        slides.forEach(slide => {
            slide.classList.add("order-mode")
            slide.insertAdjacentHTML("beforeend",orderButtons)
        })
        
        sortable = new Sortable(document.getElementById('su-ordering'), {
            disabled: false,
            onSort: function(e){
                
            }
        });

    }else{
        let spans = document.querySelectorAll(".circle__order-mode")
        spans.forEach(span => span.remove())

        let buttons = document.querySelectorAll(".order-btn__order-mode")
        buttons.forEach(btn => btn.remove())

        let slides = document.querySelectorAll("#su-content .su-slide")
        slides.forEach(slide => slide.classList.remove("order-mode"))

        sortable.options.disabled = true
    }
}

function removeOrderBtn(){
    let spans = document.querySelectorAll(".circle__order-mode")
    let btns = document.querySelectorAll(".order-btn__order-mode")
    let slides = document.querySelectorAll("#su-content .su-slide")

    spans.forEach(span => span.remove())
    btns.forEach(btn => btn.remove())
    slides.forEach(slide => slide.classList.remove("order-mode"))
    if(typeof sortable !== "undefined")
        sortable.options.disabled = true
}


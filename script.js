let filters= {
    Brightness: {
        value:100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Contrast:  {
        value:100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Saturation:  {
        value:100,
        min: 0,
        max: 200,
        unit: "%"
    },
    HueRotate: {
        value:0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    Blur: {
        value:0,
        min: 0,
        max: 20,
        unit: "px"
    },
    Grayscale:  {
        value:0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Sepia:  {
        value:0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Opacity: {
        value:100,
        min: 0,
        max:100,
        unit: "%"
    },
    Invert: {
        value:0,
        min: 0,
        max: 100,
        unit: "%"
    },

}
const filtersContainer = document.querySelector(".filters")
let imageCanvas= document.querySelector("#image-canvas")
let canvasCtx= imageCanvas.getContext("2d")
let imageInput= document.querySelector("#image-input")
let resetButton=  document.querySelector("#reset-btn")
let downloadButton= document.querySelector("#download-btn")
let file= null
let image= null

imageInput.addEventListener("change", (e) =>{
    const file= e.target.files[ 0 ]
    const imagePlaceholder=  document.querySelector(".placeholder")
    imageCanvas.style.display= "block"
    imagePlaceholder.style.display="none"
    const img= new Image()
    img.src= URL.createObjectURL(file)

    img.onload = () => {
        image= img
        imageCanvas.width= img.width
        imageCanvas.height= img.height
       canvasCtx.drawImage(img,0,0)
       
    }
})
function crateFilterElement(name, unit="%", value,min,max){
    const div=  document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type= "range"
    input.min = min
    input.max=max
    input.value= value
    input.id= name

    const p= document.createElement("p")
    p.innerText= name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event)=>{
    filters[name].value = input.value
    console.log(name, filters[name])
    applyfilters()
        
    })

    return div
}

function createFilters(){
    Object.keys(filters).forEach(key=>{
    const filterElement=  crateFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)
    
    filtersContainer.appendChild(filterElement)
})
}
createFilters()

function applyfilters() {
    canvasCtx.clearRect(
        0,
        0,
        imageCanvas.width,
        imageCanvas.height
    );

    canvasCtx.filter = `
        brightness(${filters.Brightness.value}${filters.Brightness.unit})
        contrast(${filters.Contrast.value}${filters.Contrast.unit})
        saturate(${filters.Saturation.value}${filters.Saturation.unit})
        hue-rotate(${filters.HueRotate.value}${filters.HueRotate.unit})
        blur(${filters.Blur.value}${filters.Blur.unit})
        grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
        sepia(${filters.Sepia.value}${filters.Sepia.unit})
        opacity(${filters.Opacity.value}${filters.Opacity.unit})
        invert(${filters.Invert.value}${filters.Invert.unit})
    `.trim();

    canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener("click", ()=>{
    filters= {
        Brightness: {
            value:100,
            min: 0,
            max: 200,
            unit: "%"
        },
        Contrast:  {
            value:100,
            min: 0,
            max: 200,
            unit: "%"
        },
        Saturation:  {
            value:100,
            min: 0,
            max: 200,
            unit: "%"
        },
        HueRotate: {
            value:0,
            min: 0,
            max: 360,
            unit: "deg"
        },
        Blur: {
            value:0,
            min: 0,
            max: 20,
            unit: "px"
        },
        Grayscale:  {
            value:0,
            min: 0,
            max: 100,
            unit: "%"
        },
        Sepia:  {
            value:0,
            min: 0,
            max: 100,
            unit: "%"
        },
        Opacity: {
            value:100,
            min: 0,
            max:100,
            unit: "%"
        },
        Invert: {
            value:0,
            min: 0,
            max: 100,
            unit: "%"
        },
    }
    applyfilters()
    filtersContainer.innerHTML=""
    createFilters()
})
downloadButton.addEventListener("click",()=>{
    const link = document.createElement("a")
    link.download="edited-image.png"
    link.href= imageCanvas.toDataURL()
    link.click()
})
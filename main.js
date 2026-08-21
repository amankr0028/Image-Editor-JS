let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"

    },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"

    },
    huRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const imageCanvas = document.querySelector("#image-canvas")
const imageInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
const reset = document.querySelector("#reset-btn")
const download = document.querySelector("#download-btn")
const presetContainer = document.querySelector(".preset")
let file = null
let image = null


const filtersContainer = document.querySelector(".filters")

function createFilterElement(name, unit = "%", value, min, max) {
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event) => {
        filters[name].value = input.value
        applyFilters()
    })

    return div
}
function createFilters() {
    Object.keys(filters).forEach(key => {
        const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)

        filtersContainer.appendChild(filterElement)
    })
}
createFilters()

imageInput.addEventListener("change", (event) => {
    file = event.target.files[0]
    const img = new Image()

    const imagePlaceholder = document.querySelector(".placeholder")
    imagePlaceholder.style.display = "none"
    img.src = URL.createObjectURL(file)

    img.onload = () => {
        image = img
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasCtx.drawImage(img, 0, 0)
    }
})

function applyFilters() {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit}) 
    contrast(${filters.contrast.value}${filters.contrast.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    hue-rotate(${filters.huRotation.value}${filters.huRotation.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    `.trim()
    canvasCtx.drawImage(image, 0, 0)
}

reset.addEventListener("click", () => {
    filters.brightness.value = 100;
    filters.contrast.value = 100;
    filters.saturation.value = 100;
    filters.huRotation.value = 0;
    filters.blur.value = 0;
    filters.grayscale.value = 0;
    filters.sepia.value = 0;
    filters.invert.value = 0;

    applyFilters();
    filtersContainer.innerHTML = "";
    createFilters();
});

download.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-img-png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
    warm: {
        brightness: 105,
        contrast: 105,
        saturation: 115,
        huRotation: 8,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        invert: 0,

    },

    cool: {
        brightness: 100,
        contrast: 105,
        saturation: 110,
        huRotation: 190,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0,
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 80,
        huRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 45,
        invert: 0,

    },

    cinematic: {
        brightness: 90,
        contrast: 125,
        saturation: 85,
        huRotation: 0,
        blur: 0,
        grayscale: 5,
        sepia: 10,
        invert: 0,
    },
    faded: {
        brightness: 110,
        contrast: 80,
        saturation: 70,
        huRotation: 0,
        blur: 0,
        grayscale: 15,
        sepia: 10,
        invert: 0,

    },

    dramatic: {
        brightness: 85,
        contrast: 145,
        saturation: 105,
        huRotation: 0,
        blur: 0,
        grayscale: 15,
        sepia: 0,
        invert: 0,

    },



    noir: {
        brightness: 90,
        contrast: 140,
        saturation: 0,
        huRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        invert: 0,

    },
}

Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button")
    presetButton.classList.add("preset-btn")
    presetButton.innerText = presetName
    presetContainer.appendChild(presetButton)

    presetButton.addEventListener("click", ()=>{
        const preset = presets[presetName]

        Object.keys(preset).forEach(filterName =>{
            filters[filterName].value = preset[filterName]
        })
        applyFilters()
        filtersContainer.innerHTML = ""
        createFilters()
    } )
})
const buttonStartEl = document.getElementById("start-btn")
const buttonStopEl = document.getElementById("stop-btn")
const pEl = document.getElementById("bpm")
const pAverageEl = document.getElementById("average")
const averageFromLocalStorage = JSON.parse(localStorage.getItem("lastAverage"))
const last = document.getElementById("last")

let alive = false
let lastTapSeconds = 0
let bpm = 0
let beats = []
let average = 0
let count = 0
let lastAverage = 0

if(averageFromLocalStorage){
    last.textContent = `Last BPM: ${localStorage.getItem("lastAverage")}`
}
function reset(){
    lastTapSeconds = 0
    bpm = 0
    beats = []
    average = 0
    count = 0
}
function calulateBPM(stop, start){
    let bpm = ((1/((stop - start) / 1000)) * 60)
    return bpm
}
function updateAverage(){
    pAverageEl.textContent = (" BPM: " + Math.floor(lastAverage))
    localStorage.setItem("lastAverage", JSON.stringify(Math.floor(lastAverage)))
    last.textContent = `Last BPM: ${localStorage.getItem("lastAverage")}`
}


buttonStartEl.addEventListener("click", function(){
    alive = true
})

buttonStopEl.addEventListener("click", function(){
    alive = false
    reset()
    updateAverage()
})

window.addEventListener('keydown',function(){
    if(alive){
        //set start point
        let tapSeconds = new Date().getTime()
        //calculate BPM from last "start point"
        bpm = calulateBPM(tapSeconds,lastTapSeconds)
        //update "stop point"
        lastTapSeconds = tapSeconds
        //display last BPM record
        pEl.textContent = Math.floor(bpm)
        //add last record to an array
        beats.push(Math.floor(bpm))
        //calculate average BPM
        average *= count
        average += Math.floor(bpm)
        count++
        average /= count
        //assign average to memory before reset()
        lastAverage = average
    }
})



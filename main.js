
let currentTime = new Date()
render(currentTime)

g("#lastMonth").onclick = () => {
    lastMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() - 1, 1)
    render(lastMonth)

}

g("#nextMonth").onclick = () => {
    nextMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1)
    render(nextMonth)

}

g("#today").onclick = () => {

    render(new Date())

}

function render(time) {
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const days = g('#days')
    days.innerHTML = ""

    initTime()
    generateDays()
    currentTime = time

    //帮助函数
    function initTime() {
        const time = g('#time')
        time.textContent = `${year}年${month}月`
    }

    function generateDays() {
        const firstDayOfCurrentMonth = new Date(year, month - 1, 1)
        const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()
        const lastDate = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
        const lastDayOfCurrentMonth = lastDate.getDate()
        const daysOfCurrentMonth = lastDayOfCurrentMonth
        let selectedLi
        let n = 0



        for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {
            const li = document.createElement('li')
            const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i)
            li.textContent = d.getDate()
            days.prepend(li)

            li.onclick = () => {
                if (selectedLi) {
                    selectedLi.classList.remove("calendar-days-selected")
                }
                li.classList.add("calendar-days-selected")
                selectedLi = li
            }
            n += 1
        }

        for (let i = 1; i <= daysOfCurrentMonth; i++) {
            const li = document.createElement('li')
            const now = new Date();
            li.textContent = i
            days.append(li)

            if (year === now.getFullYear() && month - 1 === now.getMonth() && i === now.getDate()) {
                li.classList.add("calendar-days-today")
            }

            li.onclick = () => {
                if (selectedLi) {
                    selectedLi.classList.remove("calendar-days-selected")
                }
                li.classList.add("calendar-days-selected")
                selectedLi = li

                if (events) {
                    const fragment = document.createDocumentFragment()
                    events.map(event => {
                        const div = document.createElement('div')
                        div.classList.add('events-item')
                        div.textContent = event
                        fragment.append(div)
                    })
                    g('#events').innerHTML = ''
                    g('#events').append(fragment)
                } else {
                    g('#events').innerHTML = '无'
                }
            }
            const key = `${year}-${month}-${i}`
            const events = window.data[key]
            if (events) {
                li.classList.add("calendar-days-hasEvents")
            }
            console.log(key, events)
            n += 1

        }

        for (i = 1; i <= 42 - n; i++) {
            const li = document.createElement('li')
            li.textContent = i
            days.append(li)

            li.onclick = () => {
                if (selectedLi) {
                    selectedLi.classList.remove("calendar-days-selected")
                }
                li.classList.add("calendar-days-selected")
                selectedLi = li
            }
        }

    }


}


function g(selector) {
    return document.querySelector(selector)
}

function gs(selector) {
    return document.querySelectorAll(selector)
}
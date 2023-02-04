const currentData = new Date
let currentYear = currentData.getFullYear()
let currentMonth = currentData.getMonth() + 1

const ids = localStorage.getItem('id')
const arrayTransactions = []

// const formDate = document.querySelector('#form-date')
const sectionTransictions = document.querySelector('#section-transictions')

const yearFilter = document.querySelector('#year-filter')
let yearOption = yearFilter

const monthFilter = document.querySelector('#month-filter')
let monthOption = monthFilter

const transactionsYear = document.querySelector('#transactions-year')

let month = ''

switch(currentMonth) {
    case 01:
        month = 'Janeiro'
        break
    case 02:
        month = 'Fevereiro'
        break
    case 03:
        month = 'Março'
        break
    case 04:
        month = 'Abril'
        break
    case 05:
        month = 'Maio'
        break
    case 06:
        month = 'Junho'
        break
    case 07:
        month = 'Julho'
        break
    case 08:
        month = 'Agosto'
        break
    case 09:
        month = 'Setembro'
        break
    case 10:
        month = 'Outubro'
        break
    case 11:
        month = 'Novembro'
        break
    case 12:
        month = 'Dezembro'
        break
}

function createCalendar() {

    const containerTransactions = document.querySelector('.container-transactions')

    const divMonth = document.createElement('div')
    divMonth.classList.add('div-month')

    const btnBefore = document.createElement('button')
    btnBefore.innerHTML = '<i class="fa-solid fa-chevron-left"></i>'

    const btnAfter = document.createElement('button')
    btnAfter.innerHTML = '<i class="fa-solid fa-chevron-right"></i>'

    let monthH2 = document.createElement('h2')
    monthH2.innerText = month

    btnBefore.onclick = () => {
        --currentMonth
        if(currentMonth < 1) {
            currentMonth = 12
            --currentYear
        }

        switch(currentMonth) {
            case 01:
                month = 'Janeiro'
                break
            case 02:
                month = 'Fevereiro'
                break
            case 03:
                month = 'Março'
                break
            case 04:
                month = 'Abril'
                break
            case 05:
                month = 'Maio'
                break
            case 06:
                month = 'Junho'
                break
            case 07:
                month = 'Julho'
                break
            case 08:
                month = 'Agosto'
                break
            case 09:
                month = 'Setembro'
                break
            case 10:
                month = 'Outubro'
                break
            case 11:
                month = 'Novembro'
                break
            case 12:
                month = 'Dezembro'
                break
        }

        monthH2.innerText = ''
        monthH2.innerText = month

        transactionsYear.innerHTML = ''

        showTransactions(currentYear, currentMonth)

        console.log(currentMonth, currentYear)
    }

    btnAfter.onclick = () => {
        ++currentMonth
        if(currentMonth > 12) {
            currentMonth = 1
            ++currentYear
        }

        switch(currentMonth) {
            case 01:
                month = 'Janeiro'
                break
            case 02:
                month = 'Fevereiro'
                break
            case 03:
                month = 'Março'
                break
            case 04:
                month = 'Abril'
                break
            case 05:
                month = 'Maio'
                break
            case 06:
                month = 'Junho'
                break
            case 07:
                month = 'Julho'
                break
            case 08:
                month = 'Agosto'
                break
            case 09:
                month = 'Setembro'
                break
            case 10:
                month = 'Outubro'
                break
            case 11:
                month = 'Novembro'
                break
            case 12:
                month = 'Dezembro'
                break
        }

        monthH2.innerText = ''
        monthH2.innerText = month

        transactionsYear.innerHTML = ''

        showTransactions(currentYear, currentMonth)

        console.log(currentMonth, currentYear)
    }

    divMonth.append(btnBefore)
    divMonth.append(monthH2)
    divMonth.append(btnAfter)

    containerTransactions.prepend(divMonth)
}

createCalendar()

for(let i = 1; i <= ids; i++) {
    const transactions = JSON.parse(localStorage.getItem(i))

    if(transactions === null) continue

    arrayTransactions.push(transactions)
}

function showTransactions(y, m) {
    
    arrayTransactions.map(e => {

        const date = e.date
        const dateSplit = date.split('/')
        const year = dateSplit[2]
        const monthNumber = dateSplit[1]
        
        if(y === Number(year) && m === Number(monthNumber)) {
            const li = document.createElement('li')
            li.classList.add('transation-li')

            // remover transations
            const btnRemove = document.createElement('button')
            btnRemove.setAttribute('id', `${e.id}`)
            btnRemove.classList.add('delete')
            btnRemove.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

            btnRemove.onclick = () => {
                localStorage.removeItem(e.id)
                location.reload()
            }

            li.innerHTML = `
            <span>${e.category}</span>
            <span>${e.description}</span>
            <span>R$ ${e.value}</span>
            <button resolve class='solve'><i class="fa-solid fa-check"></i></button>`
            li.appendChild(btnRemove)

            transactionsYear.append(li)
        }

    })
}

showTransactions(currentYear, currentMonth)
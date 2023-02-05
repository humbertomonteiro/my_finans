const currentData = new Date
let currentYear = currentData.getFullYear()
let currentMonth = currentData.getMonth() + 1

const ids = localStorage.getItem('id')
const arrayTransactions = []

const currentValues = document.querySelector('#current-values')
const currentBalanceMonth = document.querySelector('#current-balance-month')

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

function balanceMonth(v) {
    const currentV = v.filter(e => e.checkbox === true).map(e => parseFloat(e.value))

    const current = currentV
    .reduce((a, val) => a + val, 0)
    .toFixed(2)
    currentValues.innerText = `R$ ${current}`

    const balanceMonth = v.map(e => parseFloat(e.value))
    
    const currentM = balanceMonth
    .reduce((a, val) => a + val, 0)
    .toFixed(2)
    currentBalanceMonth.innerText = `R$ ${currentM}`
}

balanceMonth(arrayTransactions)

function showTransactions(y, m) {
    
    arrayTransactions.map(e => {

        const date = e.date
        const dateSplit = date.split('/')
        const year = dateSplit[2]
        const monthNumber = dateSplit[1]
        
        if(y === Number(year) && m === Number(monthNumber)) {
            const li = document.createElement('li')
            li.classList.add('transation-li')

            if(e.value < 0) {
                li.classList.add('border-expenditure')
            } else {
                li.classList.add('border-revenue')
            }

            // remover transations
            const btnRemove = document.createElement('button')
            btnRemove.setAttribute('id', `${e.id}`)
            btnRemove.classList.add('delete')
            btnRemove.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

            const btnSolve = document.createElement('button')
            btnSolve.setAttribute('id', `${e.id}`)

            if(e.checkbox) {
                btnSolve.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
                btnSolve.classList.add('solve')
            } else {
                btnSolve.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
                btnSolve.classList.add('no-solve')
            }
            

            btnRemove.onclick = () => {
                localStorage.removeItem(e.id)
                location.reload()
            }

            btnSolve.onclick = () => {

                let getEdit = localStorage.getItem(e.id)
                const trueOrFalse = JSON.parse(getEdit).checkbox

                if(trueOrFalse) {
                    let editing = localStorage.getItem(e.id)
                    let editingParse = JSON.parse(editing)
                    let edited = editingParse
                    edited.checkbox = false

                    localStorage.setItem(e.id, JSON.stringify(edited))
                    location.reload()
            
                } else {
                    let editing = localStorage.getItem(e.id)
                    let editingParse = JSON.parse(editing)
                    let edited = editingParse
                    edited.checkbox = true

                    localStorage.setItem(e.id, JSON.stringify(edited))
                    location.reload()
                }
            }

            li.innerHTML = `
            <span>${e.category}</span>
            <span>${e.description}</span>
            <span>R$ ${e.value}</span>`

            li.appendChild(btnSolve)
            li.appendChild(btnRemove)

            transactionsYear.append(li)
        }

    })
}

showTransactions(currentYear, currentMonth)
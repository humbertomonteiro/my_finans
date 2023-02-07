const currentData = new Date
let currentYear = currentData.getFullYear()
let currentMonth = currentData.getMonth() + 1

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

    }

    divMonth.append(btnBefore)
    divMonth.append(monthH2)
    divMonth.append(btnAfter)

    containerTransactions.prepend(divMonth)
}

createCalendar()

let allTransaction = JSON.parse(localStorage.getItem('setAllTransaction'))

function showTransactions(y, m) {
    
    allTransaction.map(e => {

        const date = e.dateValue
        const dateSplit = date.split('/')
        const year = dateSplit[2]
        const monthNumber = dateSplit[1]
        
        if(y === Number(year) && m === Number(monthNumber)) {
            const li = document.createElement('li')
            li.classList.add('transation-li')

            if(e.valueV < 0) {
                li.classList.add('border-expenditure')
            } else {
                li.classList.add('border-revenue')
            }

            const btnRemove = document.createElement('button')
            btnRemove.setAttribute('id', `${e.id}`)
            btnRemove.classList.add('delete')
            btnRemove.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

            const btnSolve = document.createElement('button')
            btnSolve.setAttribute('id', `${e.id}`)
            btnSolve.classList.add('solve')

            const btnEdit = document.createElement('button')
            btnEdit.classList.add('edit')
            btnEdit.innerHTML = '<i class="fa-solid fa-pencil"></i>'

            if(e.checkboxV) {
                btnSolve.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
            } else {
                btnSolve.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
            }

            btnRemove.onclick = () => {

                const divBackground = document.createElement('div')
                divBackground.classList.add('div-background')

                const notification = document.createElement('div')
                notification.classList.add('div-notification')
                notification.innerHTML = '<h2>Quer realmente apagar essa transação?</h2>'

                const divBtn = document.createElement('div')
                divBtn.classList.add('div-btn')

                const btnYes = document.createElement('button')
                btnYes.classList.add('btn-notification')
                btnYes.innerText = 'Sim'

                const btnNo = document.createElement('button')
                btnNo.classList.add('btn-notification')
                btnNo.innerText = 'Não'

                divBtn.append(btnYes)
                divBtn.append(btnNo)

                notification.append(divBtn)

                divBackground.append(notification)

                const body = document.querySelector('body')
                body.append(divBackground)

                btnYes.onclick = () => {
                    allTransaction = allTransaction.filter(a => a.id != e.id)
                    localStorage.setItem('setAllTransaction', JSON.stringify(allTransaction))

                    location.reload()
                }

                btnNo.onclick = () => {
                    divBackground.remove()
                }
            }

            btnSolve.onclick = () => {
                
                const getId = e.id
                const index = allTransaction.indexOf(e)
                const trueOrFalse = allTransaction[index].checkboxV

                let transactionEdit = e

                transactionEdit.checkboxV = !trueOrFalse


                allTransaction = allTransaction.filter(e => getId != e.id)

                allTransaction.push(transactionEdit)

                localStorage.setItem('setAllTransaction', JSON.stringify(allTransaction))

                location.reload()
            }

            // btnEdit.onclick = () => {   
            //     const divBackground = document.querySelector('.div-background')
            //     divBackground.classList.remove('hidden')
            // }

            li.innerHTML = `
            <span>${e.categoryV}</span>
            <span>${e.descriptionV}</span>
            <span>R$ ${Number(e.valueV).toFixed(2)}</span>`

            li.appendChild(btnEdit)
            li.appendChild(btnRemove)
            li.appendChild(btnSolve)

            transactionsYear.append(li)

            //balance
            const currentV = allTransaction.filter(e => e.checkboxV === true).map(e => parseFloat(e.valueV))
            
            const current = currentV
            .reduce((a, val) => a + val, 0)
            .toFixed(2)
            currentValues.innerText = `R$ ${current}`
        
            const balanceMonth = allTransaction.filter(e => {
                const arraysDate = e.dateValue.split('/')

                if(arraysDate[1] === monthNumber) {
                    return e.valueV
                }
    
            }).map(e => parseFloat(e.valueV))
            .reduce((a, val) => a + val, 0)
            .toFixed(2)

            const currentM = balanceMonth

            currentBalanceMonth.innerText = `R$ ${currentM}`
        }

    })
}

showTransactions(currentYear, currentMonth)
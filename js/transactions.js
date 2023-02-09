const currentDate = new Date
let currentYear = currentDate.getFullYear()
let currentMonth = currentDate.getMonth() + 1
let currentDay = currentDate.getDate()

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

        showBalenceAndTransactions(currentYear, currentMonth)
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

        showBalenceAndTransactions(currentYear, currentMonth)
    }

    divMonth.append(btnBefore)
    divMonth.append(monthH2)
    divMonth.append(btnAfter)

    containerTransactions.prepend(divMonth)
}

createCalendar()

let allTransaction = JSON.parse(localStorage.getItem('setAllTransaction'))

// let newAllTransaction = new Array
// newAllTransaction = allTransaction

// const arrayDays = newAllTransaction.map(e => e.dateValue)

// const ulDays = new Set()

// arrayDays.forEach(e => ulDays.add(e))
// const dates = [...ulDays.values()]

// dates.map(e => {
//     const dateS = e.split('/')
//     allTransaction.map(e => console.log(e.dateValue))

//     const ulDays = document.createElement('ul')
//     ulDays.setAttribute(`day${dateS[0]}month${dateS[1]}`, true)
//     ulDays.classList.add('ulDays')

//     if(dateS[0] === currentDay && dateS[1] === currentMonth) {
//         transactionsYear.append(ulDays)
//     }

    
// })

function showBalenceAndTransactions(y, m) {    

    allTransaction.map(e => {

        const date = e.dateValue
        const dateSplit = date.split('/')
        const year = dateSplit[2]
        const monthNumber = dateSplit[1]
        const day = dateSplit[0]

        if(y === Number(year) && m === Number(monthNumber)) {

            //balance
            const currentV = allTransaction
                .filter(e => e.checkboxV === true)
                .map(e => parseFloat(e.valueV))
            
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

            //mostrar transações
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

            const btnSolve = document.createElement('div')
            btnSolve.setAttribute('id', `${e.id}`)
            btnSolve.classList.add('solve')
            
            if(e.checkboxV) {
                btnSolve.innerHTML = '<i class="fa-regular fa-circle-check"></i>'
            } else {
                btnSolve.innerHTML = '<i class="fa-solid fa-xmark"></i>'
            }

            const btnEdit = document.createElement('button')
            btnEdit.classList.add('edit')
            btnEdit.innerHTML = '<i class="fa-solid fa-pencil"></i>'

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

                divBtn.append(btnNo)
                divBtn.append(btnYes)

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

            btnSolve.onclick = c => {
                 
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

            btnEdit.onclick = () => {   

                const body = document.querySelector('body')
                const divBackground = document.createElement('div')
                divBackground.classList.add('div-background')
                const divEdition = document.createElement('div')
                divEdition.classList.add('div-edition')

                const dataBr = e.dateValue.split('/')
                const dataUsa = `${dataBr[2]}-${dataBr[1]}-${dataBr[0]}`

                divEdition.innerHTML = `
                <form class="div-inputs">
                <h2>Editar Transação</h2>
                <input id="value-edit" value="${e.valueV}" class="i-value" type="text" placeholder="Valor">
                <input id="description-edit" value="${e.descriptionV}" class="i-value-2" type="text" placeholder="Descrição">
                <input id="category-edit" value="${e.categoryV}" class="i-value" type="text" placeholder="Categoria">
                <input id="date-edit" value="${dataUsa}" class="i-value-2" type="date" placeholder="date">
                <div class="div-check">
                    <h3>Resolvido</h3>
                    <input id="check-edit" type="checkbox" name="" id="">
                </div>
                <button id="btn-cancel" class="i-value-3 btn-notification">Cancelar</button>
                <button id="btn-edition" class=i-value-3 "btn-notification">Pronto</button>
                </form>`

                divBackground.append(divEdition)
                body.append(divBackground)

                const btnCancel = document.querySelector('#btn-cancel')
                btnCancel.onclick = e => {
                    e.preventDefault()
                    divBackground.remove()
                }
                
                const btnEdition = document.querySelector('#btn-edition')
                btnEdition.onclick = a => {
                    a.preventDefault()
                    const valueEdit = document.querySelector('#value-edit')
                    const descriptionEdit = document.querySelector('#description-edit')
                    const categoryEdit = document.querySelector('#category-edit')
                    const dateEdit = document.querySelector('#date-edit')
                    const checkEdit = document.querySelector('#date-edit')

                    const idEdit = e.id
                    let valueEditV = valueEdit.value
                    const descriptionEditV = descriptionEdit.value
                    const categoryEditV = categoryEdit.value
                    const dateEditV = dateEdit.value
                    let dateUsaEdit = dateEditV.split('-')
                    let dateEditValue = `${dateUsaEdit[2]}/${dateUsaEdit[1]}/${dateUsaEdit[0]}`
                    const checkboxEditeV = checkEdit.checked
                    const timesEdit = 1

                    if(valueEditV === '' || descriptionEditV === '' || categoryEditV === '' || dateEditV === '') {
                        alert('Preencha todos os campos para cadastrar sua transação')
                        return
                    }

                    const arrayValueEdit = String(valueEditV).split('')
                    const hasVirgulaEdit = arrayValueEdit.indexOf(',')

                    if(hasVirgulaEdit != -1) {
                        arrayValueEdit[hasVirgulaEdit] = '.'
                        valueEditV = arrayValueEdit.join('')
                    }

                    allTransaction = allTransaction.filter(c => c.id != e.id)
                    console.log(allTransaction)

                    allTransaction.push({
                        id: idEdit,     
                        checkboxV: checkboxEditeV,
                        valueV: valueEditV,
                        descriptionV: descriptionEditV,
                        categoryV: categoryEditV,
                        dateValue: dateEditValue,
                        timesV: timesEdit
                    })

                    localStorage.setItem('setAllTransaction', JSON.stringify(allTransaction))

                    location.reload()
                }
            }

            li.innerHTML = `
            <span>${e.categoryV}</span>
            <span>${e.descriptionV}</span>
            <span>R$ ${Number(e.valueV).toFixed(2)}</span>`

            li.appendChild(btnEdit)
            li.appendChild(btnRemove)
            li.appendChild(btnSolve) 

            transactionsYear.append(li)
        } 
    })
}

showBalenceAndTransactions(currentYear, currentMonth)

// const ulDays = document.querySelector(`[day${currentDay}month${currentMonth}]`)

// ulDays.append(li)

// arrayDays.map(f => {
//     const ulDay = document.createElement('ul')
//     ulDay.setAttribute('id',`day${f}`)
//     ulDay.innerText = f
//     return transactionsYear.append(ulDay)
// })
// arrayDays = lis.filter((d, nextD) => lis.indexOf(d) === nextD)

// arrayDays.map(f => {
//     const ulDay = document.createElement('ul')

//     if(getUlDay) {
//         return
//     } else {
//         ulDay.setAttribute('id',`day${f}`)
//         ulDay.innerText = f

//         return transactionsYear.append(ulDay)
//     }

// })
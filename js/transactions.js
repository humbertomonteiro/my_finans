const currentDate = new Date
let currentYear = currentDate.getFullYear()
let currentMonth = currentDate.getMonth() + 1
let currentDay = currentDate.getDate()

const containerTransactions = document.querySelector('.container-transactions')
const containerInfoTransactions = document.querySelector('.container-info-transactions')

const yearFilter = document.querySelector('#year-filter')
let yearOption = yearFilter

const monthFilter = document.querySelector('#month-filter')
let monthOption = monthFilter

const selectSubmitType = document.querySelector('#select-submit-type')
let selectType = document.querySelector('#select-type')

const currentValues = document.querySelector('#current-values')
const currentBalanceMonth = document.querySelector('#current-balance-month')
const currentColor = document.querySelector('#current-color')
const balanceColor = document.querySelector('#balance-color')

const transactionsYear = document.querySelector('#transactions-year')

let allTransaction = JSON.parse(localStorage.getItem('setAllTransactions'))

let transactionsCurrentMonth = e => e
    .filter(transactions => {
        const dateSplit = transactions.dateValue.split('/')
        const year = dateSplit[2]
        const getValuesMonth = dateSplit[1]
        const monthSplit = getValuesMonth.split('')

        const month = monthSplit[0] === '0' ? monthSplit[1] : monthSplit

        if(currentYear === Number(year) && currentMonth === Number(month)) {
            return transactions
        }
})

const pendencysCurrentMonth = e => e
    .filter(pendencys => pendencys.checkboxV === false)

const transactionsDoneCurrentMonth = e => e
    .filter(pendencys => pendencys.checkboxV === true)

let months = ['Janeiro', 'Fevereiro', 'Março',
 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 
 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const attBalanceSetTransactions = (array, arrayBalance) => {

    transactionsYear.innerHTML = ''

    for(let m = 1; m <= 30; m++) {
        const ul = document.createElement('ul')
        ul.classList.add('hidden')
        ul.setAttribute('day', m)
        ul.innerHTML = `<p class="text-day">Dia ${m}</p>`
        transactionsYear.append(ul)
    }

    const balanceCurrentMonth = transactionsDoneCurrentMonth(arrayBalance)
    balanceMonth(balanceCurrentMonth)
    showTransactions(array, currentYear, currentMonth)

    let currentTransactions = transactionsCurrentMonth(allTransaction)
    ifNotTransactions(currentTransactions)
}

function att() {

    const currentValues = transactionsCurrentMonth(allTransaction)
    const balanceCurrentMonth = transactionsDoneCurrentMonth(currentValues)
    attBalanceSetTransactions(allTransaction, balanceCurrentMonth)
}

att()

function createCalendar() {

    const divMonth = document.createElement('div')
    divMonth.classList.add('div-month')

    const btnBefore = document.createElement('button')
    btnBefore.innerHTML = '<i class="fa-solid fa-chevron-left"></i>'

    const btnAfter = document.createElement('button')
    btnAfter.innerHTML = '<i class="fa-solid fa-chevron-right"></i>'

    let monthH2 = document.createElement('h2')
    monthH2.innerText = months[currentMonth - 1]

    btnBefore.onclick = () => {
        --currentMonth
        if(currentMonth < 1) {
            currentMonth = 12
            --currentYear
        }

        monthH2.innerText = ''
        monthH2.innerText = months[currentMonth - 1]

        attBalanceSetTransactions(allTransaction, allTransaction)
    }

    btnAfter.onclick = () => {
        ++currentMonth
        if(currentMonth > 12) {
            currentMonth = 1
            ++currentYear
        }

        monthH2.innerText = ''
        monthH2.innerText = months[currentMonth - 1]

        attBalanceSetTransactions(allTransaction, allTransaction)
    }

    divMonth.append(btnBefore)
    divMonth.append(monthH2)
    divMonth.append(btnAfter)

    containerInfoTransactions.prepend(divMonth)
}

createCalendar()

selectType.addEventListener('change', e => {
    const ulDays = document.querySelectorAll('[day]')
    e.preventDefault()

    const transactionsMonth = transactionsCurrentMonth(allTransaction)

    const revenues = transactionsMonth.filter(e => e.valueV > 0)
    const expenditures = transactionsMonth.filter(e => e.valueV < 0)

    let array
    if(selectType.value == 'revenues') {
        array = revenues
    } else if (selectType.value == 'expenditures') {
        array = expenditures
    } else {
        array = allTransaction
    }

    ulDays.forEach(e => {
        e.classList.add('hidden')
        e.innerText = `Dia ${e.getAttribute('day')}`
    })

    showTransactions(array, currentYear, currentMonth)

})

function balanceMonth(array) {

    const allCurrentValuesMonth = array
        .map(e => parseFloat(e.valueV))

    const valueCurrent = allCurrentValuesMonth
        .reduce((a, val) => a + val, 0)
        .toFixed(2)

    currentValues.innerText = ''
    currentValues.innerText = `R$ ${valueCurrent}`

    if(allCurrentValuesMonth > 0) {
        currentColor.classList.remove('white')
        currentColor.classList.remove('expenditure')
        currentColor.classList.add('revenue')
    } else if (allCurrentValuesMonth < 0) {
        currentColor.classList.remove('white')
        currentColor.classList.remove('revenue')
        currentColor.classList.add('expenditure')
    } else if (allCurrentValuesMonth == 0) {
        currentColor.classList.remove('expenditure')
        currentColor.classList.remove('revenue')
        currentColor.classList.add('white')
    }

    const balanceCurrentMonthFunction = transactionsCurrentMonth(allTransaction)
    const balanceCurrentMonth = balanceCurrentMonthFunction
        .map(e => parseFloat(e.valueV))
        .reduce((a, val) => a + val, 0)
        .toFixed(2)

    currentBalanceMonth.innerText = ''
    currentBalanceMonth.innerText = `R$ ${balanceCurrentMonth}`
    
    if(balanceCurrentMonth > 0) {
        balanceColor.classList.remove('expenditure')
        balanceColor.classList.remove('white')
        balanceColor.classList.add('revenue')
    } else if (balanceCurrentMonth < 0) {
        balanceColor.classList.remove('white')
        balanceColor.classList.remove('revenue')
        balanceColor.classList.add('expenditure')
    } else if (balanceCurrentMonth == 0 ) {
        balanceColor.classList.remove('expenditure')
        balanceColor.classList.remove('revenue')
        balanceColor.classList.add('white')
    }
}

function showTransactions(transactions, y, m) {  
    const getUl = document.querySelectorAll(`[day]`)  
    
    transactions.map(e => {

        const date = e.dateValue
        const dateSplit = date.split('/')
        const year = dateSplit[2]
        const monthNumber = dateSplit[1]
        const day = dateSplit[0]

        if(y === Number(year) && m === Number(monthNumber)) {

            const btnRemove = document.createElement('button')
            btnRemove.setAttribute('id', `${e.id}`)
            btnRemove.classList.add('delete')
            btnRemove.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

            btnRemove.onclick = () => {

                const divBackground = document.createElement('div')
                divBackground.classList.add('div-background')

                const notification = document.createElement('div')
                notification.classList.add('div-notification')
                notification.innerHTML = '<h2>Quer realmente apagar essa transação?</h2>'

                const divBtn = document.createElement('div')
                divBtn.classList.add('div-btn')

                const btnYes = document.createElement('button')
                btnYes.classList.add('btn')
                btnYes.innerText = 'Sim'

                const btnNo = document.createElement('button')
                btnNo.classList.add('btn')
                btnNo.innerText = 'Não'

                const btnNext = document.createElement('button')
                btnNext.classList.add('btn')
                btnNext.innerText = 'Esta e as proximas?'

                divBtn.append(btnYes)

                if(e.timesV > 1) {
                    btnYes.innerText = 'Só esta'
                    divBtn.append(btnNext)
                }

                divBtn.append(btnNo)
                
                notification.append(divBtn)

                divBackground.append(notification)

                const body = document.querySelector('body')
                body.append(divBackground)


                btnNext.onclick = () => {

                    for(let a = 1; a <= e.timesV; a++) {
                        allTransaction = allTransaction.filter(a => a.id != e.id++)
                    }
                    localStorage.setItem('setAllTransactions', JSON.stringify(allTransaction))
                    
                    att()
                    divBackground.remove()
                }

                btnYes.onclick = () => {

                    allTransaction = allTransaction.filter(a => a.id != e.id)
                    localStorage.setItem('setAllTransactions', JSON.stringify(allTransaction))

                    att()
                    divBackground.remove()
                }

                btnNo.onclick = () => {
                    divBackground.remove()
                }
            }     
            
            const btnEdit = document.createElement('button')
            btnEdit.classList.add('edit')
            btnEdit.innerHTML = '<i class="fa-solid fa-pencil"></i>'
            
            btnEdit.onclick = () => {   

                const body = document.querySelector('body')
                const divBackground = document.createElement('div')
                divBackground.classList.add('div-background')
                const divEdition = document.createElement('div')
                divEdition.classList.add('div-edition')

                const dataBr = e.dateValue.split('/')

                const dataUsa = dataBr[1] <= 9 && !dataBr[1].includes('0') ? `${dataBr[2]}-0${dataBr[1]}-${dataBr[0]}` : `${dataBr[2]}-${dataBr[1]}-${dataBr[0]}`

                divEdition.innerHTML = `
                <form class="div-inputs">
                <h2>Editar Transação</h2>
                <input id="value-edit" value="${e.valueV}" class="i-value" type="text"">
                <input id="description-edit" value="${e.descriptionV}" class="i-value-2" type="text">
                <input id="category-edit" value="${e.categoryV}" class="i-value" type="text"">
                <input id="date-edit" value="${dataUsa}" class="i-value-2" type="date" >
                <label class="switch div-check">
                    <span class="switch-text">Resolvido</span>
                    <div class="switch-wrapper">
                        <input id="checkbox-solve" type="checkbox" class="switch-input">
                        <span class="switch-btn"></span>
                    </div>
                </label>
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
                    const numberMonth = dateUsaEdit[1].split('')
                    const numberMonthRight = numberMonth.includes('0') ? numberMonth[1] : numberMonth.join('')

                    let dateEditValue = `${dateUsaEdit[2]}/${numberMonthRight}/${dateUsaEdit[0]}`
                    const checkboxEditeV = checkEdit.checked
                    const timesEdit = '1'

                    const arrayValueEdit = String(valueEditV).split('')
                    const hasVirgulaEdit = arrayValueEdit.indexOf(',')

                    if(hasVirgulaEdit != -1) {
                        arrayValueEdit[hasVirgulaEdit] = '.'
                        valueEditV = arrayValueEdit.join('')    
                    }

                    if(valueEditV === '' || descriptionEditV === '' || categoryEditV === '' || dateEditV === '') {
                        alert('Preencha todos os campos para cadastrar sua transação')
                        return
                    }

                    allTransaction = allTransaction.filter(c => c.id != e.id)

                    allTransaction.push({
                        id: idEdit,     
                        checkboxV: checkboxEditeV,
                        valueV: Number(valueEditV),
                        descriptionV: descriptionEditV,
                        categoryV: categoryEditV,
                        dateValue: dateEditValue,
                        timesV: timesEdit
                    })

                    localStorage.setItem('setAllTransactions', JSON.stringify(allTransaction))
                    
                    const balanceCurrentMonth = transactionsDoneCurrentMonth(allTransaction)
                    attBalanceSetTransactions(allTransaction, balanceCurrentMonth)
                    divBackground.remove()
                }

            }

            const btnSolve = document.createElement('div')
            btnSolve.setAttribute('id', `${e.id}`)
            btnSolve.classList.add('solve')
            
            if(e.checkboxV) {
                btnSolve.innerHTML = '<i class="fa-solid fa-check"></i>'
            } else {
                btnSolve.innerHTML = '<i class="fa-solid fa-xmark"></i>'
            }

            btnSolve.onclick = () => {
                
                const getId = e.id
                const index = allTransaction.indexOf(e)
                const trueOrFalse = allTransaction[index].checkboxV

                let transactionEdit = e

                transactionEdit.checkboxV = !trueOrFalse

                allTransaction = allTransaction.filter(e => getId != e.id)
                allTransaction.push(transactionEdit)

                localStorage.setItem('setAllTransactions', JSON.stringify(allTransaction))

                pendencysCurrentMonth(allTransaction)
                att(transactionsCurrentMonth)
            }

            //criando lis
            const li = document.createElement('li')
            li.classList.add('transation-li')

            //adicionando classes para numeros
            const colorNumber = e.valueV > 0 ? 'revenue' : ' expenditure'

            li.innerHTML = `
            <span>${e.categoryV}</span>
            <span>${e.descriptionV}</span>
            <span class="value-${colorNumber}">R$ ${Number(e.valueV).toFixed(2)}</span>`

            li.appendChild(btnEdit)
            li.appendChild(btnRemove)
            li.appendChild(btnSolve)

            //adicionando no dia correto
            getUl.forEach(e => {
                if (`0${e.getAttribute('day')}` === day || e.getAttribute('day') === day) {
                    e.append(li)
                    e.classList.remove('hidden')
                }
            })

        } 
    })
}

function ifNotTransactions(array) {

    if(array.length == 0) {
        const h3 = document.createElement('h3')
        h3.classList.add('text')
        h3.innerText = 'Sem transações este mês!'
        transactionsYear.append(h3)
    }
}

const inputSearch = document.querySelector('#input-search')

inputSearch.addEventListener('input', e => {
    e.preventDefault()
    const filterTransaction = allTransaction.filter(e => {
        const category = e.categoryV
        const description = e.descriptionV
        return category.includes(inputSearch.value) 
        || description.includes(inputSearch.value)
    })

    attBalanceSetTransactions(filterTransaction, allTransaction)
})
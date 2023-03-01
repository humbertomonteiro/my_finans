const currentDate = new Date
let currentYear = currentDate.getFullYear()
let currentMonth = currentDate.getMonth() + 1
let currentDay = currentDate.getDate()

const balance = document.querySelector('#balance')
const revenue = document.querySelector('#revenue')
const expenditure = document.querySelector('#expenditure')

const pendency = document.querySelector('#pendency')
const linkRevenues = document.querySelector('#link-revenues')
const linkExpenditures = document.querySelector('#link-expenditures')
const transactionsPendencys = document.querySelector('#transactions-pendencys')
const showPendencys = document.querySelector('#show-pendencys')
const cadTransactions = document.querySelector('#cad-transactions')
const revenuePendency = document.querySelector('#revenue-pendency')
const expenditurePendency = document.querySelector('#expenditure-pendency')
const manyRevenue = document.querySelector('.many-revenues')
const manyExpenditures = document.querySelector('.many-expenditures')

const formCad = document.querySelector('#form-cad')
const btnCad = document.querySelector('#btn-cad')
const revenueBtn = document.querySelector('#revenue-btn')
const expenditureBtn = document.querySelector('#expenditure-btn')

const checkboxSolve = document.querySelector('#checkbox-solve')
const value = document.querySelector('#value')
const description = document.querySelector('#description')
const category = document.querySelector('#category')
const date = document.querySelector('#date')
const times = document.querySelector('#times')

const body = document.querySelector('body')

const localstorageTransactions = JSON
    .parse(localStorage.getItem('setAllTransactions'))

let setAllTransactions = localStorage
    .getItem('setAllTransactions') !== null ? localstorageTransactions : []

const hasPendencies = setAllTransactions.filter(e => e.checkboxV == false)

const pendenciesCurrent = hasPendencies.length > 0 ? true : false 

const showRevenues = document.querySelector('[show-revenues]')
const showExpenditures = document.querySelector('[show-expenditures]')
const textPendencies = document.createElement('h3')

function showForm(type, type2, str) {
    btnCad.classList.add(`${type}-btn`)
    btnCad.classList.remove(`${type2}-btn`)
    btnCad.innerText = `Cadastrar ${str}`

    formCad.classList.toggle(`show-${type}`)
    formCad.classList.remove(`show-${type2}`)
}

revenueBtn.onclick = () => {
    showForm('revenue', 'expenditure', 'Receitas')
}

expenditureBtn.onclick = () => {
    showForm('expenditure', 'revenue', 'Despesas')
}

function clickPendencies(type, type2, str) {
    const currentMonth = transactionsCurrentMonth(setAllTransactions)
    const pendencyMonth = pendencysCurrentMonth(currentMonth)
    
    const functionTypeTransactions = type === 'revenues' ? arrayRevenues(pendencyMonth) : arrayExpenditures(pendencyMonth)

    attBalanceSetTransactions(functionTypeTransactions)

    if(showRevenues.getAttribute(`show-${type}`) === 'false') {
        
        transactionsPendencys.setAttribute(`show-${type}`, 'true')
        transactionsPendencys.setAttribute(`show-${type2}`, 'false')
        transactionsPendencys.style.display = 'block'
        cadTransactions.style.display = 'none'
        transactionsPendencys.classList.add('pendencies-transactions')

        textPendencies.innerText = `${str} Pendentes`
        textPendencies.classList.add('text')

        transactionsPendencys.prepend(textPendencies)
    }
    else {
        transactionsPendencys.setAttribute(`show-${type}`, 'false')
        transactionsPendencys.style.display = 'none'
        cadTransactions.style.display = 'flex'
    }
}

linkRevenues.onclick = () => {
    clickPendencies('revenues', 'expenditures', 'Receitas')
}

linkExpenditures.onclick = () => {
    clickPendencies('expenditures', 'revenues', 'Despesas')
}

//cria quantidades de vezes no select
for(let i = 1; i <= 48; i++) {
    const option = document.createElement('option')
    option.setAttribute('value',`${i}`)
    option.innerText = i

    times.append(option)
}

function setTransactions() {

    const arrayValue = value.value.split('')
    const hasVirgula = arrayValue.indexOf(',')

    const generationId = () => Math.round(Math.random() * 1000)

    let id = generationId()
    const checkboxV = checkboxSolve.checked
    let valueV = value.value
    const descriptionV = description.value
    const categoryV = category.value
    const dateValueUsa = date.value
    let dateUsa = dateValueUsa.split('-')
    let dateValue = dateUsa.includes('0') ? `${dateUsa[2]}/${dateUsa[1].split('')[2]}/${dateUsa[0]}` : `${dateUsa[2]}/${dateUsa[1]}/${dateUsa[0]}`
    const timesV = times.value

    if(hasVirgula != -1) {
        arrayValue[hasVirgula] = '.'
        valueV = arrayValue.join('')
    }

    const expenditureTrue = document.querySelector('[expenditure]')
    if(expenditureTrue) valueV = -valueV

    setAllTransactions.push({
        id,
        checkboxV,
        valueV,
        descriptionV,
        categoryV,
        dateValue,
        timesV
    })

    localStorage.setItem('setAllTransactions', JSON.stringify(setAllTransactions))

    if(timesV > 1) {
            for(let i = 1; i <= timesV; i++) {

            let dateValue = `${dateUsa[2]}/${dateUsa[1]++}/${dateUsa[0]}`
            ++id
            if(dateUsa[1] > 12) {
                dateUsa[1] = 1
                dateUsa[2]++
            }

            let timesPush = timesV == 1 ? '' : `(${i}/${timesV})`
            let check = i === 1 ? true : false

            if(checkboxV) {
                setAllTransactions.push({
                    id,
                    checkboxV: check,
                    valueV,
                    descriptionV: `${descriptionV} ${timesPush}`,
                    categoryV,
                    dateValue,
                    timesV
                })

            } else {
                setAllTransactions.push({
                    id,
                    checkboxV,
                    valueV,
                    descriptionV: `${descriptionV} ${timesPush}`,
                    categoryV,
                    dateValue,
                    timesV
                })
            }            

            localStorage.setItem('setAllTransaction', JSON.stringify(setAllTransactions))
        }
    }
    
}

function balanceMonth(array) {

    if(array == null) return

    const getTransactionsCurrentMonth = array
        .filter(p => {

        const dateSp = p.dateValue.split('/')
        const year = dateSp[2]
        const month = dateSp[1]
        
        if(currentYear === Number(year) && currentMonth === Number(month)) {
            return p
        }
    })

    const pendenciesMonth = getTransactionsCurrentMonth
        .filter(p => p.checkboxV === false)
        .map(p => parseFloat(p.valueV))

    const amountRevenuesCurrent = pendenciesMonth
        .filter(p => p > 0)
    
    if(amountRevenuesCurrent.length > 0) {
        linkRevenues.classList.remove('hidden')
        manyRevenue.innerText = amountRevenuesCurrent.length
    } else linkRevenues.classList.add('hidden')

    const pendenciesRevenuesCurrentMonth = pendenciesMonth
        .filter(p => p >= 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)

    revenuePendency.innerText = ''
    revenuePendency.innerText = `R$ ${pendenciesRevenuesCurrentMonth}`
    
    const manyExpendituresCurrent = pendenciesMonth
        .filter(p => p < 0)
    
    if(manyExpendituresCurrent.length > 0) {
        linkExpenditures.classList.remove('hidden')
        manyExpenditures.innerText = manyExpendituresCurrent.length
    } else linkExpenditures.classList.add('hidden')

    const pendenciesExpendituresCurrentMonth = pendenciesMonth
        .filter(p => p <= 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)

    expenditurePendency.innerText = ''
    expenditurePendency.innerText = `R$ ${pendenciesExpendituresCurrentMonth}`


    const allBalanceSheetTransactions = setAllTransactions
        .filter(e => e.checkboxV === true)
        .map(e => parseFloat(e.valueV))

    const balanceMonth = allBalanceSheetTransactions
        .reduce((a, val) => a + val, 0)
        .toFixed(2)

    balance.innerText = ''
    balance.innerText = `R$ ${balanceMonth}`

    const revenueMonth = allBalanceSheetTransactions
        .filter(e => e > 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    revenue.innerText = ''
    revenue.innerText = `R$ ${revenueMonth}`

    const expenditureMonth = allBalanceSheetTransactions
        .filter(e => e < 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    expenditure.innerText = ''
    expenditure.innerText = `R$ ${expenditureMonth}`
}

function showTransactions(a) {  
    const getUl = document.querySelectorAll(`[day]`)  

    a.map(e => {

        const date = e.dateValue
        const dateSplit = date.split('/')
        const day = dateSplit[0]

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
            btnYes.classList.add('btn-notification')
            btnYes.innerText = 'Sim'

            const btnNo = document.createElement('button')
            btnNo.classList.add('btn-notification')
            btnNo.innerText = 'Não'

            const btnNext = document.createElement('button')
            btnNext.classList.add('btn-notification')
            btnNext.innerText = 'Esta e as proximas?'

            divBtn.append(btnYes)

            if(e.timesV > 1) {
                btnYes.innerText = 'Só esta'
                divBtn.append(btnNext)
            }

            divBtn.append(btnNo)
            notification.append(divBtn)

            divBackground.append(notification)
            body.append(divBackground)

            btnNext.onclick = () => {

                for(let a = 1; a <= e.timesV; a++) {
                    arrayNewDelete = setAllTransactions.filter(a => a.id != e.id++)
                }
                localStorage.setItem('setAllTransactions', JSON.stringify(arrayNewDelete))
                
                attBalanceTransactionsAndAplicationAtts(e)
                divBackground.remove()
            }

            btnYes.onclick = () => {
                setAllTransactions = setAllTransactions.filter(a => a.id != e.id)
                localStorage.setItem('setAllTransactions', JSON.stringify(setAllTransactions))

                attBalanceTransactionsAndAplicationAtts(e)
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

            const divBackground = document.createElement('div')
            divBackground.classList.add('div-background')

            const divEdition = document.createElement('div')
            divEdition.classList.add('div-edition')

            const dataBr = e.dateValue.split('/')

            const dataUsa = dataBr[1] <= 9 && !dataBr[1].includes('0') ? `${dataBr[2]}-0${dataBr[1]}-${dataBr[0]}` : `${dataBr[2]}-${dataBr[1]}-${dataBr[0]}`

            divEdition.innerHTML = `
            <form class="div-inputs">
            <h2>Editar Transação</h2>
            <input id="value-edit" value="${e.valueV}" class="i-value" type="text" placeholder="Valor">
            <input id="description-edit" value="${e.descriptionV}" class="i-value-2" type="text" placeholder="Descrição">
            <input id="category-edit" value="${e.categoryV}" class="i-value" type="text" placeholder="Categoria">
            <input id="date-edit" value="${dataUsa}" class="i-value-2" type="date" placeholder="date">
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

                setAllTransactions = setAllTransactions.filter(c => c.id != e.id)

                setAllTransactions.push({
                    id: idEdit,     
                    checkboxV: checkboxEditeV,
                    valueV: valueEditV,
                    descriptionV: descriptionEditV,
                    categoryV: categoryEditV,
                    dateValue: dateEditValue,
                    timesV: timesEdit
                })

                localStorage.setItem('setAllTransactions', JSON.stringify(setAllTransactions))

                attBalanceTransactionsAndAplicationAtts(e)

                divBackground.remove()
            } 

        }

        const btnSolve = document.createElement('div')
        btnSolve.setAttribute('id', `${e.id}`)
        btnSolve.classList.add('solve')
        btnSolve.innerHTML = '<i class="fa-solid fa-xmark"></i>'

        btnSolve.onclick = () => {

            const getId = e.id
            const index = setAllTransactions.indexOf(e)
            const trueOrFalse = setAllTransactions[index].checkboxV

            let transactionEdit = e

            transactionEdit.checkboxV = !trueOrFalse

            setAllTransactions = setAllTransactions.filter(e => getId != e.id)
            setAllTransactions.push(transactionEdit)

            localStorage.setItem('setAllTransactions', JSON.stringify(setAllTransactions))
            
            attBalanceTransactionsAndAplicationAtts(e)
        }

        const li = document.createElement('li')
        li.classList.add('transation-li')

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
    })
}

balanceMonth(setAllTransactions)

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

const arrayRevenues = e => e
    .filter(e => e.valueV > 0)

const arrayExpenditures = e => e
    .filter(e => e.valueV < 0)

const attBalanceSetTransactions = (array) => {

    transactionsPendencys.innerHTML = ''

    for(let m = 1; m <= 30; m++) {
        const ul = document.createElement('ul')
        ul.classList.add('hidden')
        ul.setAttribute('day', m)
        ul.innerHTML = `<p class="text-day">Dia ${m}</p>`
        transactionsPendencys.append(ul)
    }

    const balanceCurrentMonth = pendencysCurrentMonth(setAllTransactions)
    balanceMonth(balanceCurrentMonth)
    showTransactions(array)
}

function attBalanceTransactionsAndAplicationAtts(e) {
    const currentMonth = transactionsCurrentMonth(setAllTransactions)
    const pendencyMonth = pendencysCurrentMonth(currentMonth)
    
    const pendencyRevenuesMonth = arrayRevenues(pendencyMonth)
    const pendencyExpendituresMonth = arrayExpenditures(pendencyMonth)

    const arrayRigth = e.valueV > 0 ? pendencyRevenuesMonth : pendencyExpendituresMonth
    attBalanceSetTransactions(arrayRigth)
}

formCad.addEventListener('submit', e => {
    e.preventDefault()

    if(value.value === '' || description.value === '' || category.value === '' || date.value === '') { 
        alert('Preencha todos os campos para cadastrar sua transação')
        return
    }

    setTransactions()

    balanceMonth(setAllTransactions)

    value.value = ''
    category.value = ''
    description.value = ''
    date.value = ''

    // formCad.classList.toggle('show')
    pendency.classList.remove('hidden')
})
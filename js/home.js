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

date.addEventListener('focus', () => {
    date.setAttribute('type', 'date')
})

const localstorageTransactions = JSON.parse(localStorage.getItem('setAllTransactions'))
let setAllTransactions = localStorage.getItem('setAllTransactions') !== null ? localstorageTransactions : []

// botão de receita
revenueBtn.onclick = () => {
    btnCad.classList.add('revenue-btn')
    btnCad.classList.remove('expenditure-btn')

    pendency.classList.toggle('hidden')
    showPendencys.classList.add('hidden')

    formCad.classList.toggle('show')
    formCad.removeAttribute('expenditure', true)
}

// botão de despesa
expenditureBtn.onclick = () => {
    btnCad.classList.add('expenditure-btn')
    btnCad.classList.remove('revenue-btn')

    pendency.classList.toggle('hidden')
    showPendencys.classList.add('hidden')

    formCad.classList.toggle('show')
    formCad.setAttribute('expenditure', true)
}

//cria quantidades de vezes no select
for(let i = 1; i <= 48; i++) {
    const option = document.createElement('option')
    option.setAttribute('value',`${i}`)
    option.innerText = i

    times.append(option)
}

// setar id no localstorage
const generationId = () => Math.round(Math.random() * 1000)

//setar transações
function setTransactions() {

    // trocar a virgula por ponto
    const arrayValue = value.value.split('')
    const hasVirgula = arrayValue.indexOf(',')

    let id = generationId()
    const checkboxV = checkboxSolve.checked
    let valueV = value.value
    const descriptionV = description.value
    const categoryV = category.value
    const dateValueUsa = date.value
    let dateUsa = dateValueUsa.split('-')
    let dateValue = `${dateUsa[2]}/${dateUsa[1]}/${dateUsa[0]}`
    const timesV = times.value

    if(hasVirgula != -1) {
        arrayValue[hasVirgula] = '.'
        valueV = arrayValue.join('')
    }

    // adiciona atributo para informar despesa
    const expenditureTrue = document.querySelector('[expenditure]')

    if(expenditureTrue) valueV = -valueV

    // virifica se foram setados todos os valores
    // if(valueV === '' || descriptionV === '' || categoryV === '' || dateValue === '') {
    //     alert('Preencha todos os campos para cadastrar sua transação!')
    //     return
    // }
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

//balanço
function balanceMonth() {

    if(setAllTransactions == null) return

    //se não for resolvida
    const getMonth = setAllTransactions.filter(p => {
        const dateSp = p.dateValue.split('/')
        const year = dateSp[2]
        const month = dateSp[1]
        
        if(currentYear === Number(year) && currentMonth === Number(month)) {
            return p
        }
    })

    const pendencys = getMonth
        .filter(p => p.checkboxV === false)
        .map(p => parseFloat(p.valueV))

    // receitas pendentes
    const manyR = pendencys
        .filter(p => p > 0) 
    
    if(manyR.length > 0) {
        linkRevenues.classList.remove('hidden')
        manyRevenue.innerText = manyR.length
    }

    const revenuesP = pendencys
        .filter(p => p > 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    revenuePendency.innerText = ''
    revenuePendency.innerText = `R$ ${revenuesP}`

    // despesas pendentes
    const manyE = pendencys
        .filter(p => p < 0)
    
    if(manyE.length > 0) {
        linkExpenditures.classList.remove('hidden')
        manyExpenditures.innerText = manyE.length
    }
    
    const expenditureP = pendencys
        .filter(p => p < 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    expenditurePendency.innerText = ''
    expenditurePendency.innerText = `R$ ${expenditureP}`

    //Se for resolvida
    const allValues = setAllTransactions.filter(e => e.checkboxV === true)
        .map(e => parseFloat(e.valueV))

    const balanceMonth = allValues
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    balance.innerText = ''
    balance.innerText = `R$ ${balanceMonth}`

    const revenueMonth = allValues
        .filter(e => e > 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    revenue.innerText = ''
    revenue.innerText = `R$ ${revenueMonth}`

    const expenditureMonth = allValues
        .filter(e => e < 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    expenditure.innerText = ''
    expenditure.innerText = `R$ ${expenditureMonth}`
}

balanceMonth()

for(let m = 1; m <= 30; m++) {
    const ul = document.createElement('ul')
    ul.classList.add('hidden')
    ul.setAttribute('day', m)
    ul.innerHTML = `<p class="text-day">Dia ${m}</p>`
    transactionsPendencys.append(ul)
}

function showTransactions(a) {  
    const getUl = document.querySelectorAll(`[day]`)  

    a.map(e => {

        const date = e.dateValue
        const dateSplit = date.split('/')
        const day = dateSplit[0]

        // mostrar transações
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

            const body = document.querySelector('body')
            body.append(divBackground)


            btnNext.onclick = () => {

                for(let a = 1; a <= e.timesV; a++) {
                    let arrayNewDelete = []
                    arrayNewDelete = setAllTransactions.filter(a => a.id != e.id++)
                }
                localStorage.setItem('setAllTransactions', JSON.stringify(arrayNewDelete))
                
                location.reload()
            }

            btnYes.onclick = () => {
                let arrayNewDelete = []
                const liT = document.querySelector(`.id${e.id}`) 
                console.log(liT)

                arrayNewDelete = setAllTransactions.filter(a => a.id != e.id)
                localStorage.setItem('setAllTransactions', JSON.stringify(arrayNewDelete))

                location.reload()
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

                let arrayNewEdit = []
                arrayNewEdit = setAllTransactions.filter(c => c.id != e.id)

                arrayNewEdit.push({
                    id: idEdit,     
                    checkboxV: checkboxEditeV,
                    valueV: Number(valueEditV),
                    descriptionV: descriptionEditV,
                    categoryV: categoryEditV,
                    dateValue: dateEditValue,
                    timesV: timesEdit
                })

                localStorage.setItem('setAllTransactions', JSON.stringify(arrayNewEdit))
                location.reload()
            }

        }

        const btnSolve = document.createElement('div')
        btnSolve.setAttribute('id', `${e.id}`)
        btnSolve.classList.add('solve')
        btnSolve.innerHTML = '<i class="fa-solid fa-xmark"></i>'

        btnSolve.onclick = c => {
    
            let arrayNew = []
            const getId = e.id
            const index = setAllTransactions.indexOf(e)
            const trueOrFalse = setAllTransactions[index].checkboxV

            let transactionEdit = e

            transactionEdit.checkboxV = !trueOrFalse

            arrayNew = setAllTransactions.filter(e => getId != e.id)
            arrayNew.push(transactionEdit)

            localStorage.setItem('setAllTransactions', JSON.stringify(arrayNew))
            
            location.reload()
        }

        //criando lis
        const li = document.createElement('li')
        li.classList.add('transation-li')

        //adicionando classes numeros
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

linkRevenues.onclick = () => {
    const pendensysRevenue = setAllTransactions
        .filter(e => {
            const dateS = e.dateValue.split('/')
            const monthYear = currentMonth <= 9 ?  `0${currentMonth}/${currentYear}` : `${currentMonth}/${currentYear}`
            return monthYear === `0${dateS[1]}/${dateS[2]}`
        })
        .filter(e => e.checkboxV === false)
        .filter(e => e.valueV > 0)

    att(pendensysRevenue)

    showPendencys.classList.toggle('hidden')
    cadTransactions.classList.toggle('hidden')
}

linkExpenditures.onclick = () => {
    const pendendysExpenditures = setAllTransactions
        .filter(e => {
            const dateS = e.dateValue.split('/')
            const monthYear = currentMonth <= 9 ?  `0${currentMonth}/${currentYear}` : `${currentMonth}/${currentYear}`
            return monthYear === `0${dateS[1]}/${dateS[2]}`
        })
        .filter(e => e.checkboxV === false)
        .filter(e => e.valueV < 0)

    att(pendendysExpenditures)

    showPendencys.classList.toggle('hidden')
    cadTransactions.classList.toggle('hidden')
}


//submetendo formulario
formCad.addEventListener('submit', e => {
    e.preventDefault()

    if(value.value === '' || description.value === '' || category.value === '' || date.value === '') { 
        alert('Preencha todos os campos para cadastrar sua transação')
        return
    }

    setTransactions()

    balanceMonth()
    
    checkboxSolve.value = '' 
    value.value = '' 
    description.value = '' 
    category.value = ''
    date.value = '' 
    times.value = '' 
})

function att(a) {
    balanceMonth()
    transactionsPendencys.innerHTML = ''
    
    for(let m = 1; m <= 31; m++) {
        const ul = document.createElement('ul')
        ul.classList.add('hidden')
        ul.setAttribute('day', m)
        ul.innerHTML = `<p class="text-day">Dia ${m}</p>`
        transactionsPendencys.append(ul)
    }

    showTransactions(a)
}
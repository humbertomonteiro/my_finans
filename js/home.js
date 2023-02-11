const currentDate = new Date
let currentYear = currentDate.getFullYear()
let currentMonth = currentDate.getMonth() + 1
let currentDay = currentDate.getDate()

const balance = document.querySelector('#balance')
const revenue = document.querySelector('#revenue')
const expenditure = document.querySelector('#expenditure')

const pendency = document.querySelector('#pendency')
const revenuePendency = document.querySelector('#revenue-pendency')
const expenditurePendency = document.querySelector('#expenditure-pendency')

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

// botão de receita
revenueBtn.onclick = () => {
    btnCad.classList.add('revenue-btn')
    btnCad.classList.remove('expenditure-btn')

    pendency.classList.toggle('hidden')

    formCad.classList.toggle('show')
    formCad.removeAttribute('expenditure', true)
}

// botão de despesa
expenditureBtn.onclick = () => {
    btnCad.classList.add('expenditure-btn')
    btnCad.classList.remove('revenue-btn')

    pendency.classList.toggle('hidden')

    formCad.classList.toggle('show')
    formCad.setAttribute('expenditure', true)
}

// setar id no localstorage
const generationId = () => Math.round(Math.random() * 1000)

let setAllTransaction = new Array
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
    if(valueV === '' || descriptionV === '' || categoryV === '' || dateValue === '') {
        alert('Preencha todos os campos para cadastrar sua transação')
        return
    } 

    if(localStorage.hasOwnProperty('setAllTransaction')) {
        setAllTransaction = JSON.parse(localStorage.getItem('setAllTransaction'))
    }

    localStorage.setItem('setAllTransaction', JSON.stringify(setAllTransaction))

    for(let i = 1; i <= timesV; i++) {

        let dateValue = `${dateUsa[2]}/${dateUsa[1]++}/${dateUsa[0]}`
        ++id

        if(localStorage.hasOwnProperty('setAllTransaction')) {
            setAllTransaction = JSON.parse(localStorage.getItem('setAllTransaction'))
        }

        let timesPush = timesV == 1 ? '' : `(${i}/${timesV})`
        let check = i === 1 ? true : false

        if(checkboxV) {
            setAllTransaction.push({
                id,
                checkboxV: check,
                valueV,
                descriptionV: `${descriptionV} ${timesPush}`,
                categoryV,
                dateValue,
                timesV
            })
        } else {
            setAllTransaction.push({
                id,
                checkboxV,
                valueV,
                descriptionV: `${descriptionV} ${timesPush}`,
                categoryV,
                dateValue,
                timesV
            })
        }            

        localStorage.setItem('setAllTransaction', JSON.stringify(setAllTransaction))
    }
    
}

const newAllTransations = new Array()

const allTransaction = JSON.parse(localStorage.getItem('setAllTransaction'))

//balanço
function balanceMonth(v) {

    if(v == null) return

    //se não for resolvida
    const getMonth = v.filter(p => {
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

    const revenuesP = pendencys
        .filter(p => p > 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    revenuePendency.innerText = `R$ ${revenuesP}`

    const expenditureP = pendencys
        .filter(p => p < 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    expenditurePendency.innerText = `R$ ${expenditureP}`

    //Se for resolvida
    const allValues = v.filter(e => e.checkboxV === true)
        .map(e => parseFloat(e.valueV))

    const balanceMonth = allValues
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    balance.innerText = `R$ ${balanceMonth}`

    const revenueMonth = allValues
        .filter(e => e > 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    revenue.innerText = `R$ ${revenueMonth}`

    const expenditureMonth = allValues
        .filter(e => e < 0)
        .reduce((a, val) => a + val, 0)
        .toFixed(2)
    expenditure.innerText = `R$ ${expenditureMonth}`
}

balanceMonth(allTransaction)

//submetendo formulario
formCad.addEventListener('submit', e => {
    e.preventDefault()

    setTransactions()
    balanceMonth(allTransaction)
    location.reload()
})
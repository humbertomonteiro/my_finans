const balance = document.querySelector('#balance')
const revenue = document.querySelector('#revenue')
const expenditure = document.querySelector('#expenditure')

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

    formCad.classList.add('show')
    formCad.removeAttribute('expenditure', true)
}

// botão de despesa
expenditureBtn.onclick = () => {
    btnCad.classList.add('expenditure-btn')
    btnCad.classList.remove('revenue-btn')

    formCad.classList.add('show')
    formCad.setAttribute('expenditure', true)
}

// setar id no localstorage
const generationId = () => Math.round(Math.random() * 1000)

let setAllTransaction = new Array

//setar transações
function setTransactions() {
    let id = generationId()
    const checkboxV = checkboxSolve.checked
    let valueV = value.value
    const descriptionV = description.value
    const categoryV = category.value
    const dateValueUsa = date.value
    let dateUsa = dateValueUsa.split('-')
    let dateValue = `${dateUsa[2]}/${dateUsa[1]}/${dateUsa[0]}`
    const timesV = times.value

    // adiciona atributo para informar despesa
    const expenditureTrue = document.querySelector('[expenditure]')

    if(expenditureTrue) {
            valueV = -valueV
        }

    // virifica se foram setados todos os valores
    if(valueV === '' || descriptionV === '' || categoryV === '' || dateValue === '') {
        alert('Preencha todos os campos para cadastrar sua transação')
        return
    }

    // trocar a virgula por ponto
    const arrayValue = String(valueV).split('')
    const hasVirgula = arrayValue.indexOf(',')

    if(hasVirgula != -1) {
        arrayValue[hasVirgula] = '.'
        valueV = arrayValue.join('')
    }

    if(localStorage.hasOwnProperty('setAllTransaction')) {
        setAllTransaction = JSON.parse(localStorage.getItem('setAllTransaction'))
    }

    setAllTransaction.push({
        id,
        checkboxV,
        valueV,
        descriptionV,
        categoryV,
        dateValue,
        timesV
    }) 

    localStorage.setItem('setAllTransaction', JSON.stringify(setAllTransaction))
        
    if(timesV > 1) {

        for(let i = 1; i < timesV; i++) {

            let dateValue = `${dateUsa[2]}/${++dateUsa[1]}/${dateUsa[0]}`
            ++id

            if(localStorage.hasOwnProperty('setAllTransaction')) {
                setAllTransaction = JSON.parse(localStorage.getItem('setAllTransaction'))
            }

            if(checkboxV) {
                setAllTransaction.push({
                    id,
                    checkboxV: false,
                    valueV,
                    descriptionV,
                    categoryV,
                    dateValue,
                    timesV
                })
            } else {
                setAllTransaction.push({
                    id,
                    checkboxV,
                    valueV,
                    descriptionV,
                    categoryV,
                    dateValue,
                    timesV
                })
            }            

            localStorage.setItem('setAllTransaction', JSON.stringify(setAllTransaction))
        }
        
    }
}

const newAllTransations = new Array()

const allTransaction = JSON.parse(localStorage.getItem('setAllTransaction'))

//balanço
function balanceMonth(v) {

    if(v == null) return

    const allValues = v.filter(e => e.checkboxV === true).map(e => parseFloat(e.valueV))

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
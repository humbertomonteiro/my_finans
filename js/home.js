const balance = document.querySelector('#balance')
const revenue = document.querySelector('#revenue')
const expenditure = document.querySelector('#expenditure')

const formCad = document.querySelector('#form-cad')
const btnCad = document.querySelector('#btn-cad')
const btnCancel = document.querySelector('#btn-cancel')

const revenueBtn = document.querySelector('#revenue-btn')
const expenditureBtn = document.querySelector('#expenditure-btn')
const value = document.querySelector('#value')
const description = document.querySelector('#description')
const category = document.querySelector('#category')
const date = document.querySelector('#date')

// botão de receita
revenueBtn.onclick = () => {
    btnCad.classList.add('revenue-btn')
    btnCad.classList.remove('expenditure-btn')

    formCad.classList.add('show')
    formCad.setAttribute('revenue', true)
    formCad.removeAttribute('expenditure', true)
}

// botão de despesa
expenditureBtn.onclick = () => {
    btnCad.classList.add('expenditure-btn')
    btnCad.classList.remove('revenue-btn')

    formCad.classList.add('show')
    formCad.setAttribute('expenditure', true)
    formCad.removeAttribute('revenue', true)
}

// setar id no localstorage
function nextId() {
    const id = localStorage.getItem('id')

    if(id === null) {
        localStorage.setItem('id', 0)
    }
  
    return parseInt(localStorage.getItem('id')) + 1
}
// função factory
function factoryTransactions(id, value, description, category, date) {
    return {
        id,
        value, 
        description,
        category,
        date
    }
}

//setar transações
function setTransactions() {
    const id = nextId()
    const valueV = value.value
    const descriptionV = description.value
    const categoryV = category.value
    const dateValueUsa = date.value
    const dateUsa = dateValueUsa.split('-')
    const dateValue = `${dateUsa[2]}/${dateUsa[1]}/${dateUsa[0]}`

    const expenditureTrue = document.querySelector('[expenditure]')

    // se for despesa
    if(expenditureTrue) {
        let transactions = factoryTransactions(
            id,
            -valueV,
            descriptionV,
            categoryV,
            dateValue
        )
        
        localStorage.setItem(id, JSON.stringify(transactions))
        localStorage.setItem('id', id)

    // se for receita
    } else {
        let transactions = factoryTransactions(
            id,
            valueV,
            descriptionV,
            categoryV,
            dateValue
        )

        localStorage.setItem(id, JSON.stringify(transactions))
        localStorage.setItem('id', id)
    }

    // verificar se foram setados os valores
    if(valueV === '' || descriptionV === '' || categoryV === '' || dateValue === '') {
        alert('Preencha todos os campos para cadastrar sua transação')
    }
}

// todas as transações
let arrayAlltransactions = []

function alltransactions() {
    const ids = localStorage.getItem('id')
    
    for(let i = 1; i <= ids; i++) {
        const transactions = JSON.parse(localStorage.getItem(i))
    
        if(transactions === null) continue

        arrayAlltransactions.push(transactions)

    }

    return arrayAlltransactions
}

alltransactions()

//balanço
function balanceMonth(v) {
    const valuesAdd = v.map(e => parseInt(e.value))

    const balanceMonth = valuesAdd
    .reduce((a, val) => a + val, 0)
    .toFixed(2)
    balance.innerText = `R$ ${balanceMonth}`

    const revenueMonth = valuesAdd
    .filter(e => e > 0)
    .reduce((a, val) => a + val, 0)
    .toFixed(2)
    revenue.innerText = `R$ ${revenueMonth}`

    const expenditureMonth = valuesAdd
    .filter(e => e < 0)
    .reduce((a, val) => a + val, 0)
    .toFixed(2)
    expenditure.innerText = `R$ ${expenditureMonth}`
}

balanceMonth(arrayAlltransactions)

//submetendo formulario
formCad.addEventListener('submit', e => {
    e.preventDefault()

    setTransactions()
    balanceMonth(arrayAlltransactions)
    location.reload()
})
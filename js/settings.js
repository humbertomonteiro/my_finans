const btnAlert = document.querySelector('#btn-alert')
const ids = localStorage.getItem('id')
const arrayTransactions = []

for(let i = 1; i <= ids; i++) {
    const transactions = JSON.parse(localStorage.getItem(i))

    if(transactions === null) continue

    arrayTransactions.push(transactions)
}

btnAlert.onclick = () => {

    // alert transação cadastrada
    const alert = document.querySelector('#alert')
    const alertH2 = document.createElement('h2')
    const alertP = document.createElement('p')
    const btnDelete = document.createElement('button')
    const btnCancel = document.createElement('button')

    alertH2.classList.add('alertH2')
    alertH2.innerText = `Atenção`

    alertP.classList.add('alertP')  
    alertP.innerText = `Você quer mesmo apagar todas as suas transações?`

    btnDelete.classList.add('btn')
    btnDelete.classList.add('expenditure-btn')
    btnDelete.innerText = 'Sim, apagar!'

    btnCancel.innerText = 'Não, voltar para pagina inicial!'
    btnCancel.classList.add('btn')

    alert.append(alertH2)
    alert.append(alertP)
    alert.append(btnDelete)
    alert.append(btnCancel)

    btnDelete.onclick = () => {
        localStorage.clear()
        location.href = '../index.html'
    }

    btnCancel.onclick = () => {
        location.href = '../index.html'
    }

    alert.classList.add('alert')
    btnAlert.classList.add('hidden')
}
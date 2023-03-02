const containerSettings = document.querySelector('.container-settings')
const liClearAll = document.querySelector('#clear-all')
const ids = localStorage.getItem('id')

const divBackground = document.createElement('div')
const divClearAll = document.createElement('div')
const alertH2 = document.createElement('h2')
const alertP = document.createElement('p')
const btnDelete = document.createElement('button')
const btnCancel = document.createElement('button')

divBackground.classList.add('div-background')

alertH2.classList.add('alertH2')
alertH2.innerText = `Atenção`

alertP.classList.add('alertP')  
alertP.innerText = `Você quer mesmo apagar todas as suas transações?`

btnDelete.classList.add('btn')
btnDelete.classList.add('expenditure-btn')
btnDelete.innerText = 'Sim, apagar!'

btnCancel.classList.add('btn')
btnCancel.classList.add('revenue-btn')
btnCancel.innerText = 'Não!'

liClearAll.onclick = () => {

    divClearAll.classList.add('div-clear-all')
    divClearAll.append(alertH2)
    divClearAll.append(alertP)
    divClearAll.append(btnDelete)
    divClearAll.append(btnCancel)

    btnDelete.onclick = () => {
        localStorage.clear()
        location.href = '../index.html'
    }

    btnCancel.onclick = () => {
        divBackground.classList.add('hidden')
    }

    divBackground.classList.toggle('hidden')

    divBackground.append(divClearAll)
    containerSettings.append(divBackground)
}
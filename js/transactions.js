const currentData = new Date
const currentYear = currentData.getFullYear()
const currentMonth = currentData.getMonth() + 1

const ids = localStorage.getItem('id')
const arrayTransactions = []

const formDate = document.querySelector('#form-date')

const yearFilter = document.querySelector('#year-filter')
let yearOption = yearFilter

const monthFilter = document.querySelector('#month-filter')
let monthOption = monthFilter

const transactionsYear = document.querySelector('#transactions-year')

for(let a = currentYear; a <= (currentYear + 10); a++) {
    let yearOption = document.createElement('option')
    yearOption.innerHTML = a
    yearFilter.append(yearOption)
}

switch(currentMonth) {
    case 1: 
        monthFilter.value = 1
        break
    case 2: 
        monthFilter.value = 2
        break
    case 3: 
        monthFilter.value = 3
        break
    case 4: 
        monthFilter.value = 4
        break
    case 5: 
        monthFilter.value = 5
        break
    case 6: 
        monthFilter.value = 6
        break
    case 7: 
        monthFilter.value = 7
        break
    case 8: 
        monthFilter.value = 8
        break
    case 9: 
        monthFilter.value = 9
        break
    case 10: 
        monthFilter.value = 10
        break
    case 11: 
        monthFilter.value = 11
        break
    case 12: 
        monthFilter.value = 12
        break
}

for(let i = 1; i <= ids; i++) {
    const transactions = JSON.parse(localStorage.getItem(i))

    if(transactions === null) continue

    arrayTransactions.push(transactions)
}

function showTransactions(y, m) {
    
    arrayTransactions.map(e => {

        const date = e.date
        const dateSplit = date.split('/')
        console.log(dateSplit)
        const year = dateSplit[2]
        const monthNumber = dateSplit[1]
        let month = ''
        
        switch(monthNumber) {
            case '01':
                month = 'Janeiro'
                break
            case '02':
                month = 'Fevereiro'
                break
            case '03':
                month = 'março'
                break
            case '04':
                month = 'Abril'
                break
            case '05':
                month = 'Maio'
                break
            case '06':
                month = 'Junho'
                break
            case '07':
                month = 'Julho'
                break
            case '08':
                month = 'Agosto'
                break
            case '09':
                month = 'Setembro'
                break
            case '10':
                month = 'Outubro'
                break
            case '11':
                month = 'Novembro'
                break
            case '12':
                month = 'Dezembro'
                break
        }

        if(y === year && `0${m}` == monthNumber) {

            const li = document.createElement('li')
            li.classList.add('transation-li')

            // remover transations
            const btnRemove = document.createElement('button')

            btnRemove.setAttribute('id', `${e.id}`)
            btnRemove.classList.add('delete')
            btnRemove.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

            btnRemove.onclick = () => {
                localStorage.removeItem(e.id)
                location.reload()
            }

            li.innerHTML = `
            <span>${e.category}</span>
            <span>${e.description}</span>
            <span>R$ ${e.value}</span>
            <button resolve class='solve'><i class="fa-solid fa-check"></i></button>
            <button edite class='edit'><i class="fa-solid fa-pencil"></i></button>`
            li.appendChild(btnRemove)

            transactionsYear.append(li)
        }

    })
}

showTransactions(yearOption.value, monthOption.value)

formDate.addEventListener('submit', e => {
    e.preventDefault()

    let yearOption = yearFilter
    
    transactionsYear.innerHTML = ''

    yearOption.value = yearFilter.value 
    monthOption.value = monthFilter.value

    showTransactions(yearOption.value, monthOption.value)
})

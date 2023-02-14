const currentDate = new Date
let currentYear = currentDate.getFullYear()
let currentMonth = currentDate.getMonth() + 1
let currentDay = currentDate.getDate()

const containerTransactions = document.querySelector('.container-transactions')

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

let allTransaction = JSON.parse(localStorage.getItem('setAllTransaction'))

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

        for(let m = 1; m <= 30; m++) {
            const ul = document.createElement('ul')
            ul.classList.add('hidden')
            ul.setAttribute('day', m)
            ul.innerText = `Dia ${m}`
            transactionsYear.append(ul)
        }

        balanceMonth(allTransaction)
        showTransactions(currentYear, currentMonth, allTransaction)
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

        for(let m = 1; m <= 30; m++) {
            const ul = document.createElement('ul')
            ul.classList.add('hidden')
            ul.setAttribute('day', m)
            ul.innerText = `Dia ${m}`
            transactionsYear.append(ul)
        }

        balanceMonth(allTransaction)
        showTransactions(currentYear, currentMonth, allTransaction)
    }

    divMonth.append(btnBefore)
    divMonth.append(monthH2)
    divMonth.append(btnAfter)

    containerTransactions.prepend(divMonth)
}

createCalendar()

function balanceMonth(v) {
    //balanço
    const getMonth = v.filter(p => {
        const dateSp = p.dateValue.split('/')
        const year = dateSp[2]
        const month = dateSp[1]
        
        if(currentYear === Number(year) && currentMonth === Number(month)) {
            return p
        }
    })

    const currentV = getMonth
        .filter(e => e.checkboxV === true)
        .map(e => parseFloat(e.valueV))

    const current = currentV
    .reduce((a, val) => a + val, 0)
    .toFixed(2)

    currentValues.innerText = ''
    currentValues.innerText = `R$ ${current}`

    if(current > 0) {
        currentColor.classList.add('revenue')
    } else if (current < 0) {
        currentColor.classList.add('expenditure')
    }

    const balanceMonth = getMonth.filter(e => {
        const arraysDate = e.dateValue.split('/')

        if(arraysDate[1] === String(currentMonth)) {
            return e.valueV
        }

    }).map(e => parseFloat(e.valueV))
    .reduce((a, val) => a + val, 0)
    .toFixed(2)

    currentBalanceMonth.innerText = ''
    currentBalanceMonth.innerText = `R$ ${balanceMonth}`
    
    if(balanceMonth > 0) {
        balanceColor.classList.add('revenue')
    } else if (balanceMonth < 0) {
        balanceColor.classList.add('expenditure')
    }
}

for(let m = 1; m <= 31; m++) {
    const ul = document.createElement('ul')
    ul.classList.add('hidden')
    ul.setAttribute('day', m)
    ul.innerText = `Dia ${m}`
    transactionsYear.append(ul)
}

balanceMonth(allTransaction)

function showTransactions(y, m, a) {  
    const getUl = document.querySelectorAll(`[day]`)  

    selectType.addEventListener('change', e => {
        e.preventDefault()
    
        const revenues = allTransaction.filter(e => e.valueV > 0)
        const expenditures = allTransaction.filter(e => e.valueV < 0)

        if(selectType.value === 'revenues') {
            getUl.forEach(e => {
                selectType.classList.remove('border-transaction')
                selectType.classList.remove('border-expenditure')
                selectType.classList.add('border-revenue')
                e.classList.add('hidden')
                e.innerText = `Dia ${e.getAttribute('day')}`
            })

            showTransactions(currentYear, currentMonth, revenues)

        } else if (selectType.value === 'expenditures') {
            getUl.forEach(e => {
                selectType.classList.remove('border-transaction')
                selectType.classList.remove('border-revenue')
                selectType.classList.add('border-expenditure')
                e.classList.add('hidden')
                e.innerText = `Dia ${e.getAttribute('day')}`
            })

            showTransactions(currentYear, currentMonth, expenditures)

        } else {
            getUl.forEach(e => {
                selectType.classList.remove('border-expenditure')
                selectType.classList.remove('border-revenue')
                selectType.classList.add('border-transaction')
                e.classList.add('hidden')
                e.innerText = `Dia ${e.getAttribute('day')}`
            })

            showTransactions(currentYear, currentMonth, allTransaction)
        }
    })

    a.map(e => {

        const date = e.dateValue
        const dateSplit = date.split('/')
        const year = dateSplit[2]
        const monthNumber = dateSplit[1]
        const day = dateSplit[0]

        if(y === Number(year) && m === Number(monthNumber)) {

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
                        allTransaction = allTransaction.filter(a => a.id != e.id++)
                    }
                    localStorage.setItem('setAllTransaction', JSON.stringify(allTransaction))
                    
                    location.reload()
                }

                btnYes.onclick = () => {
                    const liT = document.querySelector(`.id${e.id}`) 
                    console.log(liT)

                    allTransaction = allTransaction.filter(a => a.id != e.id)
                    localStorage.setItem('setAllTransaction', JSON.stringify(allTransaction))

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
                    console.log(allTransaction)

                    allTransaction.push({
                        id: idEdit,     
                        checkboxV: checkboxEditeV,
                        valueV: Number(valueEditV),
                        descriptionV: descriptionEditV,
                        categoryV: categoryEditV,
                        dateValue: dateEditValue,
                        timesV: timesEdit
                    })

                    localStorage.setItem('setAllTransaction', JSON.stringify(allTransaction))
                    location.reload()
                }

            }

            const btnSolve = document.createElement('div')
            btnSolve.setAttribute('id', `${e.id}`)
            btnSolve.classList.add('solve')
            
            if(e.checkboxV) {
                btnSolve.innerHTML = '<i class="fa-regular fa-circle-check"></i>'
            } else {
                btnSolve.innerHTML = '<i class="fa-solid fa-xmark"></i>'
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

            //criando lis
            const li = document.createElement('li')
            li.classList.add('transation-li')

            //adicionando classes para borda
            if(e.valueV < 0) {
                li.classList.add('border-expenditure')
            } else {
                li.classList.add('border-revenue')
            }

            li.innerHTML = `
            <span>${e.categoryV}</span>
            <span>${e.descriptionV}</span>
            <span class="value-transaction">R$ ${Number(e.valueV).toFixed(2)}</span>`

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

showTransactions(currentYear, currentMonth, allTransaction)

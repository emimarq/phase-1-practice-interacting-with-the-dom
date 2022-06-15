function fn() {
  //---------------------
  // Get counter working
  //---------------------
  const domCounter = document.querySelector('#counter')

  //Initialize counter
  let counter = 0
  let counterRunning = true

  //Increments counter
  function countUp() {
    handleCounter = setInterval(() => {
      counter++
      domCounter.innerHTML = counter
    }, 1000)
  }
  countUp()

  //---------------------
  // Get buttons working
  //---------------------
  const btns = document.querySelectorAll('button')
  const likes = document.querySelector('.likes')
  let liker = 0 //Initialize like counter

  //Handles onclick events
  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const btnID = e.currentTarget.id

      //Conditionals to check btn IDs
      if (btnID === 'plus') {
        counter++
      } else if (btnID === 'minus') {
        counter--
      } else if (btnID === 'pause') {
        counterRunning = false
        clearInterval(handleCounter) //pauses counter
        btn.innerHTML = 'resume'
        btn.removeAttribute('id')
        btn.setAttribute('id', 'resume')
      } else if (btnID === 'resume') {
        counterRunning = true
        countUp() //resumes counter
        btn.innerHTML = 'pause'
        btn.removeAttribute('id')
        btn.setAttribute('id', 'pause')
      } else if (btnID === 'heart') {
        const li = document.createElement('li')
        likes.appendChild(li)
        liker++
        li.innerHTML = `${domCounter.innerHTML} was liked ${liker} time!`
        liker = 0
      }


      //Disables buttons if counter is not running
      if (counterRunning === false) {
        for (let i = 0; i < btns.length; i++) {
          btns[i].disabled = true
        }
        btns[3].disabled = false
      } else {
        //Re-enables buttons after counter has been resumed
        for (let i = 0; i < btns.length; i++) {
          btns[i].disabled = false
        }
      }
      domCounter.innerHTML = counter
    })
  })

  //----------------------
  // Get comments working
  //----------------------
  const listComments = document.querySelector('#list')
  const form = document.querySelector('form')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    setComment(e.target.querySelector('#comment-input').value)
    form.reset()
  })

  function setComment(comment) {
    const p = document.createElement('p')
    p.innerHTML = comment
    listComments.appendChild(p)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fn()
})


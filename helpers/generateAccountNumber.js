const generateAccountNumber = () => {
  return Math.random().toString().slice(2,12)
}

// console.log(generateAccountNumber())

module.exports = generateAccountNumber
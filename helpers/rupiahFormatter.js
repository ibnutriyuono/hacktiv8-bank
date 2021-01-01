const rupiahFormatter = (amount) => {
  return Number(amount).toLocaleString('en-ID', {style: 'currency', currency: 'IDR'})
}

// console.log(rupiahFormatter(50000000))

module.exports = rupiahFormatter
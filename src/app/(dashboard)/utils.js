// Create our number formatter.
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})


export function convertDateFormat(inputDate) {
  try {

      // Format the date object to the desired output format
      const outputDateStr = inputDate.toISOString().split('T')[0];

      return outputDateStr;
  } catch (error) {
      return "Invalid date format";
  }
}

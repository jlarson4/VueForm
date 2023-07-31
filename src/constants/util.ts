
/**
 *
 * @function - Adds a class to an element
 *
 * @param elements - the element(s) to add a class to
 * @param className - the class name to be added
 *
 **/

export function elementAddClass (element: HTMLElement, className: string) {
  // If the element exists
  if (element != null) {
    // If the classList is defined
    if (element.classList !== undefined) {
      // Add the class
      element.classList.add(className)
    } else if (element.className.indexOf(className) === -1) {
      // Directly append the class name
      element.className += ' ' + className
    }
  } else {
    // Throwing error on invalid element
    throw (new Error('Passed invalid element(s) (' + JSON.stringify(element) + ') to elementAddClass'))
  }
}

/**
 *
 * @function - Removes a class from an element
 *
 * @param element - the element(s) to remove a class from
 * @param className - the class name to be removed
 * @function - removes a class from an element
 *
 **/

export function elementRemoveClass (element: HTMLElement, className: string) {
  // If the element exists
  if (element != null) {
    // If the classList is defined
    if (element.classList !== undefined) {
      // Remove the class
      element.classList.remove(className)
    } else if (element.className.indexOf(className) > -1) {
      // Create a reg expression to find the class name
      const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')

      // Replace the class name with an empty string
      element.className = element.className.replace(reg, ' ')
    }
  } else {
    // Throwing error on invalid element
    throw (new Error('Passed invalid element (' + JSON.stringify(element) + ') to elementAddClass'))
  }
}

import moment from 'moment';

export function formatDateTime(date) {
  return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss');
}

export function formatChatDate(date) {
  return moment(new Date(date)).format('MM-DD HH:mm:ss');
}

export function formatDate(date) {
  return moment(new Date(date)).format('YYYY-MM-DD');
}

export function selectFiles(config = {}) {
  return new Promise((resolve, reject) => {
    /**
     * Create a new INPUT element
     * @type {HTMLElement}
     */
    let inputElement = document.createElement('INPUT');

    /**
     * Set a 'FILE' type for this input element
     * @type {string}
     */
    inputElement.type = 'file';

    if (config.multiple) {
      inputElement.setAttribute('multiple', 'multiple');
    }

    if (config.accept) {
      inputElement.setAttribute('accept', config.accept);
    }

    /**
     * Do not show element
     */
    inputElement.style.display = 'none';

    /**
     * Append element to the body
     * Fix using module on mobile devices
     */
    document.body.appendChild(inputElement);

    /**
     * Add onchange listener for «choose file» pop-up
     */
    inputElement.addEventListener(
      'change',
      event => {
        /**
         * Get files from input field
         */
        const files = event.target.files;

        /**
         * Return ready to be uploaded files array
         */
        resolve(files);

        /**
         * Remove element from a DOM
         */
        document.body.removeChild(inputElement);
      },
      false
    );

    /**
     * Fire click event on «input file» field
     */
    inputElement.click();
  });
}

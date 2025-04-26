import Toast from "../helpers/status-text";

/**
 * Handles response status of an API request
 *
 * @param {Object} options - Options object
 * @param {boolean} options.status - Status of the response
 * @param {boolean|string} options.errorStatus - Error status of the response
 * @param {Array<Object>} [options.dispatchActions] - Actions to be dispatched on success
 * @param {string} [options.successMessage] - Success message to be shown
 * @param {string} [options.errorMessage] - Error message to be shown
 * @param {Function} [options.navigate] - Navigate function to be called on success
 * @param {string} [options.navigatePath] - Path to navigate to on success
 * @param {Function} [options.clearErrorAction] - Action to clear error message on error
 */

export const handleResponseStatus = ({
  status,
  errorStatus,
  dispatchActions = [],
  successMessage = "Հաջողությամբ ստեղծված է",
  errorMessage,
  navigate,
  navigatePath = "/",
  clearErrorAction,
}) => {
  if (status) {
    Toast.success(successMessage, false, {
      onClose: () => {
        dispatchActions.forEach(({ action, payload }) => {
          action(payload);
        });

        if (navigate && navigatePath) {
          navigate(navigatePath);
        }
      },
    });
  } else if (errorStatus) {
    Toast.error(errorMessage || errorStatus, {
      onClose: () => {
        if (clearErrorAction) {
          clearErrorAction();
        }
      },
    });
  }
};

import { toast } from "react-toastify";

const getDate = (date) =>
  date.slice(0, 10).replaceAll("-", "/").split("/").reverse().join("/");

const getTime = (date) => date.slice(11, 16);

const getPinnedAndUnpinnedNotes = (notes) => {
  const pinnedNotes = notes.filter((note) => note.isPinned);
  const unPinnedNotes = notes.filter((note) => !note.isPinned);
  return { pinnedNotes, unPinnedNotes };
};

const validateEmail = (email) => {
  const regularExpression =
    /^([a-z\d-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  if (regularExpression.test(email)) {
    return true;
  } else {
    toast.warning("Enter a valid email address");
    return false;
  }
};

const validatePassword = (password) => {
  const regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (regularExpression.test(password)) {
    return true;
  } else {
    toast.warning(
      "Password must be between 8 to 16 chars and must include a number, a uppercase letter, a lowercase letter and a special character"
    );
    return false;
  }
};

const confirmPasswordCheck = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    toast.error("Your password and confirm password do not match");
    return false;
  } else {
    return true;
  }
};

export {
  getDate,
  getTime,
  getPinnedAndUnpinnedNotes,
  validatePassword,
  validateEmail,
  confirmPasswordCheck,
};

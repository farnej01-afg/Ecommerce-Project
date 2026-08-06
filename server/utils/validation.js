function validateProduct(data) {
  const { name, price, description, countInStock, collection } = data;

  const validationStatus = {
    isValid: true,
    errors: [],
  };

  // Validate name
  if (!name || typeof name !== "string" || name.trim().length < 3) {
    validationStatus.isValid = false;
    validationStatus.errors.push("Name must be at least 3 characters");
  }

  // Validate price
  if (typeof price !== "number" || price <= 0) {
    validationStatus.isValid = false;
    validationStatus.errors.push("Price must be a positive number");
  }

  // Validate description
  if (!description || description.trim().length === 0) {
    validationStatus.isValid = false;
    validationStatus.errors.push("Description cannot be empty");
  }

  // Validate countInStock
  if (typeof countInStock !== "number" || countInStock < 0) {
    validationStatus.isValid = false;
    validationStatus.errors.push("Stock count must be a non-negative number");
  }

  if (!data.category || typeof data.category !== "string") {
    validationStatus.isValid = false;
    validationStatus.errors.push("Collection/Category ID is required");
  }

  return validationStatus;
}

function validateUser(data) {
  const { username, email, password } = data;

  const validationStatus = {
    isValid: true,
    errors: [],
  };

  // validate username
  if (!username || typeof username !== "string" || username.trim().length < 5) {
    validationStatus.isValid = false;
    validationStatus.errors.push("Username must be atleast 5 characters");
  }

  // validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    validationStatus.isValid = false;
    validationStatus.errors.push("Please enter a valid Email");
  }

  // validate password
  if (!password || password.length < 8) {
    validationStatus.isValid = false;
    validationStatus.errors.push("Password must be at least 8 characters");
  }

  return validationStatus;
}

export { validateProduct, validateUser };

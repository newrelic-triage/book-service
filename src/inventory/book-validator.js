const REQUIRED_FIELDS = ['isbn', 'title', 'author', 'price', 'stock'];

function validateBook(book) {
  const errors = [];

  for (const field of REQUIRED_FIELDS) {
    if (!book[field] && book[field] !== 0) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (book.isbn && !/^(97(8|9))?\d{9}(\d|X)$/.test(book.isbn)) {
    errors.push('Invalid ISBN format');
  }

  if (book.price !== undefined && book.price < 0) {
    errors.push('Price cannot be negative');
  }

  if (book.stock !== undefined && (!Number.isInteger(book.stock) || book.stock < 0)) {
    errors.push('Stock must be a non-negative integer');
  }

  return { valid: errors.length === 0, errors };
}

function validateBulk(books) {
  return books.map((book, index) => ({
    index,
    isbn: book.isbn,
    ...validateBook(book),
  }));
}

module.exports = { validateBook, validateBulk };

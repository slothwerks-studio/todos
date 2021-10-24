// Test name for validity
export const testName = (name) => {
  if (!name.trim()) {
    return false;
  }
  return true;
}

// Sample todo items
export const mockData = [
  {
    name: 'Create sample React project',
    due: 1635102283457,
    complete: false
  },
  {
    name: 'Upload to GitHub',
    due: 1635102283457,
    complete: false
  },
  {
    name: 'Get some sleep',
    due: 1635102283457,
    complete: false
  }
];
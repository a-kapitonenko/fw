export function setUserId(id: any): void {
  localStorage.setItem('id', id);
}

export function getUserId() {
  return localStorage.getItem('id');
}

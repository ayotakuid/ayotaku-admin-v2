const formatDateOnline = (ISODate) => {
  const now = new Date();
  const date = new Date(ISODate);
  const diffDetik = Math.floor((now - date) / 1000);

  if (diffDetik < 60) {
    return `${diffDetik} detik yang lalu`;
  } else if (diffDetik < 3600) {
    const minutes = Math.floor(diffDetik / 60);
    return `${minutes} menit yang lalu`;
  } else if (diffDetik < 86400) {
    const hours = Math.floor(diffDetik / 3600);
    return `${hours} jam yang lalu`;
  } else {
    const days = Math.floor(diffDetik / 86400);
    return `${days} hari yang lalu`;
  }
}

export default {
  formatDateOnline
}
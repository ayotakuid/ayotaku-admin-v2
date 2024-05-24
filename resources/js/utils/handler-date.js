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

const formatDateSchedule = (ISODate) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Jakarta'
  }

  const dateLocale = new Date(ISODate).toLocaleString('id-ID', options)

  return `${dateLocale} WIB`;
}

const formatDateStart = (date) => {
  const newDate = new Date(date);
  const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const monthName = month[newDate.getMonth()];

  const day = newDate.getDate();
  const year = newDate.getFullYear();

  return `${day} ${monthName} ${year}`;
}

export default {
  formatDateOnline,
  formatDateSchedule,
  formatDateStart
}
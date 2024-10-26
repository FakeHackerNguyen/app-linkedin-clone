// format Date
export function formatDate(date: string, options = {}) {
  return Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

// format time following the format HH:MM am/pm
export function formatTime(date: string) {
  return Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(date));
}

// calculateTimeAgo following format 1y, 1m, 1w, 1d, 1h, 1m, 1s
export function calculateTimeAgo(date: string) {
  const currentDate = new Date();
  const pastDate = new Date(date);
  const timeDifference = currentDate.getTime() - pastDate.getTime();
  const timeAgo = timeDifference / 1000 / 60 / 60 / 24;

  let result;
  if (timeAgo >= 365) {
    result = `${Math.floor(timeAgo / 365)}y ago`;
  }

  if (timeAgo >= 30) {
    result = `${Math.floor(timeAgo / 30)}m ago`;
  }

  if (timeAgo >= 7) {
    result = `${Math.floor(timeAgo / 7)}w ago`;
  }

  if (timeAgo >= 1) {
    result = `${Math.floor(timeAgo)}d ago`;
  }

  if (timeAgo < 1) {
    if (timeDifference / 1000 > 1) {
      result = `${Math.floor(timeDifference / 1000)}s ago`;
    }
    if (timeDifference / 1000 / 60 > 1) {
      result = `${Math.floor(timeDifference / 1000 / 60)}m ago`;
    }
    if (timeDifference / 1000 / 60 / 60 > 1) {
      result = `${Math.floor(timeDifference / 1000 / 60 / 60)}h ago`;
    }
  }

  return result;
}

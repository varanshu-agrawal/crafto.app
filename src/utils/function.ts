export const getRelativeTime = (updatedAt: string) => {
    const currentTime = new Date();
    const updatedTime = new Date(updatedAt);
    const diffInMilliseconds = currentTime.getTime() - updatedTime.getTime();

    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (seconds < 60) return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    return `${months} month${months > 1 ? 's' : ''} ago`;
};

export const formatCommitDate = (commitDate: Date): string => {
    const now = new Date(Date.now())
    const diffSeconds = (now.getTime() - commitDate.getTime()) / 1000
    const diffMinutes = diffSeconds / 60
    const diffHours = diffMinutes / 60
    const diffDays = diffHours / 24
    const diffMonths = diffDays / 31
    const diffYears = diffDays / 365
    let formatted = {
        value: -1,
        unit: ""
    }
    if (diffSeconds < 60) {
        formatted = {
            value: diffSeconds,
            unit: "second"
        }
    } else if (diffMinutes < 60) {
        formatted = {
            value: diffMinutes,
            unit: "minute"
        }
    } else if (diffHours < 24) {
        formatted = {
            value: diffHours,
            unit: "hour"
        }
    } else if (diffDays < 31) {
        formatted = {
            value: diffDays,
            unit: "day"
        }
    } else if (diffDays < 365) {
        formatted = {
            value: diffMonths,
            unit: "month"
        }
    } else {
        formatted = {
            value: diffYears,
            unit: "year"
        }
    }
    return `${Math.floor(formatted.value)} ${formatted.unit}${Math.floor(formatted.value) !== 1 ? 's' : ''} ago`
}

/**
 * Removes leading "http://", "https://", as well as the "www." subdomain
 * @param url 
 */
export const formatURLForDisplay = (url: string): string => {
    const noProtocol = (url.startsWith("https://")) ? url.replace("https://", "") : url.replace("http://", "")
    return noProtocol.startsWith("www") ? noProtocol.replace("www.", "") : noProtocol
}

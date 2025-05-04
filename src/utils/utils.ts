// Used for Maplesea Open APIs
export function getAPIDate(): string {
    const now = new Date();

    // SGT is UTC+8
    const SGT_OFFSET_MS = 8 * 60 * 60 * 1000;
    const sgtTime = new Date(now.getTime() + SGT_OFFSET_MS);

    const hourSGT = sgtTime.getUTCHours(); // already offset to SGT
    // If it's before 2am in SGT, use 2 days ago, else we want previous day
    if (hourSGT < 2) {
        sgtTime.setDate(sgtTime.getDate() - 2);
    } else {
        sgtTime.setDate(sgtTime.getDate() - 1);
    }

    const year = sgtTime.getUTCFullYear();
    const month = String(sgtTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(sgtTime.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
  
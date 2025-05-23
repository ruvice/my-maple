import { MapleServer } from "@ruvice/my-maple-models";
import { useCharacterStore } from "../store/characterStore";
import { useViewStore } from "../store/useCharacterViewStore";

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

// Used for Maplesea Open APIs
export function getAPIDateForXDaysAgo(offset: number): string {
    const now = new Date();

    // SGT is UTC+8
    const SGT_OFFSET_MS = 8 * 60 * 60 * 1000;
    const sgtTime = new Date(now.getTime() + SGT_OFFSET_MS);

    const hourSGT = sgtTime.getUTCHours(); // already offset to SGT
    // If it's before 2am in SGT, use 2 days ago, else we want previous day
    if (hourSGT < 2) {
        sgtTime.setDate(sgtTime.getDate() - 2 - offset);
    } else {
        sgtTime.setDate(sgtTime.getDate() - 1 - offset);
    }

    const year = sgtTime.getUTCFullYear();
    const month = String(sgtTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(sgtTime.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function getDDMMString(dateString: string): string {
    const date = new Date(dateString);
  
    const day = date.toLocaleString("en-SG", {
      timeZone: "Asia/Singapore",
      day: "2-digit",
    });
  
    const month = date.toLocaleString("en-SG", {
      timeZone: "Asia/Singapore",
      month: "2-digit",
    });
  
    return `${day}/${month}`;
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function updateValidServers() {
    const validServers: MapleServer[] = []
    const serverCharacters = useCharacterStore.getState().getServerCharacters();
    Object.entries(serverCharacters).forEach(([key, value]) => {
        if (Object.keys(value).length > 0) {
            validServers.push(key as MapleServer)
        }
    })
    useViewStore.getState().setValidServers(validServers);
    useViewStore.getState().setCurrentServer(validServers[0]);
}

import { Characters } from "../store/characterStore";
import { useTwitchStore } from "../store/twitchStore";
import { CachedCharacterData } from "../types/types";

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

export function saveCharacterData(
    data: CachedCharacterData
) {
    const opaqueId = useTwitchStore.getState().getChannelID();
    const configVersion = useTwitchStore.getState().getConfigVersion();
    const apiDate = getAPIDate();
    
    const newKey = `MyMaple-${opaqueId}-${configVersion}-${apiDate}`;
  
    // Step 1: Check for existing keys in localStorage with same opaqueId
    const keysToDelete: string[] = [];
  
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`MyMaple-${opaqueId}-`) && key !== newKey) {
            keysToDelete.push(key);
        }
    }
  
    // Step 2: Delete any outdated keys
    console.log('Deleting stale cached character info')
    keysToDelete.forEach((key) => localStorage.removeItem(key));
  
    // Step 3: Save new data
    localStorage.setItem(newKey, JSON.stringify(data));
}

export function loadCharacterData(): Characters | null {
    const opaqueId = useTwitchStore.getState().getChannelID();
    const configVersion = useTwitchStore.getState().getConfigVersion();
    const apiDate = getAPIDate();
    const newKey = `MyMaple-${opaqueId}-${configVersion}-${apiDate}`;
    const raw = localStorage.getItem(newKey);
    if (raw === null) {
        return null
    }
    const cachedCharacterData: CachedCharacterData = JSON.parse(raw)
    const now = Date.now()
    if (now > cachedCharacterData.expiry) {
        return null
    }
    return cachedCharacterData.characters
}


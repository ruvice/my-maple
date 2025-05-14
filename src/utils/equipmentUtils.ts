export function getMaximumStars(
    currentScrollCount: number, 
    upgradeableCount: number, 
    resilienceCount: number,
    equipmentLevel: number,
    equipmentName: string
): number {
    if (isSuperiorEquip(equipmentName)) {
        return getStarsForSuperiorEquip(equipmentLevel);
    }

    if (currentScrollCount === 0 && upgradeableCount === 0 && resilienceCount === 0) {
        return 0;
    }
    
    return getStarsForEquip(equipmentLevel);
    
}

function isSuperiorEquip(equipmentName: string) {
    // Check for superior equipment
    const superiorEquipKeywords = ["tyrant", "nova", "elite heliseum"];
    const name = equipmentName.toLowerCase();

    return (superiorEquipKeywords.some(keyword => name.includes(keyword)));
}

function getStarsForSuperiorEquip(equipmentLevel: number) {
    if (equipmentLevel < 95) {
            return 3
    } else if (equipmentLevel < 108) {
        return 5
    } else if (equipmentLevel < 118) {
        return 8
    } else if (equipmentLevel < 128) {
        return 10
    } else {
        return 15
    }
}

function getStarsForEquip(equipmentLevel: number) {
    if (equipmentLevel < 95) {
        return 5
    } else if (equipmentLevel < 108) {
        return 8
    } else if (equipmentLevel < 118) {
        return 10
    } else if (equipmentLevel < 128) {
        return 15
    } else if (equipmentLevel < 138) {
        return 20
    } else {
        return 30
    }
}